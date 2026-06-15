/**
 * RAG engine v3 — hybrid retrieval, re-ranking, intent-tracking memory
 */

const fs = require("fs");
const path = require("path");

// --- Embedding Caching (globalThis survives HMR in Next.js dev) ---

function loadEmbeddings() {
  if (globalThis.__embeddings) return globalThis.__embeddings;
  const filePath = path.join(process.cwd(), "lib", "embeddings.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  globalThis.__embeddings = JSON.parse(raw);
  return globalThis.__embeddings;
}

function cosineSimilarity(a, b) {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  return magA && magB ? dot / Math.sqrt(magA * magB) : 0;
}

// --- Intent Detection ---

const INTENT_PATTERNS = {
  project: /\b(project|build|built|make|made|creat|develop|app|application|website|platform|tool|system|live|demo|github|code|software)/ig,
  experience: /\b(work|experience|job|intern|company|career|position|role|worked|gdsc|convo)/ig,
  skills: /\b(skill|tech|know|language|framework|tool|database|proficient|expertise|familiar|stack|can you)/ig,
  achievement: /\b(achievement|certificate|certification|award|honor|course|completed|bootcamp|workshop|hackathon)/ig,
  education: /\b(study|university|college|school|degree|education|comsats|campus|academic)/ig,
  contact: /\b(contact|email|reach|message|hire|connect|linkedin|github|social)/ig,
  personal: /\b(who|about|who is|tell me about|noman|name|portfolio)/ig,
};

function detectIntent(query) {
  const lower = query.toLowerCase();
  const scores = {};
  for (const [intent, pattern] of Object.entries(INTENT_PATTERNS)) {
    const matches = (lower.match(pattern) || []).length;
    if (matches > 0) scores[intent] = matches;
  }
  return scores;
}

// --- BM25-like keyword scoring ---

function bm25Score(query, text) {
  const qWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 1);
  const tLower = text.toLowerCase();
  let score = 0;
  for (const w of qWords) {
    if (tLower.includes(w)) score += 1;
  }
  return score / Math.sqrt(text.length / 100 + 1); // slight length penalty
}

// --- Semantic retrieval ---

function semanticRetrieve(queryEmbedding, topK = 40) {
  const chunks = loadEmbeddings();
  return chunks
    .map(chunk => ({ ...chunk, score: cosineSimilarity(queryEmbedding, chunk.embedding) }))
    .sort((a, b) => b.score - a.score);
}

// --- Keyword retrieval ---

function keywordRetrieve(query, topK = 40) {
  const chunks = loadEmbeddings();
  return chunks
    .map(chunk => ({ ...chunk, score: bm25Score(query, chunk.content) }))
    .sort((a, b) => b.score - a.score);
}

// --- Reciprocal Rank Fusion ---

