import cors from "cors";
import express from "express";
import { appendFileSync, createReadStream, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const pages = {
  "/": "index.html",
  "/company": "company/index.html",
  "/the-lab": "the-lab/index.html",
  "/newsroom": "the-lab/index.html",
  "/work-with-us": "work-with-us/index.html"
};
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/contact", (request, response) => {
  const { name, email, organization, phone, role, tooling, message } = request.body ?? {};
  if (![name, email, message].every((value) => typeof value === "string" && value.trim())) {
    return response.status(400).json({ success: false, message: "Name, work email, and project brief are required." });
  }

  const entry = {
    received_at: new Date().toISOString(),
    name: name.trim(),
    email: email.trim(),
    organization: typeof organization === "string" ? organization.trim() : "",
    phone: typeof phone === "string" ? phone.trim() : "",
    role: typeof role === "string" ? role.trim() : "",
    tooling: typeof tooling === "string" ? tooling.trim() : "",
    message: message.trim()
  };

  console.log("Lossi Labs intake brief received:", entry);
  try {
    appendFileSync(path.join(root, "..", "inquiries.jsonl"), JSON.stringify(entry) + "
", "utf8");
  } catch (err) {
    console.error("Failed to write inquiry log:", err);
  }

  return response.json({ success: true, message: "Brief received" });
});

const heroVideoPath = path.join(root, "wp-content/uploads/2025/10/integrated-loop-optimized.mp4");

app.get("/wp-content/uploads/2025/10/integrated-loop-optimized.mp4", (request, response) => {
  const { size } = statSync(heroVideoPath);
  const range = request.headers.range;

  response.setHeader("Content-Type", "video/mp4");
  response.setHeader("Accept-Ranges", "bytes");

  if (!range) {
    response.setHeader("Content-Length", size);
    return createReadStream(heroVideoPath).pipe(response);
  }

  const match = range.match(/^bytes=(\d*)-(\d*)$/);
  if (!match || (!match[1] && !match[2])) {
    response.status(416).setHeader("Content-Range", `bytes */${size}`);
    return response.end();
  }

  let start = match[1] ? Number(match[1]) : Math.max(size - Number(match[2]), 0);
  let end = match[2] ? Number(match[2]) : size - 1;
  if (match[1] && !match[2]) end = size - 1;

  if (start >= size || start > end) {
    response.status(416).setHeader("Content-Range", `bytes */${size}`);
    return response.end();
  }

  end = Math.min(end, size - 1);
  response.status(206);
  response.setHeader("Content-Range", `bytes ${start}-${end}/${size}`);
  response.setHeader("Content-Length", end - start + 1);
  return createReadStream(heroVideoPath, { start, end }).pipe(response);
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
    if (filePath.endsWith(".json")) response.type("application/json");
    if (filePath.endsWith(".png")) response.type("image/png");
  }
}));

const preferredPort = Number(process.env.PORT) || 3000;

const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`Lossi Labs local server: http://localhost:${port}`);
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