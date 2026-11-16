import { useState } from 'react';
import { computeSensorGeometry, quantizeRadiometric } from '../../physics/remoteSensing';

// 8x5 synthetic brightness field representing river, urban blocks, and gradient terrain
const BASE_SCENE = [
  [0.12, 0.14, 0.42, 0.56, 0.64, 0.72, 0.85, 0.91],
  [0.1, 0.22, 0.48, 0.61, 0.68, 0.75, 0.88, 0.94],
  [0.15, 0.35, 0.54, 0.63, 0.28, 0.31, 0.79, 0.86],
  [0.24, 0.41, 0.58, 0.66, 0.3, 0.26, 0.71, 0.77],
  [0.32, 0.49, 0.62, 0.7, 0.44, 0.38, 0.65, 0.74],
];

const FEATURE_TYPES = [
  ['water', 'water', 'veg', 'veg', 'veg', 'soil', 'urban', 'urban'],
  ['water', 'veg', 'veg', 'veg', 'soil', 'soil', 'urban', 'urban'],
  ['water', 'veg', 'veg', 'soil', 'water', 'water', 'soil', 'urban'],
  ['veg', 'veg', 'soil', 'soil', 'water', 'water', 'soil', 'soil'],
  ['veg', 'soil', 'soil', 'soil', 'veg', 'veg', 'soil', 'soil'],
] as const;

