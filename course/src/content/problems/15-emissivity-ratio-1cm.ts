import type { Problem } from "../types";

export const emissivityRatio1cm: Problem = {
  kind: "problem",
  slug: "emissivity-ratio-1cm",
  title: "نسبت دمای دو سطح با تن خاکستری یکسان در ۱ سانتی‌متر",
  order: 15,
  topic: "مایکروویو",
  summary: "کاربرد تقریب ریلی–جینز برای مقایسه دمای دو سطح هم‌روشنایی در باند مایکروویو.",
  scene:
    "نسبت گسیلندگی دو سطح در باندی به مرکزیت ۱ سانتی‌متر برابر ۰٫۸۵ است و هر دو سطح در تصویر رادیومتری مایکروویو تن خاکستری (دمای درخشندگی) یکسانی دارند.",
  givens: [
    { symbol: "\\varepsilon_1 / \\varepsilon_2", meaning: "نسبت گسیلندگی دو سطح", value: "0.85" },
    { symbol: "T_{B1} = T_{B2}", meaning: "تساوی تن خاکستری", value: "T_B یکسان" },
  ],
  ask: "نسبت دمای واقعی این دو سطح ($T_1 / T_2$) چقدر است؟",
  formulas: [
    {
      id: "brightness",
      name: "دمای درخشندگی مایکروویو",
      latex: "T_B = \\varepsilon \\cdot T",
      why: "در طول‌موج ۱ سانتی‌متر تقریب ریلی–جینز برقرار است و تابندگی خطی با دما تغییر می‌کند.",
    },
  ],
  steps: [
    {
      title: "تساوی دمای درخشندگی",
      text: "چون تن خاکستری در باند ۱ سانتی‌متر یکسان است، داریم:",
      latex: "\\varepsilon_1 T_1 = \\varepsilon_2 T_2 \\implies \\frac{T_1}{T_2} = \\frac{\\varepsilon_2}{\\varepsilon_1} = \\frac{1}{0.85} \\approx 1.176",
    },
  ],
  answerLatex: "\\frac{T_1}{T_2} \\approx 1.176",
  answerText: "دمای سطح اول حدود ۱٫۱۷۶ برابر (۱۷٫۶٪ بیشتر از) دمای سطح دوم است.",
  meaning: "سطحی که گسیلندگی کمتری دارد، برای داشتن همان دمای درخشندگی باید دمای فیزیکی بالاتری داشته باشد.",
  traps: ["معکوس کردن نسبت گسیلندگی و نوشتن ۰٫۸۵ به جای ۱/۰٫۸۵."],
  relatedMath: ["solving"],
  relatedLabs: ["blackbody"],
};
