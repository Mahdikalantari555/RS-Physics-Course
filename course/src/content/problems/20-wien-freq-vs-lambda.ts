import type { Problem } from "../types";

export const wienFreqVsLambda: Problem = {
  kind: "problem",
  slug: "wien-freq-vs-lambda",
  title: "بیشینه تابش برحسب بسامد و طول‌موج (و جسم 1449 K)",
  order: 20,
  topic: "تابش",
  summary: "چرا قله منحنی پلانک برحسب بسامد در طول‌موج متفاوتی نسبت به قله برحسب طول‌موج قرار دارد.",
  scene:
    "نسبت طول‌موج متناظر با بیشینه تابش برحسب بسامد ($\\lambda_{\\max,f}$) به طول‌موج بیشینه برحسب طول‌موج ($\\lambda_{\\max,\\lambda}$) را بیابید و بیشینه تابش جسم ۱۴۴۹ کلوین را محاسبه کنید.",
  givens: [
    { symbol: "b_\\lambda", meaning: "ثابت وین طول‌موجی", value: "2898 μm·K" },
    { symbol: "T", meaning: "دمای جسم سیاه", value: "1449 K" },
  ],
  ask: "نسبت دو طول‌موج بیشینه و طول‌موج بیشینه جسم ۱۴۴۹ کلوینی چقدر است؟",
  formulas: [
    {
      id: "wien",
      name: "قانون وین",
      latex: "\\lambda_{\\max,\\lambda} T = 2898\\,\\mu\\mathrm{m\\cdot K},\\quad \\lambda_{\\max,f} T \\approx 5100\\,\\mu\\mathrm{m\\cdot K}",
      why: "تبدیل متغیر $d\\lambda = -(c/f^2) df$ جای قله تابع توزیع را جابه‌جا می‌کند.",
    },
  ],
  steps: [
    {
      title: "نسبت دو طول‌موج بیشینه",
      text: "از تقسیم دو ثابت وین داریم:",
      latex: "\\frac{\\lambda_{\\max,f}}{\\lambda_{\\max,\\lambda}} = \\frac{5100}{2898} \\approx 1.76",
    },
    {
      title: "بیشینه تابش جسم ۱۴۴۹ کلوین",
      text: "برحسب طول‌موج داریم $\\lambda_{\\max} = 2898 / 1449 = 2.0\\,\\mu\\mathrm{m}$ و انرژی فوتون برابر $E = 1.240 / 2.0 = 0.62\\,\\mathrm{eV}$.",
    },
  ],
  answerLatex: "\\frac{\\lambda_{\\max,f}}{\\lambda_{\\max,\\lambda}} \\approx 1.76,\\quad \\lambda_{\\max} = 2.0\\,\\mu\\mathrm{m},\\quad E = 0.62\\,\\mathrm{eV}",
  answerText: "نسبت دو قله ۱٫۷۶ است و جسم ۱۴۴۹ کلوینی در طول‌موج ۲ میکرومتر (انرژی فوتون ۰٫۶۲ الکترون‌ولت) بیشینه تابش دارد.",
  meaning: "قله منحنی پلانک به نحوه نمایش محور افقی (طول‌موج یا بسامد) وابسته است.",
  traps: ["تصور اینکه $c / f_{\\max}$ برابر $\\lambda_{\\max}$ است."],
  relatedMath: ["derivatives", "solving"],
};
