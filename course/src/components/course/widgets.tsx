import { useState } from "react";
import { faNum } from "@/lib/format";
import { stefan } from "@/lib/physics";

export function ExpWidget() {
  const [x, setX] = useState(1);
  const grow = Math.exp(x);
  const decay = Math.exp(-x);
  const width = (value: number) => `${Math.min(100, (value / Math.exp(4)) * 100)}%`;

  return (
    <div className="rounded-2xl border border-line bg-card p-4">
      <label className="block text-sm">
        <span className="flex justify-between gap-3">
          <span>توان x</span>
          <span className="tabular-nums" dir="ltr">
            {faNum(x, 2)}
          </span>
        </span>
        <input
          type="range"
          min={0}
          max={4}
          step={0.05}
          value={x}
          onChange={(event) => setX(Number(event.target.value))}
          className="mt-2 h-11 w-full accent-cane"
        />
      </label>
      <div className="mt-4 flex flex-col gap-3">
        <Bar label="eˣ رشد" value={faNum(grow, 2)} width={width(grow)} tone="bg-copper" />
        <Bar label="e⁻ˣ فروپاشی" value={faNum(decay, 3)} width={width(decay)} tone="bg-cane" />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        در قانون بیر، x همان عمق اپتیکی است و فقط شاخه‌ی فروپاشی را می‌بینیم. در x = ۱ حدود {faNum(Math.exp(-1) * 100, 0)}٪
        می‌ماند.
      </p>
    </div>
  );
}

function Bar({ label, value, width, tone }: { label: string; value: string; width: string; tone: string }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span>{label}</span>
        <span className="tabular-nums" dir="ltr">
          {value}
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-line">
        <div className={"h-full rounded-full " + tone} style={{ width }} />
      </div>
    </div>
  );
}

export function StefanSlopeWidget() {
  const [temp, setTemp] = useState(300);
  const base = stefan(temp);
  const plus = stefan(temp + 1) - base;
  const relative = (4 / temp) * 100;

  return (
    <div className="rounded-2xl border border-line bg-card p-4">
      <label className="block text-sm">
        <span className="flex justify-between gap-3">
          <span>دما</span>
          <span className="tabular-nums">{faNum(temp, 0)} کلوین</span>
        </span>
        <input
          type="range"
          min={250}
          max={6000}
          step={10}
          value={temp}
          onChange={(event) => setTemp(Number(event.target.value))}
          className="mt-2 h-11 w-full accent-copper"
        />
      </label>
      <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Readout label="خروج انرژی" value={`${faNum(base, base >= 1000 ? 0 : 1)} W/m²`} />
        <Readout label="اثر +۱ کلوین" value={`${faNum(plus, plus >= 100 ? 0 : 2)} W/m²`} />
        <Readout label="تغییر نسبی +۱ K" value={`${faNum(relative, 2)}٪`} />
      </dl>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        درصد خطا در خروج انرژی همیشه حدود چهار برابر درصد خطای دماست. اثر مطلقِ یک کلوین در دمای بالا خیلی بزرگ‌تر است، چون شیب با توان سوم دما رشد می‌کند؛ اثر نسبی همان یک کلوین در دمای پایین بیشتر است.
      </p>
    </div>
  );
}

function Readout({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-paper px-3 py-3">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="mt-1 font-semibold tabular-nums" dir="ltr">
        {value}
      </dd>
    </div>
  );
}
