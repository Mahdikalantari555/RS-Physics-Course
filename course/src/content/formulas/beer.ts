import { sym, tex } from "../tokens";
import type { Formula } from "../types";

export const beer: Formula = {
  kind: "formula",
  id: "beer",
  title: "قانون بیر–لامبرت",
  summary: "نور مستقیم در یک محیط جاذب و پراکنده، به شکل نمایی تضعیف می‌شود.",
  tokens: [sym("I"), tex("="), sym("I0", "I_0"), sym("exp", "\\exp"), tex("(-"), sym("tau", "\\tau"), tex(")")],
  parts: [
    {
      id: "I",
      latex: "I",
      name: "شدت باقی‌مانده (I)",
      kind: "var",
      unitOrValue: "W · m⁻² یا W · m⁻² · sr⁻¹",
      explanation: "توانی که بعد از عبور از مسیر هنوز در باریکه‌ی مستقیم مانده است. پراکندگی به بیرون باریکه هم این‌جا مثل جذب عمل می‌کند.",
      mathRole: "کاهش نمایی نسبت به شدت ورودی (۰ < I ≤ I₀).",
    },
    {
      id: "I0",
      latex: "I_0",
      name: "شدت اولیه (I₀)",
      kind: "var",
      unitOrValue: "هم‌جنس با I",
      explanation: "توان باریکه پیش از ورود به محیط؛ مثلاً تابش خورشید در بالای جو، قبل از برخورد به مولکول‌ها و هواویزها.",
      mathRole: "ضریب مقیاس خطی خروجی.",
    },
    {
      id: "exp",
      latex: "\\exp",
      name: "تابع نمایی پایه اویلر exp(−τ)",
      kind: "op",
      explanation: "وقتی در هر لایه درصد ثابتی از فوتون‌های باقی‌مانده حذف می‌شوند، نتیجه «زوال نمایی» با پایه e ≈ ۲٫۷۱۸۲۸ است.",
      mathRole: "ضمانت می‌کند که عبور همیشه مثبت بماند و با افزایش ضخامت به آرامی به صفر میل کند.",
    },
    {
      id: "tau",
      latex: "\\tau",
      name: "عمق اپتیکی (τ)",
      kind: "var",
      unitOrValue: "بی‌بعد",
      explanation: "جمع جذب و پراکندگی در کل طول مسیر است.",
      mathRole: "اگر τ = ۱ باشد حدود ۳۷٪ (e⁻¹ ≈ 0.368) نور مستقیم می‌ماند؛ برای τ کوچک، e⁻τ ≈ 1 − τ.",
      intuition: "در مسیر مایل خورشید هنگام طلوع یا غروب، مسیر طولانی‌تر شده و τ چند برابر می‌شود، بنابراین نور آبی کاملاً حذف و خورشید سرخ دیده می‌شود.",
    },
  ],
  derivationNotes:
    "از dI = −κρ I ds انتگرال بگیر. جواب I = I₀ e^{−τ} است با τ = ∫ κρ ds. برای τ کوچک، e^{−τ} ≈ ۱ − τ.",
  relatedLabs: ["atmosphere"],
  relatedMath: ["exponentials", "integrals", "solving"],
};
