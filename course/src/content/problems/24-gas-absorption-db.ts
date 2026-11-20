import type { Problem } from "../types";

export const gasAbsorptionDb: Problem = {
  kind: "problem",
  slug: "gas-absorption-db",
  title: "تبدیل ضریب جذب گازی به دسی‌بل بر کیلومتر",
  order: 24,
  topic: "اتمسفر",
  summary: "تبدیل ضریب تضعیف خطی از یکای متر معکوس به دسی‌بل بر کیلومتر (dB/km).",
  scene:
    "ضریب جذب گازی در جو برابر $100\\,\\mathrm{m^{-1}}$ اندازه‌گیری شده است. این ضریب را بر حسب دسی‌بل بر کیلومتر ($\\mathrm{dB/km}$) محاسبه کنید.",
  givens: [
    { symbol: "\\kappa", meaning: "ضریب جذب خطی", value: "100 m⁻¹" },
    { symbol: "L", meaning: "طول مسیر مرجع", value: "1000 m (1 km)" },
  ],
  ask: "تضعیف محیط بر حسب دسی‌بل بر کیلومتر چقدر است؟",
  formulas: [
    {
      id: "beer-lambert",
      name: "قانون بیر–لامبرت و دسی‌بل",
      latex: "\\alpha_{\\mathrm{dB/km}} = 10 \\log_{10}(e) \\cdot \\kappa \\cdot 1000 \\approx 4.343 \\times 10^3 \\kappa",
      why: "در مقیاس لگاریتمی دسی‌بل، هر ضریب تضعیف نپری $\\kappa$ در $\\mathrm{m^{-1}}$ با ضرب در $4.343$ به $\\mathrm{dB/m}$ تبدیل می‌شود.",
    },
  ],
  steps: [
    {
      title: "تبدیل به دسی‌بل بر متر",
      text: "چون $I(z) = I_0 e^{-\\kappa z}$ است، افت توان در یک متر بر حسب دسی‌بل برابر است با $10 \\log_{10}(e^{\\kappa}) = 4.343 \\kappa$.",
      latex: "\\alpha_{\\mathrm{dB/m}} = 4.343 \\times 100 = 434.3\\,\\mathrm{dB/m}",
    },
    {
      title: "تبدیل به دسی‌بل بر کیلومتر",
      text: "با ضرب در ۱۰۰۰ متر در هر کیلومتر:",
      latex: "\\alpha_{\\mathrm{dB/km}} = 434.3 \\times 1000 = 4.343\\times 10^5\\,\\mathrm{dB/km}",
    },
  ],
  answerLatex: "\\alpha \\approx 4.343\\times 10^5\\,\\mathrm{dB/km}",
  answerText: "ضریب جذب معادل حدود ۴٫۳۴۳×۱۰⁵ دسی‌بل بر کیلومتر است.",
  meaning: "ضریب جذب ۱۰۰ متر معکوس بسیار بزرگ است و نشان می‌دهد موج در چند سانتی‌متر کاملاً جذب می‌شود.",
  traps: ["فراموش کردن ضریب ۴٫۳۴۳ (تبدیل لگاریتم طبیعی به لگاریتم پایه ۱۰)."],
  relatedMath: ["exponentials"],
  relatedLabs: ["atmosphere"],
};
