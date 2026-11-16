import { sym, tex } from "../tokens";
import type { Formula } from "../types";

export const maxwellGaussB: Formula = {
  kind: "formula",
  id: "maxwell-gauss-b",
  title: "گاوس برای میدان مغناطیسی",
  summary: "تک‌قطبی مغناطیسی وجود ندارد.",
  tokens: [sym("div", "\\nabla\\cdot"), sym("B", "\\mathbf{B}"), tex("=0")],
  parts: [
    {
      id: "div",
      latex: "\\nabla\\cdot",
      name: "واگرایی",
      explanation: "اگر واگرایی B همه‌جا صفر باشد، خطوط میدان مغناطیسی بسته هستند. شروع و پایان ندارند.",
    },
    {
      id: "B",
      latex: "\\mathbf{B}",
      name: "میدان مغناطیسی",
      explanation:
        "در موج الکترومغناطیسی، B هم عمود بر جهت انتشار است و هم عمود بر E. انرژی موج بین این دو میدان رد و بدل می‌شود.",
    },
  ],
  derivationNotes: "صفر سمت راست یعنی هیچ بار مغناطیسی‌ای در کار نیست. این تفاوت ساختاری E و B است.",
  relatedMath: ["vectors"],
};
