import { sym, tex } from "../tokens";
import type { Formula } from "../types";

export const ndvi: Formula = {
  kind: "formula",
  id: "ndvi",
  title: "شاخص نرمال‌شده اختلاف پوشش گیاهی (NDVI)",
  summary: "تکنیک ریاضی تفاضل‌گیری نرمال‌شده برای حذف اثر تغییر روشنایی و توپوگرافی.",
  tokens: [
    sym("ndvi", "\\mathrm{NDVI}"),
    tex("=\\frac{"),
    sym("nir", "\\rho_{\\mathrm{NIR}}"),
    sym("minus", "-"),
    sym("red", "\\rho_{\\mathrm{Red}}"),
    tex("}{"),
    sym("sum", "\\rho_{\\mathrm{NIR}}+\\rho_{\\mathrm{Red}}"),
    tex("}"),
  ],
  parts: [
    {
      id: "ndvi",
      latex: "\\mathrm{NDVI}",
      name: "مقدار شاخص NDVI",
      kind: "var",
      unitOrValue: "بی‌بعد (−1 تا +1)",
      explanation:
        "معیار کمی سلامت و تراکم کلروفیل پوشش گیاهی. یک ویژگی فیزیکی بنیادی مثل رادیانس نیست، بلکه نسبتی نرمال‌شده است؛ مقادیر بالای ۰٫۶ نشانگر پوشش متراکم و شاداب است.",
      mathRole: "همیشه در بازه بسته [−1, +1] محدود می‌شود.",
    },
    {
      id: "nir",
      latex: "\\rho_{\\mathrm{NIR}}",
      name: "بازتاب فروسرخ نزدیک (ρ_NIR)",
      kind: "var",
      unitOrValue: "بازتاب طیفی (0 تا 1)",
      explanation:
        "درصد نور بازتابیده در باند ~۰٫۸۴ μm؛ به علت پراکندگی درونی بین دیواره‌های سلولی اسفنجی مزوفیل برگ در گیاه سالم بسیار بالاست (۴۰ تا ۵۵٪).",
      mathRole: "در گیاه سالم ρ_NIR ≫ ρ_Red است، پس صورت کسر مثبت و بزرگ می‌شود.",
    },
    {
      id: "minus",
      latex: "-",
      name: "تفاضل طیفی (اختلاف شیب لبه قرمز)",
      kind: "op",
      explanation: "اختلاف بین بازتاب بالای سلولی (NIR) و جذب شدید کلروفیل (Red) را استخراج می‌کند.",
      mathRole: "علامت خروجی (+ یا −) مستقیماً از همین تفاضل تعیین می‌شود.",
    },
    {
      id: "red",
      latex: "\\rho_{\\mathrm{Red}}",
      name: "بازتاب باند قرمز (ρ_Red)",
      kind: "var",
      unitOrValue: "بازتاب طیفی (0 تا 1)",
      explanation:
        "درصد نور بازتابیده در باند ~۰٫۶۶ μm؛ در گیاه سبز بسیار پایین (~۰٫۰۵) است چون رنگدانه کلروفیل آن را برای فتوسنتز جذب می‌کند.",
      mathRole: "مقدار کوچک Red باعث بزرگ‌تر شدن صورت کسر می‌شود؛ خاک معمولاً سرخ و NIR را نزدیک‌تر برمی‌گرداند.",
    },
    {
      id: "sum",
      latex: "\\rho_{\\mathrm{NIR}}+\\rho_{\\mathrm{Red}}",
      name: "مجموع بازتاب دو باند (مخرج نرمال‌سازی)",
      kind: "op",
      unitOrValue: "مقسوم‌علیه (0 < sum ≤ 2)",
      explanation: "میزان کل نور بازتابیده در دو باند که نقش مقیاس‌سنج مشترک را دارد و روشنایی خورشیدی و توپوگرافی را خنثی می‌کند.",
      mathRole: "اگر در سایه کوه روشنایی هر دو باند نصف (k = 0.5) شود، k از صورت و مخرج خط می‌خورد و NDVI ثابت می‌ماند!",
      intuition: "چون هر دو بازتاب نامنفی هستند، |NIR − Red| ≤ (NIR + Red) و خروجی هرگز از بازه [−1, +1] بیرون نمی‌زند.",
    },
  ],
  derivationNotes:
    "نرمال کردن با جمع دو باند، اثر یک ضریب روشنایی مشترک (مثل شیب ملایم یا سایه‌ی نازک) را حذف می‌کند. برای حل معکوس، نسبت NIR/Red برابر (1 + NDVI)/(1 − NDVI) است.",
  relatedLabs: ["spectral-signatures", "ndvi"],
  relatedMath: ["normalized-algebra", "solving"],
};
