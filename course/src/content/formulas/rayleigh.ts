import { sym, tex } from "../tokens";
import type { Formula } from "../types";

export const rayleigh: Formula = {
  kind: "formula",
  id: "rayleigh",
  title: "پراکندگی رایلی",
  summary: "شدت پراکندگی مولکولی با طول‌موج به صورت λ⁻⁴ کاهش می‌یابد.",
  tokens: [
    sym("I", "I_s"),
    tex("\\propto"),
    sym("lambda", "\\lambda^{-4}"),
  ],
  parts: [
    {
      id: "I",
      latex: "I_s",
      name: "شدت پراکنده‌شده",
      explanation:
        "تابشی که از مسیر اصلی منحرف شده و به سمت سنجنده می‌رسد. این فروش partie پراکندگی است که به صورت مه‌آلودگی در تصویر visible می‌آید.",
    },
    {
      id: "lambda",
      latex: "\\lambda^{-4}",
      name: "وابستگی به طول‌موج",
      explanation:
        "در باند آبی (~۰٫۴۵ μm) پراکندگی رایلی حدود ۵ برابر باند قرمز (~۰٫۶۷ μm) است. این دلیلی است که آسمان آبی و تصاویر باند آبی مه‌آلودتر می‌شوند.",
    },
  ],
  derivationNotes:
    "پراکندگی رایلی از حل معادله‌ی مکانیک کوانتومی برای یک دی‌پل بی‌وزن در میدان تابشی به دست می‌آید. صحت آن در بازه‌ی d « λ است؛ ذرات بزرگ‌تر (غبار، دود، قطره‌های ابر) رژیم می و غیرانتخابی دارند.",
  relatedLabs: ["atmosphere"],
};
