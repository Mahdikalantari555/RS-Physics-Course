import { Link } from "@tanstack/react-router";
import { Formula } from "@/components/course/formula";
import { DisplayMath, InlineMath } from "@/components/course/display-math";
import { Rich } from "@/components/course/rich-text";
import { getLab } from "@/components/labs/load-labs";
import { getPrimer, problemNeighbors } from "@/content/load";
import type { Problem } from "@/content/types";
import { faInt } from "@/lib/format";
import { useProgress } from "@/lib/progress";

export function ProblemView({ problem }: { problem: Problem }) {
  const progress = useProgress();
  const read = progress.ready && Boolean(progress.data.problems[problem.slug]);
  const { prev, next } = problemNeighbors(problem.slug);

  return (
    <article className="min-w-0">
      <p className="text-sm font-medium text-copper">
        {problem.topic} · حل {faInt(problem.order)}
      </p>
      <h1 className="mt-2 text-3xl font-semibold">{problem.title}</h1>
      <p className="mt-3 text-lg leading-relaxed text-ink-soft">{problem.summary}</p>
      <button
        type="button"
        aria-pressed={read}
        onClick={() => progress.toggleProblem(problem.slug)}
        className={
          "mt-5 inline-flex min-h-11 items-center rounded-full px-4 text-sm " +
          (read ? "bg-cane text-parchment" : "border border-line bg-card")
        }
      >
        {read ? "خوانده شده" : "این حل را خواندم"}
      </button>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">صحنه</h2>
        <p className="mt-3 text-lg leading-relaxed">
          <Rich text={problem.scene} />
        </p>
      </section>

      <section className="mt-8 grid gap-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="rounded-2xl border border-line bg-card p-4">
          <h2 className="text-lg font-semibold">داده‌ها</h2>
          <ul className="mt-3 flex flex-col gap-3">
            {problem.givens.map((item) => (
              <li key={`${item.symbol}-${item.meaning}`} className="border-b border-line pb-3 last:border-b-0 last:pb-0">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <InlineMath latex={item.symbol} />
                  <span className="text-sm leading-relaxed text-ink">{item.value}</span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted">{item.meaning}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line bg-paper p-4">
          <h2 className="text-lg font-semibold">مجهول</h2>
          <p className="mt-3 leading-relaxed">
            <Rich text={problem.ask} />
          </p>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">فرمول اساسی</h2>
        <div className="mt-4 flex flex-col gap-4">
          {problem.formulas.map((item) => (
            <div key={item.name} className="flex flex-col gap-3">
              <p className="leading-relaxed">
                <Rich text={item.why} />
              </p>
              {item.id ? <Formula id={item.id} /> : <DisplayMath latex={item.latex} />}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">حل، جزءبه‌جزء</h2>
        <ol className="mt-4 flex flex-col gap-4">
          {problem.steps.map((step, index) => (
            <li key={step.title} className="rounded-2xl border border-line bg-card p-4">
              <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-copper-soft text-sm font-semibold text-copper tabular-nums">
                  {faInt(index + 1)}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 leading-relaxed">
                    <Rich text={step.text} />
                  </p>
                  {step.latex ? (
                    <div className="mt-3">
                      <DisplayMath latex={step.latex} />
                    </div>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-8 rounded-2xl bg-cane-soft px-4 py-4">
        <h2 className="text-lg font-semibold text-cane">جواب</h2>
        <div className="mt-3">
          <DisplayMath latex={problem.answerLatex} />
        </div>
        <p className="mt-3 leading-relaxed">
          <Rich text={problem.answerText} />
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">این عدد یعنی چه</h2>
        <p className="mt-3 text-lg leading-relaxed">
          <Rich text={problem.meaning} />
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">جایی که حل معمولاً می‌شکند</h2>
        <ul className="mt-3 flex flex-col gap-2">
          {problem.traps.map((trap) => (
            <li key={trap} className="border-s-4 border-copper bg-copper-soft px-4 py-3 leading-relaxed">
              <Rich text={trap} />
            </li>
          ))}
        </ul>
      </section>

      {problem.relatedMath.length > 0 || problem.relatedLabs.length > 0 ? (
        <div className="mt-8 flex flex-col gap-1 text-sm">
          {problem.relatedMath.map((slug) => {
            const primer = getPrimer(slug);
            if (!primer) return null;
            return (
              <Link key={slug} to="/math/$slug" params={{ slug }} className="inline-flex min-h-11 items-center text-cane">
                ریاضی: {primer.title}
              </Link>
            );
          })}
          {problem.relatedLabs.map((id) => {
            const lab = getLab(id);
            if (!lab) return null;
            return (
              <Link key={id} to="/labs/$id" params={{ id }} className="inline-flex min-h-11 items-center text-cane">
                آزمایش: {lab.title}
              </Link>
            );
          })}
        </div>
      ) : null}

      <div className="mt-10 flex flex-wrap justify-between gap-3 border-t border-line pt-4">
        {prev ? (
          <Link to="/solve/$slug" params={{ slug: prev.slug }} className="inline-flex min-h-11 items-center text-cane">
            حل قبل: {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to="/solve/$slug" params={{ slug: next.slug }} className="inline-flex min-h-11 items-center text-cane">
            حل بعد: {next.title}
          </Link>
        ) : null}
      </div>
    </article>
  );
}
