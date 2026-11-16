import { sym, tex } from "../tokens";
import type { Formula } from "../types";

export const ndvi: Formula = {
  kind: "formula",
  id: "ndvi",
  title: "شاخص گیاهی تفاضلی نرمال",
  summary: "تفاوت سرخ و فروسرخ نزدیک، تقسیم بر جمعشان.",
  tokens: [
    sym("ndvi", "\\mathrm{NDVI}"),
    tex("=\\frac{"),
    sym("nir", "\\rho_{\\mathrm{NIR}}"),
    tex("-"),
    sym("red", "\\rho_{\\mathrm{red}}"),
    tex("}{"),
    sym("nir", "\\rho_{\\mathrm{NIR}}"),
    tex("+"),
    sym("red", "\\rho_{\\mathrm{red}}"),
    tex("}"),
  ],
  parts: [
    {
      id: "ndvi",
      latex: "\\mathrm{NDVI}",
      name: "شاخص",
      explanation:
        "عددی بی‌بعد، معمولاً بین −۱ و ۱. ویژگی فیزیکی بنیادی مثل رادیانس نیست؛ نسبتی از دو باند است تا روشنایی کلی تا حدی حذف شود.",
    },
    {
      id: "nir",
      latex: "\\rho_{\\mathrm{NIR}}",
      name: "بازتاب فروسرخ نزدیک",
      explanation:
        "حدود ۰٫۸ میکرومتر. ساختار درونی برگ این باند را زیاد برمی‌گرداند. گیاه سالم این‌جا روشن است، حتی اگر در نور مرئی تیره به نظر برسد.",
    },
    {
      id: "red",
      latex: "\\rho_{\\mathrm{red}}",
      name: "بازتاب سرخ",
      explanation:
        "حدود ۰٫۶۵ میکرومتر. کلروفیل این نور را برای فتوسنتز جذب می‌کند، پس برگ سالم در سرخ تیره است. خاک معمولاً سرخ و فروسرخ را شبیه‌تر برمی‌گرداند.",
    },
  ],
  derivationNotes:
    "نرمال کردن با جمع دو باند، اثر یک ضریب روشنایی مشترک (مثل شیب ملایم یا سایه‌ی نازک) را کم می‌کند. ابر، خاک خیس و سایه‌ی غلیظ هنوز شاخص را جابه‌جا می‌کنند.",
  relatedLabs: ["ndvi"],
};
