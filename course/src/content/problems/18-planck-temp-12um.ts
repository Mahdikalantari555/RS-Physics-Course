import type { Problem } from "../types";

export const planckTemp12um: Problem = {
  kind: "problem",
  slug: "planck-temp-12um",
  title: "محاسبه دمای سطح از تابندگی در ۱۲ میکرومتر",
  order: 18,
  topic: "تابش",
  summary: "وارون‌سازی تابع پلانک برای یافتن دمای واقعی سطح با گسیلندگی معلوم.",
  scene:
    "تابندگی طیفی سطحی در طول‌موج ۱۲ میکرومتر برابر ۱۵ وات بر مترمربع بر استررادیان بر میکرومتر اندازه‌گیری شده است. اگر گسیلندگی سطح ۰٫۹ باشد، دمای سطح چقدر است؟",
  givens: [
    { symbol: "L_\\lambda", meaning: "تابندگی طیفی اندازه‌گیری‌شده", value: "15 W/(m²·sr·μm)" },
    { symbol: "\\varepsilon_\\lambda", meaning: "گسیلندگی سطح", value: "0.9" },
    { symbol: "\\lambda", meaning: "طول‌موج", value: "12 μm" },
  ],
  ask: "دمای سطح بر حسب کلوین چقدر است؟",
  formulas: [
    {
      id: "planck",
      name: "معکوس تابع پلانک",
      latex: "T = \\frac{c_2}{\\lambda \\ln\\!\\left(\\frac{\\varepsilon c_1}{\\lambda^5 L_\\lambda} + 1\\right)}",
      why: "برای استخراج دما از تابندگی طیفی در فروسرخ حرارتی باید تابع پلانک را معکوس کرد.",
    },
  ],
  steps: [
    {
      title: "تصحیح گسیلندگی",
      text: "تابندگی جسم سیاه معادل برابر است با $B_\\lambda = 15 / 0.9 = 16.67\\,\\mathrm{W/(m^2\\cdot sr\\cdot\\mu m)}$.",
    },
    {
      title: "جایگذاری در معکوس پلانک",
      text: "با $c_1 = 1.191\\times 10^8\\,\\mathrm{W\\cdot\\mu m^4/(m^2\\cdot sr)}$ و $c_2 = 14388\\,\\mu\\mathrm{m\\cdot K}$:",
      latex: "T = \\frac{14388}{12 \\ln\\!\\left(\\frac{1.191\\times 10^8}{12^5 \\times 16.67} + 1\\right)} \\approx 347.8\\,\\mathrm{K}",
    },
  ],
  answerLatex: "T \\approx 347.8\\,\\mathrm{K} \\ (74.6\\,^\\circ\\mathrm{C})",
  answerText: "دمای سطح حدود ۳۴۷٫۸ کلوین (۷۴٫۶ درجه سانتی‌گراد) است.",
  meaning: "این همان روشی است که سنجنده‌های حرارتی برای تبدیل عدد دیجیتال کالیبره‌شده به نقشه دمای سطح زمین به کار می‌برند.",
  traps: ["فراموش کردن تقسیم تابندگی بر گسیلندگی پیش از معکوس کردن پلانک."],
  relatedMath: ["exponentials", "solving"],
  relatedLabs: ["blackbody"],
};
