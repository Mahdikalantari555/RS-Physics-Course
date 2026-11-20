import type { Problem } from "../types";

export const orbitLaunchEnergy: Problem = {
  kind: "problem",
  slug: "orbit-launch-energy",
  title: "انرژی لازم برای قرار دادن ماهواره در مدار ۱۰۰۰ کیلومتر",
  order: 30,
  topic: "مدار",
  summary: "محاسبه مجموع انرژی پتانسیل و جنبشی مداری برای پرتاب ماهواره ۱۵۰۰ کیلوگرمی.",
  scene:
    "انرژی لازم برای قرار دادن یک ماهواره ۱۵۰۰ کیلوگرمی در مداری دایره‌ای به ارتفاع ۱۰۰۰ کیلومتر را محاسبه کنید (با صرف‌نظر از مقاومت هوا).",
  givens: [
    { symbol: "m", meaning: "جرم ماهواره", value: "1500 kg" },
    { symbol: "h", meaning: "ارتفاع مدار", value: "1000 km" },
    { symbol: "R_E", meaning: "شعاع زمین", value: "6371 km" },
  ],
  ask: "انرژی مکانیکی لازم ($\\Delta E$) چقدر است؟",
  formulas: [
    {
      id: "orbit-velocity",
      name: "انرژی مداری",
      latex: "\\Delta E = E_{\\mathrm{orbit}} - E_{\\mathrm{surface}} = -\\frac{GMm}{2(R_E+h)} - \\left(-\\frac{GMm}{R_E}\\right)",
      why: "انرژی کل مدار دایره‌ای برابر نصف انرژی پتانسیل در آن ارتفاع است.",
    },
  ],
  steps: [
    {
      title: "ساده‌سازی اختلاف انرژی",
      text: "با $r = 7371\\,\\mathrm{km}$ و $GM = 3.986\\times 10^{14}\\,\\mathrm{m^3/s^2}$:",
      latex: "\\Delta E = GMm\\left(\\frac{1}{R_E} - \\frac{1}{2r}\\right) = 3.986\\times 10^{14} \\times 1500 \\times \\left(\\frac{1}{6.371\\times 10^6} - \\frac{1}{1.4742\\times 10^7}\\right) \\approx 5.33\\times 10^{10}\\,\\mathrm{J}",
    },
  ],
  answerLatex: "\\Delta E \\approx 5.33\\times 10^{10}\\,\\mathrm{J} \\ (53.3\\,\\mathrm{GJ})",
  answerText: "انرژی لازم حدود ۵٫۳۳×۱۰¹⁰ ژول (۵۳٫۳ گیگاژول) است.",
  meaning: "بخش عمده این انرژی صرف ایجاد سرعت مداری حدود ۷٫۳۵ کیلومتر بر ثانیه می‌شود، نه صرفاً بالا بردن ماهواره.",
  traps: ["محاسبه فقط انرژی پتانسیل $mgh$ و فراموش کردن انرژی جنبشی عظیم مداری."],
  relatedMath: ["solving"],
  relatedLabs: ["orbit"],
};
