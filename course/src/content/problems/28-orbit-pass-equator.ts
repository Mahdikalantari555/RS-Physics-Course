import type { Problem } from "../types";

export const orbitPassEquator: Problem = {
  kind: "problem",
  slug: "orbit-pass-equator",
  title: "فاصله دو گذر پی‌درپی ماهواره در استوا و عرض ۷۵ درجه",
  order: 28,
  topic: "مدار",
  summary: "محاسبه دوره تناوب مداری و جابه‌جایی خط استوا بین دو مدار متوالی به دلیل چرخش زمین.",
  scene:
    "ماهواره‌ای در مداری دایره‌ای به ارتفاع ۷۰۰ کیلومتر و زاویه میل ۷۵ درجه حرکت می‌کند. فاصله دو گذر پی‌درپی آن در استوا و در عرض جغرافیایی ۷۵ درجه چقدر است؟",
  givens: [
    { symbol: "h", meaning: "ارتفاع مدار", value: "700 km" },
    { symbol: "R_E", meaning: "شعاع زمین", value: "6371 km" },
    { symbol: "\\phi", meaning: "عرض جغرافیایی", value: "75°" },
  ],
  ask: "فاصله دو گذر پی‌درپی در استوا ($\\Delta S_0$) و در عرض ۷۵ درجه ($\\Delta S_{75}$) چقدر است؟",
  formulas: [
    {
      id: "kepler",
      name: "قانون سوم کپلر",
      latex: "T = 2\\pi \\sqrt{\\frac{(R_E + h)^3}{GM}}",
      why: "ابتدا باید دوره تناوب مداری را حساب کنیم تا بفهمیم زمین در طول یک دور ماهواره چقدر می‌چرخد.",
    },
  ],
  steps: [
    {
      title: "محاسبه دوره تناوب مداری",
      text: "با $r = 6371 + 700 = 7071\\,\\mathrm{km}$ و $GM = 3.986\\times 10^5\\,\\mathrm{km^3/s^2}$:",
      latex: "T = 2\\pi \\sqrt{\\frac{7071^3}{3.986\\times 10^5}} \\approx 5916\\,\\mathrm{s} \\approx 98.6\\,\\mathrm{min}",
    },
    {
      title: "فاصله دو گذر در استوا و عرض ۷۵ درجه",
      text: "سرعت چرخش زمین $\\omega_E = 360^\\circ / 86164\\,\\mathrm{s}$ است، پس جابه‌جایی طول جغرافیایی در یک دور برابر $\\Delta\\lambda = 24.72^\\circ$ است. در استوا داریم $\\Delta S_0 = R_E \\Delta\\lambda_{\\mathrm{rad}} \\approx 2748\\,\\mathrm{km}$ و در عرض ۷۵ درجه:",
      latex: "\\Delta S_{75} = \\Delta S_0 \\cos(75^\\circ) \\approx 2748 \\times 0.2588 \\approx 711\\,\\mathrm{km}",
    },
  ],
  answerLatex: "\\Delta S_0 \\approx 2748\\,\\mathrm{km},\\quad \\Delta S_{75} \\approx 711\\,\\mathrm{km}",
  answerText: "فاصله دو گذر پی‌درپی در استوا حدود ۲۷۴۸ کیلومتر و در عرض ۷۵ درجه حدود ۷۱۱ کیلومتر است.",
  meaning: "هرچه به قطب‌ها نزدیک‌تر می‌شویم، مدارها به هم نزدیک‌تر می‌شوند و همپوشانی تصاویر افزایش می‌یابد.",
  traps: ["فراموش کردن ضرب در $\\cos\\phi$ برای عرض‌های غیر استوایی."],
  relatedMath: ["solving"],
  relatedLabs: ["orbit"],
};
