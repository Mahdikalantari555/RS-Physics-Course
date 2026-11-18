import { useState } from "react";
import type { LabMeta } from "@/content/types";
import { useProgress } from "@/lib/progress";
import { computeSensorGeometry, quantizeRadiometric } from "@/lib/remoteSensing";

const BASE_SCENE = [
  [0.12, 0.14, 0.42, 0.56, 0.64, 0.72, 0.85, 0.91],
  [0.1, 0.22, 0.48, 0.61, 0.68, 0.75, 0.88, 0.94],
  [0.15, 0.35, 0.54, 0.63, 0.28, 0.31, 0.79, 0.86],
  [0.24, 0.41, 0.58, 0.66, 0.3, 0.26, 0.71, 0.77],
  [0.32, 0.49, 0.62, 0.7, 0.44, 0.38, 0.65, 0.74],
];

const FEATURE_TYPES = [
  ["water", "water", "veg", "veg", "veg", "soil", "urban", "urban"],
  ["water", "veg", "veg", "veg", "soil", "soil", "urban", "urban"],
  ["water", "veg", "veg", "soil", "water", "water", "soil", "urban"],
  ["veg", "veg", "soil", "soil", "water", "water", "soil", "soil"],
  ["veg", "soil", "soil", "soil", "veg", "veg", "soil", "soil"],
] as const;

export const labMeta: LabMeta = {
  id: "sensor-resolution",
  title: "تفکیک‌پذیری سنجنده و SAR",
  summary: "موازنه GSD، عمق بیتی رادیومتری، اپتیکی در برابر رادار فعال و درخواست‌های SAR.",
  order: 7,
};

