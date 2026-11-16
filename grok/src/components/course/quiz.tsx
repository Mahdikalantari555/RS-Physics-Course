import { useState } from "react";
import { getQuiz } from "@/content/load";
import { useProgress } from "@/lib/progress";
import { faInt } from "@/lib/format";
import type { Question } from "@/content/types";
import { Rich } from "./rich-text";

export function Quiz({ id, mode = "tutor" }: { id: string; mode?: "tutor" | "exam" }) {
  const quiz = getQuiz(id);
  const progress = useProgress();
  const [picked, setPicked] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState(false);
  const [step, setStep] = useState(0);
  const [showExplain, setShowExplain] = useState(false);

  if (!quiz) return <p className="text-copper">پرسش «{id}» پیدا نشد.</p>;

  const questions = quiz.questions;
  const stored = progress.data.quizzes[quiz.id];
  const scoreOf = (map: Record<string, number>) =>
    questions.reduce((sum, question) => sum + (map[question.id] === question.answer ? 1 : 0), 0);

  function choose(question: Question, index: number) {
    if (mode === "tutor" && showExplain) return;
    const next = { ...picked, [question.id]: index };
    setPicked(next);
    if (mode === "tutor") setShowExplain(true);
  }

  function finish(map: Record<string, number>) {
    progress.saveQuiz(quiz!.id, scoreOf(map), questions.length);
    setRevealed(true);
  }

  if (revealed) {
    const score = scoreOf(picked);
    return (
      <section className="rounded-2xl border border-line bg-card p-4 sm:p-5">
        <h3 className="text-lg font-semibold">{quiz.title}</h3>
        <p className="mt-3 text-2xl font-semibold tabular-nums">
          {faInt(score)}
          <span className="text-base text-muted"> از {faInt(questions.length)}</span>
        </p>
        <ul className="mt-4 flex flex-col gap-3">
          {questions.map((question, index) => {
            const ok = picked[question.id] === question.answer;
            return (
              <li key={question.id} className="rounded-xl border border-line px-3 py-3">
                <p className="font-medium">
                  {faInt(index + 1)}. <Rich text={question.prompt} />
                </p>
                <p className={"mt-2 text-sm " + (ok ? "text-cane" : "text-copper")}>
                  {ok ? "درست" : "نادرست"} — <Rich text={question.explain} />
                </p>
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          className="mt-4 inline-flex min-h-11 items-center rounded-full bg-ink px-4 text-parchment"
          onClick={() => {
            setPicked({});
            setRevealed(false);
            setStep(0);
            setShowExplain(false);
          }}
        >
          دوباره
        </button>
      </section>
    );
  }

  if (mode === "exam") {
    const answered = questions.filter((question) => picked[question.id] !== undefined).length;
    return (
      <section className="rounded-2xl border border-line bg-card p-4 sm:p-5">
        <h3 className="text-lg font-semibold">{quiz.title}</h3>
        <p className="mt-1 text-sm text-muted">{quiz.summary}</p>
        <ol className="mt-5 flex flex-col gap-6">
          {questions.map((question, index) => (
            <li key={question.id}>
              <p className="font-medium leading-relaxed">
                {faInt(index + 1)}. <Rich text={question.prompt} />
              </p>
              <div className="mt-2 flex flex-col gap-2">
                {question.choices.map((choice, choiceIndex) => {
                  const on = picked[question.id] === choiceIndex;
                  return (
                    <button
                      key={choice}
                      type="button"
                      aria-pressed={on}
                      onClick={() => choose(question, choiceIndex)}
                      className={
                        "min-h-11 rounded-xl border px-3 py-2 text-start leading-relaxed " +
                        (on ? "border-ink bg-ink text-parchment" : "border-line bg-paper")
                      }
                    >
                      <Rich text={choice} />
                    </button>
                  );
                })}
              </div>
            </li>
          ))}
        </ol>
        <button
          type="button"
          disabled={answered < questions.length}
          onClick={() => finish(picked)}
          className="mt-6 inline-flex min-h-11 items-center rounded-full bg-cane px-5 text-parchment disabled:opacity-40"
        >
          ثبت پاسخ‌ها
        </button>
        {stored && progress.ready ? (
          <p className="mt-3 text-sm text-muted">
            بهترین نتیجه‌ی ذخیره‌شده: {faInt(stored.correct)} از {faInt(stored.total)}
          </p>
        ) : null}
      </section>
    );
  }

  const question = questions[step];
  if (!question) return null;
  const pickedIndex = picked[question.id];

  return (
    <section className="rounded-2xl border border-line bg-card p-4 sm:p-5">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-lg font-semibold">{quiz.title}</h3>
        <p className="text-sm tabular-nums text-muted">
          {faInt(step + 1)} / {faInt(questions.length)}
        </p>
      </div>
      <p className="mt-4 text-lg leading-relaxed">
        <Rich text={question.prompt} />
      </p>
      <div className="mt-4 flex flex-col gap-2">
        {question.choices.map((choice, index) => {
          const on = pickedIndex === index;
          const show = showExplain;
          const correct = index === question.answer;
          let tone = "border-line bg-paper";
          if (show && correct) tone = "border-cane bg-cane-soft";
          else if (show && on && !correct) tone = "border-copper bg-copper-soft";
          else if (on) tone = "border-ink bg-ink text-parchment";
          return (
            <button
              key={choice}
              type="button"
              disabled={showExplain}
              onClick={() => choose(question, index)}
              className={"min-h-11 rounded-xl border px-3 py-2 text-start leading-relaxed " + tone}
            >
              <Rich text={choice} />
            </button>
          );
        })}
      </div>
      {showExplain ? (
        <p className="mt-4 leading-relaxed text-ink-soft">
          <Rich text={question.explain} />
        </p>
      ) : null}
      {showExplain ? (
        <button
          type="button"
          className="mt-4 inline-flex min-h-11 items-center rounded-full bg-ink px-4 text-parchment"
          onClick={() => {
            if (step + 1 >= questions.length) finish(picked);
            else {
              setStep((value) => value + 1);
              setShowExplain(false);
            }
          }}
        >
          {step + 1 >= questions.length ? "نتیجه" : "بعدی"}
        </button>
      ) : (
        <p className="mt-3 text-sm text-muted">یک گزینه را انتخاب کن.</p>
      )}
    </section>
  );
}
