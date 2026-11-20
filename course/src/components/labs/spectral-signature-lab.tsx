import { useEffect, useMemo, useRef, useState } from "react";
import {
  computeNDSI,
  computeNDVI,
  computeNDWI,
  extractMultispectralBands,
  getSurfaceReflectance,
  type LandCoverId,
} from "@/lib/remoteSensing";
import {
  generateMultispectralScene,
  inspectScenePixel,
  renderCompositeRGBA,
  SCENE_HEIGHT,
  SCENE_WIDTH,
  type CompositeId,
  type PixelInspection,
} from "@/lib/satellite-scene";
import type { LabMeta } from "@/content/types";
import { useProgress } from "@/lib/progress";

const SURFACES: Array<{ id: LandCoverId; labelFa: string; color: string }> = [
  { id: "healthy-veg", labelFa: "پوشش گیاهی سالم", color: "#1f6b4a" },
  { id: "stressed-veg", labelFa: "گیاه تحت تنش", color: "#b4532a" },
  { id: "dry-soil", labelFa: "خاک خشک برهنه", color: "#8c5a32" },
  { id: "clear-water", labelFa: "آب زلال و عمیق", color: "#1d5f8a" },
  { id: "snow-ice", labelFa: "برف و یخچال", color: "#5e564e" },
];

const COMPOSITES: Array<{ id: CompositeId; labelFa: string; descFa: string }> = [
  { id: "true-color", labelFa: "رنگ طبیعی (R-G-B)", descFa: "دید چشم انسان: قله‌ی برفی، رودخانه و دریاچه‌ی آبی، جنگل سبز و مزارع تنش‌دیده" },
  { id: "false-nir", labelFa: "کاذب گیاهی (NIR-R-G)", descFa: "جنگل و مزارع سالم قرمز روشن، مزارع تحت تنش کم‌رنگ، آب تقریباً سیاه" },
  { id: "false-swir", labelFa: "کاذب رطوبت و برف (SWIR1-NIR-R)", descFa: "قله‌های برفی فیروزه‌ای/آبی روشن (جذب شدید SWIR) و پوشش گیاهی سبز درخشان" },
  { id: "ndvi-map", labelFa: "نقشه شاخص NDVI", descFa: "سبز تیره: تراکم بالا · زرد: تنش گیاهی · قهوه‌ای: خاک برهنه · آبی: آب" },
];

export const labMeta: LabMeta = {
  id: "spectral-signatures",
  title: "امضای طیفی و ترکیب باند",
  summary: "منحنی امضای طیفی عوارض، شاخص‌های NDVI / NDWI / NDSI و ترکیب‌های رنگی کاذب ماهواره‌ای.",
  order: 5,
};

