import type { Problem } from "../types";

export const pixelTemp12um: Problem = {
  kind: "problem",
  slug: "pixel-temp-12um",
  title: "دمای پیکسل هم‌تن در باند ۱۲ میکرومتر",
  order: 17,
  topic: "تابش",
  summary: "یافتن دمای واقعی پیکسل B با گسیلندگی متفاوت، هم‌روشنایی با پیکسل A در فروسرخ حرارتی.",
  scene:
    "دو پیکسل A و B با دماهای متفاوت در باند حرارتی باریک ۱۲ میکرومتر با تن خاکستری یکسان دیده می‌شوند. دمای پیکسل A برابر ۲۷ درجه سانتی‌گراد (۳۰۰ کلوین) و گسیلندگی آن ۰٫۹۶ است. دمای پیکسل B با گسیلندگی ۰٫۹۰ چقدر است؟",
  givens: [
    { symbol: "T_A", meaning: "دمای پیکسل A", value: "300 K (27 °C)" },
    { symbol: "\\varepsilon_A", meaning: "گسیلندگی پیکسل A", value: "0.96" },
    { symbol: "\\varepsilon_B", meaning: "گسیلندگی پیکسل B", value: "0.90" },
    { symbol: "\\lambda", meaning: "طول‌موج مرکز باند", value: "12 μm" },
  ],
  ask: "دمای واقعی پیکسل B بر حسب کلوین و سانتی‌گراد چقدر است؟",
  formulas: [
    {
      id: "planck",
      name: "تابع پلانک",
      latex: "\\varepsilon_A B_\\lambda(T_A) = \\varepsilon_B B_\\lambda(T_B)",
      why: "تن خاکستری یکسان به معنای تساوی تابندگی طیفی دریافتی از دو پیکسل است.",
    },
  ],
  steps: [
    {
      title: "تساوی تابندگی طیفی",
      text: "در طول‌موج ۱۲ میکرومتر و دمای ۳۰۰ کلوین، تقریب وین برقرار است ($\\exp(hc/\\lambda k_B T) \\gg 1$). بنابراین:",
      latex: "\\frac{\\varepsilon_A}{\\varepsilon_B} = \\exp\\!\\left(\\frac{c_2}{\\lambda}\\left(\\frac{1}{T_A} - \\frac{1}{T_B}\\right)\\right)",
    },
    {
      title: "حل برای دمای پیکسل B",
      text: "با $c_2 = 14388\\,\\mu\\mathrm{m\\cdot K}$ و $\\lambda = 12\\,\\mu\\mathrm{m}$ داریم $c_2/\\lambda = 1199\\,\\mathrm{K}$:",
      latex: "\\ln\\!\\left(\\frac{0.96}{0.90}\\right) = 1199\\left(\\frac{1}{300} - \\frac{1}{T_B}\\right) \\implies T_B \\approx 304.9\\,\\mathrm{K} \\ (31.7\\,^\\circ\\mathrm{C})",
    },
  ],
  answerLatex: "T_B \\approx 304.9\\,\\mathrm{K} \\approx 31.7\\,^\\circ\\mathrm{C}",
  answerText: "دمای پیکسل B حدود ۳۰۴٫۹ کلوین (۳۱٫۷ درجه سانتی‌گراد) است.",
  meaning: "پیکسل با گسیلندگی کمتر برای اینکه هم‌روشنایی با پیکسل A باشد، باید حدود ۵ درجه گرم‌تر باشد.",
  traps: ["استفاده از تقریب خطی ریلی–جینز در ۱۲ میکرومتر به جای پلانک."],
  relatedMath: ["exponentials", "solving"],
  relatedLabs: ["blackbody"],
};
