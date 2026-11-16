import { useEffect, useState } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { computeWaveProperties } from '../../physics/remoteSensing';

const LOG_MIN = Math.log10(0.2); // 0.2 μm (UV)
const LOG_MAX = Math.log10(100000); // 100,000 μm = 10 cm (Microwave L-band)

const BAND_PRESETS = [
  { label: 'فرابنفش', sub: '0.32 μm', lambda: 0.32 },
  { label: 'آبی', sub: '0.45 μm', lambda: 0.45 },
  { label: 'سبز', sub: '0.55 μm', lambda: 0.55 },
  { label: 'قرمز', sub: '0.66 μm', lambda: 0.66 },
  { label: 'NIR', sub: '0.85 μm', lambda: 0.85 },
  { label: 'SWIR', sub: '1.61 μm', lambda: 1.61 },
  { label: 'حرارتی TIR', sub: '10.5 μm', lambda: 10.5 },
  { label: 'رادار باند C', sub: '5.6 cm', lambda: 56000 },
];

function formatWavelengthDisplay(um: number): string {
  if (um >= 10000) return `${(um / 10000).toFixed(2)} cm`;
  if (um >= 1000) return `${(um / 1000).toFixed(2)} mm`;
  return `${um.toFixed(2)} μm`;
}

function formatFreqDisplay(hz: number): string {
  if (hz >= 1e12) return `${(hz / 1e12).toFixed(2)} THz`;
  if (hz >= 1e9) return `${(hz / 1e9).toFixed(2)} GHz`;
  return `${(hz / 1e6).toFixed(2)} MHz`;
}

