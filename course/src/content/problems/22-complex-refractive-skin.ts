import type { Problem } from "../types";

export const complexRefractiveSkin: Problem = {
  kind: "problem",
  slug: "complex-refractive-skin",
  title: "ضریب شکست مختلط، عمق پوسته و افت ۱٪ شدت",
  order: 22,
  topic: "موج",
  summary: "محاسبه ثابت دی‌الکتریک نسبی، عمق پوسته و فاصله تضعیف شدت به ۱٪ مقدار اولیه.",
  scene:
    "ضریب شکست محیطی برابر $n = 1.33 - 0.005j$ است. ثابت دی‌الکتریک نسبی، عمق پوسته و فاصله‌ای را که شدت انرژی موجی با طول‌موج ۰٫۵ میکرون به ۱٪ مقدار اولیه افت می‌کند بیابید.",
  givens: [
    { symbol: "n", meaning: "ضریب شکست مختلط", value: "1.33 - 0.005j" },
    { symbol: "\\lambda_0", meaning: "طول‌موج در خلأ", value: "0.5 μm" },
  ],
  ask: "ثابت دی‌الکتریک $\\varepsilon_r$، عمق پوسته $\\delta$ و فاصله افت ۱٪ چقدر است؟",
  formulas: [
    {
      id: "skin-depth",
      name: "عمق پوسته",
      latex: "\\varepsilon_r = n^2,\\quad k'' = \\frac{2\\pi n''}{\\lambda_0},\\quad \\delta = \\frac{1}{k''}",
      why: "بخش موهومی ضریب شکست عامل میرایی نمایی موج در محیط است.",
    },
  ],
  steps: [
    {
      title: "ثابت دی‌الکتریک نسبی",
      text: "با به توان دو رساندن $n$:",
      latex: "\\varepsilon_r = (1.33 - 0.005j)^2 \\approx 1.7689 - 0.0133j",
    },
    {
      title: "عمق پوسته و فاصله افت ۱٪ شدت",
      text: "با $n'' = 0.005$ و $\\lambda_0 = 0.5\\,\\mu\\mathrm{m}$ داریم $k'' = 2\\pi(0.005)/(0.5\\times 10^{-6}) \\approx 6.28\\times 10^4\\,\\mathrm{m^{-1}}$، پس $\\delta \\approx 15.9\\,\\mu\\mathrm{m}$. چون شدت با $\\exp(-2k'' z)$ افت می‌کند، برای $0.01 = \\exp(-2z/\\delta)$ داریم $z = \\frac{\\delta}{2}\\ln(100) \\approx 36.6\\,\\mu\\mathrm{m}$.",
    },
  ],
  answerLatex: "\\varepsilon_r \\approx 1.77 - 0.0133j,\\quad \\delta \\approx 15.9\\,\\mu\\mathrm{m},\\quad z_{1\\%} \\approx 36.6\\,\\mu\\mathrm{m}",
  answerText: "عمق پوسته ۱۵٫۹ میکرومتر است و شدت موج پس از ۳۶٫۶ میکرومتر به ۱٪ مقدار اولیه می‌رسد.",
  meaning: "در محیط‌های با تلفات، شدت (مربع دامنه) دو برابر سریع‌تر از دامنه میدان الکتریکی تضعیف می‌شود.",
  traps: ["فراموش کردن ضریب ۲ در توان نمایی شدت $\\exp(-2k'' z)$ نسبت به دامنه."],
  relatedMath: ["exponentials", "solving"],
};
