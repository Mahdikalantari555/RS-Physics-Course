import { sym, tex } from "../tokens";
import type { Formula } from "../types";

export const beerLambert: Formula = {
  kind: "formula",
  id: "beer-lambert",
  title: "قانون عبور جوی بیر–لامبرت",
  summary: "محاسبه کسر تابش عبوری از جو بر حسب عمق نوری قائم و زاویه سرسویی.",
  tokens: [
    sym("tau", "\\tau(\\lambda)"),
    tex("="),
    sym("exp", "\\exp"),
    tex("\\!\\bigl("),
    sym("negk", "-k(\\lambda)"),
    tex("\\cdot"),
    sym("sec", "\\sec\\theta"),
    tex("\\bigr)"),
  ],
  parts: [
    {
      id: "tau",
      latex: "\\tau(\\lambda)",
      name: "ضریب عبور جوی (Transmittance · τ)",
      kind: "var",
      unitOrValue: "بی‌بعد (0 تا 1 یا 0% تا 100%)",
      explanation: "کسر انرژی تابشی که بدون جذب یا پراکندگی به طور مستقیم از لایه جو عبور می‌کند.",
      mathRole: "عددی بین ۰ (مسدود کامل، مثل باند ۶٫۳ μm بخار آب) تا ۱ (پنجره شفاف).",
    },
    {
      id: "exp",
      latex: "\\exp",
      name: "تابع نمایی میرایی exp(−x)",
      kind: "op",
      explanation:
        "وقتی پرتو از لایه‌های متوالی جو عبور می‌کند، در هر کیلومتر درصد ثابتی از فوتون‌های باقی‌مانده حذف می‌شوند؛ نتیجه این فرآیند «زوال نمایی» است.",
      mathRole: "ضمانت می‌کند که عبور همیشه مثبت بماند و به آرامی به صفر میل کند.",
    },
    {
      id: "negk",
      latex: "-k(\\lambda)",
      name: "ضریب خاموشی / عمق نوری قائم k(λ)",
      kind: "var",
      unitOrValue: "بی‌بعد (عمق نوری)",
      explanation: "مجموع ضریب جذب گازها (H₂O، CO₂، O₃) و ضریب پراکندگی جو در طول‌موج λ برای مسیر عمود.",
      mathRole: "علامت منفی یعنی هرچه k(λ) بزرگ‌تر باشد، عبور کاهش می‌یابد.",
    },
    {
      id: "sec",
      latex: "\\sec\\theta",
      name: "سکانت زاویه سرسویی (sec θ = 1 / cos θ)",
      kind: "op",
      unitOrValue: "≥ 1 (بی‌بعد)",
      explanation: "ضریب افزایش طول مسیر پرتو درون جو هنگام تابش مایل خورشید یا نگاه مایل ماهواره (ضریب جرم هوا).",
      mathRole: "در زاویه عمود (θ = 0°)، cos 0° = 1 و مسیر ۱ برابر است؛ در زاویه 60°، cos 60° = 0.5 و مسیر ۲ برابر ضخامت جو می‌شود!",
      intuition: "عکاسی ماهواره‌ای با زاویه دید مایل شدید، اثر مه جوی و جذب را دو تا سه برابر تشدید می‌کند.",
    },
  ],
  derivationNotes:
    "برای جوی با لایه‌های افقی تخت، طول مسیر مایل در زاویه سرسویی θ برابر s = z / cos θ = z · sec θ است. بنابراین عمق نوری مسیر برابر k(λ)·sec θ می‌شود و عبور برابر exp(−k(λ)·sec θ).",
  relatedLabs: ["atmosphere"],
  relatedMath: ["exponentials", "polar", "solving"],
};
