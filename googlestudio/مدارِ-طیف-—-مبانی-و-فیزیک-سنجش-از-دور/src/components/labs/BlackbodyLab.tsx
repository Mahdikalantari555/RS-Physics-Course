import { useState } from 'react';
import {
  planckSpectralRadiance,
  stefanBoltzmannExitance,
  wienPeakWavelength,
} from '../../physics/remoteSensing';

const TEMP_PRESETS = [
  { label: 'خورشید', tempK: 5778, emissivity: 1.0 },
  { label: 'آتش‌سوزی جنگل', tempK: 950, emissivity: 0.96 },
  { label: 'آسفالت داغ شهری', tempK: 330, emissivity: 0.95 },
  { label: 'سطح میانگین زمین', tempK: 288, emissivity: 0.97 },
  { label: 'پوشش یخ قطبی', tempK: 255, emissivity: 0.98 },
];

const WAVELENGTH_GRID = [0.4, 0.5, 0.7, 1.0, 1.5, 2.0, 3.0, 5.0, 8.0, 10.0, 14.0, 20.0];
const MIN_LOG_W = Math.log10(0.25);
const MAX_LOG_W = Math.log10(25);

export function BlackbodyLab() {
  const [temperatureK, setTemperatureK] = useState<number>(288);
  const [emissivity, setEmissivity] = useState<number>(0.97);
  const [showEarthRef, setShowEarthRef] = useState<boolean>(true);

  const wienUm = wienPeakWavelength(temperatureK);
  const exitance = stefanBoltzmannExitance(temperatureK, emissivity);
  const peakRadiance = planckSpectralRadiance(wienUm, temperatureK, emissivity);

  const svgW = 620;
  const svgH = 276;
  const padL = 52;
  const padR = 20;
  const padT = 40;
  const padB = 38;
  const plotW = svgW - padL - padR;
  const plotH = svgH - padT - padB;

  const toX = (wUm: number) => {
    const l = Math.log10(Math.max(0.25, Math.min(25, wUm)));
    return padL + ((l - MIN_LOG_W) / (MAX_LOG_W - MIN_LOG_W)) * plotW;
  };

  // Sample curve points and normalize each curve to its own peak
  const samples: Array<{ w: number; r: number }> = [];
  let maxR = 1e-12;
  const steps = 120;
  for (let i = 0; i <= steps; i++) {
    const logW = MIN_LOG_W + (i / steps) * (MAX_LOG_W - MIN_LOG_W);
    const w = Math.pow(10, logW);
    const r = planckSpectralRadiance(w, temperatureK, emissivity);
    if (r > maxR) maxR = r;
    samples.push({ w, r });
  }

  const earthSamples: Array<{ w: number; r: number }> = [];
  let earthMax = 1e-12;
  for (let i = 0; i <= steps; i++) {
    const logW = MIN_LOG_W + (i / steps) * (MAX_LOG_W - MIN_LOG_W);
    const w = Math.pow(10, logW);
    const r = planckSpectralRadiance(w, 288, 0.97);
    if (r > earthMax) earthMax = r;
    earthSamples.push({ w, r });
  }

  const mainPath = samples
    .map((pt, idx) => {
      const x = toX(pt.w);
      const y = padT + plotH - (pt.r / maxR) * (plotH - 10);
      return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');

  const areaPath = `${mainPath} L ${toX(25).toFixed(1)} ${(padT + plotH).toFixed(1)} L ${toX(0.25).toFixed(1)} ${(
    padT + plotH
  ).toFixed(1)} Z`;

  const earthPath = earthSamples
    .map((pt, idx) => {
      const x = toX(pt.w);
      const y = padT + plotH - (pt.r / earthMax) * (plotH - 10);
      return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');

  const peakX = toX(wienUm);
  const visLeft = toX(0.4);
  const visRight = toX(0.7);
  const tirLeft = toX(8.0);
  const tirRight = toX(14.0);
  const badgeX = Math.min(svgW - padR - 118, Math.max(padL + 6, peakX + (peakX > svgW - 170 ? -124 : 10)));

  return (
    <div className="flex flex-col gap-5" data-testid="lab-blackbody">
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              توزیع تابش طیفی پلانک (نرمال‌شده به قله تابش جسم)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              مقایسه بازتاب خورشیدی (مرئی) و گسیل حرارتی زمین (پنجره ۸ تا ۱۴ میکرومتر)
            </p>
          </div>
          <label className="inline-flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showEarthRef}
              onChange={(e) => setShowEarthRef(e.target.checked)}
              className="rounded border-slate-300 text-sky-600 focus:ring-sky-500"
            />
            <span>نمایش منحنی مرجع زمین (288 K)</span>
          </label>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden" dir="ltr">
          <svg
            viewBox={`0 0 ${svgW} ${svgH}`}
            className="w-full h-64 block"
            role="img"
            aria-label="نمودار قانون تابش پلانک و جابه‌جایی قله وین"
          >
            {/* Visible Band & Thermal Window Shaded Regions */}
            <rect x={visLeft} y={padT} width={visRight - visLeft} height={plotH} fill="#0284c7" fillOpacity="0.1" />
            <text
              x={(visLeft + visRight) / 2}
              y={18}
              textAnchor="middle"
              className="fill-sky-700 text-[10.5px] font-medium"
            >
              VIS (0.4–0.7 μm)
            </text>

            <rect x={tirLeft} y={padT} width={tirRight - tirLeft} height={plotH} fill="#d97706" fillOpacity="0.12" />
            <text
              x={(tirLeft + tirRight) / 2}
              y={18}
              textAnchor="middle"
              className="fill-amber-700 text-[10.5px] font-medium"
            >
              TIR Window (8–14 μm)
            </text>

            {/* Gridlines */}
            {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
              const y = padT + plotH - frac * (plotH - 10);
              return (
                <g key={frac}>
                  <line x1={padL} y1={y} x2={svgW - padR} y2={y} stroke="#e2e8f0" strokeWidth="1" />
                  <text
                    x={padL - 8}
                    y={frac === 0 ? y - 2 : y + 3}
                    textAnchor="end"
                    className="fill-slate-400 text-[10px] font-mono-tech"
                  >
                    {Math.round(frac * 100)}%
                  </text>
                </g>
              );
            })}

            {WAVELENGTH_GRID.map((w) => {
              const x = toX(w);
              return (
                <g key={w}>
                  <line x1={x} y1={padT} x2={x} y2={padT + plotH} stroke="#e2e8f0" strokeWidth="1" />
                  <text
                    x={x}
                    y={padT + plotH + 16}
                    textAnchor="middle"
                    className="fill-slate-500 text-[10px] font-mono-tech"
                  >
                    {w}
                  </text>
                </g>
              );
            })}

            <text
              x={padL + plotW / 2}
              y={svgH - 4}
              textAnchor="middle"
              className="fill-slate-600 text-[11px] font-medium"
            >
              Wavelength (μm · log scale)
            </text>

            {/* Earth Reference Curve */}
            {showEarthRef && temperatureK !== 288 && (
              <path d={earthPath} fill="none" stroke="#94a3b8" strokeWidth="1.6" strokeDasharray="5 4" />
            )}

            {/* Active Body Planck Curve */}
            <path d={areaPath} fill="#0284c7" fillOpacity="0.12" />
            <path d={mainPath} fill="none" stroke="#0284c7" strokeWidth="2.6" />

            {/* Wien Peak Marker */}
            {wienUm >= 0.25 && wienUm <= 25 && (
              <g>
                <line
                  x1={peakX}
                  y1={padT + 10}
                  x2={peakX}
                  y2={padT + plotH}
                  stroke="#dc2626"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
                <circle cx={peakX} cy={padT + 10} r="4.5" fill="#dc2626" stroke="#ffffff" strokeWidth="1.5" />
                <rect
                  x={badgeX}
                  y={padT + 18}
                  width={114}
                  height={20}
                  rx={4}
                  fill="#ffffff"
                  fillOpacity="0.95"
                  stroke="#fecaca"
                  strokeWidth="1"
                />
                <text
                  x={badgeX + 57}
                  y={padT + 31}
                  textAnchor="middle"
                  className="fill-rose-700 text-[10px] font-mono-tech font-semibold"
                >
                  λmax = {wienUm.toFixed(2)} μm
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <label htmlFor="bb-temp-slider" className="font-medium text-slate-800">
                دمای مطلق سطح (T)
              </label>
              <span className="font-mono-tech font-semibold text-slate-900" dir="ltr">
                {temperatureK} K ({(temperatureK - 273.15).toFixed(0)} °C)
              </span>
            </div>
            <input
              id="bb-temp-slider"
              type="range"
              min={200}
              max={6200}
              step={1}
              value={temperatureK}
              dir="ltr"
              onChange={(e) => setTemperatureK(parseInt(e.target.value, 10))}
              className="lab-slider w-full"
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <label htmlFor="bb-emissivity-slider" className="font-medium text-slate-800">
                ضریب گسیلندگی سطح (ε)
              </label>
              <span className="font-mono-tech font-semibold text-slate-900" dir="ltr">
                ε = {emissivity.toFixed(2)}
              </span>
            </div>
            <input
              id="bb-emissivity-slider"
              type="range"
              min={0.5}
              max={1.0}
              step={0.01}
              value={emissivity}
              dir="ltr"
              onChange={(e) => setEmissivity(parseFloat(e.target.value))}
              className="lab-slider w-full"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {TEMP_PRESETS.map((preset) => {
            const active = temperatureK === preset.tempK;
            return (
              <button
                key={preset.label}
                type="button"
                onClick={() => {
                  setTemperatureK(preset.tempK);
                  setEmissivity(preset.emissivity);
                }}
                className={`px-2.5 py-1.5 text-xs rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-sky-600 text-white border-sky-600 font-medium'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {preset.label}{' '}
                <span className="font-mono-tech opacity-80" dir="ltr">
                  ({preset.tempK} K)
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Output Readouts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white border border-slate-200 rounded-xl p-3.5">
          <div className="text-xs text-slate-500 mb-1">طول‌موج قله وین (λ_max)</div>
          <div className="text-lg font-semibold font-mono-tech text-slate-900 tabular-nums" dir="ltr">
            {wienUm.toFixed(2)} μm
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3.5">
          <div className="text-xs text-slate-500 mb-1">کل توان گسیلی (M = εσT⁴)</div>
          <div className="text-lg font-semibold font-mono-tech text-slate-900 tabular-nums" dir="ltr">
            {exitance >= 1e5 ? `${(exitance / 1e6).toFixed(2)} MW/m²` : `${exitance.toFixed(1)} W/m²`}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3.5">
          <div className="text-xs text-slate-500 mb-1">شدت تابندگی در قله</div>
          <div className="text-lg font-semibold font-mono-tech text-slate-900 tabular-nums" dir="ltr">
            {peakRadiance >= 1e4
              ? `${(peakRadiance / 1e6).toFixed(2)} MW/m²·sr·μm`
              : `${peakRadiance.toFixed(2)} W/m²·sr·μm`}
          </div>
        </div>
      </div>
    </div>
  );
}
