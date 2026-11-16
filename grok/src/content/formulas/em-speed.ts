import { sym, tex } from "../tokens";
import type { Formula } from "../types";

export const emSpeed: Formula = {
  kind: "formula",
  id: "em-speed",
  title: "سرعت نور از ثابت‌های خلأ",
  summary: "سرعت موج الکترومغناطیسی را ε₀ و μ₀ تعیین می‌کنند.",
  tokens: [sym("c"), tex("=\\dfrac{1}{\\sqrt{"), sym("mu", "\\mu_0"), sym("eps", "\\varepsilon_0"), tex("}}")],
  parts: [
    {
      id: "c",
      latex: "c",
      name: "سرعت نور",
      explanation:
        "همان سرعتی که در c = fλ هست. این‌جا از معادله‌ی موج درآمده، نه از یک تعریف جدا. عددش حدود ۳×۱۰⁸ متر بر ثانیه است.",
    },
    {
      id: "mu",
      latex: "\\mu_0",
      name: "تراوایی خلأ",
      explanation: "مقاومت خلأ در برابر برپایی میدان مغناطیسی. بزرگ‌تر شدنش موج را کند می‌کند.",
    },
    {
      id: "eps",
      latex: "\\varepsilon_0",
      name: "گذردهی خلأ",
      explanation: "مقاومت خلأ در برابر برپایی میدان الکتریکی. حاصل‌ضرب این دو زیر رادیکال، زمان‌مقیاس موج را می‌سازد.",
    },
  ],
  derivationNotes:
    "از حذف یکی از میدان‌ها بین فارادی و آمپر–ماکسول، ضریب جلوی ∇² برابر 1/(μ₀ε₀) می‌شود و این ضریب همان c² است.",
  relatedMath: ["derivatives"],
};
