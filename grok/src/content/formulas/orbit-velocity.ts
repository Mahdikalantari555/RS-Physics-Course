import { sym, tex } from "../tokens";
import type { Formula } from "../types";

export const orbitVelocity: Formula = {
  kind: "formula",
  id: "orbit-velocity",
  title: "سرعت مدار دایره‌ای",
  summary: "هرچه بالاتر، آهسته‌تر.",
  tokens: [sym("v"), tex("=\\sqrt{\\frac{"), sym("G"), sym("M"), tex("}{"), sym("r"), tex("}}")],
  parts: [
    {
      id: "v",
      latex: "v",
      name: "سرعت مداری",
      explanation:
        "تندی مماسی نسبت به مرکز زمین. در مدار ۴۰۰ کیلومتری حدود ۷٫۷ کیلومتر بر ثانیه است. این سرعتِ روی زمین نیست؛ زمین هم زیر ماهواره می‌چرخد.",
    },
    {
      id: "G",
      latex: "G",
      name: "ثابت گرانش",
      explanation: "همراه M فقط به صورت حاصل‌ضرب GM وارد می‌شود.",
    },
    {
      id: "M",
      latex: "M",
      name: "جرم زمین",
      explanation: "جرم مرکزی. اگر سیاره عوض شود سرعت عوض می‌شود. جرم ماهواره دوباره غایب است.",
    },
    {
      id: "r",
      latex: "r",
      name: "شعاع مدار",
      explanation:
        "فاصله از مرکز زمین، نه از سطح. فراموش کردن شعاع زمین (حدود ۶۳۷۱ کیلومتر) ارتفاع را با شعاع عوض می‌کند و سرعت را غلط می‌دهد.",
    },
  ],
  derivationNotes: "از GMm/r² = mv²/r جمله m حذف می‌شود. پس v = √(GM/r). مدار بالاتر، گرانش ضعیف‌تر و سرعت کمتر.",
  relatedLabs: ["orbit"],
  relatedMath: ["vectors"],
};
