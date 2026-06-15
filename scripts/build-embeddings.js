/**
 * RAG Data Pipeline — Google Gemini Edition
 * Run once: node scripts/build-embeddings.js
 * Reads from lib/portfolio-data.js (single source of truth)
 */
require("dotenv").config({ path: require("path").join(__dirname, "..", ".env.local") });

const fs = require("fs");
const path = require("path");
const { projects, experiences, achievements, technologies, services } = require("../lib/portfolio-data");

const { embedText } = require("../lib/gemini");

function buildChunks() {
  const chunks = [];

  // Personal
  chunks.push({
    id: "personal-1", type: "personal", title: "About Noman Shakir",
    content: "Noman Shakir (CodeWithZavi) is a Full-Stack Developer and AI/ML Engineer with expertise in modern web applications, AI-powered solutions, and machine learning systems. Based in Islamabad, Pakistan. Email: nomanshaker2@gmail.com. GitHub: @CodeWithZavi. LinkedIn: codewithzavii.",
  });
  chunks.push({
    id: "personal-2", type: "personal", title: "Roles",
    content: "Current roles: Full-Stack Developer, AI/ML Engineer, Backend Specialist, AI Application Developer, Machine Learning Practitioner, Intelligent Systems Builder. Also a Freelancer and Problem Solver.",
  });

  // Services
  chunks.push({
    id: "services-1", type: "services", title: "Services",
    content: `Services: ${services.map((s) => s.title).join(", ")}.`,
  });

  // Skills — auto-generated from technologies object
  for (const [category, items] of Object.entries(technologies)) {
    chunks.push({
      id: `skills-${category}`, type: "skills", title: category.charAt(0).toUpperCase() + category.slice(1),
      content: `${category}: ${items.map((i) => i.name).join(", ")}.`,
    });
  }

  // Experience
  for (const exp of experiences) {
    chunks.push({
      id: `exp-${exp.company_name.toLowerCase().replace(/[^a-z]+/g, "-")}`, type: "experience",
      title: `${exp.title} at ${exp.company_name}`,
      content: `${exp.title} at ${exp.company_name} (${exp.date}). ${exp.points.join(" ")}`,
    });
  }

  // Projects — each gets an id based on project index
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    const techNames = p.tags.map((t) => t.name).join(", ");
    chunks.push({
      id: `proj-${i + 1}-${p.name.replace(/[^a-z0-9]+/gi, "-").slice(0, 30).toLowerCase()}`,
      type: "project", title: p.name,
      content: `${p.name}: ${p.description} Category: ${p.category}. Technologies: ${techNames}.`,
      link: p.source_code_link || p.deployed_link,
    });
  }

  // Achievements
  for (const ach of achievements) {
    const slug = ach.title.replace(/[^a-z0-9]+/gi, "-").slice(0, 40).toLowerCase();
    chunks.push({
      id: `ach-${slug}`, type: "achievement", title: ach.title,
      content: `${ach.title}: ${ach.description} Date: ${ach.date}. Tags: ${ach.tags.join(", ")}.${ach.certificateUrl ? " Certificate: " + ach.certificateUrl : ""}${ach.pdfUrl ? " PDF: " + ach.pdfUrl : ""}`,
    });
  }

  // Education / Contact
  chunks.push({ id: "edu-1", type: "education", title: "Education", content: "Noman Shakir studies Computer Science at COMSATS University Islamabad, Abbottabad Campus. Campus Honor Roll recognition for perfect SGPA." });
  chunks.push({ id: "site-1", type: "site", title: "About This Portfolio", content: "Noman's 3D interactive portfolio built with Next.js, React Three Fiber, Framer Motion, Three.js, TailwindCSS. Features 3D models (computer, Earth, animated character), dark/light mode. Deployed on Vercel." });
  chunks.push({ id: "contact-1", type: "contact", title: "Contact", content: "Email: nomanshaker2@gmail.com. GitHub: github.com/CodeWithZavi. LinkedIn: linkedin.com/in/codewithzavii. LeetCode: leetcode.com/u/Noman_Shakir." });

  return chunks;
}

async function main() {
  const chunks = buildChunks();
  console.log(`Built ${chunks.length} chunks from portfolio-data.js`);

  const embeddings = [];
  for (let i = 0; i < chunks.length; i++) {
    process.stdout.write(`\rEmbedding ${i + 1}/${chunks.length}...`);
    const emb = await embedText(chunks[i].content);
    embeddings.push(emb);
  }
  console.log("");

  const output = chunks.map((chunk, i) => ({ ...chunk, embedding: embeddings[i] }));
  const outPath = path.join(__dirname, "..", "lib", "embeddings.json");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
  console.log(`Saved ${output.length} embeddings to lib/embeddings.json`);
}

main().catch((err) => { console.error("ERROR:", err.message); process.exit(1); });
