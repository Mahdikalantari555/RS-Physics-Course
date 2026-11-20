import type { Problem } from "../types";

export const soilMoistureDielectric: Problem = {
  kind: "problem",
  slug: "soil-moisture-dielectric",
  title: "استخراج رطوبت خاک از ثابت دی‌الکتریک",
  order: 13,
  topic: "مایکروویو",
  summary: "مقایسه بازتابندگی فرنل و گسیلندگی خاک خشک و خاک مرطوب در باند مایکروویو.",
  scene:
    "یک سنجنده مایکروویو بر فراز دو قطعه زمین هم‌دما عبور می‌کند: خاک خشک با ثابت دی‌الکتریک نسبی ۴ و خاک مرطوب با ثابت دی‌الکتریک نسبی ۲۵. بازتابندگی فرنل در برخورد عمودی و گسیلندگی هر دو خاک را حساب کنید.",
  givens: [
    { symbol: "\\varepsilon_{r,\\text{dry}}", meaning: "ثابت دی‌الکتریک خاک خشک", value: "4" },
    { symbol: "\\varepsilon_{r,\\text{wet}}", meaning: "ثابت دی‌الکتریک خاک مرطوب", value: "25" },
  ],
  ask: "بازتابندگی $R$ و گسیلندگی $\\varepsilon$ برای خاک خشک و مرطوب چقدر است؟",
  formulas: [
    {
      id: "fresnel",
      name: "ضریب بازتاب فرنل",
      latex: "R = \\left|\\frac{\\sqrt{\\varepsilon_r}-1}{\\sqrt{\\varepsilon_r}+1}\\right|^2",
      why: "بازتابندگی سطح هموار مستقیماً از ثابت دی‌الکتریک نسبی به‌دست می‌آید.",
    },
  ],
  steps: [
    {
      title: "محاسبه برای خاک خشک",
      text: "با $\\sqrt{4} = 2$ داریم:",
      latex: "R_{\\text{dry}} = \\left(\\frac{2-1}{2+1}\\right)^2 = \\frac{1}{9} \\approx 0.111,\\quad \\varepsilon_{\\text{dry}} = 1 - 0.111 = 0.889",
    },
    {
      title: "محاسبه برای خاک مرطوب",
      text: "با $\\sqrt{25} = 5$ داریم:",
      latex: "R_{\\text{wet}} = \\left(\\frac{5-1}{5+1}\\right)^2 = \\left(\\frac{4}{6}\\right)^2 = \\frac{4}{9} \\approx 0.444,\\quad \\varepsilon_{\\text{wet}} = 1 - 0.444 = 0.556",
    },
  ],
  answerLatex:
    "R_{\\text{dry}} \\approx 0.11,\\ \\varepsilon_{\\text{dry}} \\approx 0.89 \\quad|\\quad R_{\\text{wet}} \\approx 0.44,\\ \\varepsilon_{\\text{wet}} \\approx 0.56",
  answerText:
    "رطوبت خاک باعث چهار برابر شدن بازتابندگی (از ۱۱٪ به ۴۴٪) و کاهش محسوس گسیلندگی (از ۰٫۸۹ به ۰٫۵۶) می‌شود.",
  meaning:
    "این تغییر شدید در بازتابندگی و گسیلندگی پایه فیزیکی تمام الگوریتم‌های سنجش رطوبت خاک با ماهواره‌های مایکروویو است.",
  traps: [
    "فراموش کردن جذر گرفتن از $\\varepsilon_r$ در فرمول فرنل؛ ضریب شکست $n = \\sqrt{\\varepsilon_r}$ است نه خود $\\varepsilon_r$.",
  ],
  relatedMath: ["solving"],
};
