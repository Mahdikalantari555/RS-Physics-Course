import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/course/shell";
import { primers } from "@/content/load";

export const Route = createFileRoute("/math/")({
  component: MathIndex,
  head: () => ({ meta: [{ title: "ریاضیات پایه · فیزیک سنجش از دور" }] }),
});

const order = new Intl.NumberFormat("fa-IR", { minimumIntegerDigits: 2 });

function MathIndex() {
  return (
    <Shell>
      <h1 className="text-3xl font-semibold">ریاضیات پایه</h1>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-soft">
        این‌ها کورس ریاضی نیستند. هر کدام فقط همان تکه‌ای است که یک فرمول فیزیک به آن تکیه می‌کند. آخرین یادداشت، خود فرمول را برای مجهول باز می‌کند؛ حساب کامل صحنه‌های واقعی در حل مسئله است.
      </p>
      <Link
        to="/solve"
        className="mt-4 inline-flex min-h-11 items-center rounded-full bg-ink px-4 text-sm text-parchment"
      >
        ده حل عددی کامل
      </Link>
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
    </Shell>
  );
}
