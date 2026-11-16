import { sym, tex } from "../tokens";
import type { Formula } from "../types";

export const waveSpeed: Formula = {
  kind: "formula",
  id: "wave-speed",
  title: "سرعت موج",
  summary: "بسامد و طول‌موج در یک محیط، یک حاصل‌ضرب ثابت دارند.",
  tokens: [sym("c"), tex("="), sym("f"), sym("lambda", "\\lambda")],
  parts: [
    {
      id: "c",
      latex: "c",
      name: "سرعت نور",
      explanation:
        "در خلأ ۲٫۹۹۸×۱۰⁸ متر بر ثانیه. در هوا تقریباً همین است. اگر محیط عوض شود سرعت عوض می‌شود، ولی برای مسیر ماهواره تا زمین همان مقدار خلأ را می‌گیریم.",
    },
    {
      id: "f",
      latex: "f",
      name: "بسامد",
      explanation:
        "تعداد نوسان در یک ثانیه، با واحد هرتز. بسامد در عبور از محیط عوض نمی‌شود؛ چیزی که عوض می‌شود طول‌موج و سرعت است.",
    },
    {
      id: "lambda",
      latex: "\\lambda",
      name: "طول‌موج",
      explanation:
        "فاصله‌ی دو قله‌ی متوالی. نور سبز حدود ۵۵۰ نانومتر است، فروسرخ حرارتی حدود ۱۰ میکرومتر، و یک رادار باند C حدود ۵ سانتی‌متر.",
    },
  ],
  derivationNotes: "از تعریف سرعت: موج در یک دوره به اندازه‌ی یک طول‌موج جلو می‌رود، پس c = λ / T و چون f = 1/T، نتیجه c = fλ است.",
  relatedLabs: ["wave"],
  relatedMath: [],
};
