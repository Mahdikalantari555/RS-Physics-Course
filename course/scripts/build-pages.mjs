/**
 * Build the course for static hosting (GitHub Pages).
 *
 * 1. `nitro build --preset static` prerenders every route (lessons, labs,
 *    solve, math, exams, guide) into `.output/public`.
 * 2. GitHub Pages serves `404.html` for any path it does not find; making it
 *    a copy of `index.html` lets the client router handle unknown deep links.
 *
 * Nitro v3 emits a non-zero exit from a secondary SSR-environment build even
 * though the static prerender succeeded, so we verify the artifact instead of
 * trusting the exit code.
 */
import { existsSync } from "node:fs";
import { cp, mkdir } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const result = spawnSync(
  process.execPath,
  [join(root, "node_modules/nitro/dist/cli/index.mjs"), "build", "--preset", "static"],
  { cwd: root, stdio: "inherit" },
);

const publicDir = join(root, ".output/public");
if (!existsSync(join(publicDir, "index.html"))) {
  console.error(`[build-pages] nitro did not produce static output (exit ${result.status})`);
  process.exit(result.status ?? 1);
}

await mkdir(publicDir, { recursive: true });
await cp(join(publicDir, "index.html"), join(publicDir, "404.html"));

console.log("[build-pages] static output ready in .output/public (with 404.html fallback)");
