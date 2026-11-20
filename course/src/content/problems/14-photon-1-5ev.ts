import type { Problem } from "../types";

export const photon15Ev: Problem = {
  kind: "problem",
  slug: "photon-1-5ev",
  title: "بسامد و طول‌موج فوتون ۱/۵ الکترون‌ولت",
  order: 14,
  topic: "موج",
  summary: "تبدیل انرژی فوتون از الکترون‌ولت به بسامد، طول‌موج و تعیین ناحیه طیفی.",
  scene:
    "موج وابسته به فوتونی با انرژی ۱٫۵ الکترون‌ولت در اختیار داریم. می‌خواهیم بسامد، طول‌موج و جایگاه آن در طیف الکترومغناطیسی را مشخص کنیم.",
  givens: [
    { symbol: "E", meaning: "انرژی فوتون", value: "1.5 eV" },
    { symbol: "h", meaning: "ثابت پلانک", value: "6.626×10⁻³⁴ J·s" },
    { symbol: "hc", meaning: "ثابت کاربردی", value: "1.240 eV·μm" },
  ],
  ask: "بسامد و طول‌موج این فوتون چقدر است و در کدام ناحیه طیف قرار می‌گیرد؟",
  formulas: [
    {
      id: "photon-energy",
      name: "انرژی فوتون",
      latex: "E = hf = \\frac{hc}{\\lambda}",
      why: "انرژی هر فوتون مستقیماً بسامد و طول‌موج آن را تعیین می‌کند.",
    },
  ],
  steps: [
    {
      title: "محاسبه طول‌موج بر حسب میکرومتر",
      text: "با استفاده از ثابت کاربردی $hc = 1.240\\,\\mathrm{eV}\\cdot\\mu\\mathrm{m}$ داریم:",
      latex: "\\lambda = \\frac{1.240}{1.5} \\approx 0.827\\,\\mu\\mathrm{m} = 827\\,\\mathrm{nm}",
    },
    {
      title: "محاسبه بسامد",
      text: "با تبدیل انرژی به ژول ($1.5 \\times 1.602\\times 10^{-19} = 2.403\\times 10^{-19}\\,\\mathrm{J}$):",
      latex: "f = \\frac{E}{h} = \\frac{2.403\\times 10^{-19}}{6.626\\times 10^{-34}} \\approx 3.63\\times 10^{14}\\,\\mathrm{Hz}",
    },
  ],
  answerLatex: "\\lambda \\approx 0.827\\,\\mu\\mathrm{m},\\quad f \\approx 3.63\\times 10^{14}\\,\\mathrm{Hz}",
  answerText: "طول‌موج حدود ۰٫۸۲۷ میکرومتر و بسامد ۳٫۶۳×۱۰¹⁴ هرتز است که در ناحیه فروسرخ نزدیک (NIR) قرار می‌گیرد.",
  meaning: "این طول‌موج درست در لبه بالای گاف سیلیکون قرار دارد و توسط سنجنده‌های نوری رایج قابل آشکارسازی است.",
  traps: ["اشتباه گرفتن ۰٫۸۲۷ میکرومتر با نور مرئی؛ مرز مرئی حدود ۰٫۷ میکرومتر است."],
  relatedMath: ["solving"],
  relatedLabs: ["wave"],
};
