import { sym, tex } from "../tokens";
import type { Formula } from "../types";

export const beer: Formula = {
  kind: "formula",
  id: "beer",
  title: "قانون بیر–لامبرت",
  summary: "نور مستقیم در یک محیط جاذب، نمایی ضعیف می‌شود.",
  tokens: [sym("I"), tex("="), sym("I0", "I_0"), tex("e^{-"), sym("tau", "\\tau"), tex("}")],
  parts: [
    {
      id: "I",
      latex: "I",
      name: "شدت باقی‌مانده",
      explanation: "توانی که بعد از عبور از مسیر هنوز در باریکه‌ی مستقیم مانده. پراکندگی به بیرون باریکه هم این‌جا مثل جذب عمل می‌کند.",
    },
    {
      id: "I0",
      latex: "I_0",
      name: "شدت اولیه",
      explanation: "توان باریکه پیش از ورود به محیط. مثلاً تابش خورشید در بالای جو، قبل از برخورد به هوا.",
    },
    {
      id: "tau",
      latex: "\\tau",
      name: "عمق اپتیکی",
      explanation:
        "عددی بی‌بعد. جمع جذب و پراکندگی در طول مسیر است. اگر τ = ۱ باشد حدود ۳۷٪ نور مستقیم می‌ماند. اگر صفر باشد هیچ اتلافی نیست.",
    },
  ],
  derivationNotes:
    "از dI = −κρ I ds انتگرال بگیر. جواب I = I₀ e^{−τ} است با τ = ∫ κρ ds. برای τ کوچک، e^{−τ} ≈ ۱ − τ.",
  relatedLabs: ["atmosphere"],
  relatedMath: ["exponentials", "integrals"],
};
