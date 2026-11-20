/**
 * Lightweight Node HTTP server for serving the static build in
 * `course/.output/public` on `HOST:PORT` (default `0.0.0.0:3000`).
 */
import { createReadStream, existsSync, statSync } from "node:fs";
import http from "node:http";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../.output/public");
const port = Number.parseInt(process.env.PORT ?? "3000", 10);
const host = process.env.HOST ?? "0.0.0.0";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
};

function resolveFile(rawPathname) {
  let pathname;
  try {
    pathname = decodeURIComponent(rawPathname);
  } catch {
    return null;
  }
  const rel = pathname.replace(/^\/+/, "");
  const candidate = resolve(root, rel);
  if (candidate !== root && !candidate.startsWith(`${root}/`)) {
    return null;
  }
  if (existsSync(candidate) && statSync(candidate).isFile()) {
    return { path: candidate, status: 200 };
  }
  const indexCandidate = join(candidate, "index.html");
  if (existsSync(indexCandidate) && statSync(indexCandidate).isFile()) {
    return { path: indexCandidate, status: 200 };
  }
  const htmlCandidate = `${candidate}.html`;
  if (existsSync(htmlCandidate) && statSync(htmlCandidate).isFile()) {
    return { path: htmlCandidate, status: 200 };
  }
  // Client-side SPA fallback for unknown routes (non-asset paths).
  if (!extname(rel)) {
    const fallback404 = join(root, "404.html");
    if (existsSync(fallback404)) return { path: fallback404, status: 200 };
    const fallbackIndex = join(root, "index.html");
    if (existsSync(fallbackIndex)) return { path: fallbackIndex, status: 200 };
  }
  return null;
}

if (!existsSync(join(root, "index.html"))) {
  console.error(`[serve-static] missing static output in ${root}. Run \`npm run build\` first.`);
  process.exit(1);
}

const server = http.createServer((req, res) => {
  const method = (req.method ?? "GET").toUpperCase();
  if (method !== "GET" && method !== "HEAD") {
    res.writeHead(405, { "content-type": "text/plain; charset=utf-8" });
    res.end("Method Not Allowed");
    return;
  }
  const url = new URL(req.url ?? "/", "http://localhost");
  const resolved = resolveFile(url.pathname);
  if (!resolved) {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Not Found");
    return;
  }
  const mime = MIME[extname(resolved.path).toLowerCase()] ?? "application/octet-stream";
  const cacheControl = url.pathname.startsWith("/assets/")
    ? "public, max-age=31536000, immutable"
    : "no-cache";
  res.writeHead(resolved.status, {
    "content-type": mime,
    "cache-control": cacheControl,
  });
  if (method === "HEAD") {
    res.end();
    return;
  }
  createReadStream(resolved.path).pipe(res);
});

server.listen(port, host, () => {
  console.log(`[serve-static] listening on http://${host}:${port}`);
});
