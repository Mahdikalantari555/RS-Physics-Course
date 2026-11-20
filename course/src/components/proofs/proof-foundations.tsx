import { useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import { DisplayMath, InlineMath } from "@/components/course/display-math";
import { Rich } from "@/components/course/rich-text";
import {
  LEGAL_OPERATIONS,
  LOGIC_CONNECTORS,
  PROOF_ANATOMY_PILLARS,
  PROOF_CHALLENGES,
  PROOF_METHODS,
} from "@/content/proofs/foundations";
import {
  computeChallengeScore,
  evaluateChallenge,
  type LegalOpId,
  type ProofMethodId,
} from "@/lib/proof-logic";
import { faInt } from "@/lib/format";

type FoundationTab = "anatomy" | "operations" | "methods" | "workshop";

const TABS: Array<{ id: FoundationTab; labelFa: string }> = [
  { id: "anatomy", labelFa: "۱. آناتومی و زبان منطق" },
  { id: "operations", labelFa: "۲. ۷ عمل مجاز در اثبات" },
  { id: "methods", labelFa: "۳. ۶ روش اصلی اثبات" },
  { id: "workshop", labelFa: "۴. کارگاه تشخیص و خطایابی" },
];

export function ProofFoundations({
  onJumpToDerivations,
}: {
  onJumpToDerivations?: (methodId?: ProofMethodId) => void;
}) {
  const [activeTab, setActiveTab] = useState<FoundationTab>("anatomy");
  const [selectedOpId, setSelectedOpId] = useState<LegalOpId>(LEGAL_OPERATIONS[0]!.id);
  const [selectedMethodId, setSelectedMethodId] = useState<ProofMethodId>(PROOF_METHODS[0]!.id);
  const [revealedMethodSteps, setRevealedMethodSteps] = useState<number>(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const activeOp = LEGAL_OPERATIONS.find((op) => op.id === selectedOpId) ?? LEGAL_OPERATIONS[0]!;
  const activeMethod = PROOF_METHODS.find((m) => m.id === selectedMethodId) ?? PROOF_METHODS[0]!;
  const score = computeChallengeScore(PROOF_CHALLENGES, answers);

  return (
    <section aria-labelledby="foundations-heading" className="min-w-0 overflow-x-clip rounded-2xl border border-line bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-copper">بخش اول · مبانی اثبات ریاضی از صفر</p>
          <h2 id="foundations-heading" className="mt-1 text-2xl font-semibold">
            چگونه هر اثبات ریاضی را بخوانیم و بفهمیم؟
          </h2>
          <p className="mt-2 text-base leading-relaxed text-ink-soft">
            پیش از ورود به فرمول‌های فیزیک نور و سنجش از دور، ابتدا اسکلت هر اثبات، زبان نمادهای منطقی، ۷ عمل مجاز جبری–تحلیلی و ۶ روش استاندارد اثبات را از پایه یاد می‌گیریم.
          </p>
        </div>

        <div role="tablist" aria-label="بخش‌های مبانی اثبات ریاضی" className="flex flex-wrap gap-1.5 rounded-xl border border-line bg-paper p-1">
          {TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveTab(tab.id)}
                className={`min-h-10 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  active ? "bg-ink text-parchment" : "text-ink-soft hover:bg-card hover:text-ink"
                }`}
              >
                {tab.labelFa}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: ANATOMY & LOGIC */}
      {activeTab === "anatomy" && (
        <div className="mt-6 flex min-w-0 flex-col gap-8">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold">چهار ستونِ هر اثبات معتبر</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              هر اثباتی که در کتاب‌های ریاضی یا فیزیک می‌بینید — از یک خط ساده تا ۱۰ صفحه — دقیقاً از این ۴ قطعه ساخته شده است:
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {PROOF_ANATOMY_PILLARS.map((pillar) => (
                <article key={pillar.id} className="min-w-0 rounded-xl border border-line bg-paper p-4">
                  <div className="flex items-baseline justify-between gap-2 text-xs text-muted">
                    <span className="font-semibold text-copper tabular-nums">{pillar.indexFa}</span>
                    <span dir="ltr">{pillar.englishLabel}</span>
                  </div>
                  <h4 className="mt-1.5 text-base font-semibold text-ink">
                    <Rich text={pillar.titleFa} />
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    <Rich text={pillar.summaryFa} />
                  </p>
                  <p className="mt-3 border-t border-line pt-2.5 text-xs leading-relaxed text-muted">
                    <span className="font-semibold text-cane">مثال: </span>
                    <Rich text={pillar.exampleFa} />
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-line bg-copper-soft/55 p-4 text-sm leading-relaxed text-ink">
            <span className="font-semibold text-copper">قانون طلایی تفاوت مثال و اثبات: </span>
            <Rich text="بررسی کردن یک فرمول برای $n = 1, 2, 3, 100$ فقط «حدس و شهود» می‌سازد، نه اثبات؛ زیرا ممکن است در $n = 101$ نقض شود. اما پیدا کردن حتی «یک مثال نقض» برای رد یک ادعای کلی ($\forall$) کاملاً کافی است!" />
          </div>

          <div className="min-w-0">
            <h3 className="text-lg font-semibold">فرهنگ سریع نمادهای منطقی درون اثبات‌ها</h3>
            <p className="mt-1 text-sm text-muted">
              معنای دقیق پیکان‌ها و سورهایی که پیوند میان سطرهای یک اثبات را می‌سازند:
            </p>
            <div className="mt-4 overflow-x-auto rounded-xl border border-line">
              <table className="w-full border-collapse text-right text-sm">
                <thead>
                  <tr className="border-b border-line bg-paper text-xs font-semibold text-ink-soft">
                    <th className="px-4 py-3">نماد</th>
                    <th className="px-4 py-3">نام و معنا</th>
                    <th className="px-4 py-3">نکته و نقیض منطقی</th>
                    <th className="px-4 py-3">نمونه در فیزیک نور و سنجش</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line bg-card">
                  {LOGIC_CONNECTORS.map((item) => (
                    <tr key={item.id} className="align-top hover:bg-paper/60">
                      <td className="whitespace-nowrap px-4 py-3.5 text-base font-semibold text-copper" dir="ltr">
                        <InlineMath latex={item.symbolLatex} />
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="block font-semibold text-ink">{item.nameFa}</span>
                        <span className="mt-1 block text-xs leading-relaxed text-ink-soft">
                          <Rich text={item.meaningFa} />
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-xs leading-relaxed text-muted">
                        <Rich text={item.negationOrTipFa} />
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="text-xs text-ink" dir="ltr">
                          <InlineMath latex={item.exampleLatex} />
                        </div>
                        <span className="mt-1 block text-xs text-muted">
                          <Rich text={item.exampleFa} />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 7 LEGAL OPERATIONS */}
      {activeTab === "operations" && (
        <div className="mt-6 grid gap-5 lg:grid-cols-[17rem_minmax(0,1fr)]">
          <div className="flex flex-col gap-1.5" role="listbox" aria-label="فهرست ۷ عمل مجاز در اثبات">
            {LEGAL_OPERATIONS.map((op) => {
              const active = op.id === activeOp.id;
              return (
                <button
                  key={op.id}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => setSelectedOpId(op.id)}
                  className={`flex min-h-11 items-center gap-3 rounded-xl border px-3.5 py-2.5 text-right text-sm transition-colors ${
                    active
                      ? "border-ink bg-ink text-parchment"
                      : "border-line bg-paper text-ink-soft hover:border-cane hover:text-ink"
                  }`}
                >
                  <span className="text-xs font-semibold opacity-75 tabular-nums">{faInt(op.order)}</span>
                  <span className="font-medium leading-snug">{op.shortLabelFa}</span>
                </button>
              );
            })}
          </div>

          <div className="flex min-w-0 flex-col gap-4 rounded-xl border border-line bg-paper p-5">
            <div>
              <p className="text-xs font-medium text-cane">عمل مجاز شماره‌ی {faInt(activeOp.order)} از {faInt(LEGAL_OPERATIONS.length)}</p>
              <h3 className="mt-1 text-xl font-semibold text-ink">{activeOp.titleFa}</h3>
            </div>

            <DisplayMath latex={activeOp.ruleLatex} />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-line bg-card p-4">
                <h4 className="text-sm font-semibold text-cane">چرا این عمل مجاز است؟</h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  <Rich text={activeOp.whyValidFa} />
                </p>
              </div>
              <div className="rounded-xl border border-line bg-copper-soft/60 p-4">
                <h4 className="text-sm font-semibold text-copper">تله‌ی ممنوعه (کجا خطا می‌شود؟)</h4>
                <p className="mt-2 text-sm leading-relaxed text-ink">
                  <Rich text={activeOp.forbiddenTrapFa} />
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-line bg-card p-4">
              <p className="text-xs font-medium text-muted">نمونه‌ی واقعی در فیزیک سنجش از دور</p>
              <div className="mt-2.5">
                <DisplayMath latex={activeOp.rsExampleLatex} />
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                <Rich text={activeOp.rsExampleFa} />
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: 6 PROOF METHODS */}
      {activeTab === "methods" && (
        <div className="mt-6 flex flex-col gap-5">
          <div className="flex flex-wrap gap-2">
            {PROOF_METHODS.map((method) => {
              const active = method.id === activeMethod.id;
              return (
                <button
                  key={method.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setSelectedMethodId(method.id);
                    setRevealedMethodSteps(1);
                  }}
                  className={`min-h-10 rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? "border-ink bg-ink text-parchment"
                      : "border-line bg-paper text-ink-soft hover:border-cane hover:text-ink"
                  }`}
                >
                  {method.titleFa}
                </button>
              );
            })}
          </div>

          <div className="min-w-0 rounded-xl border border-line bg-paper p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-xl font-semibold text-ink">{activeMethod.titleFa}</h3>
              <span className="text-xs text-muted" dir="ltr">
                {activeMethod.englishName}
              </span>
            </div>

            <div className="mt-4">
              <DisplayMath latex={activeMethod.blueprintLatex} />
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-line bg-card p-4">
                <h4 className="text-sm font-semibold text-ink">چه زمانی سراغ این روش می‌رویم؟</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  <Rich text={activeMethod.whenToUseFa} />
                </p>
              </div>
              <div className="rounded-xl border border-line bg-card p-4">
                <h4 className="text-sm font-semibold text-ink">نحوه‌ی اجرا</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  <Rich text={activeMethod.howItWorksFa} />
                </p>
              </div>
            </div>

            {/* Interactive Step-by-step Base Math Example */}
            <div className="mt-5 rounded-xl border border-line bg-card p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-copper">مثال پایه‌ی ریاضی (گام‌به‌گام)</p>
                  <h4 className="mt-1 text-base font-semibold text-ink">
                    <Rich text={activeMethod.baseExampleTitleFa} />
                  </h4>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setRevealedMethodSteps((prev) =>
                        Math.min(activeMethod.baseExampleSteps.length, prev + 1),
                      )
                    }
                    disabled={revealedMethodSteps >= activeMethod.baseExampleSteps.length}
                    className="min-h-9 rounded-lg bg-cane px-3 py-1.5 text-xs font-medium text-parchment transition-opacity hover:opacity-90 disabled:opacity-40 whitespace-nowrap shrink-0"
                  >
                    گام بعدی
                  </button>
                  <button
                    type="button"
                    onClick={() => setRevealedMethodSteps(activeMethod.baseExampleSteps.length)}
                    className="min-h-9 rounded-lg border border-line bg-paper px-3 py-1.5 text-xs font-medium text-ink-soft hover:border-ink hover:text-ink whitespace-nowrap shrink-0"
                  >
                    نمایش همه
                  </button>
                </div>
              </div>

              <ol className="mt-4 flex flex-col gap-3">
                {activeMethod.baseExampleSteps.slice(0, revealedMethodSteps).map((step, idx) => (
                  <li key={idx} className="rounded-xl border border-line bg-paper p-3.5">
                    <p className="text-xs font-semibold text-cane">{step.labelFa}</p>
                    <div className="mt-2">
                      <DisplayMath latex={step.latex} />
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      <Rich text={step.reasonFa} />
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-cane-soft/65 px-4 py-3 text-sm">
              <p className="text-ink">
                <span className="font-semibold text-cane">پیوند با سنجش از دور: </span>
                <Rich text={activeMethod.rsConnectionFa} />
              </p>
              {onJumpToDerivations ? (
                <button
                  type="button"
                  onClick={() => onJumpToDerivations(activeMethod.id)}
                  className="min-h-9 rounded-lg border border-cane bg-card px-3 py-1.5 text-xs font-medium text-cane hover:bg-cane hover:text-parchment transition-colors whitespace-nowrap shrink-0"
                >
                  مشاهده در بخش اثبات فرمول‌ها
                </button>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: INTERACTIVE PROOF WORKSHOP */}
      {activeTab === "workshop" && (
        <div className="mt-6 flex flex-col gap-5">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-paper px-4 py-3">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="font-semibold text-ink">کارگاه تمرین خواندن اثبات</span>
              <span className="text-muted" aria-hidden="true">·</span>
              <span className="text-ink-soft tabular-nums">
                پاسخ درست: {faInt(score.correct)} از {faInt(score.total)} (پاسخ‌داده‌شده: {faInt(score.answered)})
              </span>
            </div>
            {score.answered > 0 ? (
              <button
                type="button"
                onClick={() => setAnswers({})}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line bg-card px-3 py-1.5 text-xs font-medium text-ink-soft hover:border-ink hover:text-ink whitespace-nowrap shrink-0"
              >
                <RotateCcw className="size-3.5" aria-hidden="true" />
                شروع دوباره
              </button>
            ) : null}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {PROOF_CHALLENGES.map((ch, idx) => {
              const selected = answers[ch.id];
              const result = evaluateChallenge(ch, selected);
              return (
                <article
                  key={ch.id}
                  data-testid={`proof-challenge-${ch.id}`}
                  className="flex min-w-0 flex-col justify-between rounded-xl border border-line bg-paper p-4"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs text-muted">
                      <span className="font-medium text-copper">{ch.kindFa}</span>
                      <span className="tabular-nums">چالش {faInt(idx + 1)} از {faInt(PROOF_CHALLENGES.length)}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink">
                      <Rich text={ch.promptFa} />
                    </p>
                    {ch.statementLatex ? (
                      <div className="mt-3">
                        <DisplayMath latex={ch.statementLatex} />
                      </div>
                    ) : null}

                    <div className="mt-3 flex flex-col gap-2">
                      {ch.options.map((opt) => {
                        const isPicked = selected === opt.id;
                        const isCorrectOpt = opt.id === ch.correctOptionId;
                        let style = "border-line bg-card text-ink-soft hover:border-ink hover:text-ink";
                        if (result.answered) {
                          if (isCorrectOpt) {
                            style = "border-cane bg-cane-soft text-ink font-medium";
                          } else if (isPicked) {
                            style = "border-copper bg-copper-soft text-ink";
                          } else {
                            style = "border-line bg-card/60 text-muted";
                          }
                        }
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            aria-pressed={isPicked}
                            onClick={() => setAnswers((prev) => ({ ...prev, [ch.id]: opt.id }))}
                            className={`flex min-h-11 items-center justify-between gap-2 rounded-lg border px-3 py-2 text-right text-xs leading-relaxed transition-colors ${style}`}
                          >
                            <span>
                              <Rich text={opt.labelFa} />
                            </span>
                            {result.answered && isCorrectOpt ? (
                              <Check className="size-4 shrink-0 text-cane" aria-hidden="true" />
                            ) : result.answered && isPicked ? (
                              <X className="size-4 shrink-0 text-copper" aria-hidden="true" />
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {result.answered ? (
                    <div
                      aria-live="polite"
                      className={`mt-3 rounded-lg border px-3 py-2.5 text-xs leading-relaxed ${
                        result.correct
                          ? "border-cane/40 bg-cane-soft/70 text-ink"
                          : "border-copper/40 bg-copper-soft/70 text-ink"
                      }`}
                    >
                      <p className={`font-semibold ${result.correct ? "text-cane" : "text-copper"}`}>
                        {result.correct ? "درست تشخیص دادید" : "نکته‌ی منطقی را دوباره ببینیم"}
                      </p>
                      <p className="mt-1">
                        <Rich text={ch.explanationFa} />
                      </p>
                      <p className="mt-1.5 text-muted">ارجاع به جعبه‌ابزار: {ch.relatedOpOrMethodFa}</p>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
