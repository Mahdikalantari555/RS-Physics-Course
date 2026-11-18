import { useMemo, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Formula } from "@/components/course/formula";
import { Shell } from "@/components/course/shell";
import { formulas, getFormula } from "@/content/load";
import { faInt, faNum } from "@/lib/format";
import {
  computeWaveProperties,
  stefanBoltzmannExitance,
  wienPeakWavelength,
} from "@/lib/remoteSensing";

export const Route = createFileRoute("/formulas/")({
  component: FormulasPage,
  head: () => ({
    meta: [{ title: "مرجع فرمول‌ها و مبدل سریع · فیزیک سنجش از دور" }],
  }),
});

type FormulaRefRow = {
  formulaId: string;
  nameFa: string;
  equation: string;
  variablesFa: string;
  applicationFa: string;
};

const FORMULA_REFERENCE_ROWS: FormulaRefRow[] = [
  {
    formulaId: "wave-speed",
    nameFa: "معادله موج الکترومغناطیسی",
    equation: "c = λ · ν",
    variablesFa: "c = 2.998×10⁸ m/s · λ طول‌موج · ν بسامد",
    applicationFa: "تبدیل طول‌موج‌های اپتیکی (μm) و بسامدهای راداری (GHz)",
  },
  {
    formulaId: "photon-energy",
    nameFa: "انرژی کوانتومی فوتون (پلانک–اینشتین)",
    equation: "E = h · ν = (h · c) / λ",
    variablesFa: "h = 6.626×10⁻³⁴ J·s · E انرژی بر حسب ژول یا eV",
    applicationFa: "تبیین افت انرژی در طول‌موج‌های بلند و نیاز به پیکسل بزرگ‌تر در TIR",
  },
  {
    formulaId: "planck",
    nameFa: "قانون تابش پلانک",
    equation: "B(λ, T) = (2hc² / λ⁵) · [exp(hc / λk_BT) − 1]⁻¹",
    variablesFa: "k_B = 1.381×10⁻²³ J/K · T دمای مطلق (K)",
    applicationFa: "محاسبه تابندگی طیفی جسم سیاه و کالیبراسیون باندهای حرارتی",
  },
  {
    formulaId: "wien",
    nameFa: "قانون جابه‌جایی وین",
    equation: "λ_max = 2897.8 / T  (μm)",
    variablesFa: "T دمای مطلق سطح بر حسب کلوین (K)",
    applicationFa: "تعیین ناحیه طیفی بهینه برای سنجش خورشید (۰٫۵ μm)، آتش (۴ μm) و زمین (۱۰ μm)",
  },
  {
    formulaId: "stefan",
    nameFa: "قانون استفان–بولتزمن",
    equation: "M = ε · σ · T⁴",
    variablesFa: "σ = 5.670×10⁻⁸ W·m⁻²·K⁻⁴ · ε گسیلندگی سطح",
    applicationFa: "محاسبه شار کل تابش خروجی از سطوح زمین و بیلان انرژی",
  },
  {
    formulaId: "rayleigh",
    nameFa: "پراکندگی رایلی",
    equation: "I_Rayleigh ∝ λ⁻⁴",
    variablesFa: "معتبر زمانی که قطر ذره d ≪ λ (مولکول‌های جو)",
    applicationFa: "توضیح آبی بودن آسمان و مه‌آلودگی شدیدتر باند آبی نسبت به NIR",
  },
  {
    formulaId: "beer-lambert",
    nameFa: "قانون عبور جوی بیر–لامبرت",
    equation: "τ(λ) = exp(−k(λ) · sec θ)",
    variablesFa: "k(λ) عمق نوری قائم · θ زاویه سرسویی",
    applicationFa: "محاسبه عبور مستقیم در پنجره‌های جوی و اثر مسیر مایل در لبه‌های تصویر",
  },
  {
    formulaId: "ndvi",
    nameFa: "شاخص پوشش گیاهی نرمال‌شده (NDVI)",
    equation: "NDVI = (ρ_NIR − ρ_Red) / (ρ_NIR + ρ_Red)",
    variablesFa: "ρ بازتاب سطحی در باندهای قرمز (~0.66 μm) و NIR (~0.84 μm)",
    applicationFa: "پایش سلامت، تراکم کلروفیل و زیست‌توده پوشش گیاهی",
  },
  {
    formulaId: "ndwi-ndsi",
    nameFa: "شاخص آب و شاخص برف (NDWI / NDSI)",
    equation: "NDWI = (G − NIR)/(G + NIR)  |  NDSI = (G − SWIR1)/(G + SWIR1)",
    variablesFa: "G بازتاب سبز · SWIR1 بازتاب فروسرخ موج‌کوتاه (~1.61 μm)",
    applicationFa: "استخراج خطوط ساحلی و تالاب‌ها (NDWI) و تفکیک برف از ابر (NDSI)",
  },
  {
    formulaId: "gsd",
    nameFa: "اندازه نمونه زمینی (GSD) و کوانتیزاسیون",
    equation: "GSD = 2H · tan(IFOV / 2)  |  L = 2ⁿ",
    variablesFa: "H ارتفاع مدار · IFOV زاویه دید لحظه‌ای · n عمق بیتی",
    applicationFa: "طراحی اپتیکی سنجنده و تعیین دقت تفکیک مکانی و رادیومتری",
  },
  {
    formulaId: "sar-db",
    nameFa: "پس‌پراکنش رادار SAR در مقیاس دسی‌بل",
    equation: "σ⁰(dB) = 10 · log₁₀(σ⁰_linear)",
    variablesFa: "σ⁰_linear نسبت توان برگشتی به سطح معادل زمین",
    applicationFa: "تفکیک آب آرام (منفی شدید)، پوشش گیاهی و بازتاب گوشه‌ای شهری",
  },
];

