import type { Problem } from "../types";

export const solidAngleSensor: Problem = {
  kind: "problem",
  slug: "solid-angle-sensor",
  title: "محاسبه زاویه فضایی دید سنجنده",
  order: 33,
  topic: "تابش",
  summary: "محاسبه زاویه فضایی بر حسب استرادیان از روی مساحت هدف و فاصله.",
  scene:
    "یک سنجنده هوایی در ارتفاع ۲ کیلومتری، سطحی به مساحت ۴۰۰ مترمربع را روی زمین به‌صورت عمودی مشاهده می‌کند.",
  givens: [
    { symbol: "A", meaning: "مساحت سطح هدف", value: "400 m²" },
    { symbol: "r", meaning: "فاصله سنجنده تا هدف", value: "2000 m" },
  ],
  ask: "زاویه فضایی دید سنجنده چند استرادیان است؟",
  formulas: [
    {
      id: "solid-angle",
      name: "زاویه فضایی",
      latex: "\\Omega = \\frac{A}{r^2}",
      why: "زاویه فضایی برابر نسبت مساحت تصویرشده روی کره به مجذور شعاع است.",
    },
  ],
  steps: [
    {
      title: "جایگذاری در فرمول زاویه فضایی",
      text: "مساحت و مجذور فاصله را جایگذاری می‌کنیم:",
      latex: "\\Omega = \\frac{400}{(2000)^2} = \\frac{400}{4 \\times 10^6} = 10^{-4}\\,\\mathrm{sr}",
    },
  ],
  finalAnswer: "زاویه فضایی برابر $10^{-4}$ استرادیان است.",
};
