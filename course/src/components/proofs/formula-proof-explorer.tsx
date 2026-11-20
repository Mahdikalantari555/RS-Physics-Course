import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, ChevronLeft, ChevronRight, Layers } from "lucide-react";
import { DisplayMath } from "@/components/course/display-math";
import { Rich } from "@/components/course/rich-text";
import { LEGAL_OPERATIONS, PROOF_METHODS } from "@/content/proofs/foundations";
import { PROOF_CATEGORIES, RS_FORMULA_PROOFS } from "@/content/proofs/rs-derivations";
import {
  clampStepIndex,
  computeProofMastery,
  filterProofs,
  type LegalOpId,
  type ProofCategoryId,
  type ProofMethodId,
} from "@/lib/proof-logic";
import { faInt } from "@/lib/format";

export function FormulaProofExplorer({
  highlightedMethod,
  onClearHighlightedMethod,
}: {
  highlightedMethod?: ProofMethodId | null;
  onClearHighlightedMethod?: () => void;
}) {
  const [category, setCategory] = useState<ProofCategoryId>("all");
  const [query, setQuery] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string>(RS_FORMULA_PROOFS[0]!.id);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [showAllSteps, setShowAllSteps] = useState<boolean>(false);
  const [openOpHint, setOpenOpHint] = useState<string | null>(null);
  const [completedProofs, setCompletedProofs] = useState<Record<string, boolean>>({});

  const opMap = useMemo(() => new Map(LEGAL_OPERATIONS.map((op) => [op.id, op])), []);
  const methodMap = useMemo(() => new Map(PROOF_METHODS.map((m) => [m.id, m])), []);

  const filtered = useMemo(() => {
    const base = filterProofs(RS_FORMULA_PROOFS, category, query);
    if (!highlightedMethod) return base;
    return base.filter((p) => p.methodIds.includes(highlightedMethod));
  }, [category, query, highlightedMethod]);

  const activeProof =
    filtered.find((p) => p.id === selectedId) ??
    filtered[0] ??
    RS_FORMULA_PROOFS.find((p) => p.id === selectedId) ??
    RS_FORMULA_PROOFS[0]!;

  const safeStepIndex = clampStepIndex(stepIndex, activeProof.steps.length);
  const mastery = computeProofMastery(completedProofs, RS_FORMULA_PROOFS);

  const selectProof = (proofId: string) => {
    setSelectedId(proofId);
    setStepIndex(0);
    setShowAllSteps(false);
    setOpenOpHint(null);
  };

  const goToStep = (nextIdx: number) => {
    const clamped = clampStepIndex(nextIdx, activeProof.steps.length);
    setStepIndex(clamped);
    setShowAllSteps(false);
    setOpenOpHint(null);
    if (clamped === activeProof.steps.length - 1) {
      setCompletedProofs((prev) => ({ ...prev, [activeProof.id]: true }));
    }
  };

  const toggleShowAll = () => {
    setShowAllSteps((prev) => {
      const next = !prev;
      if (next) {
        setCompletedProofs((done) => ({ ...done, [activeProof.id]: true }));
      }
      return next;
    });
  };

  const visibleSteps = showAllSteps
    ? activeProof.steps
    : activeProof.steps.slice(0, safeStepIndex + 1);

  return (
    <section
      id="rs-proofs-section"
      aria-labelledby="rs-proofs-heading"
      className="min-w-0 overflow-x-clip rounded-2xl border border-line bg-card p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-cane">بخش دوم · کاربرد واقعی روی فیزیک نور و سنجش از دور</p>
          <h2 id="rs-proofs-heading" className="mt-1 text-2xl font-semibold">
            اثبات مرحله‌به‌مرحله‌ی {faInt(RS_FORMULA_PROOFS.length)} فرمول اصلی دوره
          </h2>
          <p className="mt-2 text-base leading-relaxed text-ink-soft">
            در هر گام دقیقاً مشخص شده کدام «عمل مجاز ریاضی» از بخش اول به کار رفته است؛ روی دکمه‌ی عمل هر گام بزنید تا یادآوری سریع قانونش همان‌جا باز شود.
          </p>
        </div>

        <div className="text-left text-xs text-muted tabular-nums">
          <span className="block font-semibold text-ink">
            مرور کامل: {faInt(mastery.completed)} از {faInt(mastery.total)} اثبات ({faInt(mastery.percent)}٪)
          </span>
          <div className="mt-1.5 h-1.5 w-44 overflow-hidden rounded-full bg-paper">
            <div
              className="h-full bg-cane transition-all duration-200"
              style={{ width: `${mastery.percent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Category & Search Toolbar */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {PROOF_CATEGORIES.map((cat) => {
            const active = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(cat.id)}
                className={`min-h-10 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? "border-ink bg-ink text-parchment"
                    : "border-line bg-paper text-ink-soft hover:border-cane hover:text-ink"
                }`}
              >
                {cat.labelFa}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {highlightedMethod ? (
            <button
              type="button"
              onClick={onClearHighlightedMethod}
              className="min-h-10 rounded-lg border border-copper bg-copper-soft px-3 py-1.5 text-xs font-medium text-copper whitespace-nowrap shrink-0"
            >
              فیلتر روش: {methodMap.get(highlightedMethod)?.titleFa} ×
            </button>
          ) : null}
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجوی فرمول یا اثبات..."
            aria-label="جستجوی فرمول یا اثبات"
            className="min-h-10 w-full rounded-lg border border-line bg-paper px-3.5 text-sm text-ink placeholder:text-muted focus:border-copper focus:outline-none sm:w-56"
          />
        </div>
      </div>

      {/* Two-Zone Derivation Studio */}
      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[19rem_minmax(0,1fr)]">
        {/* Sidebar Formula List */}
        <nav aria-label="فهرست اثبات فرمول‌های سنجش از دور" className="flex flex-col gap-1.5">
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-line bg-paper p-4 text-sm text-muted">
              اثباتی با این فیلتر پیدا نشد. فیلتر را بازنشانی کنید.
            </div>
          ) : (
            filtered.map((proof) => {
              const active = proof.id === activeProof.id;
              const done = Boolean(completedProofs[proof.id]);
              return (
                <button
                  key={proof.id}
                  type="button"
                  aria-current={active ? "true" : undefined}
                  onClick={() => selectProof(proof.id)}
                  className={`flex flex-col rounded-xl border p-3 text-right transition-colors ${
                    active
                      ? "border-ink bg-ink text-parchment"
                      : "border-line bg-paper text-ink hover:border-cane"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className={active ? "text-parchment/75" : "text-muted"}>
                      <span className="tabular-nums">{faInt(proof.order)}</span> · {proof.categoryLabelFa}
                    </span>
                    {done ? (
                      <span className={`inline-flex items-center gap-1 text-xs ${active ? "text-parchment" : "text-cane"}`}>
                        <Check className="size-3.5" aria-hidden="true" />
                        مرور شده
                      </span>
                    ) : null}
                  </div>
                  <span className="mt-1.5 text-sm font-semibold leading-snug">
                    <Rich text={proof.titleFa} />
                  </span>
                </button>
              );
            })
          )}
        </nav>

        {/* Active Proof Stage */}
        <article
          data-testid="active-formula-proof"
          className="min-w-0 rounded-xl border border-line bg-paper p-5"
        >
          <header className="border-b border-line pb-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
              <span className="font-medium text-cane">{activeProof.categoryLabelFa}</span>
              <span aria-hidden="true">·</span>
              <span>
                روش اثبات:{" "}
                {activeProof.methodIds
                  .map((id) => methodMap.get(id)?.titleFa.replace(/^[۰-۹0-9]+[.،]\s*/, ""))
                  .filter(Boolean)
                  .join(" + ")}
              </span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{faInt(activeProof.steps.length)} گام</span>
            </div>

            <h3 className="mt-2 text-xl font-semibold text-ink sm:text-2xl">
              <Rich text={activeProof.titleFa} />
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
              <Rich text={activeProof.subtitleFa} />
            </p>

            <div className="mt-4">
              <p className="mb-1.5 text-xs font-medium text-muted">حکم نهایی (فرمولی که ثابت می‌کنیم):</p>
              <DisplayMath latex={activeProof.targetLatex} />
            </div>
          </header>

          {/* Starting Premises */}
          <div className="mt-4 rounded-xl border border-line bg-card p-4">
            <h4 className="text-sm font-semibold text-ink">نقطه‌ی شروع (فرض‌ها و قوانین پایه‌ی پذیرفته‌شده)</h4>
            <ul className="mt-2 flex flex-col gap-1.5 ps-5 text-sm leading-relaxed text-ink-soft">
              {activeProof.startingPremisesFa.map((premise, i) => (
                <li key={i} className="list-disc">
                  <Rich text={premise} />
                </li>
              ))}
            </ul>
          </div>

          {/* Step Playback Controls */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-card px-4 py-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => goToStep(safeStepIndex - 1)}
                disabled={showAllSteps || safeStepIndex === 0}
                className="inline-flex min-h-10 items-center gap-1 rounded-lg border border-line bg-paper px-3 text-xs font-medium text-ink transition-colors hover:border-ink disabled:opacity-40 whitespace-nowrap shrink-0"
              >
                <ChevronRight className="size-4" aria-hidden="true" />
                مرحله قبل
              </button>
              <button
                type="button"
                onClick={() => goToStep(safeStepIndex + 1)}
                disabled={showAllSteps || safeStepIndex >= activeProof.steps.length - 1}
                className="inline-flex min-h-10 items-center gap-1 rounded-lg bg-cane px-3.5 text-xs font-medium text-parchment transition-opacity hover:opacity-90 disabled:opacity-40 whitespace-nowrap shrink-0"
              >
                مرحله بعد
                <ChevronLeft className="size-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-pressed={showAllSteps}
                onClick={toggleShowAll}
                className={`inline-flex min-h-10 items-center gap-1.5 rounded-lg border px-3 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  showAllSteps
                    ? "border-ink bg-ink text-parchment"
                    : "border-line bg-paper text-ink-soft hover:border-ink hover:text-ink"
                }`}
              >
                <Layers className="size-3.5" aria-hidden="true" />
                {showAllSteps ? "بازگشت به حالت گام‌به‌گام" : "نمایش همه مراحل"}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-1.5" aria-label="پرش به مرحله‌ی اثبات">
              {activeProof.steps.map((step, idx) => {
                const isRevealed = showAllSteps || idx <= safeStepIndex;
                const isCurrent = !showAllSteps && idx === safeStepIndex;
                const cleanTitle = step.titleFa.replace(/\$/g, "");
                return (
                  <button
                    key={step.id}
                    type="button"
                    aria-label={`گام ${faInt(idx + 1)}: ${cleanTitle}`}
                    onClick={() => goToStep(idx)}
                    className={`size-8 rounded-lg border text-xs font-semibold tabular-nums transition-colors ${
                      isCurrent
                        ? "border-copper bg-copper text-parchment"
                        : isRevealed
                          ? "border-cane/50 bg-cane-soft text-cane"
                          : "border-line bg-paper text-muted hover:border-ink"
                    }`}
                  >
                    {faInt(idx + 1)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Visible Proof Steps */}
          <ol className="mt-4 flex flex-col gap-4">
            {visibleSteps.map((step, idx) => {
              const op = opMap.get(step.opId as LegalOpId);
              const isLatest = !showAllSteps && idx === safeStepIndex;
              const hintOpen = openOpHint === step.id;
              return (
                <li
                  key={step.id}
                  className={`min-w-0 rounded-xl border p-4 transition-colors ${
                    isLatest ? "border-copper/60 bg-card" : "border-line bg-card/85"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-base font-semibold text-ink">
                      <span className="text-copper tabular-nums">گام {faInt(idx + 1)}. </span>
                      <Rich text={step.titleFa} />
                    </h4>
                    {op ? (
                      <button
                        type="button"
                        aria-expanded={hintOpen}
                        onClick={() => setOpenOpHint(hintOpen ? null : step.id)}
                        className={`min-h-8 rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                          hintOpen
                            ? "border-cane bg-cane text-parchment"
                            : "border-line bg-paper text-cane hover:border-cane"
                        }`}
                      >
                        عمل مجاز: {op.shortLabelFa}
                      </button>
                    ) : null}
                  </div>

                  {hintOpen && op ? (
                    <div className="mt-3 rounded-lg border border-cane/35 bg-cane-soft/65 p-3 text-xs leading-relaxed text-ink">
                      <p className="font-semibold text-cane">{op.titleFa}</p>
                      <p className="mt-1">
                        <Rich text={op.whyValidFa} />
                      </p>
                      <p className="mt-1.5 text-copper">
                        <span className="font-semibold">احتیاط: </span>
                        <Rich text={op.forbiddenTrapFa} />
                      </p>
                    </div>
                  ) : null}

                  <div className="mt-3">
                    <DisplayMath latex={step.latex} />
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    <Rich text={step.explanationFa} />
                  </p>

                  {step.watchOutFa ? (
                    <p className="mt-2.5 rounded-lg border border-line bg-copper-soft/55 px-3 py-2 text-xs leading-relaxed text-ink">
                      <span className="font-semibold text-copper">نکته‌ی ظریف: </span>
                      <Rich text={step.watchOutFa} />
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ol>

          {/* Reveal Next Prompt or Final Takeaway */}
          {!showAllSteps && safeStepIndex < activeProof.steps.length - 1 ? (
            <div className="mt-4 flex items-center justify-between rounded-xl border border-dashed border-line bg-card px-4 py-3 text-sm">
              <span className="text-muted tabular-nums">
                {faInt(activeProof.steps.length - 1 - safeStepIndex)} گام دیگر تا پایان اثبات باقی مانده است.
              </span>
              <button
                type="button"
                onClick={() => goToStep(safeStepIndex + 1)}
                className="inline-flex min-h-9 items-center gap-1 rounded-lg bg-ink px-3.5 text-xs font-medium text-parchment hover:opacity-90 whitespace-nowrap shrink-0"
              >
                ادامه به گام {faInt(safeStepIndex + 2)}
                <ChevronLeft className="size-3.5" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <footer className="mt-5 flex flex-col gap-3 rounded-xl border border-line bg-cane-soft/70 p-4">
              <p className="text-sm leading-relaxed text-ink">
                <span className="font-semibold text-cane">معنای فیزیکی در سنجش از دور: </span>
                <Rich text={activeProof.physicalTakeawayFa} />
              </p>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-cane/20 pt-3 text-xs">
                <Link to="/formulas" className="font-medium text-cane hover:underline">
                  باز کردن کالبدشکافی نمادها و ماشین‌حساب در مرجع فرمول‌ها
                </Link>
                <span className="text-muted">پایان اثبات · Q.E.D</span>
              </div>
            </footer>
          )}
        </article>
      </div>
    </section>
  );
}
