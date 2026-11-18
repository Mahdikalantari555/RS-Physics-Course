/**
 * Build the course for static hosting (GitHub Pages).
 *
 * 1. `vite build` with `NITRO_PRESET=github-pages` runs the full Vite pipeline
 *    (including the TanStack Start plugin, which generates the route tree) and
 *    prerenders every route (lessons, labs, solve, math, exams, formulas,
 *    guide) into `.output/public`. Running the nitro CLI directly (the old
 *    approach) bypasses Vite, so the route tree was never generated and `/`
 *    prerendered as 404 — producing no `index.html` at all.
 * 2. GitHub Pages serves `404.html` for any path it does not find; making it a
 *    copy of `index.html` lets the client router handle unknown deep links.
 *
 * Nitro v3 emits a non-zero exit from a secondary SSR-environment build even
 * though the static prerender succeeded, so we verify the artifact instead of
 * trusting the exit code.
 */
import { existsSync } from "node:fs";
import { cp, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// Vite may be hoisted to the repo root by npm workspaces or installed locally
// under `course/node_modules`; resolve whichever exists.
const viteBin =
  existsSync(join(root, "node_modules/vite/bin/vite.js"))
    ? join(root, "node_modules/vite/bin/vite.js")
    : join(root, "..", "node_modules/vite/bin/vite.js");

const result = spawnSync(
  process.execPath,
  [viteBin, "build"],
  {
    cwd: root,
    stdio: "inherit",
    env: {
      ...process.env,
      // Select the static (GitHub Pages) nitro preset so the tanstack plugin
      // prerenders every route and the Grok server middleware is skipped.
      NITRO_PRESET: "github-pages",
      // No accounts / no server on a static host.
      VITE_AUTH_ENABLED: "false",
      // GitHub Pages serves this repo as a project page under `/RS-Physics-Course/`,
      // so Vite and the router prefix all assets/links with that base path.
      VITE_BASE: "/RS-Physics-Course/",
    },
  },
);

const publicDir = join(root, ".output/public");
if (!existsSync(join(publicDir, "index.html"))) {
  console.error(`[build-pages] vite did not produce static output (exit ${result.status})`);
  process.exit(result.status ?? 1);
}

// GitHub Pages serves this repo as a project page under `/RS-Physics-Course/`.
// Vite builds with base="/" so the prerender crawler works, but every
// root-relative URL (assets, icons, and navigation links) must be prefixed
// with the project base to resolve on the project page. JS chunks use relative
// imports (`import("./chunk.js")`) which self-resolve against the entry
// script's URL once it loads from the correct place, so only HTML needs this
// rewrite.
const BASE = "/RS-Physics-Course/";
const rootUrlRe = new RegExp(`(href|src)="\\/(?!${BASE.replace(/\//g, "\\/")})`, "g");

async function rewriteHtml(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      await rewriteHtml(full);
    } else if (entry.name.endsWith(".html")) {
      let html = await readFile(full, "utf8");
      const next = html.replace(rootUrlRe, `$1="${BASE}`);
      if (next !== html) await writeFile(full, next);
    }
  }
}

await mkdir(publicDir, { recursive: true });
await cp(join(publicDir, "index.html"), join(publicDir, "404.html"));
await rewriteHtml(publicDir);
// GitHub Pages ignores Jekyll; this keeps asset directories (e.g. `assets/`)
// that start with `_` servable. Harmless if already written by a preset hook.
await writeFile(join(publicDir, ".nojekyll"), "");

console.log("[build-pages] static output ready in .output/public (with 404.html fallback)");