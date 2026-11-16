import { Link } from "@tanstack/react-router";
import katex from "katex";
import { useMemo, useState } from "react";
import { getFormula, getPrimer } from "@/content/load";
import { getLab } from "@/components/labs/load-labs";
import type { Formula } from "@/content/types";

function buildLatex(formula: Formula, activeId: string | null): string {
  return formula.tokens
    .map((token) => {
      if (token.t === "tex") return token.latex;
      const part = formula.parts.find((item) => item.id === token.id);
      const body = token.latex ?? part?.latex ?? token.id;
      const on = activeId === token.id ? " is-on" : "";
      return `\\htmlClass{fp part-${token.id}${on}}{${body}}`;
    })
    .join("");
}

function InlineTex({ latex }: { latex: string }) {
  const html = katex.renderToString(latex, { throwOnError: false, displayMode: false, strict: "ignore" });
  return <span dir="ltr" className="inline-block align-middle" dangerouslySetInnerHTML={{ __html: html }} />;
}

export function Formula({ id }: { id: string }) {
  const formula = getFormula(id);
  const [activeId, setActiveId] = useState<string | null>(formula?.parts[0]?.id ?? null);

  const html = useMemo(() => {
    if (!formula) return "";
    return katex.renderToString(buildLatex(formula, activeId), {
      throwOnError: false,
      displayMode: true,
      strict: "ignore",
      trust: (context) => context.command === "\\htmlClass",
    });
  }, [formula, activeId]);

  if (!formula) {
    return <p className="text-copper">فرمول «{id}» پیدا نشد.</p>;
  }

  const active = formula.parts.find((part) => part.id === activeId) ?? formula.parts[0];

  return (
    <section className="rounded-2xl border border-line bg-card p-4 sm:p-5">
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-lg font-semibold">{formula.title}</h3>
        <p className="text-sm text-muted">{formula.summary}</p>
      </header>

      <div
        className="formula-display mt-4 overflow-x-auto rounded-xl bg-ink px-4 py-6 text-parchment"
        dir="ltr"
        onClick={(event) => {
          const node = (event.target as HTMLElement).closest<HTMLElement>(".fp");
          if (!node) return;
          const token = [...node.classList].find((name) => name.startsWith("part-"));
          if (token) setActiveId(token.slice("part-".length));
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {formula.parts.map((part) => {
          const on = part.id === active?.id;
          return (
            <button
              key={part.id}
              type="button"
              aria-pressed={on}
              onClick={() => setActiveId(part.id)}
              className={
                "inline-flex min-h-11 items-center gap-2 rounded-full border px-3 text-sm " +
                (on ? "border-copper bg-copper text-parchment" : "border-line bg-paper text-ink")
              }
            >
              <InlineTex latex={part.latex} />
              <span>{part.name}</span>
            </button>
          );
        })}
      </div>

      {active ? (
        <div className="mt-4 border-s-4 border-copper bg-copper-soft px-4 py-3">
          <p className="font-semibold">{active.name}</p>
          <p className="mt-2 leading-relaxed">{active.explanation}</p>
        </div>
      ) : null}

      {formula.derivationNotes ? (
        <details className="mt-4 rounded-xl border border-line px-4 py-3">
          <summary className="min-h-11 cursor-pointer font-medium">این رابطه از کجا می‌آید؟</summary>
          <p className="pb-2 leading-relaxed text-ink-soft">{formula.derivationNotes}</p>
        </details>
      ) : null}

      {(formula.relatedMath?.length || formula.relatedLabs?.length) ? (
        <div className="mt-4 flex flex-col gap-2 text-sm">
          {formula.relatedMath?.map((slug) => {
            const primer = getPrimer(slug);
            if (!primer) return null;
            return (
              <Link key={slug} to="/math/$slug" params={{ slug }} className="inline-flex min-h-11 items-center text-cane">
                ریاضی: {primer.title}
              </Link>
            );
          })}
          {formula.relatedLabs?.map((labId) => {
            const lab = getLab(labId);
            if (!lab) return null;
            return (
              <Link key={labId} to="/labs/$id" params={{ id: labId }} className="inline-flex min-h-11 items-center text-cane">
                آزمایش: {lab.title}
              </Link>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
