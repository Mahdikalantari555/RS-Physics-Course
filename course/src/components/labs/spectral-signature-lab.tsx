import { useState } from "react";
import {
  computeNDSI,
  computeNDVI,
  computeNDWI,
  extractMultispectralBands,
  getSurfaceReflectance,
  type BandReflectances,
  type LandCoverId,
} from "@/lib/remoteSensing";
import type { LabMeta } from "@/content/types";
import { useProgress } from "@/lib/progress";
import { ResilientImage } from "@/components/ResilientImage";
import leafImageUrl from "@/assets/images/concept_spectral_leaf_1794852109885.jpg";

const SURFACES: Array<{ id: LandCoverId; labelFa: string; color: string }> = [
  { id: "healthy-veg", labelFa: "پوشش گیاهی سالم", color: "#1f6b4a" },
  { id: "stressed-veg", labelFa: "گیاه تحت تنش", color: "#b4532a" },
  { id: "dry-soil", labelFa: "خاک خشک برهنه", color: "#8c5a32" },
  { id: "clear-water", labelFa: "آب زلال و عمیق", color: "#1d5f8a" },
  { id: "snow-ice", labelFa: "برف و یخچال", color: "#5e564e" },
];

type CompositeId = "true-color" | "false-nir" | "false-swir" | "ndvi-map";

const COMPOSITES: Array<{ id: CompositeId; labelFa: string; descFa: string }> = [
  { id: "true-color", labelFa: "رنگ طبیعی (R-G-B)", descFa: "دید چشم انسان: جنگل سبز و برف سفید" },
  { id: "false-nir", labelFa: "کاذب گیاهی (NIR-R-G)", descFa: "گیاه شاداب قرمز روشن، آب کاملاً سیاه" },
  { id: "false-swir", labelFa: "کاذب رطوبت و برف (SWIR1-NIR-R)", descFa: "تفکیک فوری برف (فیروزه‌ای/آبی) و خاک خشک" },
  { id: "ndvi-map", labelFa: "نقشه شاخص NDVI", descFa: "سبز تیره: تراکم بالا · قهوه‌ای/آبی: بدون پوشش یا آب" },
];

const TERRAIN_GRID: LandCoverId[][] = [
  ["snow-ice", "snow-ice", "dry-soil", "healthy-veg", "healthy-veg", "healthy-veg", "clear-water", "healthy-veg"],
  ["snow-ice", "dry-soil", "healthy-veg", "healthy-veg", "healthy-veg", "clear-water", "clear-water", "stressed-veg"],
  ["dry-soil", "healthy-veg", "healthy-veg", "stressed-veg", "clear-water", "clear-water", "stressed-veg", "stressed-veg"],
  ["dry-soil", "stressed-veg", "stressed-veg", "clear-water", "clear-water", "dry-soil", "dry-soil", "healthy-veg"],
  ["healthy-veg", "healthy-veg", "clear-water", "clear-water", "dry-soil", "dry-soil", "stressed-veg", "healthy-veg"],
  ["healthy-veg", "clear-water", "clear-water", "dry-soil", "dry-soil", "stressed-veg", "healthy-veg", "healthy-veg"],
];

function bandToChannelByte(reflectance: number): number {
  return Math.max(0, Math.min(255, Math.round(Math.pow(reflectance, 0.72) * 255)));
}

function getPixelColor(surface: LandCoverId, composite: CompositeId, variation: number): string {
  const b: BandReflectances = extractMultispectralBands(surface);
  const v = variation;
  const clamp = (n: number) => Math.max(0, Math.min(1, n + v));

  if (composite === "true-color") {
    const r = bandToChannelByte(clamp(b.red) * 1.45);
    const g = bandToChannelByte(clamp(b.green) * 1.45);
    const bl = bandToChannelByte(clamp(b.blue) * 1.45);
    return `rgb(${r}, ${g}, ${bl})`;
  }
  if (composite === "false-nir") {
    const r = bandToChannelByte(clamp(b.nir) * 1.25);
    const g = bandToChannelByte(clamp(b.red) * 1.35);
    const bl = bandToChannelByte(clamp(b.green) * 1.35);
    return `rgb(${r}, ${g}, ${bl})`;
  }
  if (composite === "false-swir") {
    const r = bandToChannelByte(clamp(b.swir1) * 1.35);
    const g = bandToChannelByte(clamp(b.nir) * 1.25);
    const bl = bandToChannelByte(clamp(b.red) * 1.35);
    return `rgb(${r}, ${g}, ${bl})`;
  }
  const ndvi = computeNDVI(b.nir, b.red) + v * 0.25;
  if (ndvi < -0.1) return "#1d5f8a";
  if (ndvi < 0.2) return "#b4532a";
  if (ndvi < 0.5) return "#ca8a04";
  return "#1f6b4a";
}

