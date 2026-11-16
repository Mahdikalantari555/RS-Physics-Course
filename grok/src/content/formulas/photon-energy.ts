import { sym, tex } from "../tokens";
import type { Formula } from "../types";

export const photonEnergy: Formula = {
  kind: "formula",
  id: "photon-energy",
  title: "انرژی فوتون",
  summary: "انرژی هر دانه نور فقط به بسامدش بستگی دارد.",
  tokens: [
    sym("E"),
    tex("="),
    sym("h"),
    sym("f"),
    tex("="),
    tex("\\frac{"),
    sym("h"),
    sym("c"),
    tex("}{"),
    sym("lambda", "\\lambda"),
    tex("}"),
  ],
  parts: [
    {
      id: "E",
      latex: "E",
      name: "انرژی فوتون",
      explanation:
        "انرژی یک دانه‌ی نور، نه شدت باریکه. شدت یعنی تعداد فوتون در ثانیه. دو باریکه‌ی هم‌رنگ با شدت متفاوت، فوتون‌هایی با انرژی یکسان دارند.",
    },
    {
      id: "h",
      latex: "h",
      name: "ثابت پلانک",
      explanation: "۶٫۶۲۶×۱۰⁻³⁴ ژول‌ثانیه. پل بین تصویر موجی و تصویر ذره‌ای نور.",
    },
    {
      id: "f",
      latex: "f",
      name: "بسامد",
      explanation: "فوتون آبی‌تر، بسامد بالاتر و انرژی بیشتر دارد. فوتون حرارتی خیلی کم‌انرژی است و سنجنده باید آن را با دقت جمع کند.",
    },
    {
      id: "c",
      latex: "c",
      name: "سرعت نور",
      explanation: "برای نوشتن انرژی بر حسب طول‌موج، از f = c/λ استفاده می‌شود.",
    },
    {
      id: "lambda",
      latex: "\\lambda",
      name: "طول‌موج",
      explanation: "در مخرج است: طول‌موج کوتاه‌تر، انرژی بیشتر. به همین دلیل پراکندگی و جذب در آبی و فرابنفش شدیدتر از فروسرخ نزدیک‌اند.",
    },
  ],
  relatedLabs: ["wave"],
  relatedMath: [],
};
