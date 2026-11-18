import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const NAV = [
  { to: "/", label: "درس‌ها", exact: true },
  { to: "/formulas", label: "فرمول‌ها", exact: false },
  { to: "/math", label: "ریاضی", exact: false },
  { to: "/solve", label: "حل", exact: false },
  { to: "/labs", label: "آزمایش", exact: false },
  { to: "/exams", label: "آزمون", exact: false },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-line bg-parchment/95 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="flex min-h-11 items-center gap-3">
            <img src="/favicon.svg" alt="" width={36} height={36} className="size-9" />
            <span>
              <span className="block text-xs text-muted">کورس تعاملی</span>
              <span className="block font-semibold">فیزیک سنجش از دور</span>
            </span>
          </Link>
          <nav className="flex gap-1 overflow-x-auto pb-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.exact }}
                className="inline-flex min-h-11 shrink-0 items-center rounded-full px-3 text-sm text-ink-soft hover:bg-paper data-[status=active]:bg-ink data-[status=active]:text-parchment"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl px-4 py-8">{children}</main>
      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-1 px-4 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>پیشرفت فقط روی همین دستگاه ذخیره می‌شود.</p>
          <Link to="/guide" className="inline-flex min-h-11 items-center text-cane">
            افزودن درس و فرمول
          </Link>
        </div>
      </footer>
    </div>
  );
}
