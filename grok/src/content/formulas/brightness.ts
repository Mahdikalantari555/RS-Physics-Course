import { sym, tex } from "../tokens";
import type { Formula } from "../types";

export const brightness: Formula = {
  kind: "formula",
  id: "brightness",
  title: "دمای درخشندگی",
  summary: "وارون پلانک: از رادیانس طیفی به دمایی که جسم سیاه همان رادیانس را می‌داد.",
  tokens: [
    sym("Tb", "T_b"),
    tex("=\\frac{"),
    sym("c2", "c_2"),
    tex("}{"),
    sym("lambda", "\\lambda"),
    tex("\\ln\\!\\left(1+\\dfrac{"),
    sym("c1", "c_1"),
    tex("}{"),
    sym("lambda", "\\lambda^{5}"),
    sym("L"),
    tex("}\\right)}"),
  ],
  parts: [
    {
      id: "Tb",
      latex: "T_b",
      name: "دمای درخشندگی",
      explanation:
        "دمای جسم سیاهی که در همین طول‌موج همین رادیانس را گسیل کند. دمای جنبشی سطح نیست، مگر گسیلندگی یک باشد و جو در مسیر نباشد.",
    },
    {
      id: "c2",
      latex: "c_2",
      name: "ثابت دوم تابش",
      explanation: "c₂ = hc/k ≈ ۱٫۴۳۹×۱۰⁻² مترکلوین. صورتِ وارونِ پلانک است. با λ به متر، حاصل کلوین است.",
    },
    {
      id: "lambda",
      latex: "\\lambda",
      name: "طول‌موج",
      explanation:
        "باید به متر باشد اگر c₁ و c₂ در SI باشند. جا انداختن تبدیل میکرومتر به متر، دما را بی‌معنی می‌کند. طول‌موج مؤثر باند را بگذار، نه مرکز اسمی را اگر فرقشان مهم است.",
    },
    {
      id: "c1",
      latex: "c_1",
      name: "ثابت اول تابش",
      explanation: "c₁ = 2hc² ≈ ۱٫۱۹۱×۱۰⁻¹⁶ وات‌مترمربع. همان صورت قانون پلانک، پیش از تقسیم بر λ⁵.",
    },
    {
      id: "L",
      latex: "L",
      name: "رادیانسی که وارون می‌شود",
      explanation:
        "اگر L را خودِ سطح نداده باشد، T_b دمای سطح نیست. گسیلندگی کمتر از یک، L را کوچک می‌کند و T_b را سردتر از واقع نشان می‌دهد.",
    },
  ],
  derivationNotes:
    "از B = c₁ λ⁻⁵ / (e^{c₂/λT} − 1) بنویس L = B، مخرج را جدا کن، دو طرف را وارون کن، یک را اضافه کن، لگاریتم بگیر و T را بیاور بالا.",
  relatedLabs: ["blackbody"],
  relatedMath: ["exponentials", "solving"],
};
