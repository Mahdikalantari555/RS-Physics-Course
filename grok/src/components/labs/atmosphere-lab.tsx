import { useEffect, useMemo, useState } from "react";
import { Line, LineChart, ReferenceDot, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { LabMeta } from "@/content/types";
import { faNum } from "@/lib/format";
import { useProgress } from "@/lib/progress";
import { apparentReflectance, transmittance } from "@/lib/physics";

export const labMeta: LabMeta = {
  id: "atmosphere",
  title: "عبور و نور مسیر",
  summary: "مدل آموزشی یک‌لایه: سطح لامبرتی ضعیف می‌شود و جو نور اضافه می‌ریزد. این تصحیح عملیاتی نیست.",
  order: 4,
};

export function Lab() {
  const [tau, setTau] = useState(0.35);
  const [rho, setRho] = useState(0.25);
  const [path, setPath] = useState(0.18);
  const [ready, setReady] = useState(false);
  const { markLab } = useProgress();

  useEffect(() => setReady(true), []);

  const trans = transmittance(tau);
  const apparent = apparentReflectance(rho, tau, path);
  const bias = apparent - rho;

  const curve = useMemo(
    () =>
      Array.from({ length: 61 }, (_, index) => {
        const value = index / 20;
        return { tau: value, t: transmittance(value) };
      }),
    [],
  );

  function touch() {
    markLab("atmosphere");
  }

  return (
    <div className="flex flex-col gap-4">
      <Slider label="عمق اپتیکی" value={faNum(tau, 2)} min={0} max={3} step={0.01} current={tau} onChange={(value) => { setTau(value); touch(); }} />
      <Slider label="بازتاب واقعی سطح" value={faNum(rho, 2)} min={0} max={1} step={0.01} current={rho} onChange={(value) => { setRho(value); touch(); }} />
      <Slider label="شدت نور مسیر" value={faNum(path, 2)} min={0} max={0.6} step={0.01} current={path} onChange={(value) => { setPath(value); touch(); }} />
      <div className="h-48 w-full" dir="ltr">
        {ready ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={curve} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <XAxis dataKey="tau" type="number" domain={[0, 3]} tickFormatter={(value) => faNum(Number(value), 0)} stroke="var(--color-muted)" tick={{ fill: "var(--color-muted)", fontSize: 12 }} />
              <YAxis domain={[0, 1]} tickFormatter={(value) => faNum(Number(value), 1)} stroke="var(--color-muted)" tick={{ fill: "var(--color-muted)", fontSize: 12 }} width={32} />
              <Tooltip
                formatter={(value) => [faNum(Number(value), 2), "عبور"]}
                labelFormatter={(label) => `τ = ${faNum(Number(label), 2)}`}
                contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-line)", borderRadius: 12 }}
              />
              <Line type="monotone" dataKey="t" stroke="var(--color-cane)" dot={false} strokeWidth={2} isAnimationActive={false} />
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
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-paper px-3 py-3">
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
