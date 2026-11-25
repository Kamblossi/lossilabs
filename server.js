import cors from "cors";
import express from "express";
import nodemailer from "nodemailer";
import { appendFileSync, createReadStream, existsSync, readFileSync, statSync } from "node:fs";
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

function loadHostEnv() {
  const envFile = path.join(root, "..", ".env");
  if (!existsSync(envFile)) return;
  for (const line of readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (!(key in process.env)) process.env[key] = val;
  }
}
loadHostEnv();

app.post("/api/contact", async (request, response) => {
  const { firstName, lastName, name, email, phone, focusArea, message } = request.body ?? {};
  const fullName = (typeof name === "string" && name.trim())
    ? name.trim()
    : [firstName, lastName].filter((v) => typeof v === "string" && v.trim()).map((v) => v.trim()).join(" ");

  if (![fullName, email, message].every((v) => typeof v === "string" && v.trim())) {
    return response.status(400).json({ success: false, message: "Name, work email, and project brief are required." });
  }

  const entry = {
    received_at: new Date().toISOString(),
    name: fullName,
    email: email.trim(),
    phone: typeof phone === "string" ? phone.trim() : "",
    focusArea: typeof focusArea === "string" ? focusArea.trim() : "General Inquiry",
    message: message.trim()
  };

  console.log("Lossi Labs message received:", entry);
  try {
    appendFileSync(path.join(root, "..", "inquiries.jsonl"), `${JSON.stringify(entry)}\n`, "utf8");
  } catch (err) {
    console.error("Failed to write inquiry log:", err);
  }

  const smtpUser = process.env.TITAN_SMTP_USER || "newton@lossilabs.tech";
  const smtpPass = process.env.TITAN_SMTP_PASS;

  if (!smtpPass) {
    console.warn("TITAN_SMTP_PASS not set in /srv/websites/lossilabs.tech/.env — saved to inquiries.jsonl only.");
    return response.json({ success: true, message: "Message logged." });
  }

  try {
    const sendWithPort = async (port, secure) => {
      const transporter = nodemailer.createTransport({
        host: "smtp.titan.email",
        port,
        secure,
        connectionTimeout: 8000,
        greetingTimeout: 8000,
        socketTimeout: 10000,
        auth: { user: smtpUser, pass: smtpPass }
      });

      return transporter.sendMail({
        from: `"Lossi Labs Intake" <${smtpUser}>`,
        to: "newton@lossilabs.tech",
        replyTo: entry.email,
        subject: `[Lossi Labs] ${entry.focusArea} — ${entry.name}`,
        text: [
          `New inquiry from lossilabs.tech/work-with-us/`,
          ``,
          `Name:       ${entry.name}`,
          `Email:      ${entry.email}`,
          `Phone:      ${entry.phone || "Not provided"}`,
          `Focus Area: ${entry.focusArea}`,
          `Submitted:  ${entry.received_at}`,
          ``,
          `Project Brief:`,
          entry.message
        ].join("\n")
      });
    };

    try {
      await sendWithPort(465, true);
    } catch (firstErr) {
      console.warn("Titan port 465 failed, retrying 587 STARTTLS:", firstErr.code || firstErr.message);
      await sendWithPort(587, false);
    }

    return response.json({ success: true, message: "Message sent to newton@lossilabs.tech" });
  } catch (err) {
    console.error("Titan SMTP send error:", err);
    return response.status(502).json({
      success: false,
      message: `Mail relay error (${err.code || "SMTP_TIMEOUT"}), though your brief was saved on the server.`
    });
  }
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