import { sym, tex } from "../tokens";
import type { Formula } from "../types";

export const stefan: Formula = {
  kind: "formula",
  id: "stefan",
  title: "استفان–بولتزمن",
  summary: "خروج کل انرژی جسم سیاه با توان چهارم دما زیاد می‌شود.",
  tokens: [sym("M"), tex("="), sym("sigma", "\\sigma"), sym("T", "T^{4}")],
  parts: [
    {
      id: "M",
      latex: "M",
      name: "خروج تابشی",
      explanation:
        "توان گسیل‌شده از واحد سطح به همه‌ی جهت‌ها و همه‌ی طول‌موج‌ها، با واحد وات بر مترمربع. این رادیانس طیفی نیست. برای جسم سیاه، رادیانس انتگرال‌گرفته L = M/π است.",
    },
    {
      id: "sigma",
      latex: "\\sigma",
      name: "ثابت استفان–بولتزمن",
      explanation: "۵٫۶۷۰×۱۰⁻⁸ وات بر مترمربع بر کلوین به توان چهار. از انتگرال قانون پلانک روی همه‌ی طول‌موج‌ها و نیم‌کره درمی‌آید.",
    },
    {
      id: "T",
      latex: "T^{4}",
      name: "توان چهارم دما",
      explanation:
        "دو برابر شدن دما، خروج انرژی را شانزده برابر می‌کند. خطای نسبی دما هم چهار برابر خودش به M نشت می‌کند: dM/M = 4 dT/T.",
    },
  ],
  relatedLabs: ["blackbody"],
  relatedMath: ["integrals", "derivatives"],
};
