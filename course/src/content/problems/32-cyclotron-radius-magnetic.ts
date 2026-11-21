import type { Problem } from "../types";

export const cyclotronRadiusMagnetic: Problem = {
  kind: "problem",
  slug: "cyclotron-radius-magnetic",
  title: "شعاع مسیر دایره‌ای ذره باردار در میدان مغناطیسی",
  order: 32,
  topic: "مغناطیس",
  summary: "تبدیل گاوس به تسلا و محاسبه شعاع چرخش الکترون در میدان مغناطیسی زمین.",
  scene:
    "یک الکترون با سرعت عمود بر خطوط میدان مغناطیسی زمین ($B = 0.5\\,\\mathrm{G}$) وارد می‌شود و تحت تأثیر نیروی لورنتس در مسیر دایره‌ای می‌چرخد.",
  givens: [
    { symbol: "B", meaning: "میدان مغناطیسی زمین", value: "0.5 G" },
    { symbol: "v", meaning: "سرعت الکترون", value: "1×10⁶ m/s" },
    { symbol: "m", meaning: "جرم الکترون", value: "9.11×10⁻³¹ kg" },
    { symbol: "q", meaning: "بار الکترون", value: "1.6×10⁻¹⁹ C" },
  ],
  ask: "شعاع مسیر دایره‌ای حرکت الکترون چند متر است؟",
  formulas: [
    {
      id: "cyclotron-radius",
      name: "شعاع مسیر دایره‌ای",
      latex: "r = \\frac{mv}{qB}",
      why: "نیروی مغناطیسی $qvB$ نقش نیروی مرکزگرا $mv^2/r$ را ایفا می‌کند.",
    },
  ],
  steps: [
    {
      title: "تبدیل گاوس به تسلا",
      text: "هر تسلا برابر $10^4$ گاوس است، بنابراین:",
      latex: "B = 0.5\\,\\mathrm{G} = 0.5 \\times 10^{-4}\\,\\mathrm{T} = 5 \\times 10^{-5}\\,\\mathrm{T}",
    },
    {
      title: "محاسبه شعاع مسیر",
      text: "اعداد را در فرمول شعاع قرار می‌دهیم:",
      latex: "r = \\frac{(9.11 \\times 10^{-31})(10^6)}{(1.6 \\times 10^{-19})(5 \\times 10^{-5})} \\approx 0.114\\,\\mathrm{m}",
    },
  ],
  finalAnswer: "شعاع مسیر دایره‌ای حدود ۰٫۱۱۴ متر (۱۱٫۴ سانتی‌متر) است.",
};
