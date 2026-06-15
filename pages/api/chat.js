/**
 * POST /api/chat — Groq-powered RAG chatbot v3
 * Hybrid retrieval + re-ranking + real SSE streaming + conversation memory
 */
import { SYSTEM_PROMPT, hybridRetrieve, rerankChunks, buildContext, detectIntent, expandQuery, synthesizeFallback, loadEmbeddings } from "../../lib/rag";
import { embedText } from "../../lib/gemini";
import { groqChat, groqChatStream } from "../../lib/groq";

export const config = { runtime: "nodejs" };

// Track last intent per session (simple in-memory, resets on server restart)
const sessionMemory = new Map(); // sessionId -> { lastIntent, lastQuery }

const INTENT_INSTRUCTIONS = {
  project: "List EVERY project from the PROJECT section below. Include name, one-line description, and tech for each. Give ALL of them — do not skip any.",
  skills: "List EVERY skill from the SKILLS section below. Group by category. Include ALL entries.",
  experience: "List EVERY experience entry from the EXPERIENCE section below. Include role, company, dates.",
  achievement: "List EVERY achievement from the ACHIEVEMENT section below. Include names and dates.",
  education: "ONLY use EDUCATION section.",
  contact: "ONLY use CONTACT section.",
  personal: "ONLY use PERSONAL section.",
};

const IRRELEVANT_FOR = {
  project: ["personal", "contact", "achievement", "education", "site"],
  skills: ["personal", "contact", "project", "site"],
  experience: ["personal", "contact", "project", "achievement", "site"],
  achievement: ["personal", "contact", "project", "experience", "site"],
  education: ["personal", "contact", "project", "experience", "site"],
  personal: ["project", "achievement", "experience", "site"],
  contact: ["project", "achievement", "experience", "skills", "site"],
};

// Follow-up cues: words suggesting user is referencing previous question
const FOLLOWUP_CUES = /\b(it|that|this|the first|the second|the last|those|these|tell me more|what about|and)\b/i;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { message, history = [], sessionId = "default" } = req.body;
  const cleanMessage = (message || "").replace(/<[^>]*>/g, "").trim();
  if (!cleanMessage) return res.status(400).json({ error: "Message is required" });
  if (cleanMessage.length > 500) return res.status(400).json({ error: "Message too long" });

  const allChunks = loadEmbeddings();

  try {
    // --- Intent detection with memory ---
    const intents = detectIntent(cleanMessage);
    let primaryIntent = Object.entries(intents).sort((a, b) => b[1] - a[1])[0]?.[0];

    const mem = sessionMemory.get(sessionId) || {};
    // If no intent detected and this looks like a follow-up, inherit last intent
    if (!primaryIntent && FOLLOWUP_CUES.test(cleanMessage) && mem.lastIntent) {
      primaryIntent = mem.lastIntent;
    }

    // Store in session memory
    sessionMemory.set(sessionId, { lastIntent: primaryIntent, lastQuery: cleanMessage, ts: Date.now() });

    const expanded = expandQuery(cleanMessage);

    // --- Hybrid retrieval ---
    let retrieved = [];
    try {
      const queryEmbedding = await embedText(expanded);
      if (queryEmbedding && queryEmbedding.length > 100) {
        retrieved = await hybridRetrieve(cleanMessage, queryEmbedding, primaryIntent);
      }
    } catch {
      // embed failed — continue
    }

    if (!retrieved.length) {
      retrieved = allChunks;
    }

    // --- Re-ranking: skip for list-heavy intents, give ALL chunks ---
    const LIST_INTENTS = ["project", "skills", "experience", "achievement"];
    if (LIST_INTENTS.includes(primaryIntent)) {
      // For project/skills intents: grab ALL matching chunks, no re-ranker bottleneck
      const TYPE_MAP = { project: "project", skills: "skills", experience: "experience", achievement: "achievement" };
      const targetType = TYPE_MAP[primaryIntent];
      const allOfType = allChunks.filter(c => c.type === targetType);
      if (allOfType.length > 0) {
        retrieved = allOfType;
      }
    } else {
      // For non-list intents, use re-ranking to find the single best
      try {
        retrieved = await rerankChunks(cleanMessage, retrieved.slice(0, 10), groqChat, 3);
      } catch {
        retrieved = retrieved.slice(0, 3);
      }
    }

    // --- Build context ---
    const exclude = IRRELEVANT_FOR[primaryIntent] || [];
    const context = buildContext(retrieved, exclude);

    if (!context) {
      res.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" });
      res.write(`data: ${JSON.stringify({ content: "I don't have that information. Try asking about Noman's skills, projects, or experience." })}\n\n`);
      res.write("data: [DONE]\n\n");
      res.end();
      return;
    }

    const instruction = INTENT_INSTRUCTIONS[primaryIntent] || "Answer using the context below. Be short and direct.";
    const systemMsg = `${SYSTEM_PROMPT}\n\n${instruction}\n\nPORTFOLIO DATA:\n${context}`;

    const conversation = [
      { role: "system", content: systemMsg },
      ...history.slice(-6).map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.content })),
      { role: "user", content: cleanMessage },
    ];

    const isListIntent = LIST_INTENTS.includes(primaryIntent);

    // --- Real SSE streaming from Groq ---
    res.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" });

    let streamBody;
    try {
      streamBody = await groqChatStream(conversation, { maxTokens: isListIntent ? 1024 : 350 });
    } catch (e) {
      console.error("Groq stream error:", e.message);
      streamBody = null;
    }

    if (streamBody) {
      const reader = streamBody.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";
          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const dataStr = line.replace("data: ", "").trim();
            if (dataStr === "[DONE]") continue;
            try {
              const parsed = JSON.parse(dataStr);
              const content = parsed.choices?.[0]?.delta?.content || "";
              if (content) res.write(`data: ${JSON.stringify({ content })}\n\n`);
            } catch {
              // skip unparseable chunks
            }
          }
        }
      } catch (err) {
        console.error("Stream proxy error:", err.message);
      }
    } else {
      // Fallback: non-streaming Groq
      try {
        const reply = await groqChat(conversation);
        if (reply) {
          const words = reply.split(/(\s+)/);
          for (const w of words) {
            if (w.length > 0) res.write(`data: ${JSON.stringify({ content: w })}\n\n`);
          }
        }
      } catch {
        // both Groq paths failed, use local fallback
        const fb = synthesizeFallback(cleanMessage, allChunks);
        for (const word of fb.split(/\s+/)) {
          if (word) res.write(`data: ${JSON.stringify({ content: word + " " })}\n\n`);
        }
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error) {
    console.error("Chat API error:", error.message);
    res.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" });
    res.write(`data: ${JSON.stringify({ content: "Something went wrong. Try again?" })}\n\n`);
    res.write("data: [DONE]\n\n");
    res.end();
  }
}
