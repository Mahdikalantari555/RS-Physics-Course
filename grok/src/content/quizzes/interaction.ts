import type { Quiz } from "../types";

export const interactionQuiz: Quiz = {
  kind: "quiz",
  id: "interaction-basics",
  title: "برهم‌کنش",
  summary: "لامبرت، NDVI، جذب برگ.",
  questions: [
    {
      id: "q1",
      prompt: "برای سطح لامبرتی، BRDF برابر است با…",
      choices: ["$\\rho$", "$\\rho/\\pi$", "$\\pi\\rho$"],
      answer: 1,
      explain: "انتگرال کسینوس روی نیم‌کره $\\pi$ است، پس $f_r = \\rho/\\pi$ و $L = \\rho E/\\pi$.",
    },
    {
      id: "q2",
      prompt: "NDVI نزدیک ۰٫۸ بیشتر شبیه کدام سطح است؟",
      choices: ["آب عمیق", "پوشش گیاهی انبوه", "خاک لخت روشن"],
      answer: 1,
      explain: "گیاه در فروسرخ نزدیک خیلی روشن‌تر از سرخ است. آب معمولاً NDVI منفی یا نزدیک صفر دارد.",
    },
    {
      id: "q3",
      prompt: "چرا برگ سالم در باند سرخ تیره است؟",
      choices: [
        "چون برگ فروسرخ را جذب می‌کند و سرخ را نه",
        "چون کلروفیل نور سرخ را جذب می‌کند",
        "چون برگ تابش حرارتی ندارد",
      ],
      answer: 1,
      explain: "کلروفیل در سرخ جذب قوی دارد. فروسرخ نزدیک را ساختار برگ زیاد بازمی‌تاباند.",
    },
  ],
};
