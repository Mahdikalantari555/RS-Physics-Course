import { useEffect, useRef, useState } from "react";
import type { LabMeta } from "@/content/types";
import { faNum, formatDuration, formatHz } from "@/lib/format";
import { useProgress } from "@/lib/progress";
import { C, R_EARTH, SIDEREAL_DAY, circularOrbit, logMap, logUnmap, orbitClass } from "@/lib/physics";

export const labMeta: LabMeta = {
  id: "orbit",
  title: "مدار دایره‌ای",
  summary: "ارتفاع را عوض کن. سرعت و دوره از گرانش می‌آیند. فاصله در تصویر فشرده شده تا مدار بالا هم در قاب بماند.",
  order: 5,
};

const MIN_KM = 160;
const MAX_KM = 42000;

export function Lab() {
  const [t, setT] = useState(logUnmap(400, MIN_KM, MAX_KM));
  const [vr, setVr] = useState(0.2);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const altRef = useRef(400);
  const { markLab } = useProgress();

  const altitude = logMap(t, MIN_KM, MAX_KM);
  altRef.current = altitude;
  const orbit = circularOrbit(altitude * 1000);
  const perDay = SIDEREAL_DAY / orbit.period;
  const frac = (vr * 1000) / C;
  const carrier = 5.4e9;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let frame = 0;
    let angle = 0.8;
    let last = performance.now();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w < 2 || h < 2) return;
      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const styles = getComputedStyle(canvas);
      const ink = styles.getPropertyValue("--color-ink").trim();
      const cane = styles.getPropertyValue("--color-cane").trim();
      const copper = styles.getPropertyValue("--color-copper").trim();
      const paper = styles.getPropertyValue("--color-parchment").trim();
      const line = styles.getPropertyValue("--color-line").trim();
      const cx = w / 2;
      const cy = h / 2 + 8;
      const earth = Math.min(w, h) * 0.16;
      const geoR = R_EARTH + 35786e3;
      const r = R_EARTH + altRef.current * 1000;
      const scaled = Math.log(r / R_EARTH) / Math.log(geoR / R_EARTH);
      const radius = earth + 12 + Math.min(Math.max(scaled, 0.08), 1.2) * (Math.min(w, h) * 0.36);
      ctx.beginPath();
      ctx.strokeStyle = line;
      ctx.lineWidth = 1.5;
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.fillStyle = cane;
      ctx.arc(cx, cy, earth, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = paper;
      ctx.arc(cx - earth * 0.25, cy - earth * 0.2, earth * 0.28, 0, Math.PI * 2);
      ctx.fill();
      const sx = cx + radius * Math.cos(angle);
      const sy = cy + radius * Math.sin(angle);
      ctx.beginPath();
      ctx.fillStyle = copper;
      ctx.arc(sx, sy, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = ink;
      ctx.font = "12px Vazirmatn, sans-serif";
      ctx.direction = "rtl";
      ctx.textAlign = "right";
      ctx.fillText("فاصله فشرده شده", w - 12, 18);
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const period = circularOrbit(altRef.current * 1000).period;
      if (!reduced) angle += dt * (0.7 / Math.sqrt(period / 5400));
      draw();
      if (!reduced) frame = requestAnimationFrame(loop);
    };
    if (reduced) draw();
    else frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <canvas ref={canvasRef} className="h-64 w-full rounded-xl bg-paper" />
      <label className="text-sm">
        <span className="flex justify-between gap-3">
          <span>ارتفاع</span>
          <span className="tabular-nums">{faNum(altitude, altitude >= 1000 ? 0 : 0)} km</span>
        </span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.001}
          value={t}
          onChange={(event) => {
            setT(Number(event.target.value));
            markLab("orbit");
          }}
          className="mt-1 h-11 w-full accent-cane"
        />
      </label>
      <p className="text-sm text-muted">{orbitClass(altitude)}</p>
      <dl className="grid grid-cols-2 gap-3">
        <Fact label="سرعت" value={`${faNum(orbit.v / 1000, 2)} km/s`} />
        <Fact label="دوره" value={formatDuration(orbit.period)} />
        <Fact label="دور در شبانه‌روز نجومی" value={faNum(perDay, 2)} />
        <Fact label="شعاع از مرکز" value={`${faNum(orbit.r / 1000, 0)} km`} />
      </dl>
      <div className="rounded-xl border border-line px-3 py-3">
        <p className="font-medium">دوپلر یک‌طرفه</p>
        <p className="mt-1 text-sm text-muted">مطابق فرمول درس. برای رفت‌وبرگشت رادار تقریباً دو برابر این است.</p>
        <label className="mt-3 block text-sm">
          <span className="flex justify-between">
            <span>سرعت شعاعی</span>
            <span className="tabular-nums" dir="ltr">
              {faNum(vr, 2)} km/s
            </span>
          </span>
          <input
            type="range"
            min={-8}
            max={8}
            step={0.05}
            value={vr}
            onChange={(event) => {
              setVr(Number(event.target.value));
              markLab("orbit");
            }}
            className="mt-1 h-11 w-full accent-copper"
          />
        </label>
        <dl className="mt-3 grid grid-cols-2 gap-3">
          <Fact label="Δλ / λ" value={faNum(frac, 6)} />
          <Fact label="Δf در ۵٫۴ GHz" value={formatHz(Math.abs(frac * carrier)).replace(/^/, frac < 0 ? "−" : "")} />
        </dl>
      </div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-paper px-3 py-3">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="mt-1 font-semibold" dir="ltr">
        {value}
      </dd>
    </div>
  );
}
