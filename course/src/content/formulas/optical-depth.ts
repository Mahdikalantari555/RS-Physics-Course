import { sym, tex } from "../tokens";
import type { Formula } from "../types";

export const opticalDepth: Formula = {
  kind: "formula",
  id: "optical-depth",
  title: "عمق اپتیکی در طول مسیر",
  summary: "جمع پیوسته خاموشی در طول مسیر دید از سطح تا سنجنده.",
  tokens: [
    sym("tau", "\\tau"),
    tex("="),
    sym("int", "\\int_{0}^{s}"),
    sym("kappa", "\\kappa"),
    sym("rho", "\\rho"),
    tex("\\, ds"),
  ],
  parts: [
    {
      id: "tau",
      latex: "\\tau",
      name: "عمق اپتیکی (τ)",
      kind: "var",
      unitOrValue: "بی‌بعد",
      explanation: "جمع کل تضعیف جوی در امتداد مسیر پرتو. مسیر مایل از مسیر عمودی عمق بیشتری دارد، چون s بلندتر است.",
      mathRole: "ورودی منفی در تابع نمایی بیر–لامبرت (e⁻τ).",
      intuition: "به همین خاطر خورشید در افق از هوای بسیار ضخیم‌تری می‌گذرد و سرخ‌تر دیده می‌شود.",
    },
    {
      id: "int",
      latex: "\\int_{0}^{s}",
      name: "انتگرال در امتداد مسیر دید",
      kind: "op",
      explanation: "جمع زدن بی‌نهایت لایه نازک از ابتدا (۰) تا طول کل مسیر (s)؛ زیرا چگالی هوا با ارتفاع تغییر می‌کند.",
      mathRole: "تبدیل نرخ خاموشی موضعی به عمق کل مسیر.",
    },
    {
      id: "kappa",
      latex: "\\kappa",
      name: "ضریب خاموشی جرمی (κ)",
      kind: "var",
      unitOrValue: "m² / kg",
      explanation: "سطح مقطع جذب به‌اضافه‌ی پراکندگی به ازای واحد جرم؛ به جنس گاز یا ذره و به طول‌موج بستگی دارد.",
      mathRole: "مشخص‌کننده قدرت مسدودکنندگی محیط در طول‌موج مشخص.",
    },
    {
      id: "rho",
      latex: "\\rho",
      name: "چگالی جرمی محیط (ρ)",
      kind: "var",
      unitOrValue: "kg / m³",
      explanation:
        "این ρ چگالی ماده‌ی جاذب است، نه بازتابندگی سطح (تشابه نمادها را قاطی نکن). حاصل κ·ρ واحدش ۱/m (معکوس طول) است.",
      mathRole: "در لایه‌های نزدیک زمین بیشترین مقدار را دارد و با افزایش ارتفاع کم می‌شود.",
    },
  ],
  relatedLabs: ["atmosphere"],
  relatedMath: ["integrals"],
};
