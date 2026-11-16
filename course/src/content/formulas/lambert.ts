import { sym, tex } from "../tokens";
import type { Formula } from "../types";

export const lambert: Formula = {
  kind: "formula",
  id: "lambert",
  title: "سطح لامبرتی",
  summary: "اگر سطح کاملاً پخشنده باشد، BRDF ثابت است.",
  tokens: [sym("fr", "f_r"), tex("=\\frac{"), sym("rho", "\\rho"), tex("}{"), sym("pi", "\\pi"), tex("}")],
  parts: [
    {
      id: "fr",
      latex: "f_r",
      name: "BRDF ثابت",
      explanation:
        "برای سطح لامبرتی به جهت بستگی ندارد. رادیانس بازتابیده از هر سو یکی به نظر می‌رسد، هرچند ایرَدیانس روی سطح با کسینوس زاویه کم می‌شود.",
    },
    {
      id: "rho",
      latex: "\\rho",
      name: "بازتابندگی نیم‌کره‌ای",
      explanation:
        "کسری از توان فرودی که به کل نیم‌کره‌ی بالا برمی‌گردد. عددی بین صفر و یک. برگ، خاک و بتن اغلب با همین یک عدد تقریب زده می‌شوند، هرچند دقیق نیستند.",
    },
    {
      id: "pi",
      latex: "\\pi",
      name: "انتگرال کسینوس",
      explanation:
        "از انتگرال cosθ روی نیم‌کره می‌آید و برابر π استرادیان است. به همین خاطر L = ρE/π، نه L = ρE. جا انداختن π خطاهای رادیومتری رایج است.",
    },
  ],
  derivationNotes: "اگر f_r ثابت باشد و انتگرال f_r cosθ dω روی نیم‌کره برابر ρ شود، آن وقت f_r = ρ/π.",
  relatedLabs: ["ndvi", "atmosphere"],
  relatedMath: ["integrals"],
};
