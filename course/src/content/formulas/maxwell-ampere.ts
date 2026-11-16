import { sym, tex } from "../tokens";
import type { Formula } from "../types";

export const maxwellAmpere: Formula = {
  kind: "formula",
  id: "maxwell-ampere",
  title: "آمپر–ماکسول",
  summary: "جریان و تغییر میدان الکتریکی، میدان مغناطیسی می‌سازند.",
  tokens: [
    sym("curl", "\\nabla\\times"),
    sym("B", "\\mathbf{B}"),
    tex("="),
    sym("mu", "\\mu_0"),
    sym("J", "\\mathbf{J}"),
    tex("+"),
    sym("mu", "\\mu_0"),
    sym("eps", "\\varepsilon_0"),
    tex("\\frac{\\partial"),
    sym("E", "\\mathbf{E}"),
    tex("}{\\partial"),
    sym("t"),
    tex("}"),
  ],
  parts: [
    {
      id: "curl",
      latex: "\\nabla\\times",
      name: "تاو",
      explanation: "همان چرخش میدان. این‌جا روی B نشسته: جریان و تغییر E دور خودشان B می‌سازند.",
    },
    {
      id: "B",
      latex: "\\mathbf{B}",
      name: "میدان مغناطیسی",
      explanation: "حاصل سمت راست. در فضای خالی، فقط جمله‌ی دوم می‌ماند و B را تغییر E تغذیه می‌کند.",
    },
    {
      id: "mu",
      latex: "\\mu_0",
      name: "تراوایی خلأ",
      explanation: "۱٫۲۵۷×۱۰⁻⁶ هنری بر متر. شدت پاسخ مغناطیسی خلأ. همراه ε₀ سرعت نور را می‌دهد.",
    },
    {
      id: "J",
      latex: "\\mathbf{J}",
      name: "چگالی جریان",
      explanation: "بار در حال حرکت، در واحد سطح. در خلأ بین ماهواره و زمین معمولاً صفر است و موج آزاد منتشر می‌شود.",
    },
    {
      id: "eps",
      latex: "\\varepsilon_0",
      name: "گذردهی خلأ",
      explanation: "در جمله‌ی جریان جابه‌جایی ظاهر می‌شود. بدون این جمله، معادله‌ها موج الکترومغناطیسی نمی‌دهند.",
    },
    {
      id: "E",
      latex: "\\mathbf{E}",
      name: "میدان الکتریکی",
      explanation: "تغییر زمانی E، حتی بدون سیم و جریان، چشمه‌ی B است. این جمله‌ی ماکسول است که آمپر کم داشت.",
    },
    {
      id: "t",
      latex: "t",
      name: "زمان",
      explanation: "مشتق زمانی E. اگر E ثابت باشد و جریانی هم نباشد، سمت راست صفر است.",
    },
  ],
  derivationNotes:
    "در فضای تهی ρ و J صفرند. ترکیب این معادله با فارادی، برای هر مؤلفه‌ی میدان، معادله‌ی موج ∂²/∂t² = c²∇² را می‌دهد.",
  relatedMath: ["derivatives", "vectors"],
};
