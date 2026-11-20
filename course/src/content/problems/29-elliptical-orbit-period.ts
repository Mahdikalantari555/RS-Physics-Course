import type { Problem } from "../types";

export const ellipticalOrbitPeriod: Problem = {
  kind: "problem",
  slug: "elliptical-orbit-period",
  title: "پریود دوران مدار بیضوی با نیم‌محور بزرگ ۷۳۰۰ کیلومتر",
  order: 29,
  topic: "مدار",
  summary: "استفاده از قانون سوم کپلر برای مدار بیضوی با خروج از مرکز معلوم.",
  scene:
    "ماهواره‌ای در یک مدار بیضوی با خروج از مرکز ۰٫۹ و طول نیم‌محور بزرگ ۷۳۰۰ کیلومتر قرار داده شده است. پریود دوران آن را محاسبه کنید.",
  givens: [
    { symbol: "a", meaning: "طول نیم‌محور بزرگ", value: "7300 km" },
    { symbol: "e", meaning: "خروج از مرکز", value: "0.9" },
    { symbol: "GM", meaning: "پارامتر گرانشی زمین", value: "3.986×10⁵ km³/s²" },
  ],
  ask: "پریود دوران ($T$) ماهواره چقدر است؟",
  formulas: [
    {
      id: "kepler",
      name: "قانون سوم کپلر",
      latex: "T = 2\\pi \\sqrt{\\frac{a^3}{GM}}",
      why: "دوره تناوب مدار بیضوی فقط به طول نیم‌محور بزرگ $a$ بستگی دارد و مستقل از خروج از مرکز $e$ است.",
    },
  ],
  steps: [
    {
      title: "محاسبه دوره تناوب",
      text: "با قرار دادن $a = 7300\\,\\mathrm{km}$ در قانون کپلر:",
      latex: "T = 2\\pi \\sqrt{\\frac{7300^3}{3.986\\times 10^5}} \\approx 6207\\,\\mathrm{s} \\approx 103.5\\,\\mathrm{min}",
    },
  ],
  answerLatex: "T \\approx 6207\\,\\mathrm{s} \\ (103.5\\,\\mathrm{min})",
  answerText: "پریود دوران ماهواره حدود ۶۲۰۷ ثانیه (۱۰۳٫۵ دقیقه) است.",
  meaning: "خروج از مرکز شکل بیضی را تغییر می‌دهد اما تا زمانی که نیم‌محور بزرگ $a$ ثابت است، دوره تناوب تغییر نمی‌کند.",
  traps: ["وارد کردن خروج از مرکز $e$ در فرمول دوره تناوب."],
  relatedMath: ["solving"],
  relatedLabs: ["orbit"],
};
