import { useEffect, useRef, useState } from "react";
import type { LabMeta } from "@/content/types";
import { faNum, formatEv, formatHz, formatLength, spectrumBand } from "@/lib/format";
import { useProgress } from "@/lib/progress";
import { C, logMap, logUnmap, photonEv } from "@/lib/physics";

export const labMeta: LabMeta = {
  id: "wave",
  title: "موج و طیف",
  summary: "بسامد را جابه‌جا کن. طول‌موج، انرژی فوتون و نام باند از همان رابطه‌ی c = fλ می‌آیند. شکل موج نمادین است.",
  order: 1,
};

const MIN_F = 1e8;
const MAX_F = 1e15;

const PRESETS = [
  { name: "رادیو", f: 1e8 },
  { name: "مایکروویو", f: 5.4e9 },
  { name: "حرارتی", f: 3e13 },
  { name: "فروسرخ نزدیک", f: 3e14 },
  { name: "سبز", f: 5.5e14 },
  { name: "آبی", f: 6.7e14 },
];

export function Lab() {
  const [t, setT] = useState(logUnmap(5.5e14, MIN_F, MAX_F));
  const [amp, setAmp] = useState(0.7);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ampRef = useRef(amp);
  ampRef.current = amp;
  const { markLab } = useProgress();

  const frequency = logMap(t, MIN_F, MAX_F);
  const lambda = C / frequency;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let frame = 0;
    let phase = 0;
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
      const line = styles.getPropertyValue("--color-line").trim();
      ctx.strokeStyle = line;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(12, h / 2);
      ctx.lineTo(w - 12, h / 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = cane;
      ctx.lineWidth = 2;
      const amplitude = ampRef.current * h * 0.32;
      for (let x = 12; x <= w - 12; x += 1) {
        const u = (x - 12) / (w - 24);
        const y = h / 2 - amplitude * Math.sin(u * Math.PI * 6 + phase);
        if (x === 12) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = copper;
      ctx.beginPath();
      ctx.moveTo(w - 36, h - 28);
      ctx.lineTo(w - 16, h - 22);
      ctx.lineTo(w - 36, h - 16);
      ctx.fill();
      ctx.fillStyle = ink;
      ctx.direction = "rtl";
      ctx.font = "12px Vazirmatn, sans-serif";
      ctx.textAlign = "right";
      ctx.fillText("جهت انتشار", w - 42, h - 16);
    };

    const loop = () => {
      if (!reduced) phase += 0.05;
      draw();
      if (!reduced) frame = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <canvas ref={canvasRef} className="h-40 w-full rounded-xl bg-paper" />
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.name}
            type="button"
            onClick={() => {
              setT(logUnmap(preset.f, MIN_F, MAX_F));
              markLab("wave");
            }}
            className="inline-flex min-h-11 items-center rounded-full border border-line bg-paper px-3 text-sm"
          >
            {preset.name}
          </button>
        ))}
      </div>
      <label className="text-sm">
        <span className="flex justify-between">
          <span>بسامد</span>
          <span className="tabular-nums" dir="ltr">
            {formatHz(frequency)}
          </span>
        </span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.001}
          value={t}
          onChange={(event) => {
            setT(Number(event.target.value));
            markLab("wave");
          }}
          className="mt-1 h-11 w-full accent-cane"
        />
      </label>
      <label className="text-sm">
        <span className="flex justify-between">
          <span>دامنه‌ی شکل (نمادین)</span>
          <span className="tabular-nums">{faNum(amp, 2)}</span>
        </span>
        <input
          type="range"
          min={0.15}
          max={1}
          step={0.01}
          value={amp}
          onChange={(event) => setAmp(Number(event.target.value))}
          className="mt-1 h-11 w-full accent-copper"
        />
      </label>
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Fact label="طول‌موج" value={formatLength(lambda)} />
        <Fact label="باند" value={spectrumBand(lambda)} />
        <Fact label="انرژی فوتون" value={formatEv(photonEv(lambda))} />
        <Fact label="دوره" value={formatLengthTime(1 / frequency)} />
      </dl>
    </div>
  );
}

function formatLengthTime(seconds: number): string {
  if (seconds >= 1) return `${faNum(seconds, 2)} s`;
  if (seconds >= 1e-3) return `${faNum(seconds * 1e3, 2)} ms`;
  if (seconds >= 1e-6) return `${faNum(seconds * 1e6, 2)} μs`;
  if (seconds >= 1e-9) return `${faNum(seconds * 1e9, 2)} ns`;
  return `${faNum(seconds * 1e12, 2)} ps`;
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