export function SensorResolutionLab() {
  const [altitudeKm, setAltitudeKm] = useState<number>(700);
  const [ifovMrad, setIfovMrad] = useState<number>(0.043);
  const [fovDeg, setFovDeg] = useState<number>(15);
  const [bitDepth, setBitDepth] = useState<number>(8);
  const [sensorMode, setSensorMode] = useState<'optical' | 'sar'>('optical');
  const [isNight, setIsNight] = useState<boolean>(false);
  const [hasClouds, setHasClouds] = useState<boolean>(true);

  const geometry = computeSensorGeometry(altitudeKm, ifovMrad, fovDeg);
  const totalLevels = Math.pow(2, bitDepth);

  const getCellStyle = (r: number, c: number, baseVal: number) => {
    const feat = FEATURE_TYPES[r][c];
    const isCloudCell = hasClouds && r <= 2 && c >= 1 && c <= 5;

    if (sensorMode === 'optical') {
      if (isNight) {
        return { bg: 'rgb(12, 16, 28)', label: 'تاریکی شب (نبود نور خورشید)' };
      }
      if (isCloudCell) {
        return { bg: 'rgb(241, 245, 249)', label: 'مسدودشده با ابر' };
      }
      const q = quantizeRadiometric(baseVal, bitDepth);
      const lum = Math.round(q.reconstructed * 255);
      return { bg: `rgb(${lum}, ${lum}, ${lum})`, label: `DN=${q.dn}` };
    }

    // Active SAR Microwave mode: penetrates clouds, works at night
    // Water = specular dark (~0.08), Veg = volume scatter (~0.48), Soil = (~0.32), Urban = bright double-bounce (~0.95)
    let sarBackscatter = 0.35;
    if (feat === 'water') sarBackscatter = 0.06;
    else if (feat === 'veg') sarBackscatter = 0.46;
    else if (feat === 'soil') sarBackscatter = 0.28;
    else if (feat === 'urban') sarBackscatter = 0.94;

    const q = quantizeRadiometric(sarBackscatter, bitDepth);
    const lum = Math.round(q.reconstructed * 255);
    return { bg: `rgb(${lum}, ${lum}, ${lum})`, label: `σ⁰ DN=${q.dn}` };
  };

  return (
    <div className="flex flex-col gap-5" data-testid="lab-sensor-resolution">
      {/* Geometry & Spatial/Swath Lab */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
        <h3 className="text-sm font-semibold text-slate-900 mb-1">
          محاسبه‌گر هندسه تصویربرداری (تفکیک مکانی و پهنای جاروب)
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          تنظیم ارتفاع مداری (H)، زاویه دید لحظه‌ای (IFOV) و میدان دید کل (FOV)
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <label htmlFor="sens-alt-slider" className="font-medium text-slate-800">
                ارتفاع مدار (H)
              </label>
              <span className="font-mono-tech font-semibold text-slate-900" dir="ltr">
                {altitudeKm} km
              </span>
            </div>
            <input
              id="sens-alt-slider"
              type="range"
              min={400}
              max={1200}
              step={20}
              value={altitudeKm}
              dir="ltr"
              onChange={(e) => setAltitudeKm(parseInt(e.target.value, 10))}
              className="lab-slider w-full"
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <label htmlFor="sens-ifov-slider" className="font-medium text-slate-800">
                زاویه لحظه‌ای (IFOV)
              </label>
              <span className="font-mono-tech font-semibold text-slate-900" dir="ltr">
                {ifovMrad.toFixed(3)} mrad
              </span>
            </div>
            <input
              id="sens-ifov-slider"
              type="range"
              min={0.01}
              max={0.15}
              step={0.005}
              value={ifovMrad}
              dir="ltr"
              onChange={(e) => setIfovMrad(parseFloat(e.target.value))}
              className="lab-slider w-full"
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <label htmlFor="sens-fov-slider" className="font-medium text-slate-800">
                میدان دید سنجنده (FOV)
              </label>
              <span className="font-mono-tech font-semibold text-slate-900" dir="ltr">
                {fovDeg}°
              </span>
            </div>
            <input
              id="sens-fov-slider"
              type="range"
              min={4}
              max={45}
              step={1}
              value={fovDeg}
              dir="ltr"
              onChange={(e) => setFovDeg(parseInt(e.target.value, 10))}
              className="lab-slider w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
            <div className="text-xs text-slate-500">اندازه پیکسل روی زمین (GSD)</div>
            <div className="text-lg font-semibold font-mono-tech text-slate-900 tabular-nums mt-0.5" dir="ltr">
              {geometry.gsdMeters.toFixed(1)} m
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
            <div className="text-xs text-slate-500">پهنای جاروب (Swath Width)</div>
            <div className="text-lg font-semibold font-mono-tech text-slate-900 tabular-nums mt-0.5" dir="ltr">
              {geometry.swathKm.toFixed(1)} km
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
            <div className="text-xs text-slate-500">تعداد پیکسل در هر خط اسکن</div>
            <div className="text-lg font-semibold font-mono-tech text-slate-900 tabular-nums mt-0.5" dir="ltr">
              {geometry.pixelsAcrossTrack.toLocaleString()} px
            </div>
          </div>
        </div>
      </div>

      {/* Radiometric Quantization + Passive Optical vs Active SAR Simulator */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              تفکیک رادیومتری (عمق بیتی) و مقایسه اپتیکی با رادار فعال (SAR)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              تأثیر کاهش بیت بر پله‌ای شدن تصویر و توانایی رادار در عبور از ابر و شب
            </p>
          </div>
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => setSensorMode('optical')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                sensorMode === 'optical' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              اپتیکی غیرفعال
            </button>
            <button
              type="button"
              onClick={() => setSensorMode('sar')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                sensorMode === 'sar' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              رادار فعال SAR
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
          <div>
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <label htmlFor="sens-bit-slider" className="font-medium text-slate-800">
                  تفکیک رادیومتری (Bit Depth)
                </label>
                <span className="font-mono-tech font-semibold text-slate-900" dir="ltr">
                  {bitDepth}-bit ({totalLevels} سطح خاکستری)
                </span>
              </div>
              <input
                id="sens-bit-slider"
                type="range"
                min={1}
                max={10}
                step={1}
                value={bitDepth}
                dir="ltr"
                onChange={(e) => setBitDepth(parseInt(e.target.value, 10))}
                className="lab-slider w-full"
              />
            </div>

            <div className="flex flex-col gap-2.5 text-xs text-slate-700">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasClouds}
                  onChange={(e) => setHasClouds(e.target.checked)}
                  className="rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                />
                <span>وجود توده ابر متراکم بر فراز منطقه</span>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isNight}
                  onChange={(e) => setIsNight(e.target.checked)}
                  className="rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                />
                <span>تصویربرداری در نیمه‌شب (نبود تابش خورشیدی)</span>
              </label>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
              {sensorMode === 'optical'
                ? hasClouds || isNight
                  ? '▲ محدودیت سنجنده غیرفعال: در شب یا زیر پوشش ابر، سیگنال بازتابی سطح زمین به سنجنده اپتیکی نمی‌رسد.'
                  : '✓ سنجنده اپتیکی در روز صاف: تغییر عمق بیتی را از ۱ تا ۱۰ بیت جابه‌جا کنید تا از بین رفتن جزئیات در ۱ و ۲ بیت را ببینید.'
                : '✓ رادار فعال SAR: موج ریزموج از ابر عبور می‌کند و مستقل از خورشید است؛ رودخانه (بازتاب آینه‌ای) سیاه و بلوک شهری (پس‌پراکنش گوشه‌ای) روشن دیده می‌شود.'}
            </div>
          </div>

          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
            <div className="grid grid-cols-8 gap-1">
              {BASE_SCENE.map((row, rIdx) =>
                row.map((val, cIdx) => {
                  const cell = getCellStyle(rIdx, cIdx, val);
                  return (
                    <div
                      key={`${rIdx}-${cIdx}`}
                      title={cell.label}
                      className="h-9 rounded-xs transition-colors"
                      style={{ backgroundColor: cell.bg }}
                    />
                  );
                })
              )}
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2.5 font-mono-tech" dir="ltr">
              <span>{sensorMode === 'optical' ? 'OPTICAL VIS/NIR' : 'ACTIVE C-BAND SAR'}</span>
              <span>{bitDepth}-BIT · {totalLevels} DN</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
