import { createRouter } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { previewPathRewrite } from "@/lib/preview-path-prefix";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  return createRouter({
    routeTree,
    // Prerender/SSR runs in Node (no `window`) and is crawled at the natural
    // path `/`, so the router base is `/` there. In the browser the app is
    // served as a GitHub Pages project page under `/<repo>/`, so client routing
    // needs that base. We derive it from the current URL at runtime (more
    // reliable than import.meta.env.VITE_BASE replacement).
    basePathname: typeof window === "undefined"
      ? "/"
      : (() => {
          const segments = window.location.pathname.split("/").filter(Boolean);
          return segments.length > 0 ? `/${segments[0]}` : "/";
        })(),
    rewrite: previewPathRewrite(),
    defaultErrorComponent: AppErrorComponent,
  });
}
