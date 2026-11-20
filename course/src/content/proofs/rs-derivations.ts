import type { FormulaProof, ProofCategoryId } from "@/lib/proof-logic";

export const PROOF_CATEGORIES: Array<{ id: ProofCategoryId; labelFa: string }> = [
  { id: "all", labelFa: "همه اثبات‌ها" },
  { id: "light-wave", labelFa: "فیزیک نور و موج" },
  { id: "thermal", labelFa: "تابش حرارتی و جسم سیاه" },
  { id: "atmosphere-geometry", labelFa: "جو و هندسه‌ی تابش" },
  { id: "sensor-orbit", labelFa: "سنجنده، مدار و شاخص‌ها" },
];

export const RS_FORMULA_PROOFS: FormulaProof[] = [
  {
    id: "maxwell-light-speed",
    order: 1,
    category: "light-wave",
    categoryLabelFa: "فیزیک نور و موج",
    titleFa: "اثبات معادله‌ی موج نور و سرعت $c$ از معادلات ماکسول",
    subtitleFa: "چگونه از ترکیب قانون فارادی و آمپر–ماکسول در خلأ، سرعت نور $c = 1/\\sqrt{\\mu_0\\varepsilon_0}$ و رابطه‌ی $c = \\lambda\\nu$ نتیجه می‌شود؟",
    targetLatex: "\\frac{\\partial^2 E_y}{\\partial x^2} = \\mu_0\\varepsilon_0 \\frac{\\partial^2 E_y}{\\partial t^2} \\implies c = \\frac{1}{\\sqrt{\\mu_0\\varepsilon_0}}, \\quad c = \\lambda\\nu",
    startingPremisesFa: [
      "قانون القای فارادی برای موج تخت یک‌بعدی در جهت $x$ (میدان الکتریکی در جهت $y$ و مغناطیسی در جهت $z$): $\\frac{\\partial E_y}{\\partial x} = -\\frac{\\partial B_z}{\\partial t}$.",
      "قانون آمپر–ماکسول در خلأ (بدون جریان و بار آزاد، $J = 0$): $-\\frac{\\partial B_z}{\\partial x} = \\mu_0\\varepsilon_0 \\frac{\\partial E_y}{\\partial t}$.",
      "معادله‌ی استاندارد موج مکانیکی/الکترومغناطیسی با سرعت انتشار $v$: $\\frac{\\partial^2 u}{\\partial x^2} = \\frac{1}{v^2}\\frac{\\partial^2 u}{\\partial t^2}$.",
    ],
    methodIds: ["direct", "differential"],
    relatedFormulaId: "em-speed",
    steps: [
      {
        id: "m1",
        titleFa: "مشتق‌گیری مکانی از قانون فارادی",
        opId: "balance",
        latex: "\\frac{\\partial}{\\partial x}\\!\\left(\\frac{\\partial E_y}{\\partial x}\\right) = \\frac{\\partial}{\\partial x}\\!\\left(-\\frac{\\partial B_z}{\\partial t}\\right) \\implies \\frac{\\partial^2 E_y}{\\partial x^2} = -\\frac{\\partial^2 B_z}{\\partial x\\,\\partial t}",
        explanationFa:
          "چون می‌خواهیم میدان $B_z$ را حذف کنیم و فقط یک معادله برای $E_y$ بسازیم، از دو طرف قانون فارادی نسبت به مکان $x$ مشتق می‌گیریم.",
      },
      {
        id: "m2",
        titleFa: "مشتق‌گیری زمانی از قانون آمپر–ماکسول",
        opId: "balance",
        latex: "\\frac{\\partial}{\\partial t}\\!\\left(-\\frac{\\partial B_z}{\\partial x}\\right) = \\mu_0\\varepsilon_0 \\frac{\\partial^2 E_y}{\\partial t^2} \\implies -\\frac{\\partial^2 B_z}{\\partial t\\,\\partial x} = \\mu_0\\varepsilon_0 \\frac{\\partial^2 E_y}{\\partial t^2}",
        explanationFa:
          "ثابت‌های $\\mu_0$ و $\\varepsilon_0$ به زمان وابسته نیستند، بنابراین از مشتق زمانی بیرون می‌آیند.",
      },
      {
        id: "m3",
        titleFa: "استفاده از تقارن مشتق‌های مختلط و جایگذاری",
        opId: "substitution",
        latex: "\\frac{\\partial^2 B_z}{\\partial x\\,\\partial t} = \\frac{\\partial^2 B_z}{\\partial t\\,\\partial x} \\implies \\frac{\\partial^2 E_y}{\\partial x^2} = \\mu_0\\varepsilon_0 \\frac{\\partial^2 E_y}{\\partial t^2}",
        explanationFa:
          "برای میدان‌های هموار، ترتیب مشتق‌گیری مکانی و زمانی تفاوتی ندارد (قضیه‌ی شوارتز). بنابراین سمت راستِ گام ۱ را دقیقاً با سمت راستِ گام ۲ جایگزین می‌کنیم و $B_z$ حذف می‌شود!",
      },
      {
        id: "m4",
        titleFa: "تطبیق با معادله‌ی موج و استخراج سرعت $c$",
        opId: "balance",
        latex: "\\frac{1}{c^2} = \\mu_0\\varepsilon_0 \\implies c = \\frac{1}{\\sqrt{\\mu_0\\varepsilon_0}} \\approx 2.998 \\times 10^8\\;\\text{m/s}",
        explanationFa:
          "با مقایسه‌ی ضریب مشتق زمانی دوم در معادله‌ی ما با معادله‌ی استاندارد موج ($1/v^2$)، سرعت انتشار موج دقیقاً $1/\\sqrt{\\mu_0\\varepsilon_0}$ به دست می‌آید که برابر با سرعت تجربی نور است!",
      },
      {
        id: "m5",
        titleFa: "قرار دادن موج سینوسی و اثبات $c = \\lambda\\nu$",
        opId: "substitution",
        latex: "E_y(x,t) = E_0\\cos\\!\\left(2\\pi\\frac{x}{\\lambda} - 2\\pi\\nu t\\right) \\implies \\left(\\frac{2\\pi}{\\lambda}\\right)^2 = \\frac{(2\\pi\\nu)^2}{c^2} \\implies c = \\lambda\\nu \\;\\blacksquare",
        explanationFa:
          "اگر جواب موج تک‌فام با طول‌موج $\\lambda$ و بسامد $\\nu$ را در معادله‌ی موج جایگذاری کنیم و $(2\\pi)^2$ را از دو طرف خط بزنیم (و چون $\\lambda, \\nu, c > 0$ ریشه‌ی مثبت بگیریم)، رابطه‌ی بنیادی $c = \\lambda\\nu$ ثابت می‌شود.",
        watchOutFa: "در محیط مادی (مثل آب یا شیشه با ضریب شکست $n$) سرعت به $v = c/n$ کاهش می‌یابد، بسامد $\\nu$ ثابت می‌ماند و طول‌موج کوتاه‌تر می‌شود ($\\lambda' = \\lambda/n$).",
      },
    ],
    physicalTakeawayFa:
      "این اثبات تاریخی نشان داد که «نور» چیزی جز یک موج الکترومغناطیسی نیست و تمام باندهای سنجش از دور (از مرئی تا حرارتی و رادار) با یک سرعت یکسان در خلأ حرکت می‌کنند.",
  },
  {
    id: "photon-energy-proof",
    order: 2,
    category: "light-wave",
    categoryLabelFa: "فیزیک نور و موج",
    titleFa: "انرژی کوانتومی فوتون و تبدیل طول‌موج به الکترون‌ولت",
    subtitleFa: "اتصال کوانتوم انرژی پلانک–اینشتین به طول‌موج و اثبات چرایی افت انرژی در باندهای حرارتی و راداری",
    targetLatex: "E = h\\nu = \\frac{hc}{\\lambda} \\implies E(\\text{eV}) \\approx \\frac{1.2398}{\\lambda(\\mu\\text{m})}",
    startingPremisesFa: [
      "فرض کوانتومی پلانک–اینشتین: انرژی هر فوتون متناسب با بسامد آن است ($E = h\\nu$).",
      "رابطه‌ی موج الکترومغناطیسی در خلأ: $c = \\lambda\\nu$ (با شرط $\\lambda > 0$).",
      "تعریف الکترون‌ولت: $1\\,\\text{eV} = 1.6022\\times 10^{-19}\\,\\text{J}$ و $1\\,\\mu\\text{m} = 10^{-6}\\,\\text{m}$.",
    ],
    methodIds: ["direct"],
    relatedFormulaId: "photon-energy",
    steps: [
      {
        id: "pe1",
        titleFa: "ایزوله کردن بسامد از معادله‌ی موج",
        opId: "balance",
        latex: "c = \\lambda\\nu \\;\\xrightarrow{\\div \\lambda}\\; \\nu = \\frac{c}{\\lambda} \\quad (\\lambda > 0)",
        explanationFa:
          "چون طول‌موج همیشه اکیداً مثبت است ($\\lambda > 0$)، تقسیم دو طرف بر $\\lambda$ کاملاً مجاز و برگشت‌پذیر است.",
      },
      {
        id: "pe2",
        titleFa: "جایگذاری بسامد درون رابطه‌ی پلانک–اینشتین",
        opId: "substitution",
        latex: "E = h\\nu = h\\cdot\\frac{c}{\\lambda} = \\frac{hc}{\\lambda}",
        explanationFa:
          "متغیر واسطه‌ی $\\nu$ حذف شد و مستقیماً دیدیم انرژی هر فوتون با طول‌موج رابطه‌ی عکس دارد ($E \\propto 1/\\lambda$).",
      },
      {
        id: "pe3",
        titleFa: "تحلیل ابعادی و محاسبه‌ی ثابت ترکیبی $hc$",
        opId: "factor-cancel",
        latex: "hc = (6.6261\\times 10^{-34}\\;\\text{J}\\cdot\\text{s})(2.9979\\times 10^8\\;\\text{m/s}) = 1.9864\\times 10^{-25}\\;\\text{J}\\cdot\\text{m}",
        explanationFa:
          "ثانیه‌ها در صورت و مخرج خط می‌خورند و واحد $\\text{J}\\cdot\\text{m}$ باقی می‌ماند؛ با تقسیم بر طول‌موج (متر)، دقیقاً ژول به دست می‌آید.",
      },
      {
        id: "pe4",
        titleFa: "تبدیل واحد به میکرومتر و الکترون‌ولت",
        opId: "balance",
        latex: "E(\\text{eV}) = \\frac{1.9864\\times 10^{-25}\\;\\text{J}\\cdot\\text{m}}{(1.6022\\times 10^{-19}\\;\\text{J/eV})\\cdot(\\lambda_{\\mu\\text{m}}\\times 10^{-6}\\;\\text{m})} = \\frac{1.2398}{\\lambda(\\mu\\text{m})} \\;\\blacksquare",
        explanationFa:
          "توان‌های ۱۰ در مخرج ($10^{-19}\\times 10^{-6} = 10^{-25}$) دقیقاً با $10^{-25}$ صورت خط می‌خورند و تنها نسبت ساده و دقیق $1.2398$ باقی می‌ماند!",
      },
    ],
    physicalTakeawayFa:
      "یک فوتون در باند حرارتی ($\\lambda = 10\\,\\mu\\text{m}$) بیست برابر کمتر از فوتون آبی ($0.5\\,\\mu\\text{m}$) انرژی دارد؛ به همین دلیل پیکسل‌های سنجنده‌ی حرارتی (مثل TIRS لندست) بزرگ‌تر ساخته می‌شوند تا فوتون کافی جمع کنند.",
  },
  {
    id: "wien-displacement-proof",
    order: 3,
    category: "thermal",
    categoryLabelFa: "تابش حرارتی و جسم سیاه",
    titleFa: "اثبات قانون جابه‌جایی وین از قانون تابش پلانک",
    subtitleFa: "مشتق‌گیری از تابع پلانک، بی‌بعدسازی با تغییر متغیر $x$ و رسیدن به عدد جادویی $2897.8\\,\\mu\\text{m}\\cdot\\text{K}$",
    targetLatex: "\\lambda_{\\max} \\cdot T = b = \\frac{hc}{4.9651\\,k_B} \\approx 2897.8\\;\\mu\\text{m}\\cdot\\text{K}",
    startingPremisesFa: [
      "قانون تابش جسم سیاه پلانک بر حسب طول‌موج: $B(\\lambda, T) = \\frac{2hc^2}{\\lambda^5}\\cdot\\frac{1}{e^{hc/(\\lambda k_B T)} - 1}$.",
      "در قله‌ی منحنی تابش ($\\lambda = \\lambda_{\\max}$)، تابع $B(\\lambda, T)$ به بیشینه‌ی خود می‌رسد، پس مشتق آن نسبت به $\\lambda$ صفر است.",
    ],
    methodIds: ["direct", "differential"],
    relatedFormulaId: "wien",
    steps: [
      {
        id: "w1",
        titleFa: "تعریف متغیر بی‌بعد $x$ برای پاک کردن شلوغی ثابت‌ها",
        opId: "change-var",
        latex: "x \\equiv \\frac{hc}{\\lambda k_B T} \\implies \\lambda = \\frac{hc}{k_B T}\\cdot\\frac{1}{x}",
        explanationFa:
          "این کلیدی‌ترین حرکت اثبات است! به جای مشتق‌گیری مستقیم از عبارت سنگین با ۵ ثابت، همه‌ی ثابت‌ها را درون یک متغیر بی‌بعد $x$ جمع می‌کنیم.",
      },
      {
        id: "w2",
        titleFa: "بازنویسی تابع پلانک بر حسب $x$",
        opId: "substitution",
        latex: "B(x) = \\underbrace{\\frac{2 k_B^5 T^5}{h^4 c^3}}_{C(T) > 0} \\cdot \\frac{x^5}{e^x - 1}",
        explanationFa:
          "وقتی $\\lambda^{-5} \\propto x^5$ را جایگذاری می‌کنیم، ضریب $C(T)$ مستقل از $x$ (و همیشه مثبت) بیرون می‌آید. پس بیشینه کردن $B(\\lambda, T)$ دقیقاً معادل بیشینه کردن تابع ساده‌ی $f(x) = \\frac{x^5}{e^x - 1}$ است!",
      },
      {
        id: "w3",
        titleFa: "مشتق‌گیری و صفر قرار دادن برای یافتن قله",
        opId: "calculus-opt",
        latex: "\\frac{df}{dx} = \\frac{5x^4(e^x - 1) - x^5 e^x}{(e^x - 1)^2} = 0",
        explanationFa:
          "از قاعده‌ی مشتق کسر $(u/v)' = (u'v - uv')/v^2$ استفاده می‌کنیم. برای صفر شدن کسر، کافی است صورت آن صفر شود.",
      },
      {
        id: "w4",
        titleFa: "فاکتورگیری و خط زدن عامل‌های غیرصفر",
        opId: "factor-cancel",
        latex: "x^4 \\big[5(e^x - 1) - x e^x\\big] = 0 \\;\\xrightarrow{x > 0,\\; \\div e^x}\\; 5(1 - e^{-x}) = x",
        explanationFa:
          "چون در قله طول‌موج متناهی و مثبت است ($x > 0$ و $e^x > 0$)، تقسیم کردن بر $x^4 e^x$ کاملاً مجاز است و معادله‌ی معروف وین ظاهر می‌شود!",
        watchOutFa: "معادله‌ی $5(1 - e^{-x}) = x$ جواب جبری بسته‌ی معمولی ندارد (معادله‌ی متعالی است) و ریشه‌ی غیرصفر یکتایش به روش عددی به دست می‌آید.",
      },
      {
        id: "w5",
        titleFa: "حل عددی ریشه‌ی یکتا و بازگشت به $\\lambda_{\\max}$",
        opId: "substitution",
        latex: "x_0 \\approx 4.965114 \\implies \\frac{hc}{\\lambda_{\\max} k_B T} = 4.965114 \\implies \\lambda_{\\max} T = \\frac{hc}{4.965114\\,k_B} \\approx 2897.8\\;\\mu\\text{m}\\cdot\\text{K} \\;\\blacksquare",
        explanationFa:
          "با برگرداندن تعریف $x$، می‌بینیم که حاصل‌ضرب $\\lambda_{\\max} T$ یک ثابت جهانی مستقل از دما است!",
      },
    ],
    physicalTakeawayFa:
      "چون $x_0$ یک عدد ثابت است، هر چه جسم داغ‌تر شود (خورشید $5778\\,\\text{K}$ ← قله $0.5\\,\\mu\\text{m}$)، قله به سمت طول‌موج کوتاه‌تر می‌رود و هر چه سردتر شود (زمین $300\\,\\text{K}$ ← قله $9.7\\,\\mu\\text{m}$)، به سمت فروسرخ حرارتی جابه‌جا می‌شود.",
  },
  {
    id: "stefan-boltzmann-proof",
    order: 4,
    category: "thermal",
    categoryLabelFa: "تابش حرارتی و جسم سیاه",
    titleFa: "اثبات قانون استفان–بولتزمن ($M = \\sigma T^4$) و رابطه‌ی $M = \\pi L$",
    subtitleFa: "انتگرال‌گیری از قانون پلانک روی همه‌ی زاویه‌های نیم‌کره و همه‌ی طول‌موج‌ها",
    targetLatex: "M = \\pi \\int_0^\\infty B(\\lambda, T)\\,d\\lambda = \\sigma T^4, \\qquad \\sigma = \\frac{2\\pi^5 k_B^4}{15 h^3 c^2}",
    startingPremisesFa: [
      "قانون پلانک تابندگی طیفی را در هر جهت می‌دهد: $B(\\lambda, T) = \\frac{2hc^2}{\\lambda^5 (e^{hc/(\\lambda k_B T)} - 1)}$.",
      "جسم سیاه همسانگرد (لامبرتی) است؛ یعنی تابندگی $B$ به زاویه‌های $\\theta$ و $\\phi$ وابسته نیست.",
      "تعریف گسیل تابشی کل $M$: انتگرال تابندگی ضربدر $\\cos\\theta$ روی کل نیم‌کره‌ی بالای سطح و همه‌ی طول‌موج‌ها.",
    ],
    methodIds: ["differential", "direct"],
    relatedFormulaId: "stefan",
    steps: [
      {
        id: "sb1",
        titleFa: "انتگرال روی نیم‌کره و اثبات ضریب هندسی $\\pi$",
        opId: "ode-integral",
        latex: "M_\\lambda = \\int_0^{2\\pi}\\!\\!d\\phi \\int_0^{\\pi/2} B(\\lambda,T)\\cos\\theta\\sin\\theta\\,d\\theta = 2\\pi B(\\lambda,T)\\left[\\frac{\\sin^2\\theta}{2}\\right]_0^{\\pi/2} = \\pi B(\\lambda,T)",
        explanationFa:
          "جزء زاویه‌ی فضایی $d\\Omega = \\sin\\theta\\,d\\theta\\,d\\phi$ است و عامل $\\cos\\theta$ به خاطر تصویر سطح در جهت مایل می‌آید. با خارج کردن $B$ (به دلیل همسانگردی)، نتیجه‌ی معروف $M = \\pi L$ ثابت می‌شود!",
        watchOutFa: "خیلی‌ها تصور می‌کنند مساحت نیم‌کره $2\\pi$ است پس باید $M = 2\\pi L$ باشد؛ عامل $\\cos\\theta$ دقیقاً آن را نصف می‌کند و عدد دقیق $\\pi$ به دست می‌آید.",
      },
      {
        id: "sb2",
        titleFa: "نوشتن انتگرال روی تمام طول‌موج‌ها",
        opId: "ode-integral",
        latex: "M = \\int_0^\\infty \\pi B(\\lambda, T)\\,d\\lambda = 2\\pi h c^2 \\int_0^\\infty \\frac{1}{\\lambda^5\\left(e^{hc/(\\lambda k_B T)} - 1\\right)}\\,d\\lambda",
        explanationFa:
          "برای به دست آوردن شار کل خروجی از سطح جسم سیاه، گسیل طیفی را از $\\lambda = 0$ تا $\\lambda = \\infty$ جمع (انتگرال) می‌زنیم.",
      },
      {
        id: "sb3",
        titleFa: "تغییر متغیر بی‌بعد $x$ و محاسبه‌ی $d\\lambda$ و کران‌ها",
        opId: "change-var",
        latex: "x = \\frac{hc}{\\lambda k_B T} \\implies \\lambda = \\frac{hc}{k_B T}\\,x^{-1}, \\quad d\\lambda = -\\frac{hc}{k_B T}\\,x^{-2}\\,dx",
        explanationFa:
          "تغییر کران‌ها را فراموش نمی‌کنیم: وقتی $\\lambda \\to 0^+$ آنگاه $x \\to \\infty$؛ و وقتی $\\lambda \\to \\infty$ آنگاه $x \\to 0$. علامت منفیِ $d\\lambda$ دقیقاً جای دو کران را برمی‌گرداند!",
      },
      {
        id: "sb4",
        titleFa: "بیرون کشیدن $T^4$ از انتگرال",
        opId: "factor-cancel",
        latex: "M = 2\\pi h c^2 \\left(\\frac{k_B T}{hc}\\right)^4 \\int_0^\\infty \\frac{x^3}{e^x - 1}\\,dx = \\frac{2\\pi k_B^4}{h^3 c^2}\\,T^4 \\int_0^\\infty \\frac{x^3}{e^x - 1}\\,dx",
        explanationFa:
          "نگاه کنید چه اتفاق شگفت‌انگیزی افتاد: حتی قبل از دانستن مقدار انتگرال، توان چهارم دما ($T^4$) صرفاً از تحلیل ابعادی و تغییر متغیر بی‌بعد ظاهر شد!",
      },
      {
        id: "sb5",
        titleFa: "جایگذاری مقدار دقیق انتگرال ریمان–زتا $\\pi^4/15$",
        opId: "substitution",
        latex: "\\int_0^\\infty \\frac{x^3}{e^x - 1}\\,dx = \\frac{\\pi^4}{15} \\implies M = \\underbrace{\\frac{2\\pi^5 k_B^4}{15 h^3 c^2}}_{\\sigma \\approx 5.670\\times 10^{-8}}\\cdot T^4 = \\sigma T^4 \\;\\blacksquare",
        explanationFa:
          "مقدار این انتگرال کلاسیک برابر $\\Gamma(4)\\zeta(4) = 6\\cdot(\\pi^4/90) = \\pi^4/15$ است. با ضرب آن در ضریب قبلی، ثابت استفان–بولتزمن دقیقاً از ثابت‌های بنیادی طبیعت ساخته می‌شود!",
      },
    ],
    physicalTakeawayFa:
      "دو برابر شدن دمای یک سطح، کل انرژی تابشی آن را $2^4 = 16$ برابر می‌کند؛ به همین دلیل حتی افزایش کوچک دما در آتش‌سوزی جنگل‌ها سیگنال حرارتی بسیار درخشانی در ماهواره ایجاد می‌کند.",
  },
  {
    id: "rayleigh-jeans-wien-limits",
    order: 5,
    category: "thermal",
    categoryLabelFa: "تابش حرارتی و جسم سیاه",
    titleFa: "استخراج تقریب ریلی–جینز (مایکروویو) و تقریب وین از پلانک",
    subtitleFa: "چگونه تحلیل حالات حدی و بسط تیلور نشان می‌دهد چرا در مایکروویو تابندگی با دما خطی است؟",
    targetLatex: "B_{\\text{RJ}}(\\lambda,T) \\approx \\frac{2ck_B T}{\\lambda^4} \\quad (hc \\ll \\lambda k_B T)",
    startingPremisesFa: [
      "قانون دقیق پلانک: $B(\\lambda, T) = \\frac{2hc^2}{\\lambda^5 (e^x - 1)}$ که در آن $x = \\frac{hc}{\\lambda k_B T}$.",
      "بسط تیلور تابع نمایی حول صفر: $e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\dots$.",
    ],
    methodIds: ["cases-counter", "direct"],
    relatedFormulaId: "rayleigh-jeans",
    steps: [
      {
        id: "rj1",
        titleFa: "تشکیل دو حالت حدی بر اساس بزرگی عدد بی‌بعد $x$",
        opId: "change-var",
        latex: "x = \\frac{hc}{\\lambda k_B T}: \\quad \\text{حالت ۱ (مایکروویو/طول‌موج بلند): } x \\ll 1, \\qquad \\text{حالت ۲ (طول‌موج کوتاه): } x \\gg 1",
        explanationFa:
          "به روش تحلیل حالات، رفتار مخرج $(e^x - 1)$ را در دو انتهای طیف جداگانه بررسی می‌کنیم. برای زمین ($300\\,\\text{K}$) در باند مایکروویو ($\\lambda = 3\\,\\text{cm}$)، $x \\approx 0.0016 \\ll 1$ است.",
      },
      {
        id: "rj2",
        titleFa: "بسط تیلور در حالت ۱ (طول‌موج بلند، $x \\ll 1$)",
        opId: "limit-taylor",
        latex: "e^x = 1 + x + \\frac{x^2}{2} + \\dots \\approx 1 + x \\implies e^x - 1 \\approx x = \\frac{hc}{\\lambda k_B T}",
        explanationFa:
          "وقتی $x \\approx 0.0016$ باشد، جمله‌ی $x^2/2 \\approx 10^{-6}$ هزار برابر کوچک‌تر از $x$ است و با دقت بسیار بالا قابل صرف‌نظر کردن است.",
      },
      {
        id: "rj3",
        titleFa: "جایگذاری و خط زدن $h$ و یک توان $c$ و $\\lambda$",
        opId: "factor-cancel",
        latex: "B(\\lambda,T) \\approx \\frac{2hc^2}{\\lambda^5 \\cdot \\frac{hc}{\\lambda k_B T}} = \\frac{2\\cancel{h}c^{\\cancel{2}}\\,k_B T}{\\lambda^{5-1}\\,\\cancel{h}\\cancel{c}} = \\frac{2c k_B T}{\\lambda^4} \\;\\blacksquare",
        explanationFa:
          "ثابت پلانک $h$ کاملاً خط می‌خورد (یعنی در این حد کلاسیک، کوانتومی بودن نور پنهان می‌شود) و $B$ دقیقاً رابطه‌ی «خطی» با دمای $T$ پیدا می‌کند!",
      },
      {
        id: "rj4",
        titleFa: "حالت ۲ (طول‌موج کوتاه، $x \\gg 1$): تقریب وین",
        opId: "limit-taylor",
        latex: "x \\gg 1 \\implies e^x \\gg 1 \\implies e^x - 1 \\approx e^x \\implies B_{\\text{Wien}}(\\lambda,T) \\approx \\frac{2hc^2}{\\lambda^5}\\,e^{-hc/(\\lambda k_B T)} \\;\\blacksquare",
        explanationFa:
          "در طول‌موج‌های کوتاه (مثل نور مرئی یا فروسرخ نزدیک برای زمین)، $e^x$ بسیار بزرگ‌تر از $1$ است؛ پس $-1$ را کنار می‌گذاریم و قانون نمایی وین به دست می‌آید.",
      },
    ],
    physicalTakeawayFa:
      "به لطف رابطه‌ی خطی ریلی–جینز ($B \\propto T$)، در رادیومتری مایکروویو می‌توان دمای درخشندگی را مستقیماً به شکل $T_B = \\varepsilon T$ تعریف کرد (بدون نیاز به معکوس کردن تابع پیچیده‌ی پلانک).",
  },
  {
    id: "kirchhoff-contradiction-proof",
    order: 6,
    category: "thermal",
    categoryLabelFa: "تابش حرارتی و جسم سیاه",
    titleFa: "اثبات قانون کیرشهف ($\\varepsilon_\\lambda = \\alpha_\\lambda$) به روش برهان خلف",
    subtitleFa: "یک نمونه‌ی ناب از کاربرد «برهان خلف» در فیزیک تابش: چرا هر جذب‌کننده‌ی خوب، گسیلنده‌ی خوب است؟",
    targetLatex: "\\varepsilon(\\lambda, T) = \\alpha(\\lambda, T)",
    startingPremisesFa: [
      "یک جسم واقعی (خاکستری/انتخابی) را درون یک حفره‌ی کاملاً عایق (جسم سیاه ایده‌آل) با دمای ثابت $T$ قرار می‌دهیم تا به تعادل گرمایی برسد.",
      "تابش فرودی از دیواره‌های حفره به جسم در طول‌موج $\\lambda$ برابر با تابش جسم سیاه $B(\\lambda, T)$ است.",
      "قانون دوم ترمودینامیک (اصل کلاوزیوس): در یک سیستم ایزوله و هم‌دما، انتقال خالص گرما بدون کار خارجی ناممکن است (دمای جسم نمی‌تواند خودبه‌خود تغییر کند).",
    ],
    methodIds: ["contradiction", "cases-counter"],
    relatedFormulaId: "kirchhoff",
    steps: [
      {
        id: "k1",
        titleFa: "نوشتن توان جذب‌شده و توان گسیل‌شده در طول‌موج $\\lambda$",
        opId: "substitution",
        latex: "P_{\\text{abs}}(\\lambda) = \\alpha(\\lambda)\\,B(\\lambda,T), \\qquad P_{\\text{emit}}(\\lambda) = \\varepsilon(\\lambda)\\,B(\\lambda,T)",
        explanationFa:
          "طبق تعریف ضریب جذب ($\\alpha$) و گسیلندگی ($\\varepsilon$)، جسم کسری برابر $\\alpha$ از تابش جسم سیاه محیط را جذب و کسری برابر $\\varepsilon$ از تابش جسم سیاه را گسیل می‌کند.",
      },
      {
        id: "k2",
        titleFa: "شروع برهان خلف: فرض خلاف حکم ($\\varepsilon \\neq \\alpha$)",
        opId: "balance",
        latex: "\\text{فرض خلف: } \\exists \\lambda_0 \\text{ که در آن } \\varepsilon(\\lambda_0) \\neq \\alpha(\\lambda_0)",
        explanationFa:
          "یک فیلتر ایده‌آل اطراف جسم می‌گذاریم که فقط طول‌موج $\\lambda_0$ را عبور می‌دهد و بقیه‌ی طول‌موج‌ها را کاملاً بازتاب می‌کند تا تعادل را فقط در همین طول‌موج بسنجیم.",
      },
      {
        id: "k3",
        titleFa: "محاسبه‌ی شار خالص انرژی و رسیدن به تناقض در هر دو حالت",
        opId: "factor-cancel",
        latex: "P_{\\text{net}}(\\lambda_0) = P_{\\text{abs}} - P_{\\text{emit}} = \\big[\\alpha(\\lambda_0) - \\varepsilon(\\lambda_0)\\big]\\,B(\\lambda_0, T)",
        explanationFa:
          "چون $B(\\lambda_0, T) > 0$ است، دو حالت داریم: اگر $\\alpha > \\varepsilon$ باشد جسم خودبه‌خود داغ‌تر از حفره می‌شود! اگر $\\alpha < \\varepsilon$ باشد جسم خودبه‌خود سردتر از حفره می‌شود!",
      },
      {
        id: "k4",
        titleFa: "بطلان فرض خلف و نتیجه‌گیری قطعی",
        opId: "balance",
        latex: "\\text{تناقض با قانون دوم ترمودینامیک!} \\implies P_{\\text{net}} = 0 \\implies \\alpha(\\lambda) = \\varepsilon(\\lambda) \\;\\blacksquare",
        explanationFa:
          "در هر دو حالت، بدون مصرف هیچ کاری اختلاف دما ایجاد شد که می‌توان با آن موتور گرمایی دائمی ساخت (نقض قانون دوم ترمودینامیک). پس فرض خلف باطل است و برای هر طول‌موج $\\varepsilon(\\lambda) = \\alpha(\\lambda)$ برقرار است.",
        watchOutFa: "قانون کیرشهف در «یک طول‌موج یکسان» برقرار است! ممکن است جسمی مثل برف در نور مرئی بازتاب بالا ($\\alpha_{\\text{vis}}$ کم) ولی در فروسرخ حرارتی گسیلندگی بسیار بالا ($\\varepsilon_{\\text{TIR}} \\approx 0.98$) داشته باشد.",
      },
    ],
    physicalTakeawayFa:
      "در سطوح کدر ($\\tau = 0$) داریم $\\alpha + \\rho = 1$؛ با جایگذاری قانون کیرشهف، رابطه‌ی طلایی $\\varepsilon(\\lambda) = 1 - \\rho(\\lambda)$ به دست می‌آید: سطوح براق فلزی (بازتاب بالا) گسیلنده‌ی حرارتی ضعیفی هستند!",
  },
  {
    id: "beer-lambert-proof",
    order: 7,
    category: "atmosphere-geometry",
    categoryLabelFa: "جو و هندسه‌ی تابش",
    titleFa: "اثبات قانون تضعیف جوی بیر–لامبرت و اثر مسیر مایل ($\\sec\\theta$)",
    subtitleFa: "چگونه یک قانون خطی ساده در یک لایه‌ی نازک جو، با انتگرال‌گیری به قانون نمایی $e^{-\\tau\\sec\\theta}$ تبدیل می‌شود؟",
    targetLatex: "I(\\lambda) = I_0(\\lambda)\\,e^{-\\tau(\\lambda)\\sec\\theta}",
    startingPremisesFa: [
      "در یک لایه‌ی بسیار نازک جو به ضخامت $ds$ در امتداد پرتو، افت شدت نور ($dI$) متناسب با شدت فعلی ($I$)، ضریب خاموشی ($k(\\lambda,z)$) و طول مسیر ($ds$) است: $dI = -k\\,I\\,ds$.",
      "در جو تخت‌لایه با زاویه‌ی سرسویی $\\theta$، مثلث قائم‌الزاویه بین مسیر مایل $ds$ و ارتفاع قائم $dz$ می‌دهد: $\\cos\\theta = \\frac{dz}{ds} \\implies ds = \\sec\\theta\\,dz$.",
      "تعریف عمق نوری قائم: $\\tau(\\lambda) \\equiv \\int_0^{\\infty} k(\\lambda, z)\\,dz$.",
    ],
    methodIds: ["differential", "direct"],
    relatedFormulaId: "beer-lambert",
    steps: [
      {
        id: "bl1",
        titleFa: "نوشتن معادله‌ی دیفرانسیل در جزء مسیر مایل",
        opId: "substitution",
        latex: "dI = -k(\\lambda, z)\\,I\\,ds \\;\\xrightarrow{ds = \\sec\\theta\\,dz}\\; dI = -k(\\lambda, z)\\sec\\theta\\,I\\,dz",
        explanationFa:
          "پرتو با زاویه‌ی $\\theta$ مسیر طولانی‌تری ($\\sec\\theta = 1/\\cos\\theta$ برابر) از جو می‌پیماید؛ جایگذاری $ds$ این اثر هندسی را وارد معادله می‌کند.",
      },
      {
        id: "bl2",
        titleFa: "تفکیک متغیرهای شدت ($I$) و ارتفاع ($z$)",
        opId: "ode-integral",
        latex: "\\frac{dI}{I} = -k(\\lambda, z)\\sec\\theta\\,dz \\qquad (I > 0)",
        explanationFa:
          "دو طرف را بر شدت مثبت $I$ تقسیم می‌کنیم تا همه‌ی متغیرهای $I$ سمت چپ و همه‌ی متغیرهای مکانی $z$ سمت راست جمع شوند.",
      },
      {
        id: "bl3",
        titleFa: "انتگرال‌گیری از بالای جو ($I_0$) تا سطح زمین ($I$)",
        opId: "ode-integral",
        latex: "\\int_{I_0}^{I} \\frac{dI'}{I'} = -\\sec\\theta \\int_{0}^{\\infty} k(\\lambda, z)\\,dz",
        explanationFa:
          "چون زاویه‌ی دید $\\theta$ در طول مسیر ثابت است، $\\sec\\theta$ از انتگرال بیرون می‌آید. انتگرال سمت چپ دقیقاً لگاریتم طبیعی و انتگرال سمت راست دقیقاً تعریف عمق نوری $\\tau(\\lambda)$ است!",
      },
      {
        id: "bl4",
        titleFa: "ارزیابی لگاریتم و جایگذاری تعریف $\\tau$",
        opId: "substitution",
        latex: "\\ln(I) - \\ln(I_0) = -\\tau(\\lambda)\\sec\\theta \\implies \\ln\\!\\left(\\frac{I}{I_0}\\right) = -\\tau(\\lambda)\\sec\\theta",
        explanationFa:
          "از خاصیت تفاضل لگاریتم‌ها ($\\ln A - \\ln B = \\ln(A/B)$) استفاده می‌کنیم.",
      },
      {
        id: "bl5",
        titleFa: "نمایی کردن دو طرف معادله ($\\exp$) و آزادسازی $I$",
        opId: "balance",
        latex: "\\frac{I}{I_0} = e^{-\\tau(\\lambda)\\sec\\theta} \\implies I(\\lambda) = I_0(\\lambda)\\,e^{-\\tau(\\lambda)\\sec\\theta} \\;\\blacksquare",
        explanationFa:
          "عمل نمایی کردن دو طرف، لگاریتم طبیعی را خنثی می‌کند ($e^{\\ln u} = u$). سپس با ضرب دو طرف در $I_0$ به شکل نهایی قانون بیر–لامبرت می‌رسیم.",
        watchOutFa: "در زاویه‌های بسیار مایل ($\\theta > 75^\\circ$) مدل جو تخت خطا پیدا می‌کند و باید از انحنای کروی زمین استفاده کرد.",
      },
    ],
    physicalTakeawayFa:
      "عبور جوی برابر $T_{\\text{atm}} = e^{-\\tau\\sec\\theta}$ است. در لبه‌های تصویر ماهواره (زاویه‌ی دید بزرگ‌تر)، $\\sec\\theta$ بزرگ‌تر شده و تضعیف و مه‌آلودگی جوی به شکل نمایی بیشتر می‌شود.",
  },
  {
    id: "lambert-cosine-inverse-square",
    order: 8,
    category: "atmosphere-geometry",
    categoryLabelFa: "جو و هندسه‌ی تابش",
    titleFa: "اثبات قانون کسینوس لامبرت و قانون عکس مجذور فاصله",
    subtitleFa: "چرا شار تابشی خورشید هم با $1/r^2$ و هم با $\\cos\\theta_z$ کاهش می‌یابد؟",
    targetLatex: "E(r, \\theta_z) = \\frac{P_{\\odot}}{4\\pi r^2}\\,\\cos\\theta_z = E_0\\cos\\theta_z",
    startingPremisesFa: [
      "خورشید توان کل $P_{\\odot}$ را به طور همسانگرد در تمام جهات فضا گسیل می‌کند و در خلأ انرژی در طول مسیر تلف نمی‌شود (پایستگی شار).",
      "مساحت سطح یک کره به شعاع $r$ برابر $A_{\\text{sphere}} = 4\\pi r^2$ است.",
      "تعریف چگالی شار (تابش‌دهی $E$): توان ورودی بر واحد مساحت سطح گیرنده ($E = d\\Phi / dA$).",
    ],
    methodIds: ["direct", "differential"],
    relatedFormulaId: "cosine-law",
    steps: [
      {
        id: "lc1",
        titleFa: "پایستگی توان روی کره‌ای به شعاع $r$ (عکس مجذور فاصله)",
        opId: "balance",
        latex: "\\Phi_{\\text{total}} = P_{\\odot} = E_0 \\cdot A_{\\text{sphere}} = E_0 \\cdot (4\\pi r^2) \\implies E_0(r) = \\frac{P_{\\odot}}{4\\pi r^2}",
        explanationFa:
          "تمام توان خروجی خورشید باید از سطح کره‌ای به شعاع $r$ عبور کند. چون مساحت کره با $r^2$ رشد می‌کند، شار عمود بر واحد سطح دقیقاً با $1/r^2$ کم می‌شود.",
      },
      {
        id: "lc2",
        titleFa: "مقایسه‌ی سطح مقطع باریکه‌ی نور با سطح مایل زمین",
        opId: "substitution",
        latex: "\\cos\\theta_z = \\frac{dA_{\\perp}}{dA_{\\text{ground}}} \\implies dA_{\\text{ground}} = \\frac{dA_{\\perp}}{\\cos\\theta_z}",
        explanationFa:
          "وقتی خورشید با زاویه‌ی سرسویی $\\theta_z$ نسبت به قائم می‌تابد، همان باریکه‌ی نوری که مقطع عمودش $dA_{\\perp}$ بود روی سطح گسترده‌تری از زمین به مساحت $dA_{\\text{ground}}$ پخش می‌شود.",
      },
      {
        id: "lc3",
        titleFa: "پایستگی شار باریکه و تقسیم بر مساحت پخش‌شده",
        opId: "factor-cancel",
        latex: "d\\Phi = E_0\\,dA_{\\perp} \\implies E = \\frac{d\\Phi}{dA_{\\text{ground}}} = \\frac{E_0\\,\\cancel{dA_{\\perp}}}{\\cancel{dA_{\\perp}}/\\cos\\theta_z} = E_0\\cos\\theta_z \\;\\blacksquare",
        explanationFa:
          "جزء مساحت $dA_{\\perp}$ از صورت و مخرج خط می‌خورد و قانون کسینوس لامبرت به دست می‌آید: در ظهر ($\\theta_z=0^\\circ$) مقدار $\\cos 0^\\circ = 1$ بیشینه و در غروب ($\\theta_z \\to 90^\\circ$) به صفر میل می‌کند.",
      },
    ],
    physicalTakeawayFa:
      "این دو قانون دقیقاً دلیل تغییر فصل‌ها و دلیل نیاز به تصحیح رادیومتری توپوگرافی در مناطق کوهستانی هستند: دامنه‌ی رو به خورشید $\\cos\\theta_i$ بزرگ‌تر و دامنه‌ی پشت به خورشید $\\cos\\theta_i$ کوچک‌تری دارد.",
  },
  {
    id: "gsd-quantization-proof",
    order: 9,
    category: "sensor-orbit",
    categoryLabelFa: "سنجنده، مدار و شاخص‌ها",
    titleFa: "اثبات اندازه‌ی پیکسل زمینی (GSD) و کوانتیزاسیون $L = 2^n$",
    subtitleFa: "ترکیب مثلثات دقیق، تقریب زاویه‌ی کوچک، تشابه مثلث‌های عدسی و استقرای ریاضی",
    targetLatex: "\\text{GSD} = 2H\\tan\\!\\left(\\frac{\\text{IFOV}}{2}\\right) \\approx H\\cdot\\text{IFOV} = H\\cdot\\frac{p}{f}, \\qquad L = 2^n",
    startingPremisesFa: [
      "ماهواره در ارتفاع قائم $H$ با زاویه‌ی دید لحظه‌ای هر آشکارساز برابر $\\text{IFOV}$ (بر حسب رادیان) به سمت نادیر نگاه می‌کند.",
      "آشکارساز به عرض $p$ در فاصله‌ی کانونی $f$ پشت عدسی سنجنده قرار دارد.",
      "عمق رادیومتری $n$-بیتی یعنی هر پیکسل با رشته‌ای از $n$ بیت باینری ($0$ یا $1$) ذخیره می‌شود.",
    ],
    methodIds: ["direct", "induction"],
    relatedFormulaId: "gsd",
    steps: [
      {
        id: "gs1",
        titleFa: "تشکیل مثلث قائم‌الزاویه در زیر ماهواره",
        opId: "substitution",
        latex: "\\tan\\!\\left(\\frac{\\text{IFOV}}{2}\\right) = \\frac{\\text{GSD}/2}{H} \\implies \\text{GSD} = 2H\\tan\\!\\left(\\frac{\\text{IFOV}}{2}\\right)",
        explanationFa:
          "عمودِ ارتفاع $H$ مثلث متساوی‌الساقینِ دید پیکسل را به دو مثلث قائم‌الزاویه تقسیم می‌کند؛ زاویه‌ی رأس نصف شده ($\\text{IFOV}/2$) و ضلع مقابل برابر نصف پیکسل زمینی ($\\text{GSD}/2$) است.",
      },
      {
        id: "gs2",
        titleFa: "اعمال تقریب زاویه‌ی کوچک (بسط تیلور در رادیان)",
        opId: "limit-taylor",
        latex: "\\text{IFOV} \\ll 1\\;\\text{rad} \\implies \\tan\\!\\left(\\frac{\\text{IFOV}}{2}\\right) \\approx \\frac{\\text{IFOV}}{2} \\implies \\text{GSD} \\approx 2H\\cdot\\frac{\\text{IFOV}}{2} = H\\cdot\\text{IFOV}",
        explanationFa:
          "زاویه‌ی دید یک پیکسل ماهواره‌ای معمولاً چند میکروردیان است ($\\sim 10^{-5}\\,\\text{rad}$)، بنابراین خطای تقریب $\\tan\\alpha \\approx \\alpha$ کمتر از یک در میلیارد است!",
      },
      {
        id: "gs3",
        titleFa: "تشابه مثلث‌های عدسی برای ارتباط با فاصله‌ی کانونی $f$ و اندازه‌ی آشکارساز $p$",
        opId: "balance",
        latex: "\\frac{\\text{GSD}}{H} = \\frac{p}{f} \\implies \\text{IFOV} \\approx \\frac{p}{f}, \\qquad \\text{GSD} = H\\cdot\\frac{p}{f}",
        explanationFa:
          "پرتوهایی که از مرکز نوری عدسی می‌گذرند دو مثلث متشابه (یکی داخل دوربین به ارتفاع $f$ و قاعده‌ی $p$، و دیگری تا زمین به ارتفاع $H$ و قاعده‌ی $\\text{GSD}$) می‌سازند.",
      },
      {
        id: "gs4",
        titleFa: "اثبات تعداد سطوح کوانتیزاسیون $L = 2^n$ به استقرای ریاضی",
        opId: "substitution",
        latex: "L(1) = 2^1 = 2; \\qquad L(k+1) = 2\\cdot L(k) = 2\\cdot 2^k = 2^{k+1} \\implies \\forall n\\in\\mathbb{N}:\\; L(n) = 2^n \\;\\blacksquare",
        explanationFa:
          "اضافه کردن هر بیت جدید، بازه‌ی روشنایی را به دو نیمه‌ی دقیق‌تر تقسیم می‌کند و تعداد کدهای متمایز را دقیقاً دو برابر می‌سازد (مثلاً از ۸ بیت = ۲۵۶ سطح به ۱۲ بیت = ۴۰۹۶ سطح).",
      },
    ],
    physicalTakeawayFa:
      "برای بهتر کردن تفکیک مکانی (کوچک‌تر کردن GSD) سه اهرم مهندسی داریم: کاهش ارتفاع مدار $H$، بزرگ‌تر کردن فاصله‌ی کانونی تلسکوپ $f$، یا کوچک‌تر کردن پیکسل آشکارساز $p$ (که البته نور کمتری می‌گیرد!).",
  },
  {
    id: "orbital-velocity-kepler-proof",
    order: 10,
    category: "sensor-orbit",
    categoryLabelFa: "سنجنده، مدار و شاخص‌ها",
    titleFa: "اثبات سرعت مداری ماهواره و قانون سوم کپلر ($T^2 \\propto r^3$)",
    subtitleFa: "چگونه از تساوی نیروی گرانش نیوتن و نیروی مرکزگرا، هم سرعت مدارهای LEO و هم ارتفاع مدار زمین‌آهنگ ثابت می‌شود؟",
    targetLatex: "v = \\sqrt{\\frac{GM}{r}}, \\qquad T = 2\\pi\\sqrt{\\frac{r^3}{GM}}",
    startingPremisesFa: [
      "قانون جهانی گرانش نیوتن بین زمین (جرم $M$) و ماهواره (جرم $m$) در فاصله‌ی $r = R_E + H$ از مرکز زمین: $F_g = \\frac{GMm}{r^2}$.",
      "قانون دوم نیوتن برای حرکت دایره‌ای یکنواخت با شتاب مرکزگرا: $F_c = m a_c = m\\frac{v^2}{r}$.",
      "در یک دور کامل دایره‌ای به محیط $2\\pi r$ در زمان تناوب $T$، سرعت برابر است با: $v = \\frac{2\\pi r}{T}$.",
    ],
    methodIds: ["direct"],
    relatedFormulaId: "kepler",
    steps: [
      {
        id: "ok1",
        titleFa: "برابر قرار دادن نیروی گرانش با نیروی لازم برای گردش دایره‌ای",
        opId: "balance",
        latex: "F_g = F_c \\implies \\frac{GMm}{r^2} = \\frac{mv^2}{r}",
        explanationFa:
          "تنها نیروی وارد بر ماهواره در مدار آزاد، جاذبه‌ی زمین است و همین نیرو شتاب مرکزگرای لازم برای خم کردن مسیر را تأمین می‌کند.",
      },
      {
        id: "ok2",
        titleFa: "خط زدن جرم ماهواره $m$ و یک توان $r$ و جذر گرفتن",
        opId: "factor-cancel",
        latex: "\\frac{GM\\cancel{m}}{r^{\\cancel{2}}} = \\frac{\\cancel{m}v^2}{\\cancel{r}} \\implies v^2 = \\frac{GM}{r} \\implies v = \\sqrt{\\frac{GM}{r}}",
        explanationFa:
          "چون $m > 0$ و $r > 0$ هستند، خط زدن آن‌ها کاملاً مجاز است! نکته‌ی جالب: سرعت مداری هیچ ربطی به وزن ماهواره ندارد (چه ۱۰۰ کیلوگرم و چه ۱۰ تن!).",
      },
      {
        id: "ok3",
        titleFa: "جایگذاری رابطه‌ی سرعت و دوره‌ی تناوب $v = 2\\pi r / T$",
        opId: "substitution",
        latex: "\\left(\\frac{2\\pi r}{T}\\right)^2 = \\frac{GM}{r} \\implies \\frac{4\\pi^2 r^2}{T^2} = \\frac{GM}{r}",
        explanationFa:
          "به جای گرفتن رادیکال و دوباره به توان رساندن، مستقیماً از $v^2 = GM/r$ استفاده می‌کنیم تا جبر تمیزتر بماند.",
      },
      {
        id: "ok4",
        titleFa: "طرفین‌وسطین و رسیدن به قانون سوم کپلر",
        opId: "balance",
        latex: "T^2 = \\frac{4\\pi^2}{GM}\\,r^3 \\implies T = 2\\pi\\sqrt{\\frac{r^3}{GM}} \\;\\blacksquare",
        explanationFa:
          "مربع زمان تناوب دقیقاً متناسب با مکعب شعاع مدار است! با قرار دادن $T = 86164\\,\\text{s}$ (روز نجومی زمین)، ارتفاع مدار زمین‌آهنگ دقیقاً $H \\approx 35\\,786\\,\\text{km}$ به دست می‌آید.",
      },
    ],
    physicalTakeawayFa:
      "ماهواره‌های پایش زمین (مثل Sentinel-2 در ارتفاع ۷۸۶ کیلومتری) سرعت حدود $7.5\\,\\text{km/s}$ و دوره‌ی گردش ~۱۰۰ دقیقه دارند، در حالی که ماهواره‌های هواشناسی زمین‌آهنگ در ۳۵٬۷۸۶ کیلومتری با زمین هم‌سرعت می‌چرخند.",
  },
  {
    id: "ndvi-bounds-invariance-proof",
    order: 11,
    category: "sensor-orbit",
    categoryLabelFa: "سنجنده، مدار و شاخص‌ها",
    titleFa: "اثبات کران‌داری شاخص NDVI در $[-1,+1]$ و حذف اثر سایه",
    subtitleFa: "چگونه یک اثبات جبری ساده توضیح می‌دهد چرا نرمال‌سازی تفاضل بر مجموع در سنجش از دور این‌قدر قدرتمند است؟",
    targetLatex: "\\forall \\rho_{\\text{NIR}},\\rho_{\\text{Red}} \\ge 0\\;(\\text{نه هر دو صفر}):\\; -1 \\le \\text{NDVI} \\le +1 \\;\\land\\; \\text{NDVI}(k\\rho) = \\text{NDVI}(\\rho)",
    startingPremisesFa: [
      "تعریف شاخص پوشش گیاهی نرمال‌شده: $\\text{NDVI} = \\frac{\\rho_{\\text{NIR}} - \\rho_{\\text{Red}}}{\\rho_{\\text{NIR}} + \\rho_{\\text{Red}}}$.",
      "بازتاب طیفی کمیتی غیرمنفی است: $N \\equiv \\rho_{\\text{NIR}} \\ge 0$ و $R \\equiv \\rho_{\\text{Red}} \\ge 0$ با شرط $N + R > 0$.",
      "تغییر زاویه‌ی خورشید یا سایه‌ی یکنواخت، بازتاب هر دو باند را تقریباً در یک ضریب مثبت $k > 0$ ضرب می‌کند ($N' = kN$ و $R' = kR$).",
    ],
    methodIds: ["direct"],
    relatedFormulaId: "ndvi",
    steps: [
      {
        id: "nd1",
        titleFa: "اثبات کران بالا ($\\text{NDVI} \\le +1$) با نامساوی پایه",
        opId: "balance",
        latex: "R \\ge 0 \\implies -R \\le +R \\;\\xrightarrow{+N}\\; N - R \\le N + R",
        explanationFa:
          "از بدیهی‌ترین فرض ($R \\ge 0$) شروع می‌کنیم و به دو طرف نامساوی مقدار $N$ را اضافه می‌کنیم (عمل جمع جهت نامساوی را تغییر نمی‌دهد).",
      },
      {
        id: "nd2",
        titleFa: "اثبات کران پایین ($-1 \\le \\text{NDVI}$) به طور قرینه",
        opId: "balance",
        latex: "N \\ge 0 \\implies -N \\le +N \\;\\xrightarrow{-R}\\; -(N + R) \\le N - R",
        explanationFa:
          "این بار از نامنفی بودن $N$ شروع می‌کنیم و از دو طرف $R$ کم می‌کنیم تا کران پایین ساخته شود.",
      },
      {
        id: "nd3",
        titleFa: "ترکیب دو نامساوی و تقسیم بر مخرج اکیداً مثبت ($N+R > 0$)",
        opId: "balance",
        latex: "-(N + R) \\le N - R \\le +(N + R) \\;\\xrightarrow{\\div (N+R) > 0}\\; -1 \\le \\frac{N - R}{N + R} \\le +1",
        explanationFa:
          "چون $N + R > 0$ (اکیداً مثبت) است، تقسیم کل نامساوی بر $(N + R)$ کاملاً مجاز است و جهت نامساوی‌ها را حفظ می‌کند! پس NDVI هرگز از $[-1,+1]$ بیرون نمی‌زند.",
      },
      {
        id: "nd4",
        titleFa: "اثبات ناوردایی نسبت به ضریب نورپردازی $k > 0$",
        opId: "factor-cancel",
        latex: "\\text{NDVI}' = \\frac{kN - kR}{kN + kR} = \\frac{\\cancel{k}(N - R)}{\\cancel{k}(N + R)} = \\frac{N - R}{N + R} = \\text{NDVI} \\;\\blacksquare",
        explanationFa:
          "با فاکتورگیری از $k$ در صورت و مخرج و خط زدن آن (مجاز چون $k > 0$)، می‌بینیم که تغییرات یکنواخت روشنایی خورشید یا شیب توپوگرافی از شاخص حذف می‌شود!",
        watchOutFa: "چرا نمی‌توانیم $N$ را خط بزنیم اما $k$ را می‌توانیم؟ چون $k$ در «کل» صورت و «کل» مخرج ضرب شده است (عامل ضربی مشترک)، ولی $N$ بخشی از جمع و تفریق است.",
      },
    ],
    physicalTakeawayFa:
      "دقیقاً به همین دو دلیل (مقیاس ثابت $[-1, +1]$ و حذف تا حد زیادی از اثر سایه)، شاخص‌های نرمال‌شده مثل NDVI، NDWI و NDSI استاندارد جهانی پایش ماهواره‌ای شده‌اند.",
  },
];
