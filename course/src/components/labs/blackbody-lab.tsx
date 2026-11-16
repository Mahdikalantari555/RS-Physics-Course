import { useEffect, useMemo, useState } from "react";
import { CartesianGrid, Line, LineChart, ReferenceArea, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { LabMeta } from "@/content/types";
import { faNum, faSci, formatLength, spectrumBand } from "@/lib/format";
import { useProgress } from "@/lib/progress";
import { planckB, stefan, wienPeak } from "@/lib/physics";

export const labMeta: LabMeta = {
  id: "blackbody",
  title: "جسم سیاه",
  summary: "دما را عوض کن. قله جابه‌جا می‌شود و خروج کل انرژی با توان چهارم تغییر می‌کند. محور عمودی به قله مقیاس شده است.",
  order: 2,
};

const PRESETS = [
  { name: "زمین", t: 255 },
  { name: "بدن", t: 310 },
  { name: "شعله", t: 1200 },
  { name: "رشته", t: 2800 },
  { name: "خورشید", t: 5772 },
];

export function Lab() {
  const [temp, setTemp] = useState(5772);
  const [ready, setReady] = useState(false);
  const { markLab } = useProgress();

  useEffect(() => setReady(true), []);

  const model = useMemo(() => {
    const peak = wienPeak(temp);
    const min = Math.min(0.2e-6, peak / 6);
    const max = peak * 5;
    let ymax = 0;
    const raw: { x: number; y: number }[] = [];
    const n = 90;
    for (let i = 0; i < n; i += 1) {
      const lambda = min + ((max - min) * i) / (n - 1);
      const value = planckB(lambda, temp);
      if (value > ymax) ymax = value;
      raw.push({ x: lambda * 1e6, y: value });
    }
    return {
      peak,
      min,
      max,
      rows: raw.map((row) => ({ x: row.x, y: ymax > 0 ? row.y / ymax : 0 })),
      exitance: stefan(temp),
      ratio: (temp / 300) ** 4,
    };
  }, [temp]);

  const showVisible = model.max * 1e6 > 0.4 && model.min * 1e6 < 0.7;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.name}
            type="button"
            onClick={() => {
              setTemp(preset.t);
              markLab("blackbody");
            }}
            className="inline-flex min-h-11 items-center rounded-full border border-line bg-paper px-3 text-sm"
          >
            {preset.name}
          </button>
        ))}
      </div>
      <label className="text-sm">
        <span className="flex justify-between">
          <span>دما</span>
          <span className="tabular-nums">{faNum(temp, 0)} K</span>
        </span>
        <input
          type="range"
          min={250}
          max={6000}
          step={10}
          value={temp}
          onChange={(event) => {
            setTemp(Number(event.target.value));
            markLab("blackbody");
          }}
          className="mt-1 h-11 w-full accent-copper"
        />
      </label>
      <div className="h-72 w-full" dir="ltr">
        {ready ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={model.rows} margin={{ top: 12, right: 12, left: 0, bottom: 8 }}>
              <CartesianGrid stroke="var(--color-line)" vertical={false} />
              <XAxis
                dataKey="x"
                type="number"
                domain={[model.min * 1e6, model.max * 1e6]}
                tickFormatter={(value) => faNum(Number(value), Number(value) < 10 ? 1 : 0)}
                stroke="var(--color-muted)"
                tick={{ fill: "var(--color-muted)", fontSize: 12 }}
                label={{ value: "μm", position: "insideBottom", offset: -2, fill: "var(--color-muted)" }}
              />
              <YAxis
                domain={[0, 1]}
                tickFormatter={(value) => faNum(Number(value), 1)}
                stroke="var(--color-muted)"
                tick={{ fill: "var(--color-muted)", fontSize: 12 }}
                width={36}
              />
              {showVisible ? (
                <ReferenceArea x1={Math.max(0.4, model.min * 1e6)} x2={Math.min(0.7, model.max * 1e6)} fill="var(--color-copper)" fillOpacity={0.15} />
              ) : null}
              <Tooltip
                formatter={(value) => [faNum(Number(value), 2), "نسبت به قله"]}
                labelFormatter={(label) => `λ = ${faNum(Number(label), 2)} μm`}
                contentStyle={{
                  background: "var(--color-card)",
                  border: "1px solid var(--color-line)",
                  borderRadius: 12,
                }}
              />
              <Line type="monotone" dataKey="y" stroke="var(--color-cane)" strokeWidth={2} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full rounded-xl bg-paper" />
        )}
      </div>
      <p className="text-sm text-muted">
        {showVisible
          ? "نوار مسی، اگر در قاب باشد، بازه‌ی مرئی است."
          : "قله بیرون از نور مرئی است؛ قاب با دما جابه‌جا شده تا شکل طیف دیده شود."}
      </p>
      <dl className="grid grid-cols-2 gap-3">
        <Fact label="طول‌موج قله" value={formatLength(model.peak)} />
        <Fact label="باند قله" value={spectrumBand(model.peak)} />
        <Fact label="خروج کل" value={`${faSci(model.exitance, 2)} W/m²`} />
        <Fact label="نسبت به ۳۰۰ K" value={`× ${faNum(model.ratio, model.ratio >= 100 ? 0 : 1)}`} />
      </dl>
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
