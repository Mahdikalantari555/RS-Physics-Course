import type { Primer } from "../types";

export const normalizedAlgebra: Primer = {
  kind: "primer",
  slug: "normalized-algebra",
  title: "جبر نرمال‌سازی، شاخص‌های تفاضلی و عمق بیتی",
  order: 8,
  summary: "چرا ساختار (A − B)/(A + B) روشنایی خورشید را حذف می‌کند، کران [1− , 1+] می‌سازد و 2ⁿ سطوح خاکستری می‌سنجد.",
  blocks: [
    {
      type: "p",
      text: "اگر شدت نور خورشید روی یک مزرعه در دامنه شمالی کوه نصف دامنه جنوبی باشد، بازتاب مطلق هر باند نصف می‌شود؛ اما نسبت‌های نرمال‌شده مانند NDVI مستقل از ضریب مقیاس روشنایی باقی می‌مانند.",
    },
    { type: "h2", text: "۱. خط خوردن ضریب مقیاس روشنایی (k)" },
    {
      type: "p",
      text: "فرض کنید سایه ابر نازک یا شیب زمین مقدار هر دو باند را در عدد $k$ ضرب کند؛ چون $k$ در صورت و مخرج فاکتور گرفته می‌شود، از بین می‌رود:",
    },
    {
      type: "display",
      latex: "\\frac{k\\,\\rho_{\\mathrm{NIR}} - k\\,\\rho_{\\mathrm{Red}}}{k\\,\\rho_{\\mathrm{NIR}} + k\\,\\rho_{\\mathrm{Red}}} = \\frac{k(\\rho_{\\mathrm{NIR}} - \\rho_{\\mathrm{Red}})}{k(\\rho_{\\mathrm{NIR}} + \\rho_{\\mathrm{Red}})} = \\mathrm{NDVI}",
    },
    { type: "h2", text: "۲. اثبات کران [−1, +1] برای مقادیر نامنفی" },
    {
      type: "p",
      text: "از آنجا که بازتاب فیزیکی $A, B \\ge 0$ است، همواره تفاضل دو عدد نامنفی از مجموعشان کوچکتر یا مساوی است؛ پس قدر مطلق کسر هرگز از ۱ فراتر نمی‌رود:",
    },
    {
      type: "display",
      latex: "\\text{اگر } B = 0 \\Rightarrow \\frac{A}{A} = +1 \\qquad | \\qquad \\text{اگر } A = 0 \\Rightarrow \\frac{-B}{B} = -1",
    },
    { type: "h2", text: "۳. توان‌های دودویی (2ⁿ) در داده‌های دیجیتال (DN)" },
    {
      type: "p",
      text: "تصاویر ماهواره‌ای به صورت اعداد صحیح با عمق $n$ بیت ذخیره می‌شوند که تعداد سطوح $2^n$ و حداکثر عدد دیجیتال ($\\mathrm{DN}_{\\max}$) برابر $2^n - 1$ است:",
    },
    {
      type: "display",
      latex: "8\\text{-bit}: 2^{8} = 256\\;(0\\ldots 255) \\qquad | \\qquad 12\\text{-bit}: 2^{12} = 4096\\;(0\\ldots 4095)",
    },
    {
      type: "note",
      text: "همین جبر ساده پایه ده‌ها شاخص کلیدی سنجش از دور از جمله NDVI (گیاه)، NDWI (آب)، NDSI (برف) و NBR (شدت سوختگی) است.",
    },
    { type: "formula", id: "ndvi" },
    { type: "problem", id: "ndvi-ratio" },
  ],
};
