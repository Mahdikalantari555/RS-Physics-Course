import { sym, tex } from "../tokens";
import type { Formula } from "../types";

export const ndwiNdsi: Formula = {
  kind: "formula",
  id: "ndwi-ndsi",
  title: "شاخص آب (NDWI) و شاخص برف (NDSI)",
  summary: "بهره‌برداری از باندهای سبز و SWIR برای استخراج آب و برف.",
  tokens: [
    sym("ndwi", "\\mathrm{NDWI}"),
    tex("=\\frac{"),
    sym("g", "\\rho_{\\mathrm{G}}"),
    tex("-"),
    sym("nir", "\\rho_{\\mathrm{NIR}}"),
    tex("}{"),
    sym("g", "\\rho_{\\mathrm{G}}"),
    tex("+"),
    sym("nir", "\\rho_{\\mathrm{NIR}}"),
    tex("} \\quad "),
    sym("ndsi", "\\mathrm{NDSI}"),
    tex("=\\frac{"),
    sym("g", "\\rho_{\\mathrm{G}}"),
    tex("-"),
    sym("swir", "\\rho_{\\mathrm{SWIR_1}}"),
    tex("}{"),
    sym("g", "\\rho_{\\mathrm{G}}"),
    tex("+"),
    sym("swir", "\\rho_{\\mathrm{SWIR_1}}"),
    tex("}"),
  ],
  parts: [
    {
      id: "ndwi",
      latex: "\\mathrm{NDWI}",
      name: "شاخص آب",
      explanation:
        "آب زلال در سبز بازتاب دارد و در NIR جذب می‌کند، پس NDWI مثبت و نزدیک ۱ است. برای استخراج خطوط ساحلی، تالاب‌ها و پهنه‌های آبی کاربردی است.",
    },
    {
      id: "ndsi",
      latex: "\\mathrm{NDSI}",
      name: "شاخص برف",
      explanation:
        "برف در SWIR (~۱٫۶ μm) جذب شدید دارد (بازتاب نزدیک صفر) اما در سبز روشن است؛ ابر در SWIR بازتاب بالایی دارد. NDSI مثبت برف را از ابر سفید متمایز می‌کند.",
    },
    {
      id: "g",
      latex: "\\rho_{\\mathrm{G}}",
      name: "بازتاب باند سبز",
      explanation:
        "حدود ۰٫۵۵ میکرومتر. در هر دو شاخص در مخرج و مخرج حضور دارد، چرا که آب و برف در سبز درخشانند.",
    },
    {
      id: "swir",
      latex: "\\rho_{\\mathrm{SWIR_1}}",
      name: "بازتاب SWIR1",
      explanation:
        "فروسرخ موج‌کوتاه حدود ۱٫۶۱ میکرومتر. حساس به رطوبت و تفکیک برف از ابر و کانی‌های رسی.",
    },
  ],
  derivationNotes:
    "هر دو شاخص از نرمال‌سازی دو باند بر اساس رفتار اپتیکی مادهٔ مورد نظر ساخته شده‌اند: NDWI از جذب شدید آب در NIR، NDSI از جذب شدید برف در SWIR.",
  relatedLabs: ["spectral-signatures"],
};