export function WaveSpectrumLab() {
  const [wavelengthUm, setWavelengthUm] = useState<number>(0.55);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [phase, setPhase] = useState<number>(0);

  useEffect(() => {
    if (!isPlaying) return;
    let rafId = 0;
    let lastTime = performance.now();
    const tick = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      setPhase((prev) => (prev + dt * 3.2) % (Math.PI * 2));
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying]);

  const props = computeWaveProperties(wavelengthUm);
  const logVal = Math.log10(wavelengthUm);
  const sliderPct = ((logVal - LOG_MIN) / (LOG_MAX - LOG_MIN)) * 100;

  // Visual cycles across the 600px SVG stage based on log position (more cycles at shorter λ)
  const normalizedShortness = 1 - (logVal - LOG_MIN) / (LOG_MAX - LOG_MIN);
  const cycles = 1.5 + normalizedShortness * 7.5;

  const width = 620;
  const height = 210;
  const midY = 105;
  const ampE = 56;
  const ampB = 28;

  const ePoints: string[] = [];
  const bPoints: string[] = [];
  const vectors: Array<{ x: number; ey: number; bx: number; by: number }> = [];

  for (let x = 20; x <= width - 20; x += 4) {
    const t = (x - 20) / (width - 40);
    const angle = t * cycles * Math.PI * 2 - phase;
    const sinVal = Math.sin(angle);
    const ey = midY - sinVal * ampE;
    // Perspective projection for orthogonal magnetic wave B
    const bx = x + sinVal * ampB * 0.55;
    const by = midY + sinVal * ampB * 0.65;
    ePoints.push(`${x},${ey.toFixed(1)}`);
    bPoints.push(`${bx.toFixed(1)},${by.toFixed(1)}`);
    if ((x - 20) % 24 === 0) {
      vectors.push({ x, ey, bx, by });
    }
  }

  return (
    <div className="flex flex-col gap-5" data-testid="lab-wave-spectrum">
      {/* Live Wave Canvas */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              شبیه‌ساز موج الکترومغناطیسی (میدان الکتریکی E و مغناطیسی B)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {props.band.nameFa} · {props.band.subRangeFa}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPlaying((v) => !v)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0"
              aria-label={isPlaying ? 'توقف موج' : 'پخش موج'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'توقف' : 'پخش'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setWavelengthUm(0.55);
                setPhase(0);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>بازنشانی</span>
            </button>
          </div>
        </div>

        <div className="relative bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-48 sm:h-52 block"
            role="img"
            aria-label="نمودار نوسان عمود بر هم میدان الکتریکی و مغناطیسی"
          >
            {/* Axis Grid */}
            <line x1="20" y1={midY} x2={width - 20} y2={midY} stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 4" />
            <text x={width - 24} y={midY - 8} textAnchor="end" className="fill-slate-400 text-[10px] font-mono-tech">
              مسیر انتشار (c)
            </text>

            {/* E field vector stems */}
            {vectors.map((v, idx) => (
              <line
                key={idx}
                x1={v.x}
                y1={midY}
                x2={v.x}
                y2={v.ey}
                stroke={props.band.colorHex}
                strokeOpacity="0.28"
                strokeWidth="1.2"
              />
            ))}

            {/* Orthogonal B field */}
            <polyline
              fill="none"
              stroke="#64748b"
              strokeWidth="1.75"
              strokeDasharray="3 2"
              points={bPoints.join(' ')}
            />

            {/* Primary E field */}
            <polyline
              fill="none"
              stroke={props.band.colorHex}
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={ePoints.join(' ')}
            />

            {/* Legend */}
            <g transform="translate(26, 18)">
              <line x1="0" y1="6" x2="18" y2="6" stroke={props.band.colorHex} strokeWidth="2.8" />
              <text x="24" y="10" className="fill-slate-700 text-[11px] font-medium">
                میدان الکتریکی (E)
              </text>
              <line x1="138" y1="6" x2="156" y2="6" stroke="#64748b" strokeWidth="1.75" strokeDasharray="3 2" />
              <text x="162" y="10" className="fill-slate-600 text-[11px] font-medium">
                میدان مغناطیسی عمود (B)
              </text>
            </g>
          </svg>
        </div>

        {/* Spectrum Strip & Slider */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
            <label htmlFor="wavelength-slider" className="font-medium text-slate-800">
              انتخاب طول‌موج (مقیاس لگاریتمی)
            </label>
            <span className="font-mono-tech font-semibold text-slate-900" dir="ltr">
              λ = {formatWavelengthDisplay(wavelengthUm)}
            </span>
          </div>

          <div className="relative mb-2">
            <div
              className="h-2.5 w-full rounded-full border border-slate-200"
              style={{
                background:
                  'linear-gradient(to left, #0d9488 0%, #d97706 32%, #ea580c 46%, #be123c 58%, #dc2626 67%, #16a34a 73%, #2563eb 78%, #7c3aed 92%, #4f46e5 100%)',
              }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 border-slate-900 shadow pointer-events-none"
              style={{ left: `calc(${Math.max(0, Math.min(100, sliderPct))}% - 7px)` }}
            />
          </div>

          <input
            id="wavelength-slider"
            type="range"
            min={LOG_MIN}
            max={LOG_MAX}
            step={0.01}
            value={logVal}
            dir="ltr"
            onChange={(e) => setWavelengthUm(Math.pow(10, parseFloat(e.target.value)))}
            className="lab-slider w-full"
          />

          <div className="flex flex-wrap gap-1.5 mt-3">
            {BAND_PRESETS.map((preset) => {
              const active = Math.abs(Math.log10(wavelengthUm) - Math.log10(preset.lambda)) < 0.08;
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setWavelengthUm(preset.lambda)}
                  className={`px-2.5 py-1.5 text-xs rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-sky-600 text-white border-sky-600 font-medium'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {preset.label}{' '}
                  <span className="font-mono-tech opacity-80" dir="ltr">
                    ({preset.sub})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Live Telemetry Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white border border-slate-200 rounded-xl p-3.5">
          <div className="text-xs text-slate-500 mb-1">بسامد موج (ν = c / λ)</div>
          <div className="text-lg font-semibold font-mono-tech text-slate-900 tabular-nums" dir="ltr">
            {formatFreqDisplay(props.frequencyHz)}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3.5">
          <div className="text-xs text-slate-500 mb-1">انرژی هر فوتون (E = hν)</div>
          <div className="text-lg font-semibold font-mono-tech text-slate-900 tabular-nums" dir="ltr">
            {props.energyEv >= 0.01
              ? `${props.energyEv.toFixed(3)} eV`
              : `${(props.energyEv * 1000).toFixed(3)} meV`}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3.5">
          <div className="text-xs text-slate-500 mb-1">نفوذ در پوشش ابر</div>
          <div className="text-sm font-semibold text-slate-900">
            {props.band.canPenetrateClouds ? '✓ عبوردهی کامل ابر و باران' : '✕ مسدودشدن توسط ابر متراکم'}
          </div>
        </div>
      </div>

      <div className="bg-slate-100 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-700 leading-relaxed">
        <span className="font-semibold text-slate-900">مکانیزم فیزیکی در این ناحیه: </span>
        {props.band.mechanismFa}
      </div>
    </div>
  );
}
