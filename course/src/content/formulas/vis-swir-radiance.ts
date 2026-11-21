import { sym, tex } from "../tokens";
import type { Formula } from "../types";

export const visSwirRadiance: Formula = {
  kind: "formula",
  id: "vis-swir-radiance",
  title: "رادیانس دریافتی سنجنده در محدوده VIS–SWIR",
  summary: "مجموع رادیانس مسیر جوی و تابش بازتابیده از سطح پس از عبور از جو.",
  tokens: [
    sym("Ls", "L_{\\text{sensor}}"),
    tex(" = "),
    sym("Lp", "L_{\\text{path}}"),
    tex(" + \\dfrac{"),
    sym("rho", "\\rho"),
    sym("Et", "E_{\\text{total}}"),
    sym("tau", "\\tau_v"),
    tex("}{\\pi}"),
  ],
  parts: [
    {
      id: "Ls",
      latex: "L_{\\text{sensor}}",
      name: "رادیانس سنجنده",
      explanation: "کل رادیانس ثبت‌شده در دهانه سنجنده در طول‌موج مورد نظر.",
    },
    {
      id: "Lp",
      latex: "L_{\\text{path}}",
      name: "رادیانس مسیر جوی",
      explanation: "نوری که بدون برخورد به هدف، توسط جو به سمت سنجنده پراکنده شده است.",
    },
    {
      id: "rho",
      latex: "\\rho",
      name: "بازتابندگی سطح",
      explanation: "کسر انرژی بازتاب‌شده از سطح هدف (کمیت اصلی مورد نظر در تصحیح جوی).",
    },
    {
      id: "Et",
      latex: "E_{\\text{total}}",
      name: "ایرَدیانس کل روی سطح",
      explanation: "مجموع تابش مستقیم خورشید و تابش پراکنده آسمان که به سطح می‌رسد.",
    },
    {
      id: "tau",
      latex: "\\tau_v",
      name: "ضریب عبور جو در مسیر دید",
      explanation: "کسری از تابش بازتابیده از سطح که در مسیر برگشت به سنجنده از جو عبور می‌کند.",
    },
  ],
};
