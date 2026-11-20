import { createRootRoute, HeadContent, Link, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { Shell } from "@/components/course/shell";
import { ProgressProvider } from "@/lib/progress";
import { resolveAssetUrl } from "@/lib/base-path";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "فیزیک سنجش از دور" },
      {
        name: "description",
        content: "کورس تعاملی فیزیک سنجش از دور: فرمول کلیک‌پذیر، ریاضی درجا، آزمایشگاه و آزمون. پیشرفت فقط روی همین دستگاه.",
      },
      { name: "theme-color", content: "#f3eee6" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: resolveAssetUrl("/favicon.svg") },
      { rel: "stylesheet", href: resolveAssetUrl(appCss) },
      { rel: "manifest", href: resolveAssetUrl("/manifest.webmanifest") },
      { rel: "apple-touch-icon", href: resolveAssetUrl("/__grok/icon-180.png") },
    ],
  }),
  component: Root,
  notFoundComponent: NotFound,
});

function Root() {
  return (
    <html lang="fa" dir="rtl" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <ProgressProvider>
            <Outlet />
          </ProgressProvider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <Shell>
      <h1 className="text-3xl font-semibold">این صفحه نیست</h1>
      <p className="mt-3 text-muted">درس یا آزمایشی با این نام در کورس نیست.</p>
      <Link to="/" className="mt-4 inline-flex min-h-11 items-center text-cane">
        برگشت به درس‌ها
      </Link>
    </Shell>
  );
}
