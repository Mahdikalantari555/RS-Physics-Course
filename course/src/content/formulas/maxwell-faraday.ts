import { sym, tex } from "../tokens";
import type { Formula } from "../types";

export const maxwellFaraday: Formula = {
  kind: "formula",
  id: "maxwell-faraday",
  title: "فارادی",
  summary: "تغییر میدان مغناطیسی، میدان الکتریکی می‌سازد.",
  tokens: [
    sym("curl", "\\nabla\\times"),
    sym("E", "\\mathbf{E}"),
    tex("=-\\frac{\\partial"),
    sym("B", "\\mathbf{B}"),
    tex("}{\\partial"),
    sym("t"),
    tex("}"),
  ],
  parts: [
    {
      id: "curl",
      latex: "\\nabla\\times",
      name: "تاو",
      explanation:
        "میزان چرخش میدان دور یک نقطه. تاو غیرصفر یعنی اگر یک حلقه‌ی کوچک این‌جا بگذاری، میدان در امتداد حلقه جمع نمی‌شود و یک نیروی محرکه می‌ماند.",
    },
    {
      id: "E",
      latex: "\\mathbf{E}",
      name: "میدان الکتریکی",
      explanation: "این‌جا E را بار نساخته؛ تغییر B ساخته است. در موج، همین جفت‌شدگی E و B است که انتشار را ممکن می‌کند.",
    },
    {
      id: "B",
      latex: "\\mathbf{B}",
      name: "میدان مغناطیسی",
      explanation: "اگر B با زمان عوض شود، دور آن یک E حلقوی پدید می‌آید. علامت منفی قانون لنز است: اثر، با علت مخالفت می‌کند.",
    },
    {
      id: "t",
      latex: "t",
      name: "زمان",
      explanation: "مشتق نسبت به زمان است، نه نسبت به مکان. میدان ایستا موج نمی‌سازد؛ تغییر زمانی لازم است.",
    },
  ],
  relatedMath: ["derivatives", "vectors"],
};
