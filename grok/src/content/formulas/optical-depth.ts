import { sym, tex } from "../tokens";
import type { Formula } from "../types";

export const opticalDepth: Formula = {
  kind: "formula",
  id: "optical-depth",
  title: "عمق اپتیکی",
  summary: "جمع خاموشی در طول مسیر دید.",
  tokens: [
    sym("tau", "\\tau"),
    tex("=\\int_{0}^{s}"),
    sym("kappa", "\\kappa"),
    sym("rho", "\\rho"),
    tex("\\, ds"),
  ],
  parts: [
    {
      id: "tau",
      latex: "\\tau",
      name: "عمق اپتیکی",
      explanation: "بی‌بعد است. مسیر مایل از مسیر عمودی عمق بیشتری دارد، چون s بلندتر است. به همین خاطر خورشید در افق سرخ‌تر است.",
    },
    {
      id: "kappa",
      latex: "\\kappa",
      name: "ضریب خاموشی جرمی",
      explanation:
        "سطح مقطع جذب به‌اضافه‌ی پراکندگی، به ازای واحد جرم. به جنس گاز یا ذره و به طول‌موج بستگی دارد. واحدش مترمربع بر کیلوگرم است.",
    },
    {
      id: "rho",
      latex: "\\rho",
      name: "چگالی جرمی",
      explanation:
        "این ρ چگالی ماده‌ی جاذب است، کیلوگرم بر مترمکعب، نه بازتابندگی سطح. تشابه نمادها را قاطی نکن. حاصل κρ واحدش یک بر متر است.",
    },
  ],
  relatedLabs: ["atmosphere"],
  relatedMath: ["integrals"],
};
