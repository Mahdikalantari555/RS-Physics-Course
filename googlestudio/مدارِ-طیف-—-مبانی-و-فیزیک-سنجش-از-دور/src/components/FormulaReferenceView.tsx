import { useState } from 'react';
import { FORMULA_REFERENCES } from '../data/courseCurriculum';
import { computeWaveProperties, wienPeakWavelength } from '../physics/remoteSensing';

export function FormulaReferenceView() {
  const [quickLambdaUm, setQuickLambdaUm] = useState<string>('0.65');
  const [quickTempK, setQuickTempK] = useState<string>('300');

  const parsedLambda = parseFloat(quickLambdaUm);
  const validLambda = Number.isFinite(parsedLambda) && parsedLambda > 0;
  const waveProps = validLambda ? computeWaveProperties(parsedLambda) : null;

  const parsedTemp = parseFloat(quickTempK);
  const validTemp = Number.isFinite(parsedTemp) && parsedTemp > 0;
  const wienPeak = validTemp ? wienPeakWavelength(parsedTemp) : null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">مرجع فرمول‌ها و ثابت‌های فیزیکی سنجش از دور</h1>
        <p className="text-sm text-slate-600 mt-1">
          مجموعه روابط بنیادی الکترومغناطیس، ترمودینامیک تابش، جو و طراحی سنجنده‌ها همراه با مبدل سریع محاسباتی.
        </p>
      </div>

      {/* Quick Calculator Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
          <h2 className="text-sm font-bold text-slate-900">مبدل سریع طول‌موج به بسامد و انرژی فوتون</h2>
          <div className="flex items-center gap-3">
            <label htmlFor="calc-lambda" className="text-xs font-medium text-slate-700 whitespace-nowrap">
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
              className="w-36 px-3 py-1.5 text-sm font-mono-tech border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          {waveProps ? (
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
              <div>
                <span className="text-slate-500">بسامد: </span>
                <span className="font-mono-tech font-semibold text-slate-900" dir="ltr">
                  {waveProps.frequencyTHz >= 1
                    ? `${waveProps.frequencyTHz.toFixed(2)} THz`
                    : `${(waveProps.frequencyHz / 1e9).toFixed(3)} GHz`}
                </span>
              </div>
              <div>
                <span className="text-slate-500">انرژی: </span>
                <span className="font-mono-tech font-semibold text-slate-900" dir="ltr">
                  {waveProps.energyEv.toFixed(4)} eV
                </span>
              </div>
              <div className="col-span-2 text-sky-700 font-medium">{waveProps.band.nameFa}</div>
            </div>
          ) : (
            <p className="text-xs text-rose-600">لطفاً عددی بزرگ‌تر از صفر وارد کنید.</p>
          )}
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
          <h2 className="text-sm font-bold text-slate-900">محاسبه سریع قله قانون وین (λ_max = b / T)</h2>
          <div className="flex items-center gap-3">
            <label htmlFor="calc-temp" className="text-xs font-medium text-slate-700 whitespace-nowrap">
              دمای مطلق (K):
            </label>
            <input
              id="calc-temp"
              type="number"
              step="1"
              min="1"
              value={quickTempK}
              onChange={(e) => setQuickTempK(e.target.value)}
              dir="ltr"
              className="w-36 px-3 py-1.5 text-sm font-mono-tech border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          {wienPeak !== null ? (
            <div className="pt-2 border-t border-slate-100 text-xs flex items-center justify-between">
              <span className="text-slate-600">طول‌موج بیشینه گسیل طیفی:</span>
              <span className="font-mono-tech text-sm font-bold text-slate-900" dir="ltr">
                {wienPeak.toFixed(3)} μm
              </span>
            </div>
          ) : (
            <p className="text-xs text-rose-600">لطفاً دمای مطلق معتبر (بزرگ‌تر از صفر) وارد کنید.</p>
          )}
        </div>
      </div>

      {/* Formulas Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-700">
                <th className="py-3 px-4">عنوان قانون / شاخص</th>
                <th className="py-3 px-4">رابطه ریاضی</th>
                <th className="py-3 px-4">ثابت‌ها و متغیرها</th>
                <th className="py-3 px-4">کاربرد در سنجش از دور</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {FORMULA_REFERENCES.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70">
                  <td className="py-3.5 px-4 font-semibold text-slate-900 whitespace-nowrap">{item.nameFa}</td>
                  <td className="py-3.5 px-4 font-mono-tech text-sky-800 font-medium whitespace-nowrap" dir="ltr">
                    {item.equation}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{item.variablesFa}</td>
                  <td className="py-3.5 px-4 text-slate-700">{item.applicationFa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
