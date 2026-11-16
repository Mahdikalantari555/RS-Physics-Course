import { useState } from "react";
import type { LabMeta } from "@/content/types";
import { faNum } from "@/lib/format";
import { useProgress } from "@/lib/progress";
import { ndvi, ndviLabel } from "@/lib/physics";

export const labMeta: LabMeta = {
  id: "ndvi",
  title: "بازتاب و NDVI",
  summary: "سرخ و فروسرخ نزدیک را عوض کن. شاخص از تفاوتشان ساخته می‌شود، نه از روشنایی مطلق.",
  order: 3,
};

const PRESETS = [
  { name: "آب", red: 0.05, nir: 0.02 },
  { name: "خاک", red: 0.28, nir: 0.34 },
  { name: "تنک", red: 0.16, nir: 0.3 },
  { name: "کشت", red: 0.08, nir: 0.46 },
  { name: "انبوه", red: 0.04, nir: 0.58 },
];

export function Lab() {
  const [red, setRed] = useState(0.08);
  const [nir, setNir] = useState(0.46);
  const { markLab } = useProgress();
  const value = ndvi(nir, red);
  const marker = ((value + 1) / 2) * 100;

  function touch(nextRed: number, nextNir: number) {
    setRed(nextRed);
    setNir(nextNir);
    markLab("ndvi");
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.name}
            type="button"
            onClick={() => touch(preset.red, preset.nir)}
            className="inline-flex min-h-11 items-center rounded-full border border-line bg-paper px-3 text-sm"
          >
            {preset.name}
          </button>
        ))}
      </div>
      <Slider label="بازتاب سرخ" value={red} onChange={(next) => touch(next, nir)} />
      <Slider label="بازتاب فروسرخ نزدیک" value={nir} onChange={(next) => touch(red, next)} />
      <div className="rounded-xl bg-paper px-4 py-4">
        <p className="text-sm text-muted">NDVI</p>
        <p className={"text-4xl font-semibold tabular-nums " + (value >= 0.4 ? "text-cane" : value < 0.1 ? "text-copper" : "text-ink")} dir="ltr">
          {faNum(value, 2)}
        </p>
        <p className="mt-1">{ndviLabel(value)}</p>
        <div className="relative mt-4 h-3 rounded-full bg-line" dir="ltr">
          <div className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-copper-soft" />
          <div className="absolute inset-y-0 right-0 w-1/2 rounded-full bg-cane-soft" />
          <div
            className="absolute top-1/2 size-4 -translate-y-1/2 rounded-full border-2 border-ink bg-parchment"
            style={{ left: `calc(${marker}% - 8px)` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-muted" dir="ltr">
          <span>−1</span>
          <span>0</span>
          <span>+1</span>
        </div>
      </div>
    </div>
  );
}

function Slider({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <label className="text-sm">
      <span className="flex justify-between">
        <span>{label}</span>
        <span className="tabular-nums" dir="ltr">
          {faNum(value, 2)}
        </span>
      </span>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-1 h-11 w-full accent-cane"
      />
    </label>
  );
}
