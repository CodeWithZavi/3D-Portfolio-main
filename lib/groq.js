/**
 * Groq chat client — actual SSE streaming + fast non-streaming
 */
const GROQ_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.1-8b-instant";
const BASE = "https://api.groq.com/openai/v1";

async function groqChat(messages, options = {}) {
  const res = await fetch(`${BASE}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages,
      max_tokens: options.maxTokens || 300,
      temperature: options.temperature || 0.2,
      stream: false,
    }),
  });
  if (!res.ok) throw new Error(`Groq ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

/**
 * Real SSE streaming from Groq. Returns the raw response body
 * for proxying through to the client.
 */
async function groqChatStream(messages, options = {}) {
  const res = await fetch(`${BASE}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages,
      max_tokens: options.maxTokens || 350,
      temperature: options.temperature || 0.2,
      stream: true,
    }),
  });
  if (!res.ok) throw new Error(`Groq ${res.status}: ${await res.text()}`);
  return res.body;
}

module.exports = { groqChat, groqChatStream };
