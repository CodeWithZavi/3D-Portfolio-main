/**
 * Shared Gemini API client — single source for all Gemini calls
 * Used by: pages/api/chat.js, pages/api/search.js, scripts/build-embeddings.js
 */

const API_KEY = process.env.GEMINI_API_KEY;
const EMBED_MODEL = "gemini-embedding-2";
const CHAT_MODEL = process.env.GEMINI_CHAT_MODEL || "gemini-2.5-flash";
const BASE_URL = "https://generativelanguage.googleapis.com/v1";

async function embedText(text) {
  const url = `${BASE_URL}/models/${EMBED_MODEL}:embedContent?key=${API_KEY}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: `models/${EMBED_MODEL}`,
      content: { parts: [{ text }] },
    }),
  });
  if (!res.ok) throw new Error(`Embed error ${res.status}`);
  const data = await res.json();
  return data.embedding?.values || [];
}

async function streamChat(messages, systemInstruction, options = {}) {
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const body = {
    contents,
    generationConfig: {
      maxOutputTokens: options.maxTokens || 350,
      temperature: options.temperature || 0.3,
    },
  };
  if (systemInstruction) {
    body.systemInstruction = { parts: [{ text: systemInstruction }] };
  }

  const url = `${BASE_URL}/models/${CHAT_MODEL}:streamGenerateContent?alt=sse&key=${API_KEY}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return res;
}

module.exports = { embedText, streamChat, API_KEY, EMBED_MODEL, CHAT_MODEL };
