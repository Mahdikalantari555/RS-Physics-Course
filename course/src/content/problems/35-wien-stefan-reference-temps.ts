import type { Problem } from "../types";

export const wienStefanReferenceTemps: Problem = {
  kind: "problem",
  slug: "wien-stefan-reference-temps",
  title: "قانون وین و استفان-بولتزمن برای دماهای مرجع جزوه",
  order: 35,
  topic: "تابش",
  summary: "محاسبه طول‌موج بیشینه و خروجی تابشی برای خورشید، گدازه، زمین و یخ قطبی.",
  scene:
    "در جزوه دکتر کیاورز پنج دمای مرجع جسم سیاه بررسی شده است: خورشید (5777 K)، گدازه (1400 K)، آتش‌سوزی جنگل (900 K)، زمین/محیط (290 K) و یخ قطب شمال (220 K).",
  givens: [
    { symbol: "b", meaning: "ثابت قانون جابجایی وین", value: "2898 μm·K" },
    { symbol: "\\sigma", meaning: "ثابت استفان-بولتزمن", value: "5.67×10⁻⁸ W/(m²·K⁴)" },
    { symbol: "T_{\\text{sun}}, T_{\\text{lava}}, T_{\\text{ice}}", meaning: "دماهای مرجع", value: "5777 K، 1400 K، 220 K" },
  ],
  ask: "طول‌موج بیشینه تابش ($\\lambda_{\\max}$) برای خورشید، گدازه و یخ قطب شمال چقدر است و نسبت توان تابشی گدازه به یخ چقدر است؟",
  formulas: [
    {
      id: "wien-law",
      name: "قانون جابجایی وین",
      latex: "\\lambda_{\\max} = \\frac{b}{T}",
      why: "دمای بالاتر قله تابش را به سمت طول‌موج‌های کوتاه‌تر می‌برد.",
    },
    {
      id: "stefan-boltzmann",
      name: "قانون استفان-بولتزمن",
      latex: "M = \\sigma T^4",
      why: "توان کل تابشی با توان چهارم دما رشد می‌کند.",
    },
  ],
  steps: [
    {
      title: "محاسبه طول‌موج بیشینه با قانون وین",
      text: "ثابت وین را بر دما تقسیم می‌کنیم:",
      latex:
        "\\lambda_{\\max,\\text{sun}} = \\frac{2898}{5777} \\approx 0.50\\,\\mu\\mathrm{m}, \\quad \\lambda_{\\max,\\text{lava}} = \\frac{2898}{1400} \\approx 2.07\\,\\mu\\mathrm{m}, \\quad \\lambda_{\\max,\\text{ice}} = \\frac{2898}{220} \\approx 13.17\\,\\mu\\mathrm{m}",
    },
    {
      title: "نسبت توان تابشی گدازه به یخ قطبی",
      text: "با استفاده از قانون استفان-بولتزمن:",
      latex: "\\frac{M_{\\text{lava}}}{M_{\\text{ice}}} = \\left(\\frac{1400}{220}\\right)^4 \\approx (6.36)^4 \\approx 1639",
    },
  ],
  finalAnswer:
    "قله تابش خورشید ۰٫۵۰ میکرومتر (مرئی)، گدازه ۲٫۰۷ میکرومتر (SWIR) و یخ قطبی ۱۳٫۱۷ میکرومتر (حرارتی) است؛ توان تابشی گدازه حدود ۱۶۳۹ برابر یخ است.",
};
