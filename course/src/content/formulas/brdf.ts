import { sym, tex } from "../tokens";
import type { Formula } from "../types";

export const brdf: Formula = {
  kind: "formula",
  id: "brdf",
  title: "تابع توزیع بازتاب دوجهته",
  summary: "سطح واقعی در همه‌ی جهت‌ها یکسان برنمی‌گرداند.",
  tokens: [
    sym("fr", "f_r"),
    tex("=\\frac{"),
    sym("dLr", "dL_r"),
    tex("}{"),
    sym("Li", "L_i"),
    tex("\\cos"),
    sym("theta", "\\theta_i"),
    tex("\\, d"),
    sym("omega", "\\omega_i"),
    tex("}"),
  ],
  parts: [
    {
      id: "fr",
      latex: "f_r",
      name: "BRDF",
      explanation:
        "نسبت رادیانس بازتابیده در یک جهت، به ایرَدیانس فرودی از جهتی دیگر. واحدش یک بر استرادیان است. برای یک سطح واقعی تابع هر دو جهت است.",
    },
    {
      id: "dLr",
      latex: "dL_r",
      name: "رادیانس بازتابیده",
      explanation: "سهم کوچکی از درخشندگی که در جهت دید سنجنده می‌رود. سنجنده همین جهت را می‌بیند، نه کل نیم‌کره را.",
    },
    {
      id: "Li",
      latex: "L_i",
      name: "رادیانس فرودی",
      explanation: "درخشندگی تابشی که از یک تکه‌ی کوچک آسمان یا از خورشید می‌آید. در مخرج، همراه زاویه، به ایرَدیانس روی سطح تبدیل می‌شود.",
    },
    {
      id: "theta",
      latex: "\\theta_i",
      name: "زاویه‌ی فرود",
      explanation:
        "زاویه نسبت به عمود سطح. کسینوسش می‌گوید باریکه چقدر مایل به سطح می‌خورد: هرچه مایل‌تر، توان کمتری روی واحد سطح می‌نشیند.",
    },
    {
      id: "omega",
      latex: "\\omega_i",
      name: "زاویه‌ی فضایی فرود",
      explanation: "تکه‌ی کوچکی از جهت‌های آمدن نور، با واحد استرادیان. دیفرانسیل است چون BRDF را برای یک جهت تعریف می‌کنیم نه برای کل آسمان.",
    },
  ],
  relatedLabs: ["ndvi"],
  relatedMath: ["integrals"],
};
