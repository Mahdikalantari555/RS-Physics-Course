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
 * 3. `vite.config.ts` supplies an empty static entry for Nitro's unused server
 *    build stage so `vite build` exits 0 cleanly and non-zero exits fail fast.
 */
import { existsSync } from "node:fs";
import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, ".output/public");

// Remove stale root HTML artifacts so a failed build cannot look successful
// by leaving an older index.html behind.
await rm(join(publicDir, "index.html"), { force: true });
await rm(join(publicDir, "404.html"), { force: true });

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
      // Disable the Grok external PWA extension during static builds.
      DISABLE_GROK_PWA: "1",
      // No accounts / no server on a static host.
      VITE_AUTH_ENABLED: "false",
      // GitHub Pages serves this repo as a project page under `/RS-Physics-Course/`.
      // VITE_BASE feeds TanStack Router's rewrite base (no trailing slash).
      // HTML/CSS/JS asset URLs get `/RS-Physics-Course/` from the post-processing below.
      VITE_BASE: "/RS-Physics-Course",
    },
  },
);

if (result.status !== 0) {
  console.error(`[build-pages] vite build failed (exit ${result.status ?? "unknown"})`);
  process.exit(result.status ?? 1);
}

if (!existsSync(join(publicDir, "index.html"))) {
  console.error(`[build-pages] vite did not produce static output (missing .output/public/index.html)`);
  process.exit(1);
}

// GitHub Pages serves this repo as a project page under `/RS-Physics-Course/`.
// Vite builds with base="/" so the prerender crawler works, so we post-process:
// 1. HTML root-relative `href="/..."`, `src="/..."`, and serialized TanStack
//    Start manifest `/assets/...` strings -> prefixed with `/RS-Physics-Course/`.
// 2. CSS `url(/assets/...)` inside `assets/*.css` -> relative `url(./...)` so
//    KaTeX & Vazirmatn fonts resolve cleanly under any base path.
// 3. JS bundles inside `assets/*.js`: Vite's `__vite__mapDeps` preload list
//    (`"assets/<chunk>.js"`) and static asset URLs (`"/assets/..."`, `` `/assets/...` ``)
//    -> prefixed with `RS-Physics-Course/` so lazy chunk preloads and imported
//    images never 404 at the root domain.
const BASE_SEGMENT = "RS-Physics-Course";
const BASE = `/${BASE_SEGMENT}/`;
const escapedBase = BASE.replace(/\//g, "\\/");
const rootAttrRe = new RegExp(`(href|src)="\\/(?!\\/|${escapedBase})`, "g");
const htmlAssetsRe = new RegExp(`(["'\`])\\/assets\\/`, "g");
const cssAssetsUrlRe = /url\((['"]?)\/assets\//g;
const jsRootAssetsRe = /(["'`])\/assets\//g;
const jsViteMapDepsRe = /(m\.f=\[)([^\]]+)(\])/g;

async function rewriteStaticFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      await rewriteStaticFiles(full);
    } else if (entry.name.endsWith(".html")) {
      const html = await readFile(full, "utf8");
      const next = html
        .replace(rootAttrRe, `$1="${BASE}`)
        .replace(htmlAssetsRe, `$1${BASE}assets/`);
      if (next !== html) await writeFile(full, next);
    } else if (entry.name.endsWith(".css")) {
      const css = await readFile(full, "utf8");
      const next = css.replace(cssAssetsUrlRe, "url($1./");
      if (next !== css) await writeFile(full, next);
    } else if (entry.name.endsWith(".js")) {
      const js = await readFile(full, "utf8");
      const next = js
        .replace(jsRootAssetsRe, `$1${BASE}assets/`)
        .replace(jsViteMapDepsRe, (_, open, list, close) => {
          const prefixed = list.replace(/(["'])assets\//g, `$1${BASE_SEGMENT}/assets/`);
          return `${open}${prefixed}${close}`;
        });
      if (next !== js) await writeFile(full, next);
    }
  }
}

await mkdir(publicDir, { recursive: true });
await cp(join(publicDir, "index.html"), join(publicDir, "404.html"));
await rewriteStaticFiles(publicDir);
// GitHub Pages ignores Jekyll; this keeps asset directories (e.g. `assets/`)
// that start with `_` servable. Harmless if already written by a preset hook.
await writeFile(join(publicDir, ".nojekyll"), "");

console.log("[build-pages] static output ready in .output/public (with 404.html fallback)");