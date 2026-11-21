import { sym, tex } from "../tokens";
import type { Formula } from "../types";

export const waveEquation: Formula = {
  kind: "formula",
  id: "wave-equation",
  title: "معادله موج الکترومغناطیسی در فضای آزاد",
  summary: "از ترکیب معادلات سوم و چهارم ماکسول در خلأ به دست می‌آید.",
  tokens: [
    tex("\\nabla^2 "),
    sym("E", "\\vec{E}"),
    tex(" = "),
    sym("mu", "\\mu_0"),
    sym("eps", "\\varepsilon_0"),
    tex("\\dfrac{\\partial^2 "),
    sym("E", "\\vec{E}"),
    tex("}{\\partial t^2}"),
  ],
  parts: [
    {
      id: "E",
      latex: "\\vec{E}",
      name: "بردار میدان الکتریکی",
      explanation: "میدان الکتریکی موج که در فضا و زمان نوسان می‌کند و عمود بر جهت انتشار است.",
    },
    {
      id: "mu",
      latex: "\\mu_0",
      name: "تراوایی مغناطیسی خلأ",
      explanation: "ثابت بنیادین مغناطیسی خلأ؛ به همراه گذردهی الکتریکی سرعت انتشار موج را تعیین می‌کند.",
    },
    {
      id: "eps",
      latex: "\\varepsilon_0",
      name: "گذردهی الکتریکی خلأ",
      explanation: "ثابت بنیادین الکتریکی خلأ در معادلات ماکسول.",
    },
  ],
};
