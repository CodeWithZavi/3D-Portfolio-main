/**
 * POST /api/search — Semantic project search using Gemini embeddings (free)
 */
import { retrieveRelevantChunks } from "../../lib/rag";
import { embedText } from "../../lib/gemini";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { query } = req.body;
  if (!query?.trim()) return res.status(400).json({ error: "Query is required" });

  try {
    const queryEmbedding = await embedText(query);
    const results = retrieveRelevantChunks(queryEmbedding, 10);

    const projectResults = results
      .filter((r) => r.type === "project")
      .map((r) => ({
        id: r.id,
        title: r.title,
        content: r.content,
        link: r.link,
        score: Math.round(r.score * 100) / 100,
      }));

    res.status(200).json({ results: projectResults });
  } catch (error) {
    console.error("Search API error:", error);
    res.status(500).json({ error: "Search failed" });
  }
}
