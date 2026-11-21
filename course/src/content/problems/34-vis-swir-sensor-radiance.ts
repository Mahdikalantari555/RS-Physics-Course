import type { Problem } from "../types";

export const visSwirSensorRadiance: Problem = {
  kind: "problem",
  slug: "vis-swir-sensor-radiance",
  title: "محاسبه رادیانس سنجنده و بازیابی بازتابندگی در VIS–SWIR",
  order: 34,
  topic: "جو",
  summary: "کاربرد رابطه L_sensor = L_path + (ρ E_total τ_v) / π در سنجش از دور نوری.",
  scene:
    "در یک باند مرئی، ایردیانس کل فرودی روی یک سطح لامبرتی $E_{\\text{total}} = 1000\\,\\mathrm{W/m^2}$، ضریب عبور جوی مسیر دید $\\tau_v = 0.8$، رادیانس مسیر جوی $L_{\\text{path}} = 15\\,\\mathrm{W/(m^2\\cdot sr)}$ و رادیانس ثبت‌شده توسط سنجنده $L_{\\text{sensor}} = 95\\,\\mathrm{W/(m^2\\cdot sr)}$ است.",
  givens: [
    { symbol: "E_{\\text{total}}", meaning: "ایردیانس کل روی سطح", value: "1000 W/m²" },
    { symbol: "\\tau_v", meaning: "ضریب عبور جو در مسیر برگشت", value: "0.8" },
    { symbol: "L_{\\text{path}}", meaning: "رادیانس مسیر جوی", value: "15 W/(m²·sr)" },
    { symbol: "L_{\\text{sensor}}", meaning: "رادیانس ثبت‌شده در سنجنده", value: "95 W/(m²·sr)" },
  ],
  ask: "بازتابندگی واقعی سطح ($\\rho$) چقدر است؟",
  formulas: [
    {
      id: "vis-swir-radiance",
      name: "رادیانس سنجنده VIS–SWIR",
      latex: "L_{\\text{sensor}} = L_{\\text{path}} + \\frac{\\rho\\, E_{\\text{total}}\\, \\tau_v}{\\pi}",
      why: "برای بازیابی بازتابندگی واقعی سطح، ابتدا رادیانس مسیر جوی را کم کرده و سپس اثر عبور جو و عامل π را جبران می‌کنیم.",
    },
  ],
  steps: [
    {
      title: "حذف رادیانس مسیر جوی",
      text: "ابتدا سهم جو ($L_{\\text{path}}$) را از رادیانس سنجنده کم می‌کنیم:",
      latex: "L_{\\text{surface,TOA}} = 95 - 15 = 80\\,\\mathrm{W/(m^2\\cdot sr)}",
    },
    {
      title: "حل معادله برای بازتابندگی ρ",
      text: "با بازآرایی رابطه، بازتابندگی سطح به دست می‌آید:",
      latex: "\\rho = \\frac{\\pi \\cdot 80}{1000 \\times 0.8} = \\frac{80\\pi}{800} = 0.1\\pi \\approx 0.314",
    },
  ],
  finalAnswer: "بازتابندگی واقعی سطح حدود ۰٫۳۱۴ (۳۱٫۴ درصد) است.",
};
