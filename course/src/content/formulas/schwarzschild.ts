import { sym, tex } from "../tokens";
import type { Formula } from "../types";

export const schwarzschild: Formula = {
  kind: "formula",
  id: "schwarzschild",
  title: "معادله انتقال تابشی (شوارتزشیلد)",
  summary:
    "تغییر شدت تابندگی در مسیر عبور از جو، برابر تفاضل تابش جذب‌شده و تابش گسیل‌شده توسط خود محیط است.",
  tokens: [
    sym("dIds", "\\frac{dI_{\\lambda}}{ds}"),
    tex("="),
    tex("-"),
    sym("kappa", "\\kappa_{\\lambda}"),
    sym("I", "I_{\\lambda}"),
    tex("+"),
    sym("j", "j_{\\lambda}"),
  ],
  parts: [
    {
      id: "dIds",
      latex: "\\frac{dI_{\\lambda}}{ds}",
      name: "نرخ تغییر شدت تابندگی در طول مسیر",
      kind: "var",
      unitOrValue: "W · m⁻³ · sr⁻¹ · μm⁻¹",
      explanation:
        "تغییرات تابندگی طیفی I_λ در واحد طول مسیر s هنگام عبور پرتو از میان لایه‌های جو.",
      mathRole: "مشتق مکانی شدت تابندگی در راستای انتشار پرتو.",
    },
    {
      id: "kappa",
      latex: "\\kappa_{\\lambda}",
      name: "ضریب تضعیف یا خاموشی طیفی",
      kind: "var",
      unitOrValue: "m⁻¹",
      explanation:
        "مجموع اثر جذب و پراکنش محیط در واحد طول؛ هرچه جو غلیظ‌تر یا دارای بخار آب و آئروسل بیشتری باشد، κ بزرگ‌تر است.",
      mathRole: "ضریب منفی در جمله تضعیف که شدت ورودی را به‌صورت نمایی کاهش می‌دهد.",
    },
    {
      id: "I",
      latex: "I_{\\lambda}",
      name: "شدت تابندگی طیفی در مسیر",
      kind: "var",
      unitOrValue: "W · m⁻² · sr⁻¹ · μm⁻¹",
      explanation:
        "تابندگی موجود در طول‌موج λ در نقطه s از مسیر بین سطح زمین و سنجنده.",
      mathRole: "متغیر اصلی معادله دیفرانسیل مرتبه اول.",
    },
    {
      id: "j",
      latex: "j_{\\lambda}",
      name: "ضریب گسیل طیفی محیط (چشمه)",
      kind: "var",
      unitOrValue: "W · m⁻³ · sr⁻¹ · μm⁻¹",
      explanation:
        "انرژی تابشی اضافه‌شده به مسیر در واحد طول توسط خود جو (در اثر گسیل حرارتی گازهای جوی یا پراکنش نور خورشید به درون میدان دید سنجنده).",
      mathRole: "جمله چشمه؛ اگر j = 0 باشد، معادله به قانون بیر–لامبرت ساده می‌شود.",
      intuition:
        "در سنجش از دور حرارتی، جو هم تابش سطح زمین را تضعیف می‌کند (−κI) و هم خودش به دلیل داشتن دما، تابش اضافی می‌فرستد (+j).",
    },
  ],
  derivationNotes:
    "با تعریف عمق نوری τ = ∫ κ ds و در تعادل ترمودینامیکی موضعی که j_λ / κ_λ = B_λ(T) است، انتگرال‌گیری از این معادله به مدل استاندارد انتقال تابشی جو می‌انجامد.",
  relatedLabs: ["atmosphere"],
  relatedMath: ["derivatives", "integrals", "exponentials"],
};
