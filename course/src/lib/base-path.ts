import type { LocationRewrite } from "@tanstack/react-router";
import { previewPathPrefix } from "./preview-path-prefix";

/**
 * Top-level route segments belonging to the course app itself.
 * Used to distinguish a GitHub Pages project subpath (e.g. `/RS-Physics-Course`)
 * from a root-hosted app route (e.g. `/lessons/...`).
 */
const APP_TOP_SEGMENTS = new Set([
  "lessons",
  "formulas",
  "math",
  "solve",
  "labs",
  "exams",
  "guide",
  "api",
  "auth",
]);

/**
 * Normalizes a base path to either `""` (root) or `"/segment"` (leading slash,
 * no trailing slash).
 */
export function normalizeBasePath(raw?: string | null): string {
  if (!raw) return "";
  const trimmed = raw.trim().replace(/\/+$/, "");
  if (!trimmed || trimmed === "/") return "";
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

/**
 * Detects the active URL prefix for routing and root-relative assets.
 *
 * Priority:
 * 1. Path-based preview proxies (`/{port_id}/...`)
 * 2. Build-time configured `VITE_BASE` (only when the current URL actually
 *    lives under that prefix — so the same build still works if served at `/`)
 * 3. GitHub Pages project sites (`*.github.io/<repo>/...`) when the first
 *    segment is not one of the app's own top-level routes
 */
export function detectBasePath(
  hostname: string,
  pathname: string,
  configuredBase?: string | null,
): string {
  const preview = previewPathPrefix(hostname, pathname);
  if (preview) return preview;

  const normalizedConfig = normalizeBasePath(configuredBase);
  if (
    normalizedConfig &&
    (pathname === normalizedConfig || pathname.startsWith(`${normalizedConfig}/`))
  ) {
    return normalizedConfig;
  }

  if (hostname.toLowerCase().endsWith(".github.io")) {
    const first = pathname.split("/").filter(Boolean)[0];
    if (first && !APP_TOP_SEGMENTS.has(first) && !first.includes(".")) {
      return `/${first}`;
    }
  }

  return "";
}

/**
 * Reads the active base path in the browser; returns `""` during Node SSR /
 * static prerendering (where Nitro crawls routes at `/`).
 */
export function getRuntimeBasePath(): string {
  if (typeof window === "undefined") return "";
  const envBase =
    typeof import.meta !== "undefined" && import.meta.env
      ? (import.meta.env.VITE_BASE as string | undefined)
      : undefined;
  return detectBasePath(window.location.hostname, window.location.pathname, envBase);
}

/**
 * Prefixes a root-relative asset URL (`/assets/...`, `/favicon.svg`) with the
 * active base path. External, data, relative, and already-prefixed URLs are
 * returned unchanged.
 */
export function resolveAssetUrl(url: string, basePath?: string): string {
  if (!url || !url.startsWith("/") || url.startsWith("//")) return url;
  const base = basePath !== undefined ? normalizeBasePath(basePath) : getRuntimeBasePath();
  if (!base) return url;
  if (url === base || url.startsWith(`${base}/`)) return url;
  return `${base}${url}`;
}

/**
 * TanStack Router `rewrite` rule that strips `prefix` on inbound navigation and
 * re-attaches it on outbound links/history updates. Unlike `basepath`, this is
 * preserved across TanStack Start hydration.
 */
export function createBaseRewrite(prefix: string): LocationRewrite {
  const base = normalizeBasePath(prefix);
  return {
    input: ({ url }) => {
      if (!base) return url;
      if (url.pathname === base) url.pathname = "/";
      else if (url.pathname.startsWith(`${base}/`)) {
        url.pathname = url.pathname.slice(base.length);
      }
      return url;
    },
    output: ({ url }) => {
      if (!base) return url;
      if (url.pathname === base || url.pathname.startsWith(`${base}/`)) return url;
      const path = url.pathname.startsWith("/") ? url.pathname : `/${url.pathname}`;
      url.pathname = `${base}${path}`;
      return url;
    },
  };
}
