import { useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/course/shell";
import { ProofFoundations } from "@/components/proofs/proof-foundations";
import { FormulaProofExplorer } from "@/components/proofs/formula-proof-explorer";
import { LEGAL_OPERATIONS, PROOF_CHALLENGES, PROOF_METHODS } from "@/content/proofs/foundations";
import { RS_FORMULA_PROOFS } from "@/content/proofs/rs-derivations";
import { faInt } from "@/lib/format";
import { useProgress } from "@/lib/progress";
import type { ProofMethodId } from "@/lib/proof-logic";

export const Route = createFileRoute("/proofs")({
  component: ProofsSpecialLessonPage,
  head: () => ({
    meta: [
      {
        title: "درس ویژه: آموزش اثبات ریاضی از پایه و اثبات فرمول‌های سنجش از دور · فیزیک سنجش از دور",
      },
    ],
  }),
});

const SPECIAL_LESSON_SLUG = "special-math-proofs";

const READING_CHECKLIST = [
  {
    step: "۰۱",
    question: "فرض‌ها و تعاریف چیستند؟",
    detail: "پیش از خواندن خط اول اثبات، دقیقاً مشخص کنید چه چیزهایی «داده شده» (مثلاً خلأ، دمای ثابت، زاویه‌ی کوچک) و چه چیزی باید ثابت شود.",
  },
  {
    step: "۰۲",
    question: "نویسنده کدام روش اثبات را انتخاب کرده است؟",
    detail: "آیا مستقیم جلو می‌رود، عکس نقیض می‌گیرد، فرض خلاف می‌کند (برهان خلف)، استقرا می‌زند یا مدل دیفرانسیلی می‌سازد؟",
  },
  {
    step: "۰۳",
    question: "در هر سطر دقیقاً کدام عمل مجاز انجام شده؟",
    detail: "از کنار «پس نتیجه می‌شود» ساده رد نشوید؛ بپرسید اینجا جایگذاری شد، تغییر متغیر داد، مشتق گرفت یا عامل مشترکی خط خورد؟",
  },
  {
    step: "۰۴",
    question: "کجا ممکن است شرطی نقض شود؟",
    detail: "آیا تقسیم بر صفر، ریشه‌ی منفی، یا تقریب خارج از بازه‌ی معتبر رخ نداده؟ اگر همه‌ی سطرها از این فیلتر رد شدند، اثبات را کامل درک کرده‌اید.",
  },
];

function ProofsSpecialLessonPage() {
  const { data, ready, toggleLesson } = useProgress();
  const [highlightedMethod, setHighlightedMethod] = useState<ProofMethodId | null>(null);
  const derivationsRef = useRef<HTMLDivElement | null>(null);

  const isRead = ready && Boolean(data.lessons[SPECIAL_LESSON_SLUG]);

  const handleJumpToDerivations = (methodId?: ProofMethodId) => {
    setHighlightedMethod(methodId ?? null);
    derivationsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Shell>
      {/* Hero Header */}
      <section className="rounded-2xl border border-line bg-card p-5 sm:p-7">
        <div className="flex flex-col items-start justify-between gap-4 lg:flex-row">
          <div className="min-w-0 max-w-2xl flex-1">
            <p className="text-sm font-medium text-copper">درس ویژه · از منطق پایه تا فیزیک نور و سنجش از دور</p>
            <h1 className="mt-2 text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              هنر و منطق اثبات ریاضی از پایه، همراه با اثبات کامل فرمول‌های دوره
            </h1>
            <p className="mt-3 text-base leading-relaxed text-ink-soft sm:text-lg">
              هدف این درس ویژه این است که دیگر هیچ اثبات ریاضی یا فیزیکی برای شما شبیه «شعبده‌بازی» نباشد. ابتدا یاد می‌گیرید اثبات ریاضی دقیقاً چگونه ساخته می‌شود، چه روش‌ها و عمل‌های مجازی دارد و چطور خطاهای پنهان را شکار کنید؛ سپس همان ابزارها را روی {faInt(RS_FORMULA_PROOFS.length)} فرمول اصلی فیزیک نور و سنجش از دور گام‌به‌گام پیاده می‌کنیم.
            </p>
          </div>

          <button
            type="button"
            aria-pressed={isRead}
            onClick={() => toggleLesson(SPECIAL_LESSON_SLUG)}
            className={`inline-flex min-h-11 items-center rounded-lg px-4 text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
              isRead
                ? "bg-cane text-parchment"
                : "border border-line bg-paper text-ink hover:border-cane"
            }`}
          >
            {isRead ? "این درس ویژه خوانده شد" : "ثبت به‌عنوان خوانده‌شده"}
          </button>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-line pt-5 sm:grid-cols-4">
          <div className="rounded-xl border border-line bg-paper px-3.5 py-3">
            <dt className="text-xs text-muted">عمل‌های مجاز پایه</dt>
            <dd className="mt-1 text-xl font-semibold text-ink tabular-nums">{faInt(LEGAL_OPERATIONS.length)} عمل کلیدی</dd>
          </div>
          <div className="rounded-xl border border-line bg-paper px-3.5 py-3">
            <dt className="text-xs text-muted">روش‌های اصلی اثبات</dt>
            <dd className="mt-1 text-xl font-semibold text-ink tabular-nums">{faInt(PROOF_METHODS.length)} روش استاندارد</dd>
          </div>
          <div className="rounded-xl border border-line bg-paper px-3.5 py-3">
            <dt className="text-xs text-muted">کارگاه تعاملی خطایابی</dt>
            <dd className="mt-1 text-xl font-semibold text-ink tabular-nums">{faInt(PROOF_CHALLENGES.length)} چالش منطقی</dd>
          </div>
          <div className="rounded-xl border border-line bg-paper px-3.5 py-3">
            <dt className="text-xs text-muted">اثبات کامل فرمول‌های دوره</dt>
            <dd className="mt-1 text-xl font-semibold text-ink tabular-nums">{faInt(RS_FORMULA_PROOFS.length)} فرمول کلیدی</dd>
          </div>
        </dl>
      </section>

      {/* Part 1: Foundational Math Proofs */}
      <div className="mt-8">
        <ProofFoundations onJumpToDerivations={handleJumpToDerivations} />
      </div>

      {/* Part 2: Complete Step-by-Step RS & Light Physics Proofs */}
      <div ref={derivationsRef} className="mt-8 scroll-mt-24">
        <FormulaProofExplorer
          highlightedMethod={highlightedMethod}
          onClearHighlightedMethod={() => setHighlightedMethod(null)}
        />
      </div>

      {/* Part 3: 4-Step Protocol for Reading Any Mathematical Proof Forever */}
      <section className="mt-8 rounded-2xl border border-line bg-card p-5 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <p className="text-sm font-medium text-copper">جمع‌بندی کاربردی</p>
            <h2 className="mt-1 text-2xl font-semibold">پروتکل ۴ پرسشی برای درک هر اثبات جدید</h2>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link to="/math" className="font-medium text-cane hover:underline">
              مرور ریاضیات پایه و نمادها
            </Link>
            <Link to="/formulas" className="font-medium text-cane hover:underline">
              مرجع فرمول‌ها و مبدل سریع
            </Link>
          </div>
        </div>

        <ol className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {READING_CHECKLIST.map((item) => (
            <li key={item.step} className="rounded-xl border border-line bg-paper p-4">
              <span className="text-xs font-semibold text-copper tabular-nums">{item.step}</span>
              <h3 className="mt-1.5 text-base font-semibold text-ink">{item.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.detail}</p>
            </li>
          ))}
        </ol>
      </section>
    </Shell>
  );
}
