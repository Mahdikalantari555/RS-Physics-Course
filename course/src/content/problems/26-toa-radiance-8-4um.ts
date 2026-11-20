import type { Problem } from "../types";

export const toaRadiance84um: Problem = {
  kind: "problem",
  slug: "toa-radiance-8-4um",
  title: "تابندگی بالای جو در ۸/۴ میکرومتر",
  order: 26,
  topic: "اتمسفر",
  summary: "کاربرد معادله انتقال تابشی شوارتزشیلد برای محاسبه تابندگی دریافتی سنجنده در بالای جو.",
  scene:
    "سطحی سیاه با دمای ۳۰۰ کلوین زیر جوی با دمای متوسط ۲۲۰ کلوین و قابلیت عبور ۰٫۷ قرار دارد. تابندگی طیفی دریافتی در بالای جو در طول‌موج ۸٫۴ میکرومتر چقدر است؟",
  givens: [
    { symbol: "T_s", meaning: "دمای سطح سیاه", value: "300 K" },
    { symbol: "T_a", meaning: "دمای متوسط جو", value: "220 K" },
    { symbol: "\\tau_a", meaning: "قابلیت عبور جو", value: "0.7" },
    { symbol: "\\lambda", meaning: "طول‌موج", value: "8.4 μm" },
  ],
  ask: "تابندگی طیفی در بالای جو $L_{\\mathrm{TOA}}$ چقدر است؟",
  formulas: [
    {
      id: "schwarzschild",
      name: "انتقال تابشی حرارتی",
      latex: "L_{\\mathrm{TOA}} = \\tau_a B_\\lambda(T_s) + (1 - \\tau_a) B_\\lambda(T_a)",
      why: "تابندگی بالای جو مجموع تابش عبوری از سطح و تابش گسیل‌شده توسط خود جو است.",
    },
  ],
  steps: [
    {
      title: "محاسبه تابندگی جسم سیاه سطح و جو در ۸٫۴ میکرومتر",
      text: "از تابع پلانک در $\\lambda = 8.4\\,\\mu\\mathrm{m}$ داریم: $B_{8.4}(300) \\approx 9.57\\,\\mathrm{W/(m^2\\cdot sr\\cdot\\mu m)}$ و $B_{8.4}(220) \\approx 1.88\\,\\mathrm{W/(m^2\\cdot sr\\cdot\\mu m)}$.",
    },
    {
      title: "ترکیب دو جمله در بالای جو",
      text: "با گسیلندگی جو برابر $1 - \\tau_a = 0.3$:",
      latex: "L_{\\mathrm{TOA}} = 0.7 \\times 9.57 + 0.3 \\times 1.88 \\approx 7.26\\,\\mathrm{W/(m^2\\cdot sr\\cdot\\mu m)}",
    },
  ],
  answerLatex: "L_{\\mathrm{TOA}} \\approx 7.26\\,\\mathrm{W/(m^2\\cdot sr\\cdot\\mu m)}",
  answerText: "تابندگی دریافتی در بالای جو حدود ۷٫۲۶ وات بر مترمربع بر استررادیان بر میکرومتر است.",
  meaning: "جو سردتر با جذب ۳۰٪ از تابش سطح و جایگزین کردن آن با تابش ضعیف‌تر خودش، دمای ظاهری سطح را سردتر نشان می‌دهد.",
  traps: ["فراموش کردن جمله گسیل خود جو $(1 - \\tau_a) B_\\lambda(T_a)$."],
  relatedMath: ["solving"],
  relatedLabs: ["atmosphere"],
};
