import { sym, tex } from "../tokens";
import type { Formula } from "../types";

export const wien: Formula = {
  kind: "formula",
  id: "wien",
  title: "قانون جابه‌جایی وین",
  summary: "جسم داغ‌تر، قله‌ی طیفش در طول‌موج کوتاه‌تر است.",
  tokens: [sym("lambda", "\\lambda_{\\max}"), sym("T"), tex("="), sym("b")],
  parts: [
    {
      id: "lambda",
      latex: "\\lambda_{\\max}",
      name: "طول‌موج قله",
      explanation:
        "طول‌موجی که B_λ در آن بیشینه است. برای خورشید حدود ۰٫۵ میکرومتر (سبز–آبی) و برای زمین حدود ۱۰ میکرومتر (فروسرخ حرارتی).",
    },
    {
      id: "T",
      latex: "T",
      name: "دمای مطلق",
      explanation: "در مخرجِ ضمنی نشسته: λ_max = b/T. دما که دو برابر شود، قله نصف می‌شود.",
    },
    {
      id: "b",
      latex: "b",
      name: "ثابت وین",
      explanation:
        "حدود ۲۸۹۸ میکرومترکلوین. از مشتق‌گرفتن از قانون پلانک نسبت به λ و صفر گذاشتن آن به دست می‌آید. این ثابت برای طیفِ بر حسب طول‌موج است، نه بر حسب بسامد.",
    },
  ],
  derivationNotes:
    "∂B_λ/∂λ = 0 به یک معادله‌ی غیرجبری برای x = hc/λkT می‌رسد که جواب عددی‌اش x ≈ ۴٫۹۶۵ است. از همان‌جا b = hc/(k x).",
  relatedLabs: ["blackbody"],
  relatedMath: ["derivatives"],
};
