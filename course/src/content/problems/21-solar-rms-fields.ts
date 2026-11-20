import type { Problem } from "../types";

export const solarRmsFields: Problem = {
  kind: "problem",
  slug: "solar-rms-fields",
  title: "محاسبه میدان الکتریکی و مغناطیسی نور خورشید",
  order: 21,
  topic: "موج",
  summary: "یافتن جذر میانگین مربعات میدان الکتریکی و القای مغناطیسی از چگالی شار خورشیدی.",
  scene:
    "چگالی شار نور خورشید در نزدیکی زمین (ثابت خورشیدی) برابر ۱۳۷۰ وات بر مترمربع است. جذر میانگین مربعات میدان الکتریکی ($E_{\\text{rms}}$) و میدان مغناطیسی ($B_{\\text{rms}}$) را حساب کنید.",
  givens: [
    { symbol: "S", meaning: "چگالی شار خورشیدی", value: "1370 W/m²" },
    { symbol: "Z_0", meaning: "امپدانس خلأ", value: "377 Ω" },
    { symbol: "c", meaning: "سرعت نور", value: "3×10⁸ m/s" },
  ],
  ask: "مقادیر $E_{\\text{rms}}$ و $B_{\\text{rms}}$ چقدر است؟",
  formulas: [
    {
      id: "em-speed",
      name: "چگالی شار و امپدانس موج",
      latex: "S = \\frac{E_{\\text{rms}}^2}{Z_0},\\quad B_{\\text{rms}} = \\frac{E_{\\text{rms}}}{c}",
      why: "بردار پوینتینگ میانگین توان عبور موج الکترومغناطیسی را به میدان‌ها وصل می‌کند.",
    },
  ],
  steps: [
    {
      title: "محاسبه میدان الکتریکی مؤثر",
      text: "با $Z_0 = 377\\,\\Omega$ داریم:",
      latex: "E_{\\text{rms}} = \\sqrt{S Z_0} = \\sqrt{1370 \\times 377} \\approx 718.7\\,\\mathrm{V/m}",
    },
    {
      title: "محاسبه القای مغناطیسی مؤثر",
      text: "با تقسیم بر سرعت نور:",
      latex: "B_{\\text{rms}} = \\frac{718.7}{3\\times 10^8} \\approx 2.40\\times 10^{-6}\\,\\mathrm{T} = 2.40\\,\\mu\\mathrm{T}",
    },
  ],
  answerLatex: "E_{\\text{rms}} \\approx 719\\,\\mathrm{V/m},\\quad B_{\\text{rms}} \\approx 2.40\\,\\mu\\mathrm{T}",
  answerText: "میدان الکتریکی مؤثر حدود ۷۱۹ ولت بر متر و میدان مغناطیسی مؤثر حدود ۲٫۴ میکروتسلا است.",
  meaning: "نور خورشید با وجود شدت بالا، میدان مغناطیسی بسیار ضعیفی در مقایسه با میدان مغناطیسی زمین (~۵۰ میکروتسلا) دارد.",
  traps: ["فراموش کردن ریشه گرفتن یا استفاده از $\\varepsilon_0$ بدون $c$."],
  relatedMath: ["solving"],
};
