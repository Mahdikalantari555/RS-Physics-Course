import { useState } from 'react';
import { Calculator, Search, Sigma } from 'lucide-react';
import { FORMULA_REFERENCES } from '../data/courseCurriculum';
import { INTERACTIVE_FORMULAS } from '../data/interactiveFormulas';
import {
  MATH_FOUNDATIONS_MODULES,
  MATHEMATICAL_SYMBOLS_TABLE,
} from '../data/mathFoundations';
import { computeWaveProperties, wienPeakWavelength } from '../physics/remoteSensing';
import {
  computeObliqueTransmittance,
  decibelsToLinear,
  degreesToRadians,
  filterMathSymbols,
  linearToDecibels,
  type SymbolCategoryFilter,
} from '../utils/mathHelpers';
import { InteractiveFormula } from './InteractiveFormula';

type MathViewTab = 'formulas' | 'math-course' | 'symbols';

const FORMULA_IDS = Object.keys(INTERACTIVE_FORMULAS);

const SYMBOL_CATEGORIES: Array<{ id: SymbolCategoryFilter; labelFa: string }> = [
  { id: 'all', labelFa: 'همه نمادها' },
  { id: 'greek-var', labelFa: 'حروف یونانی و متغیرها' },
  { id: 'operator', labelFa: 'عملگرها و توابع' },
  { id: 'calculus', labelFa: 'حسابان و منطق' },
  { id: 'constant-unit', labelFa: 'ثابت‌ها و واحدها' },
];

