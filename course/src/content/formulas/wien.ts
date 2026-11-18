import { sym, tex } from "../tokens";
import type { Formula } from "../types";

export const wien: Formula = {
  kind: "formula",
  id: "wien",
  title: "قانون جابه‌جایی وین",
  summary: "جسم داغ‌تر، قله‌ی طیف تابش جسم سیاهش در طول‌موج کوتاه‌تر است.",
  tokens: [sym("lambda", "\\lambda_{\\max}"), tex("="), sym("b"), sym("div", "/"), sym("T")],
  parts: [
    {
      id: "lambda",
      latex: "\\lambda_{\\max}",
      name: "طول‌موج قله تابش (λ_max)",
      kind: "var",
      unitOrValue: "میکرومتر (μm)",
      explanation: "طول‌موجی که در آن منحنی پلانک B_λ به بیشینه مقدار خود می‌رسد (dB/dλ = 0). این قله برای طیف بر حسب طول‌موج است، نه بر حسب بسامد.",
      mathRole: "نقطه اکسترمم ماکزیمم تابع B(λ, T).",
      intuition: "برای خورشید حدود ۰٫۵ μm (نور مرئی سبز–آبی) و برای زمین حدود ۱۰ μm (فروسرخ حرارتی) است.",
    },
    {
      id: "b",
      latex: "b",
      name: "ثابت جابه‌جایی وین (b)",
      kind: "const",
      unitOrValue: "2897.77 μm · K",
      explanation: "عددی ثابت که از حل معادله مشتق صفر تابع پلانک نسبت به λ به دست می‌آید.",
      mathRole: "ثابت تناسب معکوس بین دمای کلوین و طول‌موج قله.",
    },
    {
      id: "div",
      latex: "/",
      name: "نسبت معکوس",
      kind: "op",
      explanation: "هرچه دما بیشتر شود، قله تابش به سمت طول‌موج‌های کوتاه‌تر هُل داده می‌شود.",
      mathRole: "دو برابر شدن دمای مطلق ⇒ نصف شدن λ_max.",
    },
    {
      id: "T",
      latex: "T",
      name: "دمای مطلق (T)",
      kind: "var",
      unitOrValue: "کلوین (K)",
      explanation: "دمای سطح جسم حتماً بر حسب مقیاس کلوین (نه سلسیوس!).",
      mathRole: "T(K) = T(°C) + 273.15 — گذاشتن سلسیوس در مخرج این فرمول جواب را کاملاً غلط می‌کند.",
      intuition: "آتش‌سوزی جنگل با دمای ~۹۰۰ K قله تابش را از ۱۰ μm به ۳٫۲ μm (فروسرخ میانی) منتقل می‌کند.",
    },
  ],
  derivationNotes:
    "∂B_λ/∂λ = 0 به یک معادله‌ی غیرجبری برای x = hc/λkT می‌رسد که جواب عددی‌اش x ≈ ۴٫۹۶۵ است. از همان‌جا b = hc/(k x).",
  relatedLabs: ["blackbody"],
  relatedMath: ["derivatives", "solving"],
};
