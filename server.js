import cors from "cors";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const pages = {
  "/": "index.html",
  "/company": "company/index.html",
  "/newsroom": "newsroom/index.html",
  "/work-with-us": "work-with-us/index.html"
};
const newsroomPosts = [
  { id: 1, title: "Integrated Biosciences announces new research initiatives", date: "October 5, 2026", permalink: "https://integratedbio.com/newsroom/", categories: [{ id: 1, name: "News" }], classes: "" },
  { id: 2, title: "New approaches to understanding cellular aging", date: "September 18, 2026", permalink: "https://integratedbio.com/newsroom/", categories: [{ id: 21, name: "Press" }], classes: "" },
  { id: 3, title: "Integrated Biosciences expands its scientific team", date: "August 29, 2026", permalink: "https://integratedbio.com/newsroom/", categories: [{ id: 1, name: "News" }], classes: "" },
  { id: 4, title: "Engineering the future of aging medicine", date: "July 12, 2026", permalink: "https://integratedbio.com/newsroom/", categories: [{ id: 21, name: "Press" }], classes: "" },
  { id: 5, title: "Research update: small molecule therapeutics", date: "June 4, 2026", permalink: "https://integratedbio.com/newsroom/", categories: [{ id: 1, name: "News" }], classes: "" },
  { id: 6, title: "Building a multidisciplinary biology platform", date: "May 16, 2026", permalink: "https://integratedbio.com/newsroom/", categories: [{ id: 21, name: "Press" }], classes: "" }
];

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/wp-json/post-archive/v1/posts", (request, response) => {
  const page = Math.max(Number(request.query.page) || 1, 1);
  const perPage = Math.max(Number(request.query.posts_per_page) || 6, 1);
  const selectedCategory = String(request.query.tax_query ?? "");
  const query = String(request.query.query ?? "").toLowerCase();
  const categoryMatch = selectedCategory.match(/(?:category|categories)[^0-9]*(\d+)/);
  const filtered = newsroomPosts.filter((post) => {
    const categoryOk = !categoryMatch || post.categories.some((category) => String(category.id) === categoryMatch[1]);
    const queryOk = !query || post.title.toLowerCase().includes(query);
    return categoryOk && queryOk;
  });
  const start = (page - 1) * perPage;
  return response.json({
    posts: filtered.slice(start, start + perPage),
    total: filtered.length,
    pages: Math.max(Math.ceil(filtered.length / perPage), 1),
    categoryTotals: { "1": 3, "21": 3 }
  });
});

app.post("/api/contact", (request, response) => {
  const { name, email, organization, message } = request.body ?? {};
  if (![name, email, organization, message].every((value) => typeof value === "string" && value.trim())) {
    return response.status(400).json({ success: false, message: "Name, email, organization, and message are required" });
  }

  console.log("Contact inquiry received", {
    name: name.trim(),
    email: email.trim(),
    organization: organization.trim(),
    message: message.trim()
  });
  return response.json({ success: true, message: "Inquiry received" });
});

for (const [route, file] of Object.entries(pages)) {
  app.get(`${route}/`, (_request, response) => response.sendFile(path.join(root, file)));
  app.get(route, (_request, response) => response.sendFile(path.join(root, file)));
}

app.use(express.static(root, {
  extensions: ["html"],
  setHeaders(response, filePath) {
    if (filePath.endsWith(".mjs")) response.type("application/javascript");
    if (filePath.endsWith(".woff2")) response.type("font/woff2");
    if (filePath.endsWith(".mp4")) response.type("video/mp4");
  }
}));

const preferredPort = Number(process.env.PORT) || 3000;

const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`Integrated Biosciences local server: http://localhost:${port}`);
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE" && port === 3000) {
      startServer(3001);
      return;
    }
    throw error;
  });
};

startServer(preferredPort);