import { createRouter } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { previewPathRewrite } from "@/lib/preview-path-prefix";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  return createRouter({
    routeTree,
    // Prerender/SSR runs in Node (no `window`) and is crawled at the natural
    // path `/`, so the router base is `/` there. In the browser the app is
    // served as a GitHub Pages project page under `/RS-Physics-Course/`
    // (VITE_BASE), so client routing needs that base.
    basePathname: typeof window === "undefined" ? "/" : (import.meta.env.VITE_BASE || "/"),
    rewrite: previewPathRewrite(),
    defaultErrorComponent: AppErrorComponent,
  });
}