export const labMeta: LabMeta = {
  id: "spectral-signatures",
  title: "امضای طیفی و ترکیب باند",
  summary: "منحنی امضای طیفی عوارض، شاخص‌های NDVI / NDWI / NDSI و ترکیب‌های رنگی کاذب ماهواره‌ای.",
  order: 5,
};

export function Lab() {
  const { markLab } = useProgress();
  const [selectedSurface, setSelectedSurface] = useState<LandCoverId>("healthy-veg");
  const [tab, setTab] = useState<"curves" | "composite" | "leaf">("curves");
  const [composite, setComposite] = useState<CompositeId>("false-nir");

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
    { label: "B", from: 0.45, to: 0.51, fill: "#3b82f6" },
    { label: "G", from: 0.53, to: 0.59, fill: "#1f6b4a" },
    { label: "R", from: 0.64, to: 0.67, fill: "#b4532a" },
    { label: "NIR", from: 0.78, to: 0.89, fill: "#9f1239" },
    { label: "SWIR1", from: 1.56, to: 1.66, fill: "#c2410c" },
    { label: "SWIR2", from: 2.1, to: 2.3, fill: "#7c2d12" },
  ];

  const makeCurvePath = (surface: LandCoverId) => {
    const pts: string[] = [];
    for (let i = 0; i <= 100; i++) {
      const w = 0.4 + (i / 100) * 2.05;
      const r = getSurfaceReflectance(surface, w);
      pts.push(`${i === 0 ? "M" : "L"} ${toX(w).toFixed(1)} ${toY(r).toFixed(1)}`);
    }
    return pts.join(" ");
  };

  const activeSurfaceMeta = SURFACES.find((s) => s.id === selectedSurface)!;

  return (
    <div className="flex flex-col gap-5" data-testid="lab-spectral-signatures">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex flex-wrap gap-1 rounded-xl border border-line bg-paper p-1">
          <button
            type="button"
            onClick={() => setTab("curves")}
            className={`min-h-10 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
              tab === "curves" ? "bg-ink text-parchment" : "text-ink-soft hover:bg-card"
            }`}
          >
            منحنی امضای طیفی
          </button>
          <button
            type="button"
            onClick={() => setTab("composite")}
            className={`min-h-10 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
              tab === "composite" ? "bg-ink text-parchment" : "text-ink-soft hover:bg-card"
            }`}
          >
            ترکیب رنگی ماهواره
          </button>
          <button
            type="button"
            onClick={() => setTab("leaf")}
            className={`min-h-10 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
              tab === "leaf" ? "bg-ink text-parchment" : "text-ink-soft hover:bg-card"
            }`}
          >
            ساختار برگ و NIR
          </button>
        </div>
      </div>

      {/* Target Selector */}
      <div className="flex flex-wrap gap-2">
        {SURFACES.map((surface) => {
          const isSelected = selectedSurface === surface.id;
          return (
            <button
              key={surface.id}
              type="button"
              onClick={() => {
                setSelectedSurface(surface.id);
                markLab("spectral-signatures");
              }}
              className={`min-h-10 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                isSelected
                  ? "border-cane bg-cane-soft text-cane"
                  : "border-line bg-paper text-ink-soft hover:border-cane"
              }`}
            >
              {surface.labelFa}
            </button>
          );
        })}
      </div>

      {tab === "curves" && (
        <div className="overflow-hidden rounded-xl border border-line bg-paper" dir="ltr">
          <svg
            viewBox={`0 0 ${svgW} ${svgH}`}
            className="block h-60 w-full"
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
                  fill="var(--color-muted)"
                  fontSize="9"
                  fontWeight="600"
                >
                  {reg.label}
                </text>
              </g>
            ))}

            {[0, 0.25, 0.5, 0.75, 1].map((r) => {
              const y = toY(r);
              return (
                <g key={r}>
                  <line x1={padL} y1={y} x2={svgW - padR} y2={y} stroke="var(--color-line)" strokeWidth="1" />
                  <text
                    x={padL - 8}
                    y={r === 0 ? y - 2 : y + 3}
                    textAnchor="end"
                    fill="var(--color-muted)"
                    fontSize="10"
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
                  <line x1={x} y1={padT} x2={x} y2={padT + plotH} stroke="var(--color-line)" strokeWidth="1" />
                  <text x={x} y={padT + plotH + 16} textAnchor="middle" fill="var(--color-muted)" fontSize="10">
                    {w.toFixed(1)}
                  </text>
                </g>
              );
            })}

            <text x={padL + plotW / 2} y={svgH - 4} textAnchor="middle" fill="var(--color-muted)" fontSize="11">
              Wavelength (μm)
            </text>

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

      {tab === "composite" && (
        <div className="rounded-xl border border-line bg-paper p-4">
          <div className="mb-3 flex flex-wrap gap-1.5">
            {COMPOSITES.map((comp) => (
              <button
                key={comp.id}
                type="button"
                onClick={() => setComposite(comp.id)}
                className={`min-h-9 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                  composite === comp.id
                    ? "border-cane bg-cane text-card"
                    : "border-line bg-card text-ink-soft hover:border-cane"
                }`}
              >
                {comp.labelFa}
              </button>
            ))}
          </div>

          <div className="mx-auto grid max-w-md grid-cols-8 gap-1 rounded-xl bg-ink p-2">
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
                      isActiveType ? "z-10 ring-2 ring-parchment" : ""
                    }`}
                    style={{ backgroundColor: getPixelColor(cellSurface, composite, variation) }}
                  />
                );
              }),
            )}
          </div>

          <p className="mt-3 text-center text-xs text-muted">
            {COMPOSITES.find((c) => c.id === composite)?.descFa} · روی هر پیکسل کلیک کنید تا امضای طیفی آن خوانده شود.
          </p>
        </div>
      )}

      {tab === "leaf" && (
        <div className="overflow-hidden rounded-xl border border-line bg-paper">
          <ResilientImage
            src={leafImageUrl}
            alt="مقطع سلولی برگ و برهم‌کنش نور آبی، قرمز و فروسرخ نزدیک"
            className="h-60 w-full object-cover"
          />
        </div>
      )}

      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-line bg-paper px-3 py-3">
          <dt className="text-sm text-muted">شاخص پوشش گیاهی (NDVI)</dt>
          <dd className="mt-1 text-xl font-semibold tabular-nums" dir="ltr">
            {ndvi >= 0 ? `+${ndvi.toFixed(3)}` : ndvi.toFixed(3)}
          </dd>
          <p className="mt-1 text-xs text-muted tabular-nums" dir="ltr">
            NIR: {(bands.nir * 100).toFixed(0)}% · Red: {(bands.red * 100).toFixed(0)}%
          </p>
        </div>

        <div className="rounded-xl border border-line bg-paper px-3 py-3">
          <dt className="text-sm text-muted">شاخص آب سطحی (NDWI)</dt>
          <dd className="mt-1 text-xl font-semibold tabular-nums" dir="ltr">
            {ndwi >= 0 ? `+${ndwi.toFixed(3)}` : ndwi.toFixed(3)}
          </dd>
          <p className="mt-1 text-xs text-muted tabular-nums" dir="ltr">
            Green: {(bands.green * 100).toFixed(0)}% · NIR: {(bands.nir * 100).toFixed(0)}%
          </p>
        </div>

        <div className="rounded-xl border border-line bg-paper px-3 py-3">
          <dt className="text-sm text-muted">شاخص تفکیک برف (NDSI)</dt>
          <dd className="mt-1 text-xl font-semibold tabular-nums" dir="ltr">
            {ndsi >= 0 ? `+${ndsi.toFixed(3)}` : ndsi.toFixed(3)}
          </dd>
          <p className="mt-1 text-xs text-muted tabular-nums" dir="ltr">
            Green: {(bands.green * 100).toFixed(0)}% · SWIR1: {(bands.swir1 * 100).toFixed(0)}%
          </p>
        </div>
      </dl>
    </div>
  );
}
