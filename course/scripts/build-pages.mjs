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
import { cp, mkdir, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const result = spawnSync(
  process.execPath,
  [join(root, "node_modules/vite/bin/vite.js"), "build"],
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
    },
  },
);

const publicDir = join(root, ".output/public");
if (!existsSync(join(publicDir, "index.html"))) {
  console.error(`[build-pages] vite did not produce static output (exit ${result.status})`);
  process.exit(result.status ?? 1);
}

await mkdir(publicDir, { recursive: true });
await cp(join(publicDir, "index.html"), join(publicDir, "404.html"));
// GitHub Pages ignores Jekyll; this keeps asset directories (e.g. `assets/`)
// that start with `_` servable. Harmless if already written by a preset hook.
await writeFile(join(publicDir, ".nojekyll"), "");

console.log("[build-pages] static output ready in .output/public (with 404.html fallback)");