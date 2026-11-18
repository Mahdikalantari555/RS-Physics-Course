import { useEffect, useMemo, useState } from "react";
import { Line, LineChart, ReferenceDot, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { LabMeta } from "@/content/types";
import { faNum } from "@/lib/format";
import { useProgress } from "@/lib/progress";
import { apparentReflectance, transmittance } from "@/lib/physics";
import {
  atmosphericTransmittance,
  mieRelativeScattering,
  rayleighRelativeScattering,
} from "@/lib/remoteSensing";
import { ResilientImage } from "@/components/ResilientImage";
import atmosphereDiagramUrl from "@/assets/images/concept_atmospheric_scattering_1794852109849.jpg";

export const labMeta: LabMeta = {
  id: "atmosphere",
  title: "جو، پنجره‌های طیفی و نور مسیر",
  summary: "ترکیب پنجره‌های عبور جوی (H₂O و CO₂)، پراکندگی رایلی و می، و مدل یک‌لایه بیر–لامبرت.",
  order: 4,
};

const MIN_LOG = Math.log10(0.3);
const MAX_LOG = Math.log10(15.0);
const TICKS = [0.4, 0.7, 1.0, 1.6, 2.2, 4.0, 6.3, 10.0, 14.0];

export function Lab() {
  const [tab, setTab] = useState<"windows" | "beer" | "diagram">("windows");

  // Tab 1: Spectral atmospheric windows + Rayleigh/Mie scattering
  const [probeUm, setProbeUm] = useState(0.48);
  const [waterVapor, setWaterVapor] = useState(1.0);
  const [aerosolLoad, setAerosolLoad] = useState(1.0);

  // Tab 2: Single-layer Beer-Lambert + path radiance
  const [tau, setTau] = useState(0.35);
  const [rho, setRho] = useState(0.25);
  const [path, setPath] = useState(0.18);
  const [ready, setReady] = useState(false);

  const { markLab } = useProgress();

  useEffect(() => setReady(true), []);

  function touch() {
    markLab("atmosphere");
  }

  // Beer-Lambert calculations
  const trans = transmittance(tau);
  const apparent = apparentReflectance(rho, tau, path);
  const bias = apparent - rho;

  const beerCurve = useMemo(
    () =>
      Array.from({ length: 61 }, (_, index) => {
        const value = index / 20;
        return { tau: value, t: transmittance(value) };
      }),
    [],
  );

  // Spectral windows calculations
  const spectralTrans = atmosphericTransmittance(probeUm, waterVapor);
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

  const windowPoints = useMemo(() => {
    const pts: Array<{ w: number; t: number }> = [];
    for (let i = 0; i <= 160; i++) {
      const logW = MIN_LOG + (i / 160) * (MAX_LOG - MIN_LOG);
      const w = Math.pow(10, logW);
      pts.push({ w, t: atmosphericTransmittance(w, waterVapor) });
    }
    return pts;
  }, [waterVapor]);

  const linePath = windowPoints
    .map((p, idx) => {
      const x = toX(p.w);
      const y = padT + plotH - p.t * plotH;
      return `${idx === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  const areaPath = `${linePath} L ${toX(15).toFixed(1)} ${(padT + plotH).toFixed(1)} L ${toX(0.3).toFixed(1)} ${(
    padT + plotH
  ).toFixed(1)} Z`;

  const probeX = toX(probeUm);
  const probeY = padT + plotH - spectralTrans * plotH;

  const windowQuality =
    spectralTrans >= 0.72
      ? { label: "پنجره شفاف جوی (مناسب تصویربرداری)", cls: "text-cane" }
      : spectralTrans >= 0.4
        ? { label: "عبور نیمه‌شفاف (نیازمند تصحیح)", cls: "text-copper" }
        : { label: "باند جذب شدید جو (مسدود)", cls: "text-copper" };

  return (
    <div className="flex flex-col gap-4" data-testid="lab-atmosphere">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="inline-flex flex-wrap gap-1 rounded-xl border border-line bg-paper p-1">
          <TabButton active={tab === "windows"} onClick={() => setTab("windows")}>
            طیف پنجره‌های جوی
          </TabButton>
          <TabButton active={tab === "beer"} onClick={() => setTab("beer")}>
            مدل یک‌لایه بیر–لامبرت
          </TabButton>
          <TabButton active={tab === "diagram"} onClick={() => setTab("diagram")}>
            شمای لایه‌های جو
          </TabButton>
        </div>
      </div>

      {tab === "windows" && (
        <div className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-xl border border-line bg-paper" dir="ltr">
            <svg
              viewBox={`0 0 ${svgW} ${svgH}`}
              className="block h-60 w-full"
              role="img"
              aria-label="نمودار پنجره‌های جوی و باندهای جذب گازها"
            >
              {[
                { from: 0.4, to: 1.3, label: "VIS + NIR" },
                { from: 1.5, to: 1.78, label: "SWIR1" },
                { from: 2.0, to: 2.4, label: "SWIR2" },
                { from: 8.0, to: 13.5, label: "TIR Window" },
              ].map((win) => (
                <g key={win.label}>
                  <rect
                    x={toX(win.from)}
                    y={padT}
                    width={toX(win.to) - toX(win.from)}
                    height={plotH}
                    fill="var(--color-cane)"
                    fillOpacity="0.1"
                  />
                  <text
                    x={(toX(win.from) + toX(win.to)) / 2}
                    y={padT + 12}
                    textAnchor="middle"
                    fill="var(--color-cane)"
                    fontSize="9.5"
                    fontWeight="600"
                  >
                    {win.label}
                  </text>
                </g>
              ))}

              {[0, 0.25, 0.5, 0.75, 1].map((f) => {
                const y = padT + plotH - f * plotH;
                return (
                  <g key={f}>
                    <line x1={padL} y1={y} x2={svgW - padR} y2={y} stroke="var(--color-line)" strokeWidth="1" />
                    <text
                      x={padL - 8}
                      y={f === 0 ? y - 2 : y + 3}
                      textAnchor="end"
                      fill="var(--color-muted)"
                      fontSize="10"
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
                    <line x1={x} y1={padT} x2={x} y2={padT + plotH} stroke="var(--color-line)" strokeWidth="1" />
                    <text x={x} y={padT + plotH + 16} textAnchor="middle" fill="var(--color-muted)" fontSize="10">
                      {w}
                    </text>
                  </g>
                );
              })}

              <text x={toX(1.4)} y={padT + plotH - 8} textAnchor="middle" fill="var(--color-muted)" fontSize="9">
                H₂O
              </text>
              <text x={toX(1.88)} y={padT + plotH - 8} textAnchor="middle" fill="var(--color-muted)" fontSize="9">
                H₂O
              </text>
              <text x={toX(4.3)} y={padT + plotH - 8} textAnchor="middle" fill="var(--color-muted)" fontSize="9">
                CO₂
              </text>
              <text x={toX(6.3)} y={padT + plotH - 8} textAnchor="middle" fill="var(--color-muted)" fontSize="9">
                H₂O
              </text>

              <path d={areaPath} fill="var(--color-cane)" fillOpacity="0.16" />
              <path d={linePath} fill="none" stroke="var(--color-cane)" strokeWidth="2.2" />

              <line
                x1={probeX}
                y1={padT}
                x2={probeX}
                y2={padT + plotH}
                stroke="var(--color-ink)"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />
              <circle cx={probeX} cy={probeY} r="5" fill="var(--color-copper)" stroke="var(--color-card)" strokeWidth="2" />
            </svg>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Slider
              label="طول‌موج کاوشگر"
              value={`${probeUm.toFixed(2)} μm`}
              min={MIN_LOG}
              max={MAX_LOG}
              step={0.01}
              current={Math.log10(probeUm)}
              onChange={(val) => {
                setProbeUm(Math.pow(10, val));
                touch();
              }}
            />
            <Slider
              label="ستون بخار آب (H₂O)"
              value={`${waterVapor.toFixed(1)}×`}
              min={0.3}
              max={1.8}
              step={0.1}
              current={waterVapor}
              onChange={(val) => {
                setWaterVapor(val);
                touch();
              }}
            />
            <Slider
              label="غلظت هواویز و غبار (Mie)"
              value={`${aerosolLoad.toFixed(1)}×`}
              min={0.2}
              max={2.5}
              step={0.1}
              current={aerosolLoad}
              onChange={(val) => {
                setAerosolLoad(val);
                touch();
              }}
            />
          </div>

          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-line bg-paper px-3 py-3">
              <dt className="text-sm text-muted">عبور جوی در طول‌موج</dt>
              <dd className="mt-1 text-xl font-semibold tabular-nums" dir="ltr">
                {(spectralTrans * 100).toFixed(1)}%
              </dd>
              <p className={`mt-1 text-xs font-medium ${windowQuality.cls}`}>{windowQuality.label}</p>
            </div>
            <div className="rounded-xl border border-line bg-paper px-3 py-3">
              <dt className="text-sm text-muted">پراکندگی رایلی (λ⁻⁴)</dt>
              <dd className="mt-1 text-xl font-semibold tabular-nums" dir="ltr">
                {rayleigh.toFixed(3)}×
              </dd>
              <p className="mt-1 text-xs text-muted">نسبت به باند آبی (0.45 μm = 1.00×)</p>
            </div>
            <div className="rounded-xl border border-line bg-paper px-3 py-3">
              <dt className="text-sm text-muted">پراکندگی می (غبار)</dt>
              <dd className="mt-1 text-xl font-semibold tabular-nums" dir="ltr">
                {mie.toFixed(3)}×
              </dd>
              <p className="mt-1 text-xs text-muted">وابستگی ملایم‌تر (~λ⁻¹·³)</p>
            </div>
          </dl>
        </div>
      )}

      {tab === "beer" && (
        <div className="flex flex-col gap-4">
          <Slider
            label="عمق اپتیکی (τ)"
            value={faNum(tau, 2)}
            min={0}
            max={3}
            step={0.01}
            current={tau}
            onChange={(value) => {
              setTau(value);
              touch();
            }}
          />
          <Slider
            label="بازتاب واقعی سطح (ρ)"
            value={faNum(rho, 2)}
            min={0}
            max={1}
            step={0.01}
            current={rho}
            onChange={(value) => {
              setRho(value);
              touch();
            }}
          />
          <Slider
            label="شدت نور مسیر"
            value={faNum(path, 2)}
            min={0}
            max={0.6}
            step={0.01}
            current={path}
            onChange={(value) => {
              setPath(value);
              touch();
            }}
          />
          <div className="h-48 w-full" dir="ltr">
            {ready ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={beerCurve} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <XAxis
                    dataKey="tau"
                    type="number"
                    domain={[0, 3]}
                    tickFormatter={(value) => faNum(Number(value), 0)}
                    stroke="var(--color-muted)"
                    tick={{ fill: "var(--color-muted)", fontSize: 12 }}
                  />
                  <YAxis
                    domain={[0, 1]}
                    tickFormatter={(value) => faNum(Number(value), 1)}
                    stroke="var(--color-muted)"
                    tick={{ fill: "var(--color-muted)", fontSize: 12 }}
                    width={32}
                  />
                  <Tooltip
                    formatter={(value) => [faNum(Number(value), 2), "عبور"]}
                    labelFormatter={(label) => `τ = ${faNum(Number(label), 2)}`}
                    contentStyle={{
                      background: "var(--color-card)",
                      border: "1px solid var(--color-line)",
                      borderRadius: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="t"
                    stroke="var(--color-cane)"
                    dot={false}
                    strokeWidth={2}
                    isAnimationActive={false}
                  />
                  <ReferenceDot x={tau} y={trans} r={5} fill="var(--color-copper)" stroke="var(--color-ink)" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full rounded-xl bg-paper" />
            )}
          </div>
          <dl className="grid grid-cols-2 gap-3">
            <Fact label="عبور" value={faNum(trans, 3)} />
            <Fact label="بازتاب ظاهری" value={faNum(apparent, 3)} />
          </dl>
          <p className="leading-relaxed">
            {Math.abs(bias) < 0.01
              ? "در این تنظیم، ظاهری و واقعی تقریباً یکی‌اند."
              : bias > 0
                ? "سطح تیره‌تر از چیزی است که سنجنده می‌بیند: نور مسیر روشنایی اضافه کرده."
                : "سطح روشن‌تر از چیزی است که سنجنده می‌بیند: عبور، بخشی از نور را برده."}
          </p>
        </div>
      )}

      {tab === "diagram" && (
        <div className="overflow-hidden rounded-xl border border-line bg-paper">
          <ResilientImage
            src={atmosphereDiagramUrl}
            alt="مقطع لایه‌های جو و پراکندگی تابش خورشیدی"
            className="h-64 w-full object-cover"
          />
        </div>
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-10 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
        active ? "bg-ink text-parchment" : "text-ink-soft hover:bg-card"
      }`}
    >
      {children}
    </button>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-paper px-3 py-3">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="mt-1 text-xl font-semibold tabular-nums" dir="ltr">
        {value}
      </dd>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  current,
  onChange,
}: {
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  current: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="text-sm">
      <span className="flex justify-between">
        <span>{label}</span>
        <span className="tabular-nums" dir="ltr">
          {value}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={current}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-1 h-11 w-full accent-cane"
      />
    </label>
  );
}
