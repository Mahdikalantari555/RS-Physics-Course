import { useState } from 'react';
import {
  computeNDSI,
  computeNDVI,
  computeNDWI,
  extractMultispectralBands,
  getSurfaceReflectance,
  type BandReflectances,
  type LandCoverId,
} from '../../physics/remoteSensing';
import { ResilientImage } from '../ResilientImage';

const SURFACES: Array<{ id: LandCoverId; labelFa: string; color: string }> = [
  { id: 'healthy-veg', labelFa: 'پوشش گیاهی سالم', color: '#16a34a' },
  { id: 'stressed-veg', labelFa: 'گیاه تحت تنش', color: '#ca8a04' },
  { id: 'dry-soil', labelFa: 'خاک خشک برهنه', color: '#9a3412' },
  { id: 'clear-water', labelFa: 'آب زلال و عمیق', color: '#0284c7' },
  { id: 'snow-ice', labelFa: 'برف و یخچال', color: '#475569' },
];

type CompositeId = 'true-color' | 'false-nir' | 'false-swir' | 'ndvi-map';

const COMPOSITES: Array<{ id: CompositeId; labelFa: string; descFa: string }> = [
  { id: 'true-color', labelFa: 'رنگ طبیعی (R-G-B)', descFa: 'دید چشم انسان: جنگل سبز و برف سفید' },
  { id: 'false-nir', labelFa: 'کاذب گیاهی (NIR-R-G)', descFa: 'گیاه شاداب قرمز روشن، آب کاملاً سیاه' },
  { id: 'false-swir', labelFa: 'کاذب رطوبت و برف (SWIR1-NIR-R)', descFa: 'تفکیک فوری برف (فیروزه‌ای/آبی) و خاک خشک' },
  { id: 'ndvi-map', labelFa: 'نقشه شاخص NDVI', descFa: 'سبز تیره: تراکم بالا · قهوه‌ای/آبی: بدون پوشش یا آب' },
];

// 8x6 synthetic landscape grid representing Alpine snow, forest, stressed crops, river, bare soil
const TERRAIN_GRID: LandCoverId[][] = [
  ['snow-ice', 'snow-ice', 'dry-soil', 'healthy-veg', 'healthy-veg', 'healthy-veg', 'clear-water', 'healthy-veg'],
  ['snow-ice', 'dry-soil', 'healthy-veg', 'healthy-veg', 'healthy-veg', 'clear-water', 'clear-water', 'stressed-veg'],
  ['dry-soil', 'healthy-veg', 'healthy-veg', 'stressed-veg', 'clear-water', 'clear-water', 'stressed-veg', 'stressed-veg'],
  ['dry-soil', 'stressed-veg', 'stressed-veg', 'clear-water', 'clear-water', 'dry-soil', 'dry-soil', 'healthy-veg'],
  ['healthy-veg', 'healthy-veg', 'clear-water', 'clear-water', 'dry-soil', 'dry-soil', 'stressed-veg', 'healthy-veg'],
  ['healthy-veg', 'clear-water', 'clear-water', 'dry-soil', 'dry-soil', 'stressed-veg', 'healthy-veg', 'healthy-veg'],
];

function bandToChannelByte(reflectance: number): number {
  return Math.max(0, Math.min(255, Math.round(Math.pow(reflectance, 0.72) * 255)));
}

function getPixelColor(surface: LandCoverId, composite: CompositeId, variation: number): string {
  const b: BandReflectances = extractMultispectralBands(surface);
  const v = variation;
  const clamp = (n: number) => Math.max(0, Math.min(1, n + v));

  if (composite === 'true-color') {
    const r = bandToChannelByte(clamp(b.red) * 1.45);
    const g = bandToChannelByte(clamp(b.green) * 1.45);
    const bl = bandToChannelByte(clamp(b.blue) * 1.45);
    return `rgb(${r}, ${g}, ${bl})`;
  }
  if (composite === 'false-nir') {
    const r = bandToChannelByte(clamp(b.nir) * 1.25);
    const g = bandToChannelByte(clamp(b.red) * 1.35);
    const bl = bandToChannelByte(clamp(b.green) * 1.35);
    return `rgb(${r}, ${g}, ${bl})`;
  }
  if (composite === 'false-swir') {
    const r = bandToChannelByte(clamp(b.swir1) * 1.35);
    const g = bandToChannelByte(clamp(b.nir) * 1.25);
    const bl = bandToChannelByte(clamp(b.red) * 1.35);
    return `rgb(${r}, ${g}, ${bl})`;
  }
  // NDVI map
  const ndvi = computeNDVI(b.nir, b.red) + v * 0.25;
  if (ndvi < -0.1) return '#0369a1'; // Water
  if (ndvi < 0.2) return '#b45309'; // Soil/Snow low NDVI
  if (ndvi < 0.5) return '#eab308'; // Stressed veg
  return '#15803d'; // Dense healthy veg
}

