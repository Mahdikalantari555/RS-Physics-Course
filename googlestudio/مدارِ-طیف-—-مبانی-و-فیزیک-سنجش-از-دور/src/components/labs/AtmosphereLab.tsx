import { useState } from 'react';
import {
  atmosphericTransmittance,
  mieRelativeScattering,
  rayleighRelativeScattering,
} from '../../physics/remoteSensing';
import { ResilientImage } from '../ResilientImage';

const MIN_LOG = Math.log10(0.3);
const MAX_LOG = Math.log10(15.0);
const TICKS = [0.4, 0.7, 1.0, 1.6, 2.2, 4.0, 6.3, 10.0, 14.0];

export function AtmosphereLab() {
  const [probeUm, setProbeUm] = useState<number>(0.48);
  const [waterVapor, setWaterVapor] = useState<number>(1.0);
  const [aerosolLoad, setAerosolLoad] = useState<number>(1.0);
  const [viewMode, setViewMode] = useState<'transmittance' | 'diagram'>('transmittance');

  const transmittance = atmosphericTransmittance(probeUm, waterVapor);
  const rayleigh = rayleighRelativeScattering(probeUm);
  const mie = mieRelativeScattering(probeUm, aerosolLoad);

  const svgW = 620;
  const svgH = 240;
  const padL = 46;
  const padR = 18;
  const padT = 22;
  const padB = 38;
  const plotW = svgW - padL - padR;
  const plotH = svgH - padT - padB;

  const toX = (wUm: number) => {
    const l = Math.log10(Math.max(0.3, Math.min(15.0, wUm)));
    return padL + ((l - MIN_LOG) / (MAX_LOG - MIN_LOG)) * plotW;
  };

  const points: Array<{ w: number; t: number }> = [];
  for (let i = 0; i <= 160; i++) {
    const logW = MIN_LOG + (i / 160) * (MAX_LOG - MIN_LOG);
    const w = Math.pow(10, logW);
    points.push({ w, t: atmosphericTransmittance(w, waterVapor) });
  }

  const linePath = points
    .map((p, idx) => {
      const x = toX(p.w);
      const y = padT + plotH - p.t * plotH;
      return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');

  const areaPath = `${linePath} L ${toX(15).toFixed(1)} ${(padT + plotH).toFixed(1)} L ${toX(0.3).toFixed(1)} ${(
    padT + plotH
  ).toFixed(1)} Z`;

  const probeX = toX(probeUm);
  const probeY = padT + plotH - transmittance * plotH;

  const windowQuality =
    transmittance >= 0.72
      ? { label: '✓ پنجره شفاف جوی (مناسب تصویربرداری)', cls: 'text-emerald-700' }
      : transmittance >= 0.4
      ? { label: '▲ عبور نیمه‌شفاف (نیازمند تصحیح)', cls: 'text-amber-700' }
      : { label: '✕ باند جذب شدید جو (مسدود)', cls: 'text-rose-700' };

  return (
    <div className="flex flex-col gap-5" data-testid="lab-atmosphere">
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              طیف عبور جوی و مقایسه پراکندگی رایلی و می
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              شناسایی پنجره‌های جوی شفاف در برابر نوارهای جذب بخار آب (H₂O)، دی‌اکسیدکربن (CO₂) و ازن (O₃)
            </p>
          </div>
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => setViewMode('transmittance')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                viewMode === 'transmittance' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              نمودار عبور جوی
            </button>
            <button
              type="button"
              onClick={() => setViewMode('diagram')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                viewMode === 'diagram' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              شمای لایه‌های جو
            </button>
          </div>
        </div>

        {viewMode === 'transmittance' ? (
          <div className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden" dir="ltr">
            <svg
              viewBox={`0 0 ${svgW} ${svgH}`}
              className="w-full h-60 block"
              role="img"
              aria-label="نمودار پنجره‌های جوی و باندهای جذب گازها"
            >
              {/* Atmospheric Windows Highlight */}
              {[
                { from: 0.4, to: 1.3, label: 'VIS + NIR' },
                { from: 1.5, to: 1.78, label: 'SWIR1' },
                { from: 2.0, to: 2.4, label: 'SWIR2' },
                { from: 8.0, to: 13.5, label: 'TIR Window' },
              ].map((win) => (
                <g key={win.label}>
                  <rect
                    x={toX(win.from)}
                    y={padT}
                    width={toX(win.to) - toX(win.from)}
                    height={plotH}
                    fill="#0ea5e9"
                    fillOpacity="0.09"
                  />
                  <text
                    x={(toX(win.from) + toX(win.to)) / 2}
                    y={padT + 12}
                    textAnchor="middle"
                    className="fill-sky-700 text-[9.5px] font-medium"
                  >
                    {win.label}
                  </text>
                </g>
              ))}

              {/* Grid */}
              {[0, 0.25, 0.5, 0.75, 1].map((f) => {
                const y = padT + plotH - f * plotH;
                return (
                  <g key={f}>
                    <line x1={padL} y1={y} x2={svgW - padR} y2={y} stroke="#e2e8f0" strokeWidth="1" />
                    <text
                      x={padL - 8}
                      y={f === 0 ? y - 2 : y + 3}
                      textAnchor="end"
                      className="fill-slate-400 text-[10px] font-mono-tech"
                    >
                      {Math.round(f * 100)}%
                    </text>
                  </g>
                );
              })}

              {TICKS.map((w) => {
                const x = toX(w);
                return (
                  <g key={w}>
                    <line x1={x} y1={padT} x2={x} y2={padT + plotH} stroke="#e2e8f0" strokeWidth="1" />
                    <text x={x} y={padT + plotH + 16} textAnchor="middle" className="fill-slate-500 text-[10px] font-mono-tech">
                      {w}
                    </text>
                  </g>
                );
              })}

              {/* Absorption gas annotations */}
              <text x={toX(1.4)} y={padT + plotH - 8} textAnchor="middle" className="fill-slate-500 text-[9px] font-mono-tech">
                H₂O
              </text>
              <text x={toX(1.88)} y={padT + plotH - 8} textAnchor="middle" className="fill-slate-500 text-[9px] font-mono-tech">
                H₂O
              </text>
              <text x={toX(4.3)} y={padT + plotH - 8} textAnchor="middle" className="fill-slate-500 text-[9px] font-mono-tech">
                CO₂
              </text>
              <text x={toX(6.3)} y={padT + plotH - 8} textAnchor="middle" className="fill-slate-500 text-[9px] font-mono-tech">
                H₂O
              </text>

              <path d={areaPath} fill="#0284c7" fillOpacity="0.16" />
              <path d={linePath} fill="none" stroke="#0369a1" strokeWidth="2.2" />

              {/* Wavelength Probe */}
              <line x1={probeX} y1={padT} x2={probeX} y2={padT + plotH} stroke="#0f172a" strokeWidth="1.3" strokeDasharray="3 3" />
              <circle cx={probeX} cy={probeY} r="5" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
            </svg>
          </div>
        ) : (
          <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
            <ResilientImage
              src="/src/assets/images/concept_atmospheric_scattering_1794852109849.jpg"
              alt="مقطع لایه‌های جو و پراکندگی تابش خورشیدی"
              className="w-full h-60 object-cover"
            />
          </div>
        )}

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <label htmlFor="atm-probe-slider" className="font-medium text-slate-800">
                طول‌موج کاوشگر
              </label>
              <span className="font-mono-tech font-semibold text-slate-900" dir="ltr">
                {probeUm.toFixed(2)} μm
              </span>
            </div>
            <input
              id="atm-probe-slider"
              type="range"
              min={MIN_LOG}
              max={MAX_LOG}
              step={0.01}
              value={Math.log10(probeUm)}
              dir="ltr"
              onChange={(e) => setProbeUm(Math.pow(10, parseFloat(e.target.value)))}
              className="lab-slider w-full"
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <label htmlFor="atm-h2o-slider" className="font-medium text-slate-800">
                ستون بخار آب جو (H₂O)
              </label>
              <span className="font-mono-tech font-semibold text-slate-900" dir="ltr">
                {waterVapor.toFixed(1)}×
              </span>
            </div>
            <input
              id="atm-h2o-slider"
              type="range"
              min={0.3}
              max={1.8}
              step={0.1}
              value={waterVapor}
              dir="ltr"
              onChange={(e) => setWaterVapor(parseFloat(e.target.value))}
              className="lab-slider w-full"
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <label htmlFor="atm-aerosol-slider" className="font-medium text-slate-800">
                غلظت هواویز و غبار (Mie)
              </label>
              <span className="font-mono-tech font-semibold text-slate-900" dir="ltr">
                {aerosolLoad.toFixed(1)}×
              </span>
            </div>
            <input
              id="atm-aerosol-slider"
              type="range"
              min={0.2}
              max={2.5}
              step={0.1}
              value={aerosolLoad}
              dir="ltr"
              onChange={(e) => setAerosolLoad(parseFloat(e.target.value))}
              className="lab-slider w-full"
            />
          </div>
        </div>
      </div>

      {/* Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white border border-slate-200 rounded-xl p-3.5">
          <div className="text-xs text-slate-500 mb-1">عبور جوی در طول‌موج انتخابی</div>
          <div className="text-lg font-semibold font-mono-tech text-slate-900 tabular-nums" dir="ltr">
            {(transmittance * 100).toFixed(1)}%
          </div>
          <div className={`text-xs font-medium mt-1 ${windowQuality.cls}`}>{windowQuality.label}</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3.5">
          <div className="text-xs text-slate-500 mb-1">شدت نسبی پراکندگی رایلی (λ⁻⁴)</div>
          <div className="text-lg font-semibold font-mono-tech text-slate-900 tabular-nums" dir="ltr">
            {rayleigh.toFixed(3)}×
          </div>
          <div className="text-xs text-slate-500 mt-1">نسبت به باند آبی (0.45 μm = 1.00×)</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3.5">
          <div className="text-xs text-slate-500 mb-1">شدت نسبی پراکندگی می (غبار)</div>
          <div className="text-lg font-semibold font-mono-tech text-slate-900 tabular-nums" dir="ltr">
            {mie.toFixed(3)}×
          </div>
          <div className="text-xs text-slate-500 mt-1">وابستگی ملایم‌تر (~λ⁻¹·³) به طول‌موج</div>
        </div>
      </div>
    </div>
  );
}
