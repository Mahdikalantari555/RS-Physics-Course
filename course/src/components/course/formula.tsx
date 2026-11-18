import { Link } from "@tanstack/react-router";
import katex from "katex";
import { useMemo, useState } from "react";
import { getFormula, getPrimer } from "@/content/load";
import { getLab } from "@/components/labs/load-labs";
import type { Formula, FormulaPart, FormulaPartKind } from "@/content/types";

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

const KIND_LABEL: Record<FormulaPartKind, string> = {
  var: "متغیر",
  const: "ثابت / ضریب",
  op: "عملگر ریاضی",
};

function partPillClasses(part: FormulaPart, isActive: boolean): string {
  if (isActive) {
    return "border-copper bg-copper text-parchment";
  }
  switch (part.kind) {
    case "const":
      return "border-copper/40 bg-copper-soft/55 text-ink hover:border-copper";
    case "op":
      return "border-cane/40 bg-cane-soft/55 text-ink hover:border-cane";
    case "var":
    default:
      return "border-line bg-paper text-ink hover:border-copper/60";
  }
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
  const hasKinds = formula.parts.some((part) => Boolean(part.kind));

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

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
        <span>روی هر نماد در فرمول یا دکمه‌های زیر بزنید تا نقش فیزیکی و ریاضی آن باز شود.</span>
        {hasKinds ? (
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-ink-soft">
              <span className="inline-block size-2.5 rounded-xs border border-line bg-paper" />
              متغیر
            </span>
            <span className="inline-flex items-center gap-1.5 text-copper">
              <span className="inline-block size-2.5 rounded-xs border border-copper/50 bg-copper-soft" />
              ثابت / ضریب
            </span>
            <span className="inline-flex items-center gap-1.5 text-cane">
              <span className="inline-block size-2.5 rounded-xs border border-cane/50 bg-cane-soft" />
              عملگر ریاضی
            </span>
          </div>
        ) : null}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {formula.parts.map((part) => {
          const on = part.id === active?.id;
          return (
            <button
              key={part.id}
              type="button"
              aria-pressed={on}
              onClick={() => setActiveId(part.id)}
              className={
                "inline-flex min-h-11 items-center gap-2 rounded-full border px-3 text-sm transition-colors " +
                partPillClasses(part, on)
              }
            >
              <InlineTex latex={part.latex} />
              <span>{part.name}</span>
            </button>
          );
        })}
      </div>

      {active ? (
        <div className="mt-4 rounded-xl border-s-4 border-copper bg-copper-soft px-4 py-3.5" aria-live="polite">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line/70 pb-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <InlineTex latex={active.latex} />
              <p className="font-semibold text-ink">{active.name}</p>
              {active.kind ? (
                <span className="rounded-md border border-line bg-paper px-2 py-0.5 text-xs font-medium text-ink-soft">
                  {KIND_LABEL[active.kind]}
                </span>
              ) : null}
            </div>
            {active.unitOrValue ? (
              <span
                dir="ltr"
                className="rounded-md border border-line bg-card px-2.5 py-0.5 text-xs font-medium text-ink tabular-nums"
              >
                {active.unitOrValue}
              </span>
            ) : null}
          </div>

          <p className="mt-2.5 leading-relaxed text-ink">
            <span className="font-semibold">چیست؟ </span>
            {active.explanation}
          </p>

          {active.mathRole ? (
            <p className="mt-2 leading-relaxed text-ink-soft">
              <span className="font-semibold text-ink">نقش ریاضی: </span>
              {active.mathRole}
            </p>
          ) : null}

          {active.intuition ? (
            <p className="mt-2.5 rounded-lg border-s-2 border-cane bg-cane-soft px-3 py-2 text-sm leading-relaxed text-ink">
              <span className="font-semibold text-cane">شهود کاربردی: </span>
              {active.intuition}
            </p>
          ) : null}
        </div>
      ) : null}

      {formula.derivationNotes ? (
        <details className="mt-4 rounded-xl border border-line px-4 py-3">
          <summary className="min-h-11 cursor-pointer font-medium">این رابطه از کجا می‌آید؟</summary>
          <p className="pb-2 leading-relaxed text-ink-soft">{formula.derivationNotes}</p>
        </details>
      ) : null}

      {(formula.relatedMath?.length || formula.relatedLabs?.length) ? (
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
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
