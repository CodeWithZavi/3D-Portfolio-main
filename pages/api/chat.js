/**
 * POST /api/chat — Groq-powered RAG chatbot
 * Uses Gemini for embeddings, Groq for fast chat generation
 */
import { SYSTEM_PROMPT, diverseRetrieve, buildContext, detectIntent, expandQuery, synthesizeFallback, loadEmbeddings } from "../../lib/rag";
import { embedText } from "../../lib/gemini";
import { groqChat } from "../../lib/groq";

export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { message, history = [] } = req.body;
  const cleanMessage = (message || "").replace(/<[^>]*>/g, "").trim();
  if (!cleanMessage) return res.status(400).json({ error: "Message is required" });
  if (cleanMessage.length > 500) return res.status(400).json({ error: "Message too long" });

  const allChunks = loadEmbeddings();

  try {
    // Intent + query expansion
    const intents = detectIntent(cleanMessage);
    const primaryIntent = Object.entries(intents).sort((a, b) => b[1] - a[1])[0]?.[0];
    const expanded = expandQuery(cleanMessage);

    // Semantic retrieval with intent biasing
    let retrieved = [];
    try {
      const queryEmbedding = await embedText(expanded);
      if (queryEmbedding && queryEmbedding.length > 100) {
        const TYPE_FOR_INTENT = { project: ["project"], skills: ["skills"], experience: ["experience"], achievement: ["achievement"], education: ["education"], personal: ["personal"], contact: ["contact"] };
        const preferred = TYPE_FOR_INTENT[primaryIntent] || [];
        retrieved = diverseRetrieve(queryEmbedding, 2, 6, preferred);
      }
    } catch {
      // embed failed — fall through
    }

    if (!retrieved.length) {
      retrieved = allChunks;
    }

    // Build focused context
    const IRRELEVANT_FOR = {
      project: ["personal", "contact", "achievement", "education", "site"],
      skills: ["personal", "contact", "project", "site"],
      experience: ["personal", "contact", "project", "achievement", "site"],
      achievement: ["personal", "contact", "project", "experience", "site"],
      education: ["personal", "contact", "project", "experience", "site"],
      personal: ["project", "achievement", "experience", "site"],
      contact: ["project", "achievement", "experience", "skills", "site"],
    };
    const exclude = IRRELEVANT_FOR[primaryIntent] || [];
    const context = buildContext(retrieved.slice(0, 8), exclude);

    const INTENT_INSTRUCTIONS = {
      project: "ONLY use the PROJECT section below. List specific project names with a one-line description each. Include links if present.",
      skills: "ONLY use the SKILLS section below. List skills grouped by category.",
      experience: "ONLY use the EXPERIENCE section below. State the role, company, and dates.",
      achievement: "ONLY use the ACHIEVEMENT section below. Name achievements/certs and dates.",
      education: "ONLY use the EDUCATION section below.",
      contact: "ONLY use the CONTACT section below.",
      personal: "ONLY use the PERSONAL section below for who Noman is.",
    };
    const instruction = INTENT_INSTRUCTIONS[primaryIntent] || "Answer using the context below. Be short and direct.";

    const systemMsg = `${SYSTEM_PROMPT}\n\n${instruction}\n\nPORTFOLIO DATA:\n${context}`;

    const conversation = [
      { role: "system", content: systemMsg },
      ...history.slice(-6).map((m) => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.content })),
      { role: "user", content: cleanMessage },
    ];

    // Try Groq
    let reply;
    try {
      reply = await groqChat(conversation);
    } catch (e) {
      console.error("Groq error:", e.message);
      reply = null;
    }

    // If Groq worked, stream the reply word by word
    if (reply && reply.length > 0) {
      res.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" });

      const words = reply.split(/(\s+)/);
      for (const w of words) {
        if (w.length > 0) {
          res.write(`data: ${JSON.stringify({ content: w })}\n\n`);
        }
      }
      res.write("data: [DONE]\n\n");
      res.end();
      return;
    }

    // Fallback
    const fallbackMsg = synthesizeFallback(cleanMessage, allChunks);
    res.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" });
    for (const word of fallbackMsg.split(/\s+/)) {
      if (word) res.write(`data: ${JSON.stringify({ content: word + " " })}\n\n`);
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
