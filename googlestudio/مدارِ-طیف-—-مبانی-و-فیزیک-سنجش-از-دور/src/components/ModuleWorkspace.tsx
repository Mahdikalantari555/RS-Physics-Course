import { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import type { CourseModule, LabType } from '../data/courseCurriculum';
import { WaveSpectrumLab } from './labs/WaveSpectrumLab';
import { BlackbodyLab } from './labs/BlackbodyLab';
import { AtmosphereLab } from './labs/AtmosphereLab';
import { SpectralSignatureLab } from './labs/SpectralSignatureLab';
import { SensorResolutionLab } from './labs/SensorResolutionLab';

interface ModuleWorkspaceProps {
  modules: CourseModule[];
  activeModule: CourseModule;
  completedModuleIds: string[];
  checkpointSelections: Record<string, string>;
  onSelectModule: (moduleId: string) => void;
  onSubmitCheckpoint: (moduleId: string, questionId: string, optionId: string, isCorrect: boolean) => void;
  onGoToExam: () => void;
}

function renderLab(labType: LabType) {
  switch (labType) {
    case 'wave-spectrum':
      return <WaveSpectrumLab />;
    case 'blackbody-radiation':
      return <BlackbodyLab />;
    case 'atmosphere-windows':
      return <AtmosphereLab />;
    case 'spectral-signatures':
      return <SpectralSignatureLab />;
    case 'sensor-resolution':
      return <SensorResolutionLab />;
  }
}

export function ModuleWorkspace({
  modules,
  activeModule,
  completedModuleIds,
  checkpointSelections,
  onSelectModule,
  onSubmitCheckpoint,
  onGoToExam,
}: ModuleWorkspaceProps) {
  const [deckTab, setDeckTab] = useState<'step-0' | 'step-1' | 'checkpoint'>('step-0');
  const [pendingOption, setPendingOption] = useState<string>(
    checkpointSelections[activeModule.checkpoint.id] || ''
  );
  const [validationError, setValidationError] = useState<string>('');

  const currentIndex = modules.findIndex((m) => m.id === activeModule.id);
  const prevModule = currentIndex > 0 ? modules[currentIndex - 1] : null;
  const nextModule = currentIndex < modules.length - 1 ? modules[currentIndex + 1] : null;

  const savedSelection = checkpointSelections[activeModule.checkpoint.id];
  const isAnswered = Boolean(savedSelection);
  const isCorrect = savedSelection === activeModule.checkpoint.correctOptionId;
  const isModuleCompleted = completedModuleIds.includes(activeModule.id);

  const handleModuleSwitch = (moduleId: string) => {
    const target = modules.find((m) => m.id === moduleId);
    setDeckTab('step-0');
    setValidationError('');
    setPendingOption(target ? checkpointSelections[target.checkpoint.id] || '' : '');
    onSelectModule(moduleId);
  };

  const handleVerifyCheckpoint = () => {
    if (!pendingOption) {
      setValidationError('لطفاً پیش از ثبت، یکی از گزینه‌ها را انتخاب کنید.');
      return;
    }
    setValidationError('');
    const correct = pendingOption === activeModule.checkpoint.correctOptionId;
    onSubmitCheckpoint(activeModule.id, activeModule.checkpoint.id, pendingOption, correct);
  };

  return (
    <div className="space-y-5">
      {/* Module Strip Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200 rounded-xl p-3">
        <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="فصل‌های کورس">
          {modules.map((mod) => {
            const active = mod.id === activeModule.id;
            const done = completedModuleIds.includes(mod.id);
            return (
              <button
                key={mod.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => handleModuleSwitch(mod.id)}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-sky-600 text-white border-sky-600 font-semibold'
                    : done
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {done && !active ? '✓ ' : ''}فصل {mod.orderNumber}
              </button>
            );
          })}
        </div>

        <div className="text-xs text-slate-500">
          {activeModule.categoryFa} · {activeModule.durationFa}
          {isModuleCompleted ? ' · ✓ تکمیل‌شده' : ''}
        </div>
      </div>

      {/* Main Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            فصل {activeModule.orderNumber}: {activeModule.titleFa}
          </h1>
          <p className="text-sm text-slate-600 mt-1">{activeModule.subtitleFa}</p>
        </div>

        <div className="flex items-center gap-2">
          {prevModule && (
            <button
              type="button"
              onClick={() => handleModuleSwitch(prevModule.id)}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg whitespace-nowrap shrink-0"
            >
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
              <span>فصل قبلی</span>
            </button>
          )}
          {nextModule ? (
            <button
              type="button"
              onClick={() => handleModuleSwitch(nextModule.id)}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg whitespace-nowrap shrink-0"
            >
              <span>فصل بعدی</span>
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onGoToExam}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg whitespace-nowrap shrink-0"
            >
              <span>رفتن به آزمون جامع</span>
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Two-Zone Sandbox Split: 65% Stage + 35% Concept & Checkpoint Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Interactive Physics Stage */}
        <div className="lg:col-span-7 xl:col-span-8">{renderLab(activeModule.labType)}</div>

        {/* Guided Concept & Checkpoint Deck */}
        <aside className="lg:col-span-5 xl:col-span-4 bg-white border border-slate-200 rounded-xl p-5 space-y-5">
          {/* Step Tabs */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => setDeckTab('step-0')}
              className={`py-1.5 px-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                deckTab === 'step-0' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              گام ۱: مبانی
            </button>
            <button
              type="button"
              onClick={() => setDeckTab('step-1')}
              className={`py-1.5 px-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                deckTab === 'step-1' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              گام ۲: تحلیل
            </button>
            <button
              type="button"
              onClick={() => setDeckTab('checkpoint')}
              className={`py-1.5 px-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                deckTab === 'checkpoint' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isModuleCompleted ? '✓ آزمونک' : 'آزمونک فصل'}
            </button>
          </div>

          {deckTab !== 'checkpoint' ? (
            (() => {
              const stepIdx = deckTab === 'step-0' ? 0 : 1;
              const step = activeModule.steps[stepIdx];
              return (
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-sky-700 font-medium mb-1">
                      بخش {stepIdx + 1} از {activeModule.steps.length}
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 leading-snug">{step.titleFa}</h2>
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed">{step.summaryFa}</p>

                  {/* Key Equation Box */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <div className="text-xs text-slate-500 mb-1.5">رابطه کلیدی فیزیکی</div>
                    <div
                      className="text-sm font-semibold font-mono-tech text-slate-900 bg-white border border-slate-200 rounded-lg py-2.5 px-3 text-center overflow-x-auto"
                      dir="ltr"
                    >
                      {step.formulaLatexText}
                    </div>
                    <div className="text-xs text-slate-600 mt-2 leading-relaxed">{step.formulaDescFa}</div>
                  </div>

                  {/* Interactive Experiment Prompt */}
                  <div className="bg-sky-50 border border-sky-200 rounded-xl p-3.5 text-xs text-sky-950 leading-relaxed">
                    <span className="font-semibold">آزمایش پیشنهادی: </span>
                    {step.experimentPromptFa}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    {stepIdx === 0 ? (
                      <button
                        type="button"
                        onClick={() => setDeckTab('step-1')}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors"
                      >
                        <span>ادامه به گام دوم</span>
                        <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 w-full">
                        <button
                          type="button"
                          onClick={() => setDeckTab('step-0')}
                          className="inline-flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                        >
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>گام ۱</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeckTab('checkpoint')}
                          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors"
                        >
                          <span>ورود به آزمونک فصل</span>
                          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="space-y-4">
              <div>
                <div className="text-xs text-sky-700 font-medium mb-1">ارزیابی درک فیزیکی فصل</div>
                <h2 className="text-sm font-bold text-slate-900 leading-relaxed">
                  {activeModule.checkpoint.questionFa}
                </h2>
              </div>

              <div className="space-y-2" role="radiogroup" aria-label={activeModule.checkpoint.questionFa}>
                {activeModule.checkpoint.options.map((opt) => {
                  const selected = pendingOption === opt.id;
                  const isCorrectOpt = opt.id === activeModule.checkpoint.correctOptionId;
                  let borderCls = 'border-slate-200 bg-white hover:bg-slate-50';
                  if (isAnswered) {
                    if (isCorrectOpt) borderCls = 'border-emerald-400 bg-emerald-50';
                    else if (selected && !isCorrectOpt) borderCls = 'border-rose-300 bg-rose-50';
                  } else if (selected) {
                    borderCls = 'border-sky-500 bg-sky-50';
                  }

                  return (
                    <label
                      key={opt.id}
                      className={`flex items-start gap-2.5 p-3 rounded-lg border text-xs text-slate-800 cursor-pointer transition-colors ${borderCls}`}
                    >
                      <input
                        type="radio"
                        name={`checkpoint-${activeModule.id}`}
                        value={opt.id}
                        checked={selected}
                        onChange={() => {
                          setPendingOption(opt.id);
                          setValidationError('');
                        }}
                        className="mt-0.5 text-sky-600 focus:ring-sky-500"
                      />
                      <span className="leading-relaxed">{opt.labelFa}</span>
                    </label>
                  );
                })}
              </div>

              {validationError && (
                <p className="text-xs text-rose-700 font-medium" role="alert">
                  {validationError}
                </p>
              )}

              <button
                type="button"
                onClick={handleVerifyCheckpoint}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors"
              >
                {isAnswered ? 'بررسی مجدد پاسخ' : 'ثبت و بررسی پاسخ'}
              </button>

              {isAnswered && (
                <div
                  className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                    isCorrect
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : 'bg-amber-50 border-amber-200 text-amber-950'
                  }`}
                >
                  <div className="font-semibold mb-1 flex items-center gap-1.5">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                        <span>✓ پاسخ صحیح است — فصل تکمیل شد</span>
                      </>
                    ) : (
                      <span>▲ پاسخ نادرست است — توضیح فیزیکی را بخوانید و اصلاح کنید</span>
                    )}
                  </div>
                  <p>{activeModule.checkpoint.explanationFa}</p>
                </div>
              )}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
