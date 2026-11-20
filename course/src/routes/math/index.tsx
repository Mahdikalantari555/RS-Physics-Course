import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/course/shell";
import { primers, problems } from "@/content/load";
import { faInt } from "@/lib/format";
import {
  MATH_SYMBOL_CATEGORIES,
  MATHEMATICAL_SYMBOLS_TABLE,
  type MathSymbolCategory,
} from "@/content/math/symbols";

export const Route = createFileRoute("/math/")({
  component: MathIndex,
  head: () => ({ meta: [{ title: "ریاضیات پایه و نمادها · فیزیک سنجش از دور" }] }),
});

const order = new Intl.NumberFormat("fa-IR", { minimumIntegerDigits: 2 });

function MathIndex() {
  const [category, setCategory] = useState<"all" | MathSymbolCategory>("all");

  const filteredSymbols =
    category === "all"
      ? MATHEMATICAL_SYMBOLS_TABLE
      : MATHEMATICAL_SYMBOLS_TABLE.filter((entry) => entry.category === category);

  return (
    <Shell>
      <h1 className="text-3xl font-semibold">ریاضیات پایه و زبان نمادها</h1>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-soft">
        این‌ها کورس ریاضی نیستند. هر کدام فقط همان تکه‌ای است که یک فرمول فیزیک به آن تکیه می‌کند: از مشتق و نمایی تا توان‌های پایه ۱۰ و جبر شاخص‌ها.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          to="/formulas"
          className="inline-flex min-h-11 items-center rounded-full bg-ink px-4 text-sm text-parchment"
        >
          مرجع فرمول‌ها و مبدل سریع
        </Link>
        <Link
          to="/solve"
          className="inline-flex min-h-11 items-center rounded-full border border-line bg-card px-4 text-sm text-ink hover:border-cane"
        >
          {faInt(problems.length)} حل عددی کامل
        </Link>
      </div>

      <ul className="mt-8 flex flex-col gap-3">
        {primers.map((primer) => (
          <li key={primer.slug}>
            <Link
              to="/math/$slug"
              params={{ slug: primer.slug }}
              className="flex items-start gap-4 rounded-2xl border border-line bg-card p-4 hover:border-cane"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-copper-soft text-sm text-copper tabular-nums">
                {order.format(primer.order)}
              </span>
              <span>
                <span className="block font-semibold">{primer.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-muted">{primer.summary}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <section className="mt-12 rounded-2xl border border-line bg-card p-5 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-cane">فرهنگ نمادها و ثابت‌ها</p>
            <h2 className="mt-1 text-2xl font-semibold">جدول نمادهای ریاضی و ثابت‌های فیزیکی</h2>
            <p className="mt-1 text-sm text-muted">
              مرجع سریع برای حروف یونانی، عملگرهای نمایی و مثلثاتی و ثابت‌های پرکاربرد در فرمول‌های سنجش از دور.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {MATH_SYMBOL_CATEGORIES.map((item) => {
              const active = category === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCategory(item.id)}
                  className={
                    "min-h-10 rounded-full border px-3 text-xs font-medium transition-colors " +
                    (active ? "border-ink bg-ink text-parchment" : "border-line bg-paper text-ink-soft hover:border-copper")
                  }
                >
                  {item.labelFa}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5 overflow-x-auto rounded-xl border border-line">
          <table className="w-full border-collapse text-right text-sm">
            <thead>
              <tr className="border-b border-line bg-paper text-xs font-semibold text-ink-soft">
                <th className="px-4 py-3">نماد</th>
                <th className="px-4 py-3">نام و مقدار / تلفظ</th>
                <th className="px-4 py-3">دسته</th>
                <th className="px-4 py-3">نقش ریاضی</th>
                <th className="px-4 py-3">کاربرد در سنجش از دور</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line bg-card">
              {filteredSymbols.map((entry) => (
                <tr key={entry.id} className="hover:bg-paper/60">
                  <td className="whitespace-nowrap px-4 py-3 text-base font-semibold text-copper" dir="ltr">
                    {entry.symbol}
                  </td>
                  <td className="px-4 py-3">
                    <span className="block font-semibold text-ink">{entry.nameFa}</span>
                    <span className="block text-xs text-muted" dir="ltr">
                      {entry.pronunciation}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-cane">{entry.categoryLabelFa}</td>
                  <td className="px-4 py-3 leading-relaxed text-ink-soft">{entry.mathRoleFa}</td>
                  <td className="px-4 py-3 leading-relaxed text-muted">{entry.rsExampleFa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Shell>
  );
}
