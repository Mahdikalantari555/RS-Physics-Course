import { lazy, Suspense, useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { resolveAssetUrl } from "@/lib/base-path";

const OrbitalGame = lazy(() => import("@/components/game/orbital-game"));

export const Route = createFileRoute("/play")({
  component: PlayPage,
  head: () => ({
    meta: [{ title: "بازی سه‌بعدی مداری · فیزیک سنجش از دور" }],
  }),
});

const PLAY_NAV = [
  { to: "/", label: "درس‌ها", exact: true },
  { to: "/formulas", label: "فرمول‌ها", exact: false },
  { to: "/math", label: "ریاضی", exact: false },
  { to: "/solve", label: "حل", exact: false },
  { to: "/labs", label: "آزمایش", exact: false },
  { to: "/exams", label: "آزمون", exact: false },
  { to: "/play", label: "بازی سه‌بعدی", exact: false },
] as const;

function PlayPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#0b1018]">
      <header className="sticky top-0 z-20 border-b border-line bg-parchment">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="flex min-h-11 items-center gap-3">
            <img
              src={resolveAssetUrl("/favicon.svg")}
              alt=""
              width={36}
              height={36}
              className="size-9"
            />
            <span>
              <span className="block text-xs text-muted">کورس تعاملی</span>
              <span className="block font-semibold text-ink">فیزیک سنجش از دور</span>
            </span>
          </Link>
          <nav className="flex gap-1 overflow-x-auto pb-1">
            {PLAY_NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.exact }}
                className="inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-full px-3 text-sm text-ink-soft hover:bg-paper data-[status=active]:bg-ink data-[status=active]:text-parchment"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {mounted ? (
          <Suspense
            fallback={
              <div className="flex h-[calc(100dvh-73px)] min-h-[540px] items-center justify-center bg-[#0b1018] text-sm text-[#c6ceda]">
                در حال آماده‌سازی صحنه‌ی سه‌بعدی مدار و جو...
              </div>
            }
          >
            <OrbitalGame />
          </Suspense>
        ) : (
          <div className="flex h-[calc(100dvh-73px)] min-h-[540px] flex-col items-center justify-center gap-2 bg-[#0b1018] px-6 text-center text-[#e6dfd4]">
            <h1 className="text-xl font-semibold">بازی سه‌بعدی مأموریت مداری سنجش از دور</h1>
            <p className="max-w-lg text-sm text-[#9fa8b8]">
              شبیه‌ساز تعاملی مدار ماهواره، پنجره‌ی جوی بیر–لامبرت، تفکیک‌پذیری GSD و دید حرارتی وین.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
