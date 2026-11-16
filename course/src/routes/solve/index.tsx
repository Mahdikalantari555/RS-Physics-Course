import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/course/shell";
import { problems } from "@/content/load";
import { faInt } from "@/lib/format";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/solve/")({
  component: SolveIndex,
  head: () => ({ meta: [{ title: "حل مسئله · فیزیک سنجش از دور" }] }),
});

const topics = ["موج", "تابش", "سطح", "جو", "مدار"];

function SolveIndex() {
  const { data, ready } = useProgress();
  const done = problems.filter((item) => data.problems[item.slug]).length;

  return (
    <Shell>
      <p className="text-sm font-medium text-cane">از داده تا عدد، با واحد</p>
      <h1 className="mt-2 text-3xl font-semibold">حل مسئله</h1>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-soft">
        ده صحنه‌ی واقعی. هر کدام فرمول اساسی را جزءبه‌جزء باز می‌کند، حساب را نشان می‌دهد، و می‌گوید جواب در تصویر ماهواره‌ای چه معنایی دارد. ثابت‌ها همان‌هایی است که در آزمایش‌ها استفاده شده.
      </p>
      <p className="mt-3 text-sm text-muted">
        {ready ? `${faInt(done)} از ${faInt(problems.length)} خوانده شده` : "پیشرفت بعد از بار شدن صفحه می‌آید"}
      </p>

      <div className="mt-8 flex flex-col gap-8">
        {topics.map((topic) => {
          const items = problems.filter((item) => item.topic === topic);
          if (items.length === 0) return null;
          return (
            <section key={topic}>
              <h2 className="text-sm font-medium text-muted">{topic}</h2>
              <ul className="mt-3 flex flex-col gap-3">
                {items.map((item) => {
                  const read = ready && data.problems[item.slug];
                  return (
                    <li key={item.slug}>
                      <Link
                        to="/solve/$slug"
                        params={{ slug: item.slug }}
                        className="flex items-start gap-4 rounded-2xl border border-line bg-card p-4 hover:border-cane"
                      >
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-copper-soft text-sm text-copper tabular-nums">
                          {faInt(item.order)}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-semibold">{item.title}</span>
                          <span className="mt-1 block text-sm leading-relaxed text-muted">{item.summary}</span>
                        </span>
                        {read ? <span className="shrink-0 text-sm text-cane">خوانده شده</span> : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </Shell>
  );
}
