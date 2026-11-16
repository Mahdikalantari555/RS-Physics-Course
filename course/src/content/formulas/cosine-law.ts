import { sym, tex } from "../tokens";
import type { Formula } from "../types";

export const cosineLaw: Formula = {
  kind: "formula",
  id: "cosine-law",
  title: "قانون کسینوس برای تابش فرودی",
  summary: "همان باریکه، روی سطح کج، روی مساحت بیشتری پخش می‌شود.",
  tokens: [sym("E"), tex("="), sym("E0", "E_0"), sym("mu", "\\cos\\theta_s")],
  parts: [
    {
      id: "E",
      latex: "E",
      name: "تابش روی سطح",
      explanation:
        "توان فرودی بر واحد سطح افقی محلی، یا بر واحد سطح خود هدف اگر θ از خط عمود سطح سنجیده شود. واحدش وات بر مترمربع است، اغلب بر واحد طول‌موج اگر طیفی باشد.",
    },
    {
      id: "E0",
      latex: "E_0",
      name: "تابش عمود",
      explanation:
        "تابشی که اگر سطح رو به چشمه باشد به آن می‌رسد. در بالای جو برای خورشید، این همان E_sun باند است. پایین جو باید عبور هم در آن نشسته باشد.",
    },
    {
      id: "mu",
      latex: "\\cos\\theta_s",
      name: "کسینوس زنیت",
      explanation:
        "θ_s زاویه از سمت‌الرأس است، نه از افق. صفر یعنی خورشید بالای سر و کسینوس یک. در ۶۰ درجه انرژی روی سطح نصف می‌شود. کسینوس را با درجه حساب نکن.",
    },
  ],
  derivationNotes:
    "توان باریکه ثابت است. سطح کج مساحت بزرگ‌تری از جبهه‌ی موج را می‌پوشاند: dA_surface = dA_beam / cosθ. پس توان بر واحد سطح در cosθ ضرب می‌شود.",
  relatedLabs: ["ndvi"],
  relatedMath: ["vectors"],
};
