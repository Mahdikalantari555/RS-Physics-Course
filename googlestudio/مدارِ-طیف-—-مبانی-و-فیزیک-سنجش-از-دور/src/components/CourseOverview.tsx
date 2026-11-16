import { ArrowLeft, BookOpen, CheckCircle2, FlaskConical, RotateCcw } from 'lucide-react';
import type { CourseModule } from '../data/courseCurriculum';
import { calculateCompletionStats } from '../utils/courseStorage';
import { ResilientImage } from './ResilientImage';

interface CourseOverviewProps {
  modules: CourseModule[];
  completedModuleIds: string[];
  lastActiveModuleId: string;
  quizPassed: boolean;
  quizScorePercent: number | null;
  onSelectModule: (moduleId: string) => void;
  onStartExam: () => void;
  onResetProgress: () => void;
}

export function CourseOverview({
  modules,
  completedModuleIds,
  lastActiveModuleId,
  quizPassed,
  quizScorePercent,
  onSelectModule,
  onStartExam,
  onResetProgress,
}: CourseOverviewProps) {
  const stats = calculateCompletionStats(completedModuleIds, modules.length);
  const hasProgress = stats.completedCount > 0 || quizScorePercent !== null;

  return (
    <div className="space-y-10">
      {/* Split Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
        <div className="lg:col-span-7 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="text-xs font-medium text-sky-700">
              دوره خودآموز دانشگاهی · فیزیک و فناوری دیدبانی زمین
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight [text-wrap:balance]">
              مبانی و فیزیک سنجش از دور
            </h1>
            <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
              از دوگانگی موج و فوتون تا قوانین تابش جسم سیاه، پنجره‌های عبور جوی، امضای طیفی عوارض و
              طراحی سنجنده‌های اپتیکی و راداری؛ هر مفهوم را با شبیه‌سازهای فیزیکی زنده آزمایش کنید.
            </p>
          </div>

          <div className="space-y-4">
            {hasProgress && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                <div className="flex items-center justify-between text-xs text-slate-700 mb-2">
                  <span className="font-medium">پیشرفت شما در سرفصل‌های دوره</span>
                  <span className="font-mono-tech font-semibold tabular-nums" dir="ltr">
                    {stats.completedCount}/{stats.totalCount} ({stats.percentage}%)
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sky-600 transition-all duration-200"
                    style={{ width: `${stats.percentage}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onSelectModule(lastActiveModuleId || modules[0].id)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-xl transition-colors whitespace-nowrap shrink-0"
              >
                <span>{hasProgress ? 'ادامه یادگیری و آزمایشگاه' : 'شروع فصل اول'}</span>
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onStartExam}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors whitespace-nowrap shrink-0"
              >
                <span>آزمون جامع ارزیابی</span>
              </button>

              {hasProgress && (
                <button
                  type="button"
                  onClick={onResetProgress}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium text-slate-500 hover:text-rose-700 transition-colors whitespace-nowrap shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>پاکسازی پیشرفت</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="h-full min-h-60 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
            <ResilientImage
              src="/src/assets/images/hero_remote_sensing_orbit_1794852110188.jpg"
              alt="تصویرسازی علمی ماهواره دیدبانی زمین در حال اسکن سطح زمین"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4-Column Quantitative Strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-xs text-slate-500 mb-1">سرفصل‌های آموزشی</div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">۵ فصل</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-xs text-slate-500 mb-1">آزمایشگاه شبیه‌ساز</div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">۵ شبیه‌ساز</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-xs text-slate-500 mb-1">معادلات و قوانین پایه</div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">۹ معادله</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-xs text-slate-500 mb-1">وضعیت آزمون نهایی</div>
          <div className="text-lg font-bold text-slate-900 tabular-nums">
            {quizScorePercent !== null
              ? `${quizScorePercent}% (${quizPassed ? 'قبول' : 'نیاز به مرور'})`
              : '۸ پرسش تحلیلی'}
          </div>
        </div>
      </section>

      {/* Curriculum Roadmap */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">نقشه راه و سرفصل‌های دوره</h2>
            <p className="text-sm text-slate-600 mt-1">
              هر فصل شامل درس‌نامه گام‌به‌گام، شبیه‌ساز تعاملی اختصاصی و آزمونک تثبیت یادگیری است.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((mod) => {
            const isCompleted = completedModuleIds.includes(mod.id);
            return (
              <div
                key={mod.id}
                className="flex flex-col justify-between bg-white border border-slate-200 rounded-xl p-5 hover:border-sky-300 transition-colors"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>
                      فصل {mod.orderNumber} · {mod.categoryFa} · {mod.durationFa}
                    </span>
                    <span className={isCompleted ? 'text-emerald-700 font-semibold' : 'text-slate-400'}>
                      {isCompleted ? '✓ تکمیل‌شده' : 'آماده مطالعه'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">{mod.titleFa}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{mod.subtitleFa}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                    <FlaskConical className="w-3.5 h-3.5 text-sky-600" aria-hidden="true" />
                    <span>{mod.steps.length} گام + آزمایشگاه</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectModule(mod.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>مرور فصل</span>
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>ورود به فصل</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}

          {/* Final Exam Card */}
          <div className="flex flex-col justify-between bg-slate-900 text-white border border-slate-800 rounded-xl p-5">
            <div className="space-y-2.5">
              <div className="text-xs text-slate-300">فصل ۰۶ · جمع‌بندی و ارزیابی</div>
              <h3 className="text-base font-bold text-white leading-snug">
                آزمون جامع فیزیک سنجش از دور
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                ارزیابی تسلط بر معادلات تابش، جو، امضای طیفی و رادار همراه با تحلیل تشریحی هر پاسخ.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-300 font-mono-tech tabular-nums">
                {quizScorePercent !== null ? `نمره فعلی: ${quizScorePercent}%` : '۸ پرسش استاندارد'}
              </span>
              <button
                type="button"
                onClick={onStartExam}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <span>شروع آزمون</span>
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