export function Lab() {
  const { markLab } = useProgress();
  const [altitudeKm, setAltitudeKm] = useState<number>(700);
  const [ifovMrad, setIfovMrad] = useState<number>(0.043);
  const [fovDeg, setFovDeg] = useState<number>(15);
  const [bitDepth, setBitDepth] = useState<number>(8);
  const [sensorMode, setSensorMode] = useState<"optical" | "sar">("optical");
  const [isNight, setIsNight] = useState<boolean>(false);
  const [hasClouds, setHasClouds] = useState<boolean>(true);

  const geometry = computeSensorGeometry(altitudeKm, ifovMrad, fovDeg);
  const totalLevels = Math.pow(2, bitDepth);

  const getCellStyle = (r: number, c: number, baseVal: number) => {
    const feat = FEATURE_TYPES[r][c];
    const isCloudCell = hasClouds && r <= 2 && c >= 1 && c <= 5;

    if (sensorMode === "optical") {
      if (isNight) {
        return { bg: "rgb(20, 18, 15)", label: "تاریکی شب (نبود نور خورشید)" };
      }
      if (isCloudCell) {
        return { bg: "rgb(245, 241, 235)", label: "مسدودشده با ابر" };
      }
      const q = quantizeRadiometric(baseVal, bitDepth);
      const lum = Math.round(q.reconstructed * 255);
      return { bg: `rgb(${lum}, ${lum}, ${lum})`, label: `DN=${q.dn}` };
    }

    let sarBackscatter = 0.35;
    if (feat === "water") sarBackscatter = 0.06;
    else if (feat === "veg") sarBackscatter = 0.46;
    else if (feat === "soil") sarBackscatter = 0.28;
    else if (feat === "urban") sarBackscatter = 0.94;

    const q = quantizeRadiometric(sarBackscatter, bitDepth);
    const lum = Math.round(q.reconstructed * 255);
    return { bg: `rgb(${lum}, ${lum}, ${lum})`, label: `σ⁰ DN=${q.dn}` };
  };

  return (
    <div className="flex flex-col gap-5" data-testid="lab-sensor-resolution">
      <div className="rounded-xl border border-line bg-paper p-4">
        <h3 className="text-sm font-semibold">محاسبه‌گر هندسه تصویربرداری (تفکیک مکانی و پهنای جاروب)</h3>
        <p className="mt-0.5 mb-4 text-xs text-muted">
          تنظیم ارتفاع مداری (H)، زاویه دید لحظه‌ای (IFOV) و میدان دید کل (FOV)
        </p>

        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <label className="text-sm">
            <span className="flex justify-between">
              <span>ارتفاع مدار (H)</span>
              <span className="tabular-nums" dir="ltr">
                {altitudeKm} km
              </span>
            </span>
            <input
              type="range"
              min={400}
              max={1200}
              step={20}
              value={altitudeKm}
              dir="ltr"
              onChange={(e) => {
                setAltitudeKm(parseInt(e.target.value, 10));
                markLab("sensor-resolution");
              }}
              className="mt-1 h-11 w-full accent-cane"
            />
          </label>

          <label className="text-sm">
            <span className="flex justify-between">
              <span>زاویه لحظه‌ای (IFOV)</span>
              <span className="tabular-nums" dir="ltr">
                {ifovMrad.toFixed(3)} mrad
              </span>
            </span>
            <input
              type="range"
              min={0.01}
              max={0.15}
              step={0.005}
              value={ifovMrad}
              dir="ltr"
              onChange={(e) => {
                setIfovMrad(parseFloat(e.target.value));
                markLab("sensor-resolution");
              }}
              className="mt-1 h-11 w-full accent-cane"
            />
          </label>

          <label className="text-sm">
            <span className="flex justify-between">
              <span>میدان دید سنجنده (FOV)</span>
              <span className="tabular-nums" dir="ltr">
                {fovDeg}°
              </span>
            </span>
            <input
              type="range"
              min={4}
              max={45}
              step={1}
              value={fovDeg}
              dir="ltr"
              onChange={(e) => {
                setFovDeg(parseInt(e.target.value, 10));
                markLab("sensor-resolution");
              }}
              className="mt-1 h-11 w-full accent-cane"
            />
          </label>
        </div>

        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-line bg-card px-3 py-3">
            <dt className="text-xs text-muted">اندازه پیکسل روی زمین (GSD)</dt>
            <dd className="mt-1 text-lg font-semibold tabular-nums" dir="ltr">
              {geometry.gsdMeters.toFixed(1)} m
            </dd>
          </div>
          <div className="rounded-xl border border-line bg-card px-3 py-3">
            <dt className="text-xs text-muted">پهنای جاروب (Swath Width)</dt>
            <dd className="mt-1 text-lg font-semibold tabular-nums" dir="ltr">
              {geometry.swathKm.toFixed(1)} km
            </dd>
          </div>
          <div className="rounded-xl border border-line bg-card px-3 py-3">
            <dt className="text-xs text-muted">تعداد پیکسل در هر خط اسکن</dt>
            <dd className="mt-1 text-lg font-semibold tabular-nums" dir="ltr">
              {geometry.pixelsAcrossTrack.toLocaleString()} px
            </dd>
          </div>
        </dl>
      </div>

      <div className="rounded-xl border border-line bg-paper p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold">
              تفکیک رادیومتری (عمق بیتی) و مقایسه اپتیکی با رادار فعال (SAR)
            </h3>
            <p className="mt-0.5 text-xs text-muted">
              تأثیر کاهش بیت بر پله‌ای شدن تصویر و توانایی رادار در عبور از ابر و شب
            </p>
          </div>
          <div className="inline-flex gap-1 rounded-xl border border-line bg-card p-1">
            <button
              type="button"
              onClick={() => {
                setSensorMode("optical");
                markLab("sensor-resolution");
              }}
              className={`min-h-9 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                sensorMode === "optical" ? "bg-ink text-parchment" : "text-ink-soft hover:bg-paper"
              }`}
            >
              اپتیکی غیرفعال
            </button>
            <button
              type="button"
              onClick={() => {
                setSensorMode("sar");
                markLab("sensor-resolution");
              }}
              className={`min-h-9 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                sensorMode === "sar" ? "bg-ink text-parchment" : "text-ink-soft hover:bg-paper"
              }`}
            >
              رادار فعال SAR
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-2">
          <div>
            <label className="mb-4 block text-sm">
              <span className="flex justify-between">
                <span>تفکیک رادیومتری (Bit Depth)</span>
                <span className="tabular-nums" dir="ltr">
                  {bitDepth}-bit ({totalLevels} سطح)
                </span>
              </span>
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={bitDepth}
                dir="ltr"
                onChange={(e) => {
                  setBitDepth(parseInt(e.target.value, 10));
                  markLab("sensor-resolution");
                }}
                className="mt-1 h-11 w-full accent-cane"
              />
            </label>

            <div className="flex flex-col gap-2.5 text-xs text-ink-soft">
              <label className="inline-flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={hasClouds}
                  onChange={(e) => {
                    setHasClouds(e.target.checked);
                    markLab("sensor-resolution");
                  }}
                  className="size-4 accent-cane"
                />
                <span>وجود توده ابر متراکم بر فراز منطقه</span>
              </label>

              <label className="inline-flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={isNight}
                  onChange={(e) => {
                    setIsNight(e.target.checked);
                    markLab("sensor-resolution");
                  }}
                  className="size-4 accent-cane"
                />
                <span>تصویربرداری در نیمه‌شب (نبود تابش خورشیدی)</span>
              </label>
            </div>

            <div className="mt-4 rounded-xl border border-line bg-card p-3 text-xs leading-relaxed text-ink-soft">
              {sensorMode === "optical"
                ? hasClouds || isNight
                  ? "محدودیت سنجنده غیرفعال: در شب یا زیر پوشش ابر، سیگنال بازتابی سطح زمین به سنجنده اپتیکی نمی‌رسد."
                  : "سنجنده اپتیکی در روز صاف: تغییر عمق بیتی را از ۱ تا ۱۰ بیت جابه‌جا کنید تا از بین رفتن جزئیات در ۱ و ۲ بیت را ببینید."
                : "رادار فعال SAR: موج ریزموج از ابر عبور می‌کند و مستقل از خورشید است؛ رودخانه (بازتاب آینه‌ای) سیاه و بلوک شهری (پس‌پراکنش گوشه‌ای) روشن دیده می‌شود."}
            </div>
          </div>

          <div className="rounded-xl border border-line bg-ink p-3">
            <div className="grid grid-cols-8 gap-1">
              {BASE_SCENE.map((row, rIdx) =>
                row.map((val, cIdx) => {
                  const cell = getCellStyle(rIdx, cIdx, val);
                  return (
                    <div
                      key={`${rIdx}-${cIdx}`}
                      title={cell.label}
                      className="h-9 rounded-sm transition-colors"
                      style={{ backgroundColor: cell.bg }}
                    />
                  );
                }),
              )}
            </div>
            <div className="mt-2.5 flex items-center justify-between text-[11px] text-parchment/75 tabular-nums" dir="ltr">
              <span>{sensorMode === "optical" ? "OPTICAL VIS/NIR" : "ACTIVE C-BAND SAR"}</span>
              <span>
                {bitDepth}-BIT · {totalLevels} DN
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
