import { sym, tex } from "../tokens";
import type { Formula } from "../types";

export const maxwellGaussE: Formula = {
  kind: "formula",
  id: "maxwell-gauss-e",
  title: "گاوس برای میدان الکتریکی",
  summary: "بار، چشمه‌ی میدان الکتریکی است.",
  tokens: [
    sym("div", "\\nabla\\cdot"),
    sym("E", "\\mathbf{E}"),
    tex("=\\frac{"),
    sym("rho", "\\rho"),
    tex("}{"),
    sym("eps", "\\varepsilon_0"),
    tex("}"),
  ],
  parts: [
    {
      id: "div",
      latex: "\\nabla\\cdot",
      name: "واگرایی",
      explanation:
        "میزان «بیرون‌زدن» میدان از یک نقطه. واگرایی مثبت یعنی چشمه، منفی یعنی چاه. روی یک میدان یکنواخت صفر است.",
    },
    {
      id: "E",
      latex: "\\mathbf{E}",
      name: "میدان الکتریکی",
      explanation: "برداری که به بار نیروی F = qE وارد می‌کند. در موج الکترومغناطیسی، این بردار عمود بر جهت انتشار نوسان می‌کند.",
    },
    {
      id: "rho",
      latex: "\\rho",
      name: "چگالی بار",
      explanation: "بار الکتریکی در واحد حجم. جایی که بار خالص نباشد، واگرایی E صفر است و خطوط میدان از آن نقطه شروع نمی‌شوند.",
    },
    {
      id: "eps",
      latex: "\\varepsilon_0",
      name: "گذردهی خلأ",
      explanation: "۸٫۸۵×۱۰⁻¹² فاراد بر متر. می‌گوید خلأ در برابر برپایی میدان الکتریکی چقدر «نرم» است. همراه μ₀ سرعت نور را می‌سازد.",
    },
  ],
  relatedMath: ["vectors"],
};