export function FormulaReferenceView() {
  const [activeTab, setActiveTab] = useState<MathViewTab>('formulas');
  const [selectedFormulaId, setSelectedFormulaId] = useState<string>('planck-law');
  const [selectedMathLessonId, setSelectedMathLessonId] = useState<string>(
    MATH_FOUNDATIONS_MODULES[0].id
  );

  // Symbol table filters
  const [symbolCat, setSymbolCat] = useState<SymbolCategoryFilter>('all');
  const [symbolQuery, setSymbolQuery] = useState<string>('');

  // Quick physics & math interactive calculators
  const [quickLambdaUm, setQuickLambdaUm] = useState<string>('0.65');
  const [quickTempK, setQuickTempK] = useState<string>('300');
  const [opticalDepthK, setOpticalDepthK] = useState<number>(0.25);
  const [zenithDeg, setZenithDeg] = useState<number>(30);
  const [linearSigma, setLinearSigma] = useState<number>(0.05);
  const [angleDeg, setAngleDeg] = useState<number>(1.0);

  const parsedLambda = parseFloat(quickLambdaUm);
  const validLambda = Number.isFinite(parsedLambda) && parsedLambda > 0;
  const waveProps = validLambda ? computeWaveProperties(parsedLambda) : null;

  const parsedTemp = parseFloat(quickTempK);
  const validTemp = Number.isFinite(parsedTemp) && parsedTemp > 0;
  const wienPeak = validTemp ? wienPeakWavelength(parsedTemp) : null;

  const obliqueRes = computeObliqueTransmittance(opticalDepthK, zenithDeg);
  const sarDb = linearToDecibels(linearSigma);
  const radConv = degreesToRadians(angleDeg);

  const filteredSymbols = filterMathSymbols(MATHEMATICAL_SYMBOLS_TABLE, symbolCat, symbolQuery);
  const activeMathLesson =
    MATH_FOUNDATIONS_MODULES.find((m) => m.id === selectedMathLessonId) ||
    MATH_FOUNDATIONS_MODULES[0];

  return (
    <div className="space-y-6">
      {/* Header & Section Switcher */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            مرجع ریاضیات پایه، کالبدشکافی فرمول‌ها و جدول نمادها
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            یادگیری از بیس ریاضی تا تحلیل جزءبه‌جزء معادلات سنجش از دور؛ روی هر نماد در فرمول‌ها کلیک کنید.
          </p>
        </div>

        <div
          className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 rounded-xl"
          role="tablist"
          aria-label="بخش‌های ریاضی و فرمول‌ها"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'formulas'}
            onClick={() => setActiveTab('formulas')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'formulas'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            کالبدشکافی تعاملی فرمول‌ها
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'math-course'}
            onClick={() => setActiveTab('math-course')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'math-course'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            آموزش کامل ریاضی از پایه (۶ درس)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'symbols'}
            onClick={() => setActiveTab('symbols')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'symbols'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            جدول کامل نمادهای ریاضی ({MATHEMATICAL_SYMBOLS_TABLE.length})
          </button>
        </div>
      </div>

      {/* TAB 1: Interactive Formula Inspector + Calculators + Overview Table */}
      {activeTab === 'formulas' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Formula Selector List */}
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-4 space-y-2">
              <div className="text-xs font-semibold text-slate-700 pb-2 border-b border-slate-100">
                انتخاب معادله برای بررسی اجزا ({FORMULA_IDS.length} معادله)
              </div>
              <div className="space-y-1.5">
                {FORMULA_IDS.map((fId) => {
                  const def = INTERACTIVE_FORMULAS[fId];
                  const isActive = fId === selectedFormulaId;
                  return (
                    <button
                      key={fId}
                      type="button"
                      onClick={() => setSelectedFormulaId(fId)}
                      className={`w-full text-right p-2.5 rounded-lg border transition-colors ${
                        isActive
                          ? 'bg-sky-50 border-sky-300 text-sky-950'
                          : 'bg-white border-slate-100 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-xs font-semibold">{def.nameFa}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{def.categoryFa}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Interactive Formula Stage */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
                <div>
                  <div className="text-xs text-sky-700 font-medium">
                    {INTERACTIVE_FORMULAS[selectedFormulaId].categoryFa}
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                    {INTERACTIVE_FORMULAS[selectedFormulaId].nameFa}
                  </h2>
                  <p className="text-xs text-slate-600 mt-1">
                    {INTERACTIVE_FORMULAS[selectedFormulaId].summaryFa}
                  </p>
                </div>

                <InteractiveFormula key={selectedFormulaId} formulaId={selectedFormulaId} />
              </div>

              {/* Quick Calculators */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2.5">
                  <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Calculator className="w-3.5 h-3.5 text-sky-600" aria-hidden="true" />
                    <span>مبدل طول‌موج به بسامد و انرژی فوتون</span>
                  </h3>
                  <div className="flex items-center gap-2">
                    <label htmlFor="calc-lambda" className="text-xs text-slate-700 whitespace-nowrap">
                      طول‌موج (μm):
                    </label>
                    <input
                      id="calc-lambda"
                      type="number"
                      step="0.01"
                      min="0.01"
                      value={quickLambdaUm}
                      onChange={(e) => setQuickLambdaUm(e.target.value)}
                      dir="ltr"
                      className="w-28 px-2.5 py-1 text-xs font-mono-tech border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  {waveProps ? (
                    <div className="text-xs text-slate-700 space-y-1 pt-1 border-t border-slate-100">
                      <div className="flex justify-between">
                        <span>بسامد (ν):</span>
                        <span className="font-mono-tech font-semibold" dir="ltr">
                          {waveProps.frequencyTHz >= 1
                            ? `${waveProps.frequencyTHz.toFixed(2)} THz`
                            : `${(waveProps.frequencyHz / 1e9).toFixed(3)} GHz`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>انرژی (E):</span>
                        <span className="font-mono-tech font-semibold" dir="ltr">
                          {waveProps.energyEv.toFixed(4)} eV
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-rose-600">عدد معتبر بزرگ‌تر از صفر وارد کنید.</p>
                  )}
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2.5">
                  <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Calculator className="w-3.5 h-3.5 text-sky-600" aria-hidden="true" />
                    <span>محاسبه قله قانون وین (λ_max = b / T)</span>
                  </h3>
                  <div className="flex items-center gap-2">
                    <label htmlFor="calc-temp" className="text-xs text-slate-700 whitespace-nowrap">
                      دما (K):
                    </label>
                    <input
                      id="calc-temp"
                      type="number"
                      step="1"
                      min="1"
                      value={quickTempK}
                      onChange={(e) => setQuickTempK(e.target.value)}
                      dir="ltr"
                      className="w-28 px-2.5 py-1 text-xs font-mono-tech border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  {wienPeak !== null ? (
                    <div className="text-xs text-slate-700 pt-1 border-t border-slate-100 flex justify-between">
                      <span>طول‌موج قله (λ_max):</span>
                      <span className="font-mono-tech font-bold text-slate-900" dir="ltr">
                        {wienPeak.toFixed(3)} μm
                      </span>
                    </div>
                  ) : (
                    <p className="text-xs text-rose-600">دمای مطلق معتبر وارد کنید.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Summary Table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-700">
              خلاصه سریع همه معادلات دوره
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-slate-50/60 border-b border-slate-200 text-xs font-semibold text-slate-700">
                    <th className="py-3 px-4">عنوان قانون / شاخص</th>
                    <th className="py-3 px-4">رابطه ریاضی</th>
                    <th className="py-3 px-4">ثابت‌ها و متغیرها</th>
                    <th className="py-3 px-4">کاربرد در سنجش از دور</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {FORMULA_REFERENCES.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/70">
                      <td className="py-3 px-4 font-semibold text-slate-900 whitespace-nowrap">
                        {item.nameFa}
                      </td>
                      <td
                        className="py-3 px-4 font-mono-tech text-sky-800 font-medium whitespace-nowrap"
                        dir="ltr"
                      >
                        {item.equation}
                      </td>
                      <td className="py-3 px-4 text-slate-600">{item.variablesFa}</td>
                      <td className="py-3 px-4 text-slate-700">{item.applicationFa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Foundational Math Course (From Scratch) */}
      {activeTab === 'math-course' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Curriculum Navigation */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-4 space-y-2">
            <div className="text-xs font-semibold text-slate-700 pb-2 border-b border-slate-100">
              سرفصل آموزش ریاضیات از بیس
            </div>
            {MATH_FOUNDATIONS_MODULES.map((lesson) => {
              const isSelected = lesson.id === activeMathLesson.id;
              return (
                <button
                  key={lesson.id}
                  type="button"
                  onClick={() => setSelectedMathLessonId(lesson.id)}
                  className={`w-full text-right p-3 rounded-lg border transition-colors ${
                    isSelected
                      ? 'bg-sky-50 border-sky-300 text-sky-950'
                      : 'bg-white border-slate-100 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-[11px] font-medium text-sky-700">{lesson.orderFa}</div>
                  <div className="text-xs font-bold mt-0.5 leading-snug">{lesson.titleFa}</div>
                </button>
              );
            })}
          </div>

          {/* Active Math Lesson + Interactive Math Playground */}
          <div className="lg:col-span-8 space-y-5">
            <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-5">
              <div>
                <div className="text-xs font-medium text-sky-700">{activeMathLesson.orderFa} · آموزش گام‌به‌گام ریاضی</div>
                <h2 className="text-xl font-bold text-slate-900 mt-1">{activeMathLesson.titleFa}</h2>
                <p className="text-sm text-slate-600 mt-1">{activeMathLesson.subtitleFa}</p>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 border border-slate-200 rounded-xl p-4">
                {activeMathLesson.coreIdeaFa}
              </p>

              {/* Step by step mathematical building blocks */}
              <div className="space-y-3">
                {activeMathLesson.stepByStepFa.map((step) => (
                  <div key={step.stepTitleFa} className="border border-slate-200 rounded-xl p-4 space-y-2">
                    <h3 className="text-sm font-bold text-slate-900">{step.stepTitleFa}</h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{step.detailFa}</p>
                    <div
                      dir="ltr"
                      className="bg-slate-900 text-slate-100 font-mono-tech text-xs sm:text-sm rounded-lg px-3.5 py-2.5 overflow-x-auto"
                    >
                      {step.exampleLtr}
                    </div>
                  </div>
                ))}
              </div>

              {/* Linked Clickable Formula */}
              <InteractiveFormula
                key={`math-${activeMathLesson.formulaId}`}
                formulaId={activeMathLesson.formulaId}
              />

              <div className="bg-sky-50 border border-sky-200 rounded-xl p-3.5 text-xs text-sky-950 leading-relaxed">
                <span className="font-semibold">پیوند با سنجش از دور: </span>
                {activeMathLesson.rsConnectionFa}
              </div>
            </div>

            {/* Interactive Math Sandbox (Exp/Log/dB & Trig Radians) */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2">
                <Sigma className="w-4 h-4 text-sky-600" aria-hidden="true" />
                <h3 className="text-sm font-bold text-slate-900">
                  آزمایشگاه عددی توابع ریاضی (نمایی، لگاریتم دسی‌بل و رادیان)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Exponential & sec(theta) sandbox */}
                <div className="border border-slate-200 rounded-lg p-3.5 space-y-2.5">
                  <div className="text-xs font-bold text-slate-900">۱. میرایی نمایی exp(−k·sec θ)</div>
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <label htmlFor="math-k">عمق نوری (k):</label>
                      <span className="font-mono-tech font-semibold" dir="ltr">{opticalDepthK.toFixed(2)}</span>
                    </div>
                    <input
                      id="math-k"
                      type="range"
                      min={0.05}
                      max={1.5}
                      step={0.05}
                      value={opticalDepthK}
                      dir="ltr"
                      onChange={(e) => setOpticalDepthK(parseFloat(e.target.value))}
                      className="lab-slider w-full"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <label htmlFor="math-theta">زاویه سرسویی (θ):</label>
                      <span className="font-mono-tech font-semibold" dir="ltr">{zenithDeg}°</span>
                    </div>
                    <input
                      id="math-theta"
                      type="range"
                      min={0}
                      max={75}
                      step={1}
                      value={zenithDeg}
                      dir="ltr"
                      onChange={(e) => setZenithDeg(parseInt(e.target.value, 10))}
                      className="lab-slider w-full"
                    />
                  </div>
                  <div className="pt-2 border-t border-slate-100 text-[11px] space-y-1 font-mono-tech" dir="ltr">
                    <div>sec(θ) = {obliqueRes.airMassFactor.toFixed(2)}× path</div>
                    <div className="font-bold text-sky-700">
                      τ = {(obliqueRes.transmittance * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>

                {/* Logarithm / dB sandbox */}
                <div className="border border-slate-200 rounded-lg p-3.5 space-y-2.5">
                  <div className="text-xs font-bold text-slate-900">۲. مقیاس لگاریتمی دسی‌بل (SAR)</div>
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <label htmlFor="math-sigma">بازتاب خطی (σ⁰):</label>
                      <span className="font-mono-tech font-semibold" dir="ltr">{linearSigma.toFixed(3)}</span>
                    </div>
                    <input
                      id="math-sigma"
                      type="range"
                      min={-30}
                      max={10}
                      step={1}
                      value={Math.round(sarDb)}
                      dir="ltr"
                      onChange={(e) => setLinearSigma(decibelsToLinear(parseFloat(e.target.value)))}
                      className="lab-slider w-full"
                    />
                  </div>
                  <div className="pt-2 border-t border-slate-100 text-[11px] space-y-1 font-mono-tech" dir="ltr">
                    <div>10·log₁₀({linearSigma.toFixed(4)})</div>
                    <div className="font-bold text-sky-700">{sarDb.toFixed(1)} dB</div>
                  </div>
                </div>

                {/* Degree / Radian sandbox */}
                <div className="border border-slate-200 rounded-lg p-3.5 space-y-2.5">
                  <div className="text-xs font-bold text-slate-900">۳. تبدیل زاویه درجه به رادیان و mrad</div>
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <label htmlFor="math-deg">زاویه (درجه):</label>
                      <span className="font-mono-tech font-semibold" dir="ltr">{angleDeg.toFixed(2)}°</span>
                    </div>
                    <input
                      id="math-deg"
                      type="range"
                      min={0.05}
                      max={90}
                      step={0.05}
                      value={angleDeg}
                      dir="ltr"
                      onChange={(e) => setAngleDeg(parseFloat(e.target.value))}
                      className="lab-slider w-full"
                    />
                  </div>
                  <div className="pt-2 border-t border-slate-100 text-[11px] space-y-1 font-mono-tech" dir="ltr">
                    <div>{radConv.radians.toFixed(4)} rad</div>
                    <div className="font-bold text-sky-700">
                      {radConv.milliradians.toFixed(1)} mrad
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Complete Mathematical Symbols Table */}
      {activeTab === 'symbols' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="فیلتر دسته‌بندی نمادها">
              {SYMBOL_CATEGORIES.map((cat) => {
                const active = symbolCat === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSymbolCat(cat.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-sky-600 text-white border-sky-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat.labelFa}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full sm:w-64">
              <Search
                className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={symbolQuery}
                onChange={(e) => setSymbolQuery(e.target.value)}
                placeholder="جستجوی نماد، نام یا کاربرد..."
                aria-label="جستجو در جدول نمادهای ریاضی"
                className="w-full pr-9 pl-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            {filteredSymbols.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-500">
                هیچ نمادی با عبارت جستجو‌شده یافت نشد. فیلتر را تغییر دهید یا جستجو را پاک کنید.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-700">
                      <th className="py-3 px-4">نماد</th>
                      <th className="py-3 px-4">نام و تلفظ / مقدار</th>
                      <th className="py-3 px-4">دسته‌بندی</th>
                      <th className="py-3 px-4">مفهوم و نقش ریاضی از پایه</th>
                      <th className="py-3 px-4">مثال واقعی در سنجش از دور</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                    {filteredSymbols.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/70">
                        <td className="py-3.5 px-4 whitespace-nowrap" dir="ltr">
                          <span className="inline-block font-mono-tech text-base font-bold text-sky-800 bg-sky-50 border border-sky-200 rounded-md px-2.5 py-1">
                            {item.symbol}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-900">{item.nameFa}</div>
                          <div className="text-[11px] font-mono-tech text-slate-500 mt-0.5" dir="ltr">
                            {item.pronunciation}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">
                          {item.categoryLabelFa}
                        </td>
                        <td className="py-3.5 px-4 text-slate-700 leading-relaxed max-w-xs">
                          {item.mathRoleFa}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 leading-relaxed max-w-xs">
                          {item.rsExampleFa}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