function FormulasPage() {
  const [quickLambdaUm, setQuickLambdaUm] = useState<string>("0.65");
  const [quickTempK, setQuickTempK] = useState<string>("300");
  const [selectedId, setSelectedId] = useState<string>("planck");
  const [filterText, setFilterText] = useState<string>("");
  const inspectorRef = useRef<HTMLDivElement | null>(null);

  const parsedLambda = parseFloat(quickLambdaUm);
  const validLambda = Number.isFinite(parsedLambda) && parsedLambda > 0;
  const waveProps = validLambda ? computeWaveProperties(parsedLambda) : null;

  const parsedTemp = parseFloat(quickTempK);
  const validTemp = Number.isFinite(parsedTemp) && parsedTemp > 0;
  const wienPeak = validTemp ? wienPeakWavelength(parsedTemp) : null;
  const stefanTotal = validTemp ? stefanBoltzmannExitance(parsedTemp, 1) : null;

  const orderedFormulas = useMemo(() => {
    const priority = new Map(FORMULA_REFERENCE_ROWS.map((row, idx) => [row.formulaId, idx]));
    const list = [...formulas].sort((a, b) => {
      const pa = priority.get(a.id) ?? 999;
      const pb = priority.get(b.id) ?? 999;
      if (pa !== pb) return pa - pb;
      return a.title.localeCompare(b.title, "fa");
    });
    const q = filterText.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q),
    );
  }, [filterText]);

  const selectFormula = (formulaId: string) => {
    if (!getFormula(formulaId)) return;
    setSelectedId(formulaId);
    inspectorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Shell>
      <header>
        <p className="text-sm font-medium text-cane">مرجع جامع روابط و ثابت‌ها</p>
        <h1 className="mt-1 text-3xl font-semibold">مرجع فرمول‌ها، کالبدشکافی و مبدل سریع</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-soft">
          مجموعه کامل {faInt(formulas.length)} رابطه تعاملی از الکترومغناطیس و ترمودینامیک تابش تا اپتیک جو، شاخص‌های طیفی، مدار و رادار همراه با مبدل سریع محاسباتی.
        </p>
      </header>

      {/* Quick Calculators */}
      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-card p-5">
          <h2 className="text-base font-semibold">مبدل سریع طول‌موج به بسامد و انرژی فوتون</h2>
          <p className="mt-1 text-xs text-muted">بر اساس c = λ · ν و E = hc / λ</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <label htmlFor="calc-lambda" className="text-sm font-medium text-ink-soft">
              طول‌موج (μm):
            </label>
            <input
              id="calc-lambda"
              type="number"
              step="0.01"
              min="0.001"
              value={quickLambdaUm}
              onChange={(e) => setQuickLambdaUm(e.target.value)}
              dir="ltr"
              className="w-36 rounded-lg border border-line bg-paper px-3 py-1.5 text-sm text-ink tabular-nums focus:border-copper focus:outline-none"
            />
          </div>
          {waveProps ? (
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-3 text-sm">
              <div className="rounded-xl border border-line bg-paper p-2.5">
                <span className="block text-xs text-muted">بسامد (ν)</span>
                <span className="mt-1 block font-semibold text-ink tabular-nums" dir="ltr">
                  {waveProps.frequencyTHz >= 1
                    ? `${waveProps.frequencyTHz.toFixed(2)} THz`
                    : `${(waveProps.frequencyHz / 1e9).toFixed(3)} GHz`}
                </span>
              </div>
              <div className="rounded-xl border border-line bg-paper p-2.5">
                <span className="block text-xs text-muted">انرژی فوتون (E)</span>
                <span className="mt-1 block font-semibold text-ink tabular-nums" dir="ltr">
                  {waveProps.energyEv >= 0.001
                    ? `${waveProps.energyEv.toFixed(4)} eV`
                    : `${waveProps.energyEv.toExponential(2)} eV`}
                </span>
              </div>
              <div className="col-span-2 rounded-xl border border-line bg-cane-soft px-3 py-2 text-xs text-ink">
                <span className="font-semibold text-cane">{waveProps.band.nameFa}</span>
                <span className="text-ink-soft"> · {waveProps.band.mechanismFa}</span>
              </div>
            </div>
          ) : (
            <p className="mt-3 text-xs text-copper">لطفاً عددی بزرگ‌تر از صفر وارد کنید.</p>
          )}
        </div>

        <div className="rounded-2xl border border-line bg-card p-5">
          <h2 className="text-base font-semibold">محاسبه سریع قله وین و شار استفان–بولتزمن</h2>
          <p className="mt-1 text-xs text-muted">بر اساس λ_max = b / T و M = σT⁴ (جسم سیاه)</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <label htmlFor="calc-temp" className="text-sm font-medium text-ink-soft">
              دمای مطلق (K):
            </label>
            <input
              id="calc-temp"
              type="number"
              step="1"
              min="1"
              value={quickTempK}
              onChange={(e) => setQuickTempK(e.target.value)}
              dir="ltr"
              className="w-36 rounded-lg border border-line bg-paper px-3 py-1.5 text-sm text-ink tabular-nums focus:border-copper focus:outline-none"
            />
          </div>
          {wienPeak !== null && stefanTotal !== null ? (
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-3 text-sm">
              <div className="rounded-xl border border-line bg-paper p-2.5">
                <span className="block text-xs text-muted">طول‌موج قله (λ_max)</span>
                <span className="mt-1 block font-semibold text-ink tabular-nums" dir="ltr">
                  {wienPeak.toFixed(3)} μm
                </span>
              </div>
              <div className="rounded-xl border border-line bg-paper p-2.5">
                <span className="block text-xs text-muted">کل شار تابشی (M)</span>
                <span className="mt-1 block font-semibold text-ink tabular-nums" dir="ltr">
                  {stefanTotal >= 1e5 ? `${(stefanTotal / 1e6).toFixed(2)} MW/m²` : `${faNum(stefanTotal, 1)} W/m²`}
                </span>
              </div>
              <div className="col-span-2 rounded-xl border border-line bg-copper-soft px-3 py-2 text-xs text-ink">
                دمای معادل سلسیوس:{" "}
                <span className="font-semibold tabular-nums" dir="ltr">
                  {(parsedTemp - 273.15).toFixed(1)} °C
                </span>
              </div>
            </div>
          ) : (
            <p className="mt-3 text-xs text-copper">لطفاً دمای مطلق معتبر (بزرگ‌تر از صفر) وارد کنید.</p>
          )}
        </div>
      </section>

      {/* Interactive Formula Inspector */}
      <section ref={inspectorRef} className="mt-10 scroll-mt-24">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold">کالبدشکافی تعاملی فرمول</h2>
            <p className="mt-1 text-sm text-muted">
              یک فرمول انتخاب کنید و سپس روی هر نماد یا عملگر بزنید تا واحد، نقش ریاضی و شهود فیزیکی آن باز شود.
            </p>
          </div>
          <input
            type="search"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="جستجوی فرمول..."
            aria-label="جستجوی فرمول"
            className="w-full rounded-full border border-line bg-card px-4 py-2 text-sm text-ink placeholder:text-muted focus:border-copper focus:outline-none sm:w-64"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {orderedFormulas.map((item) => {
            const active = item.id === selectedId;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedId(item.id)}
                className={
                  "min-h-10 rounded-full border px-3.5 text-sm transition-colors " +
                  (active ? "border-ink bg-ink text-parchment" : "border-line bg-paper text-ink-soft hover:border-copper")
                }
              >
                {item.title}
              </button>
            );
          })}
        </div>

        <div className="mt-5">
          <Formula key={selectedId} id={selectedId} />
        </div>
      </section>

      {/* Reference Table */}
      <section className="mt-12 rounded-2xl border border-line bg-card p-5 sm:p-6">
        <h2 className="text-2xl font-semibold">جدول خلاصه قوانین و شاخص‌های کلیدی</h2>
        <p className="mt-1 text-sm text-muted">برای باز کردن کالبدشکافی کامل هر رابطه در بخش بالا، روی ردیف آن بزنید.</p>

        <div className="mt-5 overflow-x-auto rounded-xl border border-line">
          <table className="w-full border-collapse text-right text-sm">
            <thead>
              <tr className="border-b border-line bg-paper text-xs font-semibold text-ink-soft">
                <th className="px-4 py-3">عنوان قانون / شاخص</th>
                <th className="px-4 py-3">رابطه ریاضی</th>
                <th className="px-4 py-3">ثابت‌ها و متغیرها</th>
                <th className="px-4 py-3">کاربرد در سنجش از دور</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line bg-card">
              {FORMULA_REFERENCE_ROWS.map((row) => {
                const isSelected = row.formulaId === selectedId;
                return (
                  <tr
                    key={row.formulaId}
                    onClick={() => selectFormula(row.formulaId)}
                    className={
                      "cursor-pointer transition-colors " +
                      (isSelected ? "bg-copper-soft/60" : "hover:bg-paper/70")
                    }
                  >
                    <td className="whitespace-nowrap px-4 py-3.5 font-semibold text-ink">{row.nameFa}</td>
                    <td className="whitespace-nowrap px-4 py-3.5 font-medium text-copper" dir="ltr">
                      {row.equation}
                    </td>
                    <td className="px-4 py-3.5 text-ink-soft">{row.variablesFa}</td>
                    <td className="px-4 py-3.5 text-muted">{row.applicationFa}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </Shell>
  );
}
