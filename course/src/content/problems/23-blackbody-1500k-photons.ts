import type { Problem } from "../types";

export const blackbody1500kPhotons: Problem = {
  kind: "problem",
  slug: "blackbody-1500k-photons",
  title: "تابش نیمکره‌ای جسم ۱۵۰۰ کلوین و شمارش فوتون‌ها",
  order: 23,
  topic: "تابش",
  summary: "محاسبه شار کل خروجی و تعداد فوتون‌های گسیل‌شده در بیشینه تابش.",
  scene:
    "جسم سیاهی در دمای ۱۵۰۰ کلوین قرار دارد. تابش نیمکره‌ای کل آن چند وات بر مترمربع است و در بیشینه تابش، هر فوتون چه انرژی‌ای دارد؟",
  givens: [
    { symbol: "T", meaning: "دمای جسم سیاه", value: "1500 K" },
    { symbol: "\\sigma", meaning: "ثابت استفان–بولتزمن", value: "5.67×10⁻⁸ W·m⁻²·K⁻⁴" },
  ],
  ask: "شار کل نیمکره‌ای $M$ و انرژی فوتون در بیشینه تابش چقدر است؟",
  formulas: [
    {
      id: "stefan",
      name: "قانون استفان–بولتزمن",
      latex: "M = \\sigma T^4",
      why: "کل توان تابشی از واحد سطح در تمام طول‌موج‌ها را می‌دهد.",
    },
  ],
  steps: [
    {
      title: "محاسبه شار نیمکره‌ای",
      text: "با جایگذاری $T = 1500\\,\\mathrm{K}$:",
      latex: "M = 5.67\\times 10^{-8} \\times (1500)^4 \\approx 2.87\\times 10^5\\,\\mathrm{W/m^2}",
    },
    {
      title: "طول‌موج بیشینه و انرژی فوتون",
      text: "از قانون وین $\\lambda_{\\max} = 2898 / 1500 = 1.932\\,\\mu\\mathrm{m}$. انرژی هر فوتون در این طول‌موج برابر $E = hc/\\lambda_{\\max} = 1.03\\times 10^{-19}\\,\\mathrm{J}$ است.",
    },
  ],
  answerLatex: "M \\approx 2.87\\times 10^5\\,\\mathrm{W/m^2},\\quad \\lambda_{\\max} = 1.932\\,\\mu\\mathrm{m}",
  answerText: "تابش کل حدود ۲۸۷ کیلووات بر مترمربع است و بیشینه تابش در ۱٫۹۳۲ میکرومتر رخ می‌دهد.",
  meaning: "در دماهای بالا مانند آتش‌سوزی یا گدازه، هم شار کل به‌شدت بالا می‌رود و هم قله تابش به سمت فروسرخ موج کوتاه جابه‌جا می‌شود.",
  traps: ["به توان ۴ نرساندن دمای ۱۵۰۰ کلوین."],
  relatedMath: ["scientific-powers", "solving"],
  relatedLabs: ["blackbody"],
};