export function Lab() {
  const { markLab } = useProgress();
  const [selectedSurface, setSelectedSurface] = useState<LandCoverId>("healthy-veg");
  const [tab, setTab] = useState<"curves" | "composite">("curves");
  const [composite, setComposite] = useState<CompositeId>("true-color");
  const [showOutline, setShowOutline] = useState<boolean>(false);
  const [hoveredPixel, setHoveredPixel] = useState<PixelInspection | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const scene = useMemo(() => generateMultispectralScene(SCENE_WIDTH, SCENE_HEIGHT), []);

  useEffect(() => {
    if (tab !== "composite") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rgba = renderCompositeRGBA(scene, composite, showOutline ? selectedSurface : null);
    const img = new ImageData(new Uint8ClampedArray(rgba), scene.width, scene.height);
    ctx.putImageData(img, 0, 0);
  }, [tab, scene, composite, selectedSurface, showOutline]);

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
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1.5">
              {COMPOSITES.map((comp) => (
                <button
                  key={comp.id}
                  type="button"
                  aria-pressed={composite === comp.id}
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
            <button
              type="button"
              aria-pressed={showOutline}
              onClick={() => setShowOutline((prev) => !prev)}
              className={`min-h-9 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                showOutline
                  ? "border-ink bg-ink text-parchment"
                  : "border-line bg-card text-ink-soft hover:border-ink"
              }`}
            >
              {showOutline ? "پنهان کردن مرز کلاس" : "نمایش مرز کلاس انتخاب‌شده"}
            </button>
          </div>

          <div className="mx-auto max-w-2xl overflow-hidden rounded-xl border border-line bg-ink">
            <div className="relative aspect-[16/10] w-full select-none">
              <canvas
                ref={canvasRef}
                width={SCENE_WIDTH}
                height={SCENE_HEIGHT}
                data-testid="satellite-composite-canvas"
                aria-label="تصویر ماهواره‌ای چندطیفی با ۸۱٬۰۰۰ پیکسل شامل قله برفی، رودخانه و دریاچه، جنگل، مزارع و خاک خشک"
                className="block h-full w-full cursor-crosshair"
                onPointerMove={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect();
                  const px = Math.floor(((event.clientX - rect.left) / rect.width) * SCENE_WIDTH);
                  const py = Math.floor(((event.clientY - rect.top) / rect.height) * SCENE_HEIGHT);
                  setHoveredPixel(inspectScenePixel(scene, px, py));
                }}
                onPointerLeave={() => setHoveredPixel(null)}
                onClick={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect();
                  const px = Math.floor(((event.clientX - rect.left) / rect.width) * SCENE_WIDTH);
                  const py = Math.floor(((event.clientY - rect.top) / rect.height) * SCENE_HEIGHT);
                  const pixel = inspectScenePixel(scene, px, py);
                  setHoveredPixel(pixel);
                  setSelectedSurface(pixel.surface);
                  markLab("spectral-signatures");
                }}
              />
              {hoveredPixel ? (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-parchment shadow-sm"
                  style={{
                    left: `${((hoveredPixel.x + 0.5) / SCENE_WIDTH) * 100}%`,
                    top: `${((hoveredPixel.y + 0.5) / SCENE_HEIGHT) * 100}%`,
                  }}
                />
              ) : null}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-parchment/15 bg-ink px-3.5 py-2.5 text-xs text-parchment">
              {hoveredPixel ? (
                <>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold">
                      {SURFACES.find((s) => s.id === hoveredPixel.surface)?.labelFa}
                    </span>
                    <span className="text-parchment/60" aria-hidden="true">·</span>
                    <span className="tabular-nums text-parchment/80" dir="ltr">
                      px ({hoveredPixel.x}, {hoveredPixel.y})
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 tabular-nums text-parchment/90" dir="ltr">
                    <span>NDVI {hoveredPixel.ndvi >= 0 ? `+${hoveredPixel.ndvi.toFixed(2)}` : hoveredPixel.ndvi.toFixed(2)}</span>
                    <span>NDWI {hoveredPixel.ndwi >= 0 ? `+${hoveredPixel.ndwi.toFixed(2)}` : hoveredPixel.ndwi.toFixed(2)}</span>
                    <span>NDSI {hoveredPixel.ndsi >= 0 ? `+${hoveredPixel.ndsi.toFixed(2)}` : hoveredPixel.ndsi.toFixed(2)}</span>
                    <span className="text-parchment/70">
                      R:{Math.round(hoveredPixel.red * 100)}% G:{Math.round(hoveredPixel.green * 100)}% B:{Math.round(hoveredPixel.blue * 100)}% NIR:{Math.round(hoveredPixel.nir * 100)}%
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex w-full flex-wrap items-center justify-between gap-2 text-parchment/80">
                  <span>نشانگر را روی تصویر حرکت دهید یا روی هر عارضه کلیک کنید تا بازتاب ۵ باند آن خوانده شود.</span>
                  <span className="tabular-nums text-parchment/65" dir="ltr">
                    360 × 225 px (81,000 px)
                  </span>
                </div>
              )}
            </div>
          </div>

          <p className="mt-3 text-center text-xs text-muted">
            {COMPOSITES.find((c) => c.id === composite)?.descFa}
          </p>
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
