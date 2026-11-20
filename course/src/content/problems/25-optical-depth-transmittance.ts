import type { Problem } from "../types";

export const opticalDepthTransmittance: Problem = {
  kind: "problem",
  slug: "optical-depth-transmittance",
  title: "محاسبه ضخامت اپتیکی از قابلیت عبور جو",
  order: 25,
  topic: "اتمسفر",
  summary: "یافتن عمق نوری جو با استفاده از قانون بوگت–لامبرت.",
  scene:
    "در محدوده کاربرد قانون بوگت–لامبرت، قابلیت عبور (گذردهی) عمودی جو در یک باند مشخص برابر ۰٫۸۱ اندازه‌گیری شده است. ضخامت اپتیکی (عمق نوری) جو چقدر است؟",
  givens: [
    { symbol: "T", meaning: "قابلیت عبور جو", value: "0.81" },
  ],
  ask: "ضخامت اپتیکی ($\\tau$) چقدر است؟",
  formulas: [
    {
      id: "optical-depth",
      name: "گذردهی و عمق نوری",
      latex: "T = e^{-\\tau} \\implies \\tau = -\\ln(T)",
      why: "عمق نوری لگاریتم طبیعی معکوس گذردهی است.",
    },
  ],
  steps: [
    {
      title: "محاسبه عمق نوری",
      text: "با گرفتن لگاریتم طبیعی از $T = 0.81$ داریم:",
      latex: "\\tau = -\\ln(0.81) \\approx 0.2107",
    },
  ],
  answerLatex: "\\tau \\approx 0.211",
  answerText: "ضخامت اپتیکی جو برابر ۰٫۲۱۱ (بی‌بعد) است.",
  meaning: "عمق نوری کوچک‌تر از ۰٫۳ نشان‌دهنده جوی نسبتاً شفاف در آن باند است.",
  traps: ["استفاده از لگاریتم پایه ۱۰ به جای لگاریتم طبیعی $\\ln$."],
  relatedMath: ["exponentials", "solving"],
  relatedLabs: ["atmosphere"],
};
