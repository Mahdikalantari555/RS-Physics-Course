import { useEffect, useState } from 'react';
import { COURSE_MODULES, FINAL_EXAM_QUESTIONS } from './data/courseCurriculum';
import {
  clearCourseProgress,
  loadCourseProgress,
  saveCourseProgress,
  gradeQuiz,
  type CourseProgressState,
} from './utils/courseStorage';
import { CourseOverview } from './components/CourseOverview';
import { ModuleWorkspace } from './components/ModuleWorkspace';
import { FormulaReferenceView } from './components/FormulaReferenceView';
import { FinalQuizView } from './components/FinalQuizView';

type AppView = 'overview' | 'workspace' | 'formulas' | 'quiz';

function getInitialView(): AppView {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      return 'workspace';
    }
  }
  return 'overview';
}

export default function App() {
  const [progress, setProgress] = useState<CourseProgressState>(() => loadCourseProgress());
  const [activeView, setActiveView] = useState<AppView>(() => getInitialView());

  useEffect(() => {
    saveCourseProgress(progress);
  }, [progress]);

  const activeModule =
    COURSE_MODULES.find((m) => m.id === progress.lastActiveModuleId) || COURSE_MODULES[0];

  const quizSummary = progress.finalQuizSubmitted
    ? gradeQuiz(FINAL_EXAM_QUESTIONS, progress.finalQuizAnswers)
    : null;

  const handleSelectModule = (moduleId: string) => {
    setProgress((prev) => ({
      ...prev,
      lastActiveModuleId: moduleId,
    }));
    setActiveView('workspace');
  };

  const handleSubmitCheckpoint = (
    moduleId: string,
    questionId: string,
    optionId: string,
    isCorrect: boolean
  ) => {
    setProgress((prev) => {
      const nextCompleted = isCorrect
        ? Array.from(new Set([...prev.completedModuleIds, moduleId]))
        : prev.completedModuleIds;
      return {
        ...prev,
        completedModuleIds: nextCompleted,
        checkpointSelections: {
          ...prev.checkpointSelections,
          [questionId]: optionId,
        },
      };
    });
  };

  const handleSelectQuizAnswer = (questionId: string, optionId: string) => {
    setProgress((prev) => ({
      ...prev,
      finalQuizAnswers: {
        ...prev.finalQuizAnswers,
        [questionId]: optionId,
      },
    }));
  };

  const handleSubmitQuiz = () => {
    setProgress((prev) => ({
      ...prev,
      finalQuizSubmitted: true,
    }));
  };

  const handleRetryQuiz = () => {
    setProgress((prev) => ({
      ...prev,
      finalQuizAnswers: {},
      finalQuizSubmitted: false,
    }));
  };

  const handleResetProgress = () => {
    const fresh = clearCourseProgress();
    setProgress(fresh);
  };

  const navItems: Array<{ id: AppView; label: string }> = [
    { id: 'overview', label: 'نقشه دوره' },
    { id: 'workspace', label: 'آزمایشگاه‌ها' },
    { id: 'formulas', label: 'فرمول‌ها و ریاضی' },
    { id: 'quiz', label: 'آزمون نهایی' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Three-Zone Top Bar Contract */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Wordmark */}
          <button
            type="button"
            onClick={() => setActiveView('overview')}
            className="text-lg font-bold tracking-tight text-slate-900 hover:text-sky-700 transition-colors whitespace-nowrap shrink-0"
          >
            مدارِ طیف
          </button>

          {/* Zone 2: 4 Clean Single-Line Nav Links */}
          <nav aria-label="ناوبری اصلی دوره" className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveView(item.id)}
                  className={`text-sm font-medium py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-sky-700 border-sky-600'
                      : 'text-slate-600 border-transparent hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setActiveView(activeView === 'workspace' ? 'quiz' : 'workspace')}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              {activeView === 'workspace' ? 'آزمون نهایی' : 'ورود به آزمایشگاه'}
            </button>
          </div>
        </div>

        {/* Mobile Compact Nav Row */}
        <nav
          aria-label="ناوبری موبایل"
          className="md:hidden border-t border-slate-100 px-4 py-2 flex items-center justify-between gap-2 overflow-x-auto"
        >
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveView(item.id)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap shrink-0 ${
                  isActive ? 'bg-sky-50 text-sky-700' : 'text-slate-600'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeView === 'overview' && (
          <CourseOverview
            modules={COURSE_MODULES}
            completedModuleIds={progress.completedModuleIds}
            lastActiveModuleId={progress.lastActiveModuleId}
            quizPassed={quizSummary ? quizSummary.passed : false}
            quizScorePercent={quizSummary ? quizSummary.scorePercent : null}
            onSelectModule={handleSelectModule}
            onStartExam={() => setActiveView('quiz')}
            onResetProgress={handleResetProgress}
          />
        )}

        {activeView === 'workspace' && (
          <ModuleWorkspace
            modules={COURSE_MODULES}
            activeModule={activeModule}
            completedModuleIds={progress.completedModuleIds}
            checkpointSelections={progress.checkpointSelections}
            onSelectModule={handleSelectModule}
            onSubmitCheckpoint={handleSubmitCheckpoint}
            onGoToExam={() => setActiveView('quiz')}
          />
        )}

        {activeView === 'formulas' && <FormulaReferenceView />}

        {activeView === 'quiz' && (
          <FinalQuizView
            answers={progress.finalQuizAnswers}
            submitted={progress.finalQuizSubmitted}
            onSelectAnswer={handleSelectQuizAnswer}
            onSubmitQuiz={handleSubmitQuiz}
            onRetryQuiz={handleRetryQuiz}
            onBackToCourse={() => setActiveView('overview')}
          />
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <span>مدارِ طیف — آموزش تعاملی مبانی و فیزیک سنجش از دور</span>
          <span>واحدهای استاندارد SI · کورس آزمایشگاهی تعاملی</span>
        </div>
      </footer>
    </div>
  );
}
