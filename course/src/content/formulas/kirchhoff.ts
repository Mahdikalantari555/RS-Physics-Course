import { sym, tex } from "../tokens";
import type { Formula } from "../types";

export const kirchhoff: Formula = {
  kind: "formula",
  id: "kirchhoff",
  title: "قانون کیرشهف و تعادل تابشی",
  summary:
    "در تعادل ترمودینامیکی، مجموع کسری از شار فرودی که جذب، بازتاب یا عبور می‌کند برابر ۱ است و گسیلندگی برابر جذرپذیری است.",
  tokens: [
    sym("alpha", "\\alpha_{\\lambda}"),
    tex("+"),
    sym("rho", "\\rho_{\\lambda}"),
    tex("+"),
    sym("tau", "\\tau_{\\lambda}"),
    tex("=1,\\quad"),
    sym("eps", "\\varepsilon_{\\lambda}"),
    tex("="),
    sym("alpha", "\\alpha_{\\lambda}"),
  ],
  parts: [
    {
      id: "alpha",
      latex: "\\alpha_{\\lambda}",
      name: "ضریب جذرپذیری طیفی (Absorptivity)",
      kind: "var",
      unitOrValue: "بی‌بعد (بین 0 تا 1)",
      explanation:
        "کسری از شار تابشی فرودی در طول‌موج λ که توسط سطح یا لایه جذب و به انرژی درونی تبدیل می‌شود.",
      mathRole: "برای جسم سیاه ایده‌آل α = 1 است.",
    },
    {
      id: "rho",
      latex: "\\rho_{\\lambda}",
      name: "ضریب بازتابندگی طیفی (Reflectivity)",
      kind: "var",
      unitOrValue: "بی‌بعد (بین 0 تا 1)",
      explanation:
        "کسری از شار تابشی فرودی که از سطح بازتاب می‌شود. برای اجسام کدر که عبور ندارند (τ = 0)، داریم ρ = 1 − α.",
      mathRole: "مکمل جذرپذیری در سطوح کدر.",
    },
    {
      id: "tau",
      latex: "\\tau_{\\lambda}",
      name: "ضریب گذردهی طیفی (Transmissivity)",
      kind: "var",
      unitOrValue: "بی‌بعد (بین 0 تا 1)",
      explanation:
        "کسری از شار تابشی فرودی که بدون جذب یا بازتاب از محیط (مانند جو یا آب شفاف) عبور می‌کند.",
      mathRole: "در اجسام کدر و جامد ضخیم برابر صفر است.",
    },
    {
      id: "eps",
      latex: "\\varepsilon_{\\lambda}",
      name: "ضریب گسیلندگی طیفی (Emissivity)",
      kind: "var",
      unitOrValue: "بی‌بعد (بین 0 تا 1)",
      explanation:
        "نسبت گسیل واقعی جسم به گسیل جسم سیاه در همان دما و طول‌موج. در تعادل ترمودینامیکی، هر جا جسم بهتر جذب کند، به همان نسبت بهتر تابش می‌کند.",
      mathRole: "تساوی ε = α پایه‌ی سنجش از دور حرارتی برای تفکیک دما از جنس سطح است.",
      intuition:
        "برف در نور مرئی بازتابنده قوی است (ρ بالا، α پایین)، اما در فروسرخ حرارتی جذب‌کننده بسیار قوی است (α ≈ 0.99)؛ پس گسیلندگی حرارتی بالایی دارد.",
    },
  ],
  derivationNotes:
    "از اصل پایستگی انرژی برای شار فرودی Φ_i داریم Φ_i = Φ_a + Φ_r + Φ_t که با تقسیم بر Φ_i رابطه α + ρ + τ = 1 به‌دست می‌آید. در محفظه عایق با تعادل ترمودینامیکی، شار خالص عبوری از هر سطح صفر است و لذا ε_λ = α_λ نتیجه می‌شود.",
  relatedLabs: ["blackbody", "spectral-signature"],
};