function rrfFuse(semantic, keyword, k = 60, topK = 20) {
  const scores = {};
  for (const list of [semantic, keyword]) {
    for (let i = 0; i < Math.min(list.length, topK); i++) {
      const id = list[i].id;
      scores[id] = (scores[id] || 0) + 1 / (k + i + 1);
    }
  }
  const chunks = loadEmbeddings();
  return Object.entries(scores)
    .map(([id, score]) => {
      const chunk = chunks.find(c => c.id === id);
      return { ...chunk, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score);
}

// --- Intent-biased diverse retrieval ---

function diverseRetrieve(fused, maxPerType = 2, totalK = 6, preferredTypes = []) {
  // Boost preferred types
  if (preferredTypes.length) {
    for (const chunk of fused) {
      if (preferredTypes.includes(chunk.type)) chunk.score *= 3;
    }
  }
  fused.sort((a, b) => b.score - a.score);

  const seenTypes = {};
  const diverse = [];
  for (const chunk of fused) {
    const type = chunk.type || "other";
    seenTypes[type] = (seenTypes[type] || 0);
    if (seenTypes[type] < maxPerType) {
      diverse.push(chunk);
      seenTypes[type]++;
    }
    if (diverse.length >= totalK) break;
  }
  // Fill remaining
  if (diverse.length < totalK) {
    for (const chunk of fused) {
      if (!diverse.includes(chunk)) {
        diverse.push(chunk);
        if (diverse.length >= totalK) break;
      }
    }
  }
  return diverse.sort((a, b) => b.score - a.score);
}

// --- Full hybrid retrieve pipeline ---

async function hybridRetrieve(query, queryEmbedding, primaryIntent) {
  const semantic = semanticRetrieve(queryEmbedding, 40);
  const keyword = keywordRetrieve(query, 40);
  const fused = rrfFuse(semantic, keyword);

  const TYPE_FOR_INTENT = { project: ["project"], skills: ["skills"], experience: ["experience"], achievement: ["achievement"], education: ["education"], personal: ["personal"], contact: ["contact"] };
  const preferred = TYPE_FOR_INTENT[primaryIntent] || [];

  return diverseRetrieve(fused, 2, 6, preferred);
}

// --- Re-ranking (sends top-k chunks to Groq to pick best) ---

async function rerankChunks(query, chunks, groqChatFn, k = 3) {
  if (chunks.length <= k) return chunks;

  const chunkList = chunks.map((c, i) =>
    `[${i}] ${c.title}: ${c.content.slice(0, 200)}`
  ).join("\n\n");

  const msgs = [
    { role: "system", content: "You are a search relevance rater. Return ONLY the indices of the most relevant chunks to the query, comma-separated. Example: '0,2,5'. Return at most " + k + " indices." },
    { role: "user", content: `Query: "${query}"\n\nChunks:\n${chunkList}\n\nMost relevant indices:` },
  ];

  try {
    const reply = await groqChatFn(msgs, { maxTokens: 30, temperature: 0 });
    const indices = (reply.match(/\d+/g) || []).map(Number).filter(n => chunks[n]);
    if (indices.length > 0) return indices.slice(0, k).map(i => chunks[i]);
  } catch {
    // re-ranker failed, return top-k by hybrid score
  }
  return chunks.slice(0, k);
}

// --- Query expansion ---

const QUERY_EXPANSIONS = {
  project: "projects portfolio work examples",
  skills: "technologies languages frameworks tools",
  experience: "work history internship jobs",
  achievement: "certificates awards courses completed",
  education: "university academic background study",
  contact: "email linkedin github contact information",
  personal: "who is noman about biography",
};

function expandQuery(query) {
  const intents = detectIntent(query);
  const primary = Object.entries(intents).sort((a, b) => b[1] - a[1])[0];
  if (!primary) return query;
  const expansion = QUERY_EXPANSIONS[primary[0]];
  return expansion ? `${query} ${expansion}` : query;
}

// --- Context builder ---

function buildContext(retrievedChunks, excludeTypes = []) {
  const sections = {};
  for (const c of retrievedChunks) {
    if (excludeTypes.includes(c.type)) continue;
    const type = c.type || "other";
    if (!sections[type]) sections[type] = [];
    sections[type].push(c);
  }

  let context = "";
  const order = ["personal", "experience", "skills", "project", "achievement", "education", "contact", "site", "services"];
  for (const type of order) {
    if (!sections[type]) continue;
    context += `\n## ${type.toUpperCase()}:\n`;
    for (const c of sections[type]) {
      context += `- ${c.content}${c.link ? `\n  Link: ${c.link}` : ""}\n`;
    }
  }
  return context.trim();
}

// --- Fallback synthesizer ---

function matchKeywords(query, text) {
  const words = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);
  let score = 0;
  for (const w of words) {
    if (text.toLowerCase().includes(w)) score += 1;
  }
  return score / Math.max(words.length, 1);
}

function synthesizeFallback(query, retrievedChunks) {
  const intent = detectIntent(query);
  const primaryIntent = Object.entries(intent).sort((a, b) => b[1] - a[1])[0]?.[0];
  const TYPE_MAP = { project: "project", experience: "experience", skills: "skills", achievement: "achievement", education: "education", personal: "personal", contact: "contact" };
  const targetType = TYPE_MAP[primaryIntent];

  let candidatePool = retrievedChunks;
  if (targetType) {
    const typeMatches = retrievedChunks.filter(c => c.type === targetType);
    if (typeMatches.length > 0) candidatePool = typeMatches;
  }

  const reranked = candidatePool
    .map(c => ({ ...c, kwScore: matchKeywords(query, c.content) }))
    .sort((a, b) => b.kwScore - a.kwScore)
    .slice(0, 5);

  let intro = "";
  if (primaryIntent === "skills" && reranked.length) {
    intro = reranked.map(c => `• ${c.content}`).join("\n");
  } else if (primaryIntent === "project" && reranked.length) {
    intro = reranked.map(c => `🔹 ${c.title}: ${c.content.slice(0, 120)}`).join("\n");
  } else if (primaryIntent === "experience" && reranked.length) {
    intro = reranked.map(c => c.content).join("\n");
  } else if (primaryIntent === "achievement" && reranked.length) {
    intro = reranked.map(c => `🏆 ${c.content}`).join("\n");
  } else if (["personal", "contact", "education"].includes(primaryIntent) && reranked.length) {
    intro = reranked.slice(0, 2).map(c => c.content).join(". ");
  }

  if (!intro || !reranked.length) {
    const best = retrievedChunks
      .map(c => ({ ...c, kwScore: matchKeywords(query, c.content) }))
      .sort((a, b) => b.kwScore - a.kwScore)[0];
    intro = best ? best.content.slice(0, 200) : "I'm ZaviBot, Noman's AI assistant. Ask me about his skills, projects, or experience.";
  }
  return intro.slice(0, 400);
}

// --- System prompt ---

const SYSTEM_PROMPT = `You are ZaviBot, Noman Shakir's portfolio assistant.

RULES:
- Answer ONLY using PORTFOLIO DATA below. Never make up info.
- Keep answers concise: 1-3 sentences for simple questions, a short list for "what projects" or "what skills".
- For greetings ("hi", "hello"): greet briefly and say what you can help with.
- If data doesn't answer the question: "I don't have that. Email nomanshaker2@gmail.com."
- Use markdown formatting: **bold** for names/titles, \n for newlines, - for lists.`;

module.exports = {
  loadEmbeddings,
  semanticRetrieve,
  keywordRetrieve,
  rrfFuse,
  hybridRetrieve,
  rerankChunks,
  diverseRetrieve,
  buildContext,
  SYSTEM_PROMPT,
  cosineSimilarity,
  detectIntent,
  expandQuery,
  synthesizeFallback,
};