export function SpectralSignatureLab() {
  const [selectedSurface, setSelectedSurface] = useState<LandCoverId>('healthy-veg');
  const [tab, setTab] = useState<'curves' | 'composite' | 'leaf'>('curves');
  const [composite, setComposite] = useState<CompositeId>('false-nir');

  const bands = extractMultispectralBands(selectedSurface);
  const ndvi = computeNDVI(bands.nir, bands.red);
  const ndwi = computeNDWI(bands.green, bands.nir);
  const ndsi = computeNDSI(bands.green, bands.swir1);

  const svgW = 620;
  const svgH = 240;
  const padL = 44;
  const padR = 16;
  const padT = 22;
  const padB = 36;
  const plotW = svgW - padL - padR;
  const plotH = svgH - padT - padB;

  const toX = (wUm: number) => padL + ((wUm - 0.4) / (2.45 - 0.4)) * plotW;
  const toY = (refl: number) => padT + plotH - refl * plotH;

  const bandRegions = [
    { label: 'B', from: 0.45, to: 0.51, fill: '#3b82f6' },
    { label: 'G', from: 0.53, to: 0.59, fill: '#22c55e' },
    { label: 'R', from: 0.64, to: 0.67, fill: '#ef4444' },
    { label: 'NIR', from: 0.78, to: 0.89, fill: '#be123c' },
    { label: 'SWIR1', from: 1.56, to: 1.66, fill: '#ea580c' },
    { label: 'SWIR2', from: 2.1, to: 2.3, fill: '#9a3412' },
  ];

  const makeCurvePath = (surface: LandCoverId) => {
    const pts: string[] = [];
    for (let i = 0; i <= 100; i++) {
      const w = 0.4 + (i / 100) * 2.05;
      const r = getSurfaceReflectance(surface, w);
      pts.push(`${i === 0 ? 'M' : 'L'} ${toX(w).toFixed(1)} ${toY(r).toFixed(1)}`);
    }
    return pts.join(' ');
  };

  const activeSurfaceMeta = SURFACES.find((s) => s.id === selectedSurface)!;

  return (
    <div className="flex flex-col gap-5" data-testid="lab-spectral-signatures">
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              آزمایشگاه امضای طیفی و ترکیب باندهای ماهواره‌ای
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              بازتاب طیفی از ۰.۴ تا ۲.۴۵ میکرومتر و اثر انتخاب باند روی تصویر ماهواره‌ای
            </p>
          </div>
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => setTab('curves')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                tab === 'curves' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              منحنی امضای طیفی
            </button>
            <button
              type="button"
              onClick={() => setTab('composite')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                tab === 'composite' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ترکیب رنگی ماهواره
            </button>
            <button
              type="button"
              onClick={() => setTab('leaf')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                tab === 'leaf' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ساختار برگ و NIR
            </button>
          </div>
        </div>

        {/* Target Selector */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {SURFACES.map((surface) => {
            const isSelected = selectedSurface === surface.id;
            return (
              <button
                key={surface.id}
                type="button"
                onClick={() => setSelectedSurface(surface.id)}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 font-medium'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {surface.labelFa}
              </button>
            );
          })}
        </div>

        {tab === 'curves' && (
          <div className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden" dir="ltr">
            <svg
              viewBox={`0 0 ${svgW} ${svgH}`}
              className="w-full h-60 block"
              role="img"
              aria-label="نمودار بازتاب طیفی پوشش گیاهی، خاک، آب و برف"
            >
              {bandRegions.map((reg) => (
                <g key={reg.label}>
                  <rect
                    x={toX(reg.from)}
                    y={padT}
                    width={Math.max(4, toX(reg.to) - toX(reg.from))}
                    height={plotH}
                    fill={reg.fill}
                    fillOpacity="0.11"
                  />
                  <text
                    x={(toX(reg.from) + toX(reg.to)) / 2}
                    y={padT + 12}
                    textAnchor="middle"
                    className="fill-slate-600 text-[9px] font-mono-tech font-semibold"
                  >
                    {reg.label}
                  </text>
                </g>
              ))}

              {[0, 0.25, 0.5, 0.75, 1].map((r) => {
                const y = toY(r);
                return (
                  <g key={r}>
                    <line x1={padL} y1={y} x2={svgW - padR} y2={y} stroke="#e2e8f0" strokeWidth="1" />
                    <text
                      x={padL - 8}
                      y={r === 0 ? y - 2 : y + 3}
                      textAnchor="end"
                      className="fill-slate-400 text-[10px] font-mono-tech"
                    >
                      {Math.round(r * 100)}%
                    </text>
                  </g>
                );
              })}

              {[0.4, 0.7, 1.0, 1.4, 1.8, 2.2, 2.4].map((w) => {
                const x = toX(w);
                return (
                  <g key={w}>
                    <line x1={x} y1={padT} x2={x} y2={padT + plotH} stroke="#e2e8f0" strokeWidth="1" />
                    <text x={x} y={padT + plotH + 16} textAnchor="middle" className="fill-slate-500 text-[10px] font-mono-tech">
                      {w.toFixed(1)}
                    </text>
                  </g>
                );
              })}

              <text x={padL + plotW / 2} y={svgH - 4} textAnchor="middle" className="fill-slate-600 text-[11px]">
                Wavelength (μm)
              </text>

              {/* Background Curves */}
              {SURFACES.filter((s) => s.id !== selectedSurface).map((s) => (
                <path
                  key={s.id}
                  d={makeCurvePath(s.id)}
                  fill="none"
                  stroke={s.color}
                  strokeOpacity="0.28"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />
              ))}

              {/* Active Highlighted Curve */}
              <path
                d={makeCurvePath(selectedSurface)}
                fill="none"
                stroke={activeSurfaceMeta.color}
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}

        {tab === 'composite' && (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div className="flex flex-wrap gap-1.5 mb-3">
              {COMPOSITES.map((comp) => (
                <button
                  key={comp.id}
                  type="button"
                  onClick={() => setComposite(comp.id)}
                  className={`px-2.5 py-1.5 text-xs rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                    composite === comp.id
                      ? 'bg-sky-600 text-white border-sky-600 font-medium'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {comp.labelFa}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-8 gap-1 max-w-md mx-auto bg-slate-900 p-2 rounded-lg">
              {TERRAIN_GRID.map((row, rIdx) =>
                row.map((cellSurface, cIdx) => {
                  const variation = (((rIdx * 7 + cIdx * 13) % 5) - 2) * 0.015;
                  const isActiveType = cellSurface === selectedSurface;
                  const surfaceInfo = SURFACES.find((s) => s.id === cellSurface)!;
                  return (
                    <button
                      key={`${rIdx}-${cIdx}`}
                      type="button"
                      onClick={() => setSelectedSurface(cellSurface)}
                      title={surfaceInfo.labelFa}
                      aria-label={`پیکسل ${surfaceInfo.labelFa}`}
                      className={`h-8 rounded-sm transition-transform hover:scale-105 ${
                        isActiveType ? 'ring-2 ring-white z-10' : ''
                      }`}
                      style={{ backgroundColor: getPixelColor(cellSurface, composite, variation) }}
                    />
                  );
                })
              )}
            </div>

            <p className="text-xs text-slate-600 text-center mt-3">
              {COMPOSITES.find((c) => c.id === composite)?.descFa} · روی هر پیکسل کلیک کنید تا امضای طیفی آن خوانده شود.
            </p>
          </div>
        )}

        {tab === 'leaf' && (
          <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
            <ResilientImage
              src="/src/assets/images/concept_spectral_leaf_1794852109885.jpg"
              alt="مقطع سلولی برگ و برهم‌کنش نور آبی، قرمز و فروسرخ نزدیک"
              className="w-full h-60 object-cover"
            />
          </div>
        )}
      </div>

      {/* Computed Spectral Indices & Band Reflectances */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white border border-slate-200 rounded-xl p-3.5">
          <div className="text-xs text-slate-500 mb-1">شاخص پوشش گیاهی (NDVI)</div>
          <div className="text-xl font-semibold font-mono-tech text-slate-900 tabular-nums" dir="ltr">
            {ndvi >= 0 ? `+${ndvi.toFixed(3)}` : ndvi.toFixed(3)}
          </div>
          <div className="text-xs text-slate-500 mt-1 font-mono-tech" dir="ltr">
            NIR: {(bands.nir * 100).toFixed(0)}% · Red: {(bands.red * 100).toFixed(0)}%
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3.5">
          <div className="text-xs text-slate-500 mb-1">شاخص آب سطحی (NDWI)</div>
          <div className="text-xl font-semibold font-mono-tech text-slate-900 tabular-nums" dir="ltr">
            {ndwi >= 0 ? `+${ndwi.toFixed(3)}` : ndwi.toFixed(3)}
          </div>
          <div className="text-xs text-slate-500 mt-1 font-mono-tech" dir="ltr">
            Green: {(bands.green * 100).toFixed(0)}% · NIR: {(bands.nir * 100).toFixed(0)}%
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3.5">
          <div className="text-xs text-slate-500 mb-1">شاخص تفکیک برف (NDSI)</div>
          <div className="text-xl font-semibold font-mono-tech text-slate-900 tabular-nums" dir="ltr">
            {ndsi >= 0 ? `+${ndsi.toFixed(3)}` : ndsi.toFixed(3)}
          </div>
          <div className="text-xs text-slate-500 mt-1 font-mono-tech" dir="ltr">
            Green: {(bands.green * 100).toFixed(0)}% · SWIR1: {(bands.swir1 * 100).toFixed(0)}%
          </div>
        </div>
      </div>
    </div>
  );
}
