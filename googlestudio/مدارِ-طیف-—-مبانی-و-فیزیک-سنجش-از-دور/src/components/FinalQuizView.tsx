import { useState } from 'react';
import { CheckCircle2, RotateCcw, XCircle } from 'lucide-react';
import { FINAL_EXAM_QUESTIONS } from '../data/courseCurriculum';
import { gradeQuiz } from '../utils/courseStorage';

interface FinalQuizViewProps {
  answers: Record<string, string>;
  submitted: boolean;
  onSelectAnswer: (questionId: string, optionId: string) => void;
  onSubmitQuiz: () => void;
  onRetryQuiz: () => void;
  onBackToCourse: () => void;
}

export function FinalQuizView({
  answers,
  submitted,
  onSelectAnswer,
  onSubmitQuiz,
  onRetryQuiz,
  onBackToCourse,
}: FinalQuizViewProps) {
  const [validationError, setValidationError] = useState<string>('');
  const result = gradeQuiz(FINAL_EXAM_QUESTIONS, answers);
  const answeredCount = FINAL_EXAM_QUESTIONS.filter((q) => Boolean(answers[q.id])).length;

  const handleSubmit = () => {
    if (answeredCount < FINAL_EXAM_QUESTIONS.length) {
      setValidationError(
        `لطفاً به همه پرسش‌ها پاسخ دهید (${answeredCount} از ${FINAL_EXAM_QUESTIONS.length} پرسش پاسخ داده شده است).`
      );
      return;
    }
    setValidationError('');
    onSubmitQuiz();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">آزمون جامع مبانی و فیزیک سنجش از دور</h1>
          <p className="text-sm text-slate-600 mt-1">
            ۸ پرسش تحلیلی دربرگیرنده تابش جسم سیاه، عبور جوی، امضای طیفی و رادار SAR (حدنصاب قبولی: ۷۰٪)
          </p>
        </div>

        <div className="text-xs font-mono-tech text-slate-600 tabular-nums" dir="ltr">
          {answeredCount} / {FINAL_EXAM_QUESTIONS.length} ANSWERED
        </div>
      </div>

      {submitted && (
        <div
          className={`rounded-2xl border p-6 flex flex-wrap items-center justify-between gap-4 ${
            result.passed
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : 'bg-amber-50 border-amber-200 text-amber-950'
          }`}
        >
          <div className="space-y-1">
            <div className="text-lg font-bold">
              {result.passed ? '✓ تبریک! آزمون را با موفقیت گذراندید' : '▲ نیاز به مرور مباحث پایه'}
            </div>
            <p className="text-sm">
              نمره شما:{' '}
              <span className="font-mono-tech font-bold tabular-nums" dir="ltr">
                {result.scorePercent}%
              </span>{' '}
              ({result.correctCount} پاسخ صحیح از {result.totalQuestions} پرسش)
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setValidationError('');
                onRetryQuiz();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 rounded-xl whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>آزمون مجدد</span>
            </button>
            <button
              type="button"
              onClick={onBackToCourse}
              className="px-4 py-2 text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 rounded-xl whitespace-nowrap shrink-0"
            >
              بازگشت به سرفصل‌ها
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {FINAL_EXAM_QUESTIONS.map((q, idx) => {
          const selected = answers[q.id];
          const isCorrect = selected === q.correctOptionId;

          return (
            <div key={q.id} className="bg-white border border-slate-200 rounded-xl p-5 space-y-3.5">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                  <span className="font-mono-tech text-sky-700 ml-2">{idx + 1}.</span>
                  {q.questionFa}
                </h2>
                {submitted && (
                  <span className="shrink-0 text-xs font-semibold flex items-center gap-1">
                    {isCorrect ? (
                      <span className="text-emerald-700 inline-flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" aria-hidden="true" /> صحیح
                      </span>
                    ) : (
                      <span className="text-rose-700 inline-flex items-center gap-1">
                        <XCircle className="w-4 h-4" aria-hidden="true" /> نادرست
                      </span>
                    )}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options.map((opt) => {
                  const isOptSelected = selected === opt.id;
                  const isOptCorrect = opt.id === q.correctOptionId;

                  let cls = 'border-slate-200 bg-white hover:bg-slate-50';
                  if (submitted) {
                    if (isOptCorrect) cls = 'border-emerald-400 bg-emerald-50';
                    else if (isOptSelected && !isOptCorrect) cls = 'border-rose-300 bg-rose-50';
                  } else if (isOptSelected) {
                    cls = 'border-sky-500 bg-sky-50';
                  }

                  return (
                    <label
                      key={opt.id}
                      className={`flex items-start gap-2.5 p-3 rounded-lg border text-xs sm:text-sm text-slate-800 cursor-pointer transition-colors ${cls}`}
                    >
                      <input
                        type="radio"
                        name={`final-${q.id}`}
                        value={opt.id}
                        disabled={submitted}
                        checked={isOptSelected}
                        onChange={() => {
                          setValidationError('');
                          onSelectAnswer(q.id, opt.id);
                        }}
                        className="mt-1 text-sky-600 focus:ring-sky-500"
                      />
                      <span className="leading-relaxed">{opt.labelFa}</span>
                    </label>
                  );
                })}
              </div>

              {submitted && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-700 leading-relaxed">
                  <span className="font-semibold text-slate-900">تحلیل فیزیکی: </span>
                  {q.explanationFa}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!submitted && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-5">
          {validationError ? (
            <p className="text-xs font-medium text-rose-700" role="alert">
              {validationError}
            </p>
          ) : (
            <p className="text-xs text-slate-600">
              پس از پاسخ به تمام پرسش‌ها، روی دکمه ثبت نهایی کلیک کنید تا نمره و پاسخ‌نامه تشریحی نمایش داده شود.
            </p>
          )}
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2.5 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-xl transition-colors whitespace-nowrap shrink-0"
          >
            ثبت و نمره‌دهی آزمون
          </button>
        </div>
      )}
    </div>
  );
}
