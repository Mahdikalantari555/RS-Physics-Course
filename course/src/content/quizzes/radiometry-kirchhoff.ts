import type { Quiz } from "../types";

export const radiometryKirchhoffQuiz: Quiz = {
  kind: "quiz",
  id: "radiometry-kirchhoff",
  title: "اشعه‌سنجی، کیرشهف و ریلی–جینز",
  summary: "کمیت‌های تابشی، تعادل ترمودینامیکی و تقریب بسامد پایین.",
  questions: [
    {
      id: "rk1",
      prompt: "یکای تابندگی (Radiance) در دستگاه SI کدام است؟",
      choices: ["W / m²", "W / (m² · sr)", "W / sr"],
      answer: 1,
      explain: "تابندگی برابر شدت تابش در واحد سطح تصویرشده در یک جهت معین است و یکای آن $\\mathrm{W\\cdot m^{-2}\\cdot sr^{-1}}$ می‌باشد.",
    },
    {
      id: "rk2",
      prompt: "برای یک جسم کدر ($\\tau = 0$) در تعادل ترمودینامیکی، اگر بازتابندگی $\\rho = 0.25$ باشد، گسیلندگی $\\varepsilon$ چقدر است؟",
      choices: ["0.25", "0.75", "1.00"],
      answer: 1,
      explain: "از قانون پایستگی $\\alpha + \\rho + \\tau = 1$ و کدر بودن ($\\tau=0$) داریم $\\alpha = 1 - 0.25 = 0.75$. طبق قانون کیرشهف $\\varepsilon = \\alpha = 0.75$.",
    },
    {
      id: "rk3",
      prompt: "تقریب ریلی–جینز در کدام ناحیه از طیف الکترومغناطیسی برای زمین (حدود 300 K) دقیق است؟",
      choices: ["فرابنفش و مرئی", "فروسرخ نزدیک", "مایکروویو و رادیویی"],
      answer: 2,
      explain: "شرط $hc/(\\lambda k_B T) \\ll 1$ برای زمین تنها در طول‌موج‌های بلند مایکروویو و رادیویی برقرار است.",
    },
  ],
};
