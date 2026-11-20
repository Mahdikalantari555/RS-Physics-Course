import type {
  LegalOperation,
  LogicConnector,
  ProofAnatomyPillar,
  ProofChallenge,
  ProofMethod,
} from "@/lib/proof-logic";

export const PROOF_ANATOMY_PILLARS: ProofAnatomyPillar[] = [
  {
    id: "definitions",
    indexFa: "۰۱",
    titleFa: "تعاریف (قراردادهای دقیق زبان)",
    englishLabel: "Definitions",
    summaryFa:
      "قبل از هر اثباتی باید بدانیم کلمات دقیقاً چه معنایی دارند. تعریف را ثابت نمی‌کنیم؛ تعریف قراردادی است که به ما اجازه می‌دهد یک مفهوم را به زبان جبر باز کنیم.",
    exampleFa:
      "تعریف عدد زوج: «$n$ زوج است یعنی عدد صحیح $k$ وجود دارد که $n = 2k$». تعریف عمق نوری: «$\\tau = \\int k\\,dz$».",
  },
  {
    id: "axioms",
    indexFa: "۰۲",
    titleFa: "اصول موضوعه و قوانین پایه",
    englishLabel: "Axioms & Laws",
    summaryFa:
      "سنگ‌بنای بازی که بدون اثبات می‌پذیریم (در ریاضی: اصول جبر و منطق؛ در فیزیک: معادلات ماکسول، قوانین نیوتن، قانون دوم ترمودینامیک، قانون پلانک).",
    exampleFa:
      "اگر $a = b$ باشد، با جمع کردن عدد $c$ به دو طرف تساوی، رابطه‌ی $a + c = b + c$ همچنان برقرار است.",
  },
  {
    id: "assumptions",
    indexFa: "۰۳",
    titleFa: "فرض‌ها و شرایط مسئله ($P$)",
    englishLabel: "Hypotheses / Premises",
    summaryFa:
      "شرایطی که در ابتدای قضیه یا مدل فیزیکی به ما داده می‌شود. هر تقریب یا شرط مرزی بخشی از فرض است و خارج از آن، حکم تضمینی ندارد!",
    exampleFa:
      "در قانون ریلی–جینز فرض این است که $hc \\ll \\lambda k_B T$. در قانون بیر–لامبرت فرض این است که جو در طول مسیر، گسیل حرارتی اضافه نمی‌کند.",
  },
  {
    id: "conclusion",
    indexFa: "۰۴",
    titleFa: "زنجیره‌ی استنتاج تا حکم ($Q$)",
    englishLabel: "Chain of Legal Moves → Q",
    summaryFa:
      "اثبات واقعی یعنی ساختن پلی بی‌شکاف از فرض $P$ به حکم $Q$؛ به طوری که هر پله فقط از «تعریف»، «اصل موضوعه» یا «عمل مجاز» روی پله‌ی قبلی نتیجه شده باشد.",
    exampleFa:
      "هزار مثال عددی (مثل چک کردن فرمول برای ۳ عدد) «اثبات» نیست؛ اما ساختن یک زنجیره‌ی جبری برای متغیر دلخواه، حکم را برای بی‌نهایت حالت تضمین می‌کند.",
  },
];

export const LOGIC_CONNECTORS: LogicConnector[] = [
  {
    id: "implies",
    symbolLatex: "P \\implies Q",
    nameFa: "استلزام (اگر P آنگاه Q)",
    meaningFa:
      "هر وقت شرط $P$ برقرار باشد، نتیجه‌ی $Q$ به ناچار برقرار است. مراقب باشید: جهت پیکان یک‌طرفه است! از درست بودن $Q$ نمی‌توان نتیجه گرفت $P$ هم درست بوده است.",
    negationOrTipFa: "هم‌ارز منطقی آن عکس نقیض است: $(\\neg Q \\implies \\neg P)$؛ اما عکس آن $(Q \\implies P)$ لزوماً درست نیست.",
    exampleLatex: "T_1 > T_2 \\implies M_1 > M_2",
    exampleFa: "برای دو جسم سیاه: دمای بیشتر استلزام شار بیشتر دارد.",
  },
  {
    id: "iff",
    symbolLatex: "P \\iff Q",
    nameFa: "دوشرطی (اگر و تنها اگر)",
    meaningFa:
      "پیکان دوطرفه یعنی $P$ و $Q$ دقیقاً هم‌ارزند؛ هم $P \\implies Q$ درست است و هم $Q \\implies P$. در حل معادله‌ها هر عمل برگشت‌پذیر مثل جمع یا ضرب در عدد غیرصفر این نماد را می‌سازد.",
    negationOrTipFa: "برای اثبات یک حکم «اگر و تنها اگر»، باید هر دو جهت (رفت و برگشت) را جداگانه ثابت کنیم.",
    exampleLatex: "c = \\lambda\\nu \\iff \\lambda = \\frac{c}{\\nu} \\quad (\\nu > 0)",
    exampleFa: "تبدیل معادله بدون از دست دادن هیچ جوابی.",
  },
  {
    id: "forall",
    symbolLatex: "\\forall x \\in S",
    nameFa: "سور عمومی (برای هر x)",
    meaningFa:
      "ادعا می‌کند خاصیت موردنظر برای تک‌تک اعضای مجموعه‌ی $S$ بدون حتی یک استثنا برقرار است.",
    negationOrTipFa:
      "برای اثباتش نمی‌شود عدد گذاشت؛ باید با متغیر دلخواه $x$ ثابت کرد. اما برای رد کردنش فقط یک مثال نقض ($\\exists x$) کافی است!",
    exampleLatex: "\\forall \\rho_{\\text{NIR}}, \\rho_{\\text{Red}} > 0:\\; -1 \\le \\text{NDVI} \\le 1",
    exampleFa: "برای هر دو بازتاب مثبت، شاخص NDVI حتماً در بازه‌ی $[-1,+1]$ می‌ماند.",
  },
  {
    id: "exists",
    symbolLatex: "\\exists x",
    nameFa: "سور وجودی (وجود دارد دست‌کم یک x)",
    meaningFa:
      "ادعا می‌کند حداقل یک عضو پیدا می‌شود که شرط را برقرار کند. برای اثباتش کافی است فقط یک نمونه بسازیم یا نشان دهیم حتماً وجود دارد.",
    negationOrTipFa: "نقیض «وجود دارد $x$ که $P(x)$» برابر است با «برای هر $x$، نقیض $P(x)$ برقرار است».",
    exampleLatex: "\\exists \\lambda_{\\max} > 0:\\; \\frac{\\partial B}{\\partial \\lambda}(\\lambda_{\\max}) = 0",
    exampleFa: "در منحنی پلانک یک طول‌موج قله وجود دارد که مشتق در آن صفر می‌شود.",
  },
  {
    id: "negation",
    symbolLatex: "\\neg P",
    nameFa: "نقیض گزاره (نه P)",
    meaningFa:
      "دقیقاً خلاف گزاره‌ی $P$. در برهان خلف، ابتدا $\\neg Q$ را فرض می‌کنیم و نشان می‌دهیم به تناقض می‌رسیم.",
    negationOrTipFa: "نقیض «$a = b$» می‌شود «$a \\neq b$»؛ نقیض «$a \\le b$» می‌شود «$a > b$».",
    exampleLatex: "\\neg(\\varepsilon = \\alpha) \\iff (\\varepsilon > \\alpha \\text{ یا } \\varepsilon < \\alpha)",
    exampleFa: "نقطه‌ی شروع برهان خلف در اثبات قانون کیرشهف.",
  },
  {
    id: "qed",
    symbolLatex: "\\therefore \\quad \\text{و} \\quad \\blacksquare",
    nameFa: "بنابراین و پایان اثبات (Q.E.D)",
    meaningFa:
      "نماد $\\therefore$ یعنی «از سطرهای قبلی نتیجه می‌شود» و مربع پر $\\blacksquare$ اعلام می‌کند حکم دقیقاً ثابت شده و اثبات تمام است.",
    negationOrTipFa: "وقتی در کتابی عبارت «از اینجا نتیجه می‌شود» دیدید، از خودتان بپرسید کدام یک از ۷ عمل مجاز اینجا به کار رفته است.",
    exampleLatex: "\\therefore \\lambda_{\\max} T = \\frac{hc}{4.9651\\,k_B} \\approx 2897.8\\;\\mu\\text{m}\\cdot\\text{K} \\;\\blacksquare",
    exampleFa: "جمع‌بندی نهایی قانون جابه‌جایی وین.",
  },
];

export const LEGAL_OPERATIONS: LegalOperation[] = [
  {
    id: "substitution",
    order: 1,
    titleFa: "جایگذاری از تعریف یا رابطه‌ی قبلی",
    shortLabelFa: "جایگذاری",
    ruleLatex: "A = B \\;\\land\\; F(A) \\implies F(B)",
    whyValidFa:
      "اگر دو عبارت دقیقاً برابرند، هر جا یکی ظاهر شد می‌توانیم دیگری را به جایش بنویسیم بی‌آنکه تساوی تغییر کند. این کار متغیرهای واسطه را حذف و دو قانون فیزیکی را به هم وصل می‌کند.",
    forbiddenTrapFa:
      "مراقب شرط دامنه باشید: اگر رابطه‌ی $B$ فقط در حالت خاص (مثلاً مدار دایره‌ای یا خلأ) برقرار است، نتیجه‌ی جایگذاری هم فقط در همان شرط معتبر است.",
    rsExampleLatex: "E = h\\nu \\;\\xrightarrow{\\nu = c/\\lambda}\\; E = \\frac{hc}{\\lambda}",
    rsExampleFa: "متصل کردن انرژی فوتون به طول‌موج از طریق رابطه‌ی سرعت موج.",
  },
  {
    id: "balance",
    order: 2,
    titleFa: "عمل هم‌ارز روی دو طرف معادله (ترازو)",
    shortLabelFa: "توازن دو طرف",
    ruleLatex: "A = B \\implies f(A) = f(B) \\quad (\\text{مثل } +, \\times, \\ln, \\exp, (\\cdot)^2)",
    whyValidFa:
      "معادله مثل کفه ترازو است: هر عمل یکسانی که روی هر دو طرف انجام دهید تساوی را حفظ می‌کند. گرفتن $\\ln$ متغیر را از توان پایین می‌آورد و نمایی کردن $\\exp$ لگاریتم را خنثی می‌کند.",
    forbiddenTrapFa:
      "دو تله‌ی معروف: ۱) تقسیم بر عبارتی که می‌تواند صفر شود (منبع مشهور اثبات‌های جعلی $1=2$)؛ ۲) توان دوم کردن دو طرف ممکن است جواب منفیِ اضافی تولید کند.",
    rsExampleLatex: "\\frac{I}{I_0} = e^{-\\tau} \\;\\xrightarrow{\\ln}\\; \\ln\\!\\left(\\frac{I}{I_0}\\right) = -\\tau",
    rsExampleFa: "استخراج عمق نوری $\\tau$ از قانون بیر–لامبرت با گرفتن لگاریتم طبیعی.",
  },
  {
    id: "factor-cancel",
    order: 3,
    titleFa: "فاکتورگیری، نسبت‌گیری و خط زدن عامل مشترک",
    shortLabelFa: "فاکتور و خط‌زدن",
    ruleLatex: "\\frac{k\\cdot A}{k\\cdot B} = \\frac{A}{B} \\quad (k \\neq 0), \\qquad kA - kB = k(A - B)",
    whyValidFa:
      "وقتی یک ضریب غیرصفر در صورت و مخرج یک کسر (یا در دو طرف یک معادله) ضرب شده باشد، می‌توان آن را خط زد. این عمل ثابت‌های تکراری یا مقیاس نورپردازی را حذف می‌کند.",
    forbiddenTrapFa:
      "فقط «عامل ضربی» در کل صورت و کل مخرج خط می‌خورد! هرگز نمی‌توانید $\\rho_{\\text{NIR}}$ را از صورت و مخرج $\\frac{\\rho_{\\text{NIR}}-\\rho_{\\text{Red}}}{\\rho_{\\text{NIR}}+\\rho_{\\text{Red}}}$ خط بزنید چون جمع و تفریق هستند، نه ضرب.",
    rsExampleLatex: "\\frac{k\\rho_{\\text{NIR}} - k\\rho_{\\text{Red}}}{k\\rho_{\\text{NIR}} + k\\rho_{\\text{Red}}} = \\frac{k(\\rho_{\\text{NIR}} - \\rho_{\\text{Red}})}{k(\\rho_{\\text{NIR}} + \\rho_{\\text{Red}})} = \\text{NDVI}",
    rsExampleFa: "اثبات اینکه ضریب سایه و نورپردازی $k$ از شاخص NDVI حذف می‌شود.",
  },
  {
    id: "change-var",
    order: 4,
    titleFa: "تغییر متغیر و بی‌بعدسازی",
    shortLabelFa: "تغییر متغیر",
    ruleLatex: "x = g(\\lambda) \\implies d\\lambda = \\frac{dx}{g'(\\lambda)}",
    whyValidFa:
      "وقتی فرمولی پر از ثابت‌های $h, c, k_B, T$ است، یک ترکیب بی‌بعد مثل $x = \\frac{hc}{\\lambda k_B T}$ تعریف می‌کنیم. ناگهان تمام ثابت‌ها بیرون می‌روند و یک تابع خالص و ساده فقط بر حسب $x$ باقی می‌ماند!",
    forbiddenTrapFa:
      "در انتگرال‌ها وقتی متغیر را عوض می‌کنید، سه چیز را هم‌زمان باید عوض کنید: ۱) خود عبارت، ۲) دیفرانسیل ($d\\lambda \\to dx$)، و ۳) کران‌های انتگرال (مثلاً $\\lambda \\to 0$ می‌شود $x \\to \\infty$).",
    rsExampleLatex: "x = \\frac{hc}{\\lambda k_B T} \\implies \\int_0^\\infty B_\\lambda\\,d\\lambda = (\\text{ضرایب})\\,T^4 \\int_0^\\infty \\frac{x^3}{e^x - 1}\\,dx",
    rsExampleFa: "راز پدیدار شدن توان چهارم دما ($T^4$) در قانون استفان–بولتزمن بدون حتی محاسبه‌ی عدد انتگرال!",
  },
  {
    id: "calculus-opt",
    order: 5,
    titleFa: "مشتق‌گیری برای یافتن قله یا کمینه",
    shortLabelFa: "مشتق و اکسترمم",
    ruleLatex: "\\text{در قله یا دره‌ی تابع پیوسته: } \\frac{df}{dx} = 0",
    whyValidFa:
      "مشتق یعنی شیب خط مماس. در بالاترین نقطه‌ی یک منحنی (مثل قله‌ی تابش جسم سیاه)، منحنی دیگر بالا نمی‌رود و هنوز پایین نیامده، پس شیبش دقیقاً صفر است.",
    forbiddenTrapFa:
      "صفر شدن مشتق نشان‌دهنده‌ی نقطه‌ی بحرانی است؛ در فیزیک از رفتار مرزی (صفر شدن منحنی در $0$ و $\\infty$) مطمئن می‌شویم که این نقطه حتماً «قله» (بیشینه) است.",
    rsExampleLatex: "\\frac{\\partial B(\\lambda, T)}{\\partial \\lambda} = 0 \\implies 5(1 - e^{-x}) = x",
    rsExampleFa: "استخراج مستقیم قانون جابه‌جایی وین از منحنی تابش پلانک.",
  },
  {
    id: "ode-integral",
    order: 6,
    titleFa: "تفکیک متغیرها و انتگرال‌گیری روی جزء کوچک",
    shortLabelFa: "دیفرانسیل و انتگرال",
    ruleLatex: "\\frac{dI}{ds} = -kI \\implies \\int_{I_0}^{I} \\frac{dI'}{I'} = -\\int_0^s k\\,ds'",
    whyValidFa:
      "در طبیعت بسیاری از قوانین را فقط برای یک لایه‌ی نازک $ds$ می‌دانیم (قانون محلی). با جدا کردن متغیرها و جمع زدن (انتگرال گرفتن) روی بی‌نهایت لایه‌ی نازک، قانون کلان به دست می‌آید.",
    forbiddenTrapFa:
      "ثابت انتگرال‌گیری (یا کران پایین $I_0$) حیاتی است؛ بدون شرط اولیه در $s = 0$ نمی‌دانیم شدت نور از چه مقداری شروع شده است.",
    rsExampleLatex: "\\ln\\!\\left(\\frac{I}{I_0}\\right) = -\\int_0^s k\\,ds' = -\\tau \\implies I = I_0 e^{-\\tau}",
    rsExampleFa: "تولد تابع نمایی در قانون بیر–لامبرت از یک قانون ساده در لایه‌ی نازک جو.",
  },
  {
    id: "limit-taylor",
    order: 7,
    titleFa: "تقریب‌های حدی و بسط تیلور",
    shortLabelFa: "تقریب حدی / تیلور",
    ruleLatex: "x \\ll 1:\\; e^x \\approx 1 + x, \\qquad \\alpha \\ll 1\\text{ rad}:\\; \\tan\\alpha \\approx \\alpha",
    whyValidFa:
      "هر تابع هموار در نزدیکی صفر مانند خط مماسش رفتار می‌کند (بسط تیلور مرتبه‌ی اول). این عمل فرمول‌های پیچیده را در بازه‌های کاربردی به رابطه‌های خطی و قابل فهم تبدیل می‌کند.",
    forbiddenTrapFa:
      "در تقریب $\\tan\\alpha \\approx \\alpha$ و $\\sin\\alpha \\approx \\alpha$ زاویه حتماً باید بر حسب «رادیان» باشد نه درجه! همچنین اگر $x$ دیگر کوچک نباشد، تقریب خطای فاحش می‌دهد.",
    rsExampleLatex: "\\text{GSD} = 2H\\tan\\!\\left(\\frac{\\text{IFOV}}{2}\\right) \\approx 2H\\cdot\\frac{\\text{IFOV}}{2} = H\\cdot\\text{IFOV}",
    rsExampleFa: "تبدیل فرمول مثلثاتی دقیق GSD به رابطه‌ی خطی پرکاربرد سنجنده‌ها.",
  },
];

export const PROOF_METHODS: ProofMethod[] = [
  {
    id: "direct",
    order: 1,
    titleFa: "۱. اثبات مستقیم",
    englishName: "Direct Proof",
    blueprintLatex: "P \\implies P_1 \\implies P_2 \\implies \\dots \\implies Q",
    whenToUseFa:
      "وقتی رابطه‌ی مستقیمی بین تعاریف و فرمول‌های فرض ($P$) و حکم ($Q$) وجود دارد. پرکاربردترین روش در ریاضی و فیزیک.",
    howItWorksFa:
      "فرض $P$ را می‌نویسیم، تعاریفش را به زبان جبر باز می‌کنیم و با عمل‌های مجاز پله‌به‌پله به $Q$ می‌رسیم.",
    baseExampleTitleFa: "قضیه‌ی پایه: مجموع هر دو عدد زوج، یک عدد زوج است.",
    baseExampleSteps: [
      {
        labelFa: "گام ۱: نوشتن فرض با تعریف",
        latex: "a = 2k, \\quad b = 2m \\qquad (k, m \\in \\mathbb{Z})",
        reasonFa: "طبق تعریف عدد زوج، هر عدد زوج مضرب صحیحی از ۲ است (از دو حرف متفاوت $k$ و $m$ استفاده می‌کنیم تا فرض نکنیم $a=b$).",
      },
      {
        labelFa: "گام ۲: جمع کردن و فاکتورگیری",
        latex: "a + b = 2k + 2m = 2(k + m)",
        reasonFa: "عمل فاکتورگیری از عدد ۲.",
      },
      {
        labelFa: "گام ۳: تطبیق با تعریف حکم",
        latex: "k + m \\in \\mathbb{Z} \\implies a + b = 2t \\quad (t = k+m) \\;\\blacksquare",
        reasonFa: "چون مجموع دو عدد صحیح باز هم صحیح است، $a+b$ مضرب صحیحی از ۲ یعنی زوج است.",
      },
    ],
    rsConnectionFa: "در اثبات $E = hc/\\lambda$، سرعت مداری $v = \\sqrt{GM/r}$ و کران‌داری NDVI مستقیماً از همین روش استفاده می‌کنیم.",
  },
  {
    id: "contrapositive",
    order: 2,
    titleFa: "۲. اثبات از راه عکس نقیض",
    englishName: "Proof by Contrapositive",
    blueprintLatex: "(P \\implies Q) \\;\\equiv\\; (\\neg Q \\implies \\neg P)",
    whenToUseFa:
      "وقتی باز کردن فرض $P$ سخت است (مثلاً شامل توان یا شرط منفی است)، اما فرض کردنِ نقیض حکم ($\\neg Q$) بسیار ساده و جبری است.",
    howItWorksFa:
      "به جای اینکه از $P$ به $Q$ برویم، فرض می‌کنیم $Q$ برقرار نیست ($\\neg Q$) و به صورت مستقیم ثابت می‌کنیم $P$ هم نمی‌تواند برقرار باشد ($\\neg P$).",
    baseExampleTitleFa: "قضیه‌ی پایه: اگر $n^2$ زوج باشد، آنگاه خود عدد صحیح $n$ نیز زوج است.",
    baseExampleSteps: [
      {
        labelFa: "گام ۱: نوشتن عکس نقیض",
        latex: "\\text{فرض جایگزین } (\\neg Q):\\; n \\text{ فرد است} \\implies n = 2k + 1",
        reasonFa: "اگر مستقیم می‌رفتیم باید از $n^2 = 2m$ جذر می‌گرفتیم که سخت بود؛ اما فرد بودن $n$ تعریف ساده‌ای دارد.",
      },
      {
        labelFa: "گام ۲: به توان دو رساندن و ساده‌سازی",
        latex: "n^2 = (2k + 1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1",
        reasonFa: "اتحاد مربع دو جمله‌ای و فاکتورگیری از ۲.",
      },
      {
        labelFa: "گام ۳: رسیدن به نقیض فرض ($\\neg P$)",
        latex: "n^2 = 2t + 1 \\implies n^2 \\text{ فرد است (زوج نیست)} \\;\\blacksquare",
        reasonFa: "پس عکس نقیض درست است و در نتیجه حکم اصلی ($n^2$ زوج $\\implies n$ زوج) قطعی است.",
      },
    ],
    rsConnectionFa: "برای تشخیص منطقی خطاها در سنجش از دور: «اگر تابندگی طیفی پیوسته صفر باشد $\\implies$ جسم در دمای بالای صفر نیست» دقیقاً عکس نقیضِ «هر جسم با $T > 0\\,\\text{K}$ تابش دارد» است.",
  },
  {
    id: "contradiction",
    order: 3,
    titleFa: "۳. برهان خلف (اثبات از راه تناقض)",
    englishName: "Proof by Contradiction",
    blueprintLatex: "(P \\land \\neg Q) \\implies \\text{تناقض } (R \\land \\neg R) \\;\\therefore\\; Q",
    whenToUseFa:
      "وقتی می‌خواهیم ثابت کنیم چیزی «وجود ندارد»، «ناممکن است»، «یکتا است» یا «دو کمیت حتماً برابرند» (مثل قانون کیرشهف).",
    howItWorksFa:
      "برای لحظه‌ای فرض می‌کنیم حکم ما غلط است ($\\neg Q$). با عمل‌های کاملاً مجاز جلو می‌رویم تا به یک نتیجه‌ی غیرممکن (نقض یک قانون مسلم یا تناقض با فرض) برسیم؛ پس فرض $\\neg Q$ غلط بوده و $Q$ درست است!",
    baseExampleTitleFa: "قضیه‌ی کلاسیک: عدد $\\sqrt{2}$ گنگ است (قابل نوشتن به صورت کسر $\\frac{p}{q}$ نیست).",
    baseExampleSteps: [
      {
        labelFa: "گام ۱: فرض خلف (فرض خلاف حکم)",
        latex: "\\sqrt{2} = \\frac{p}{q}, \\quad \\gcd(p, q) = 1",
        reasonFa: "فرض می‌کنیم گویا باشد و کسر را تا آخر ساده کرده‌ایم تا $p$ و $q$ عامل مشترک نداشته باشند.",
      },
      {
        labelFa: "گام ۲: توان دو و استنتاج زوج بودن $p$",
        latex: "2 = \\frac{p^2}{q^2} \\implies p^2 = 2q^2 \\implies p \\text{ زوج است } (p = 2k)",
        reasonFa: "از قضیه‌ی عکس نقیض بالا: چون $p^2$ زوج است، خود $p$ هم زوج است.",
      },
      {
        labelFa: "گام ۳: جایگذاری و رسیدن به تناقض",
        latex: "(2k)^2 = 2q^2 \\implies 4k^2 = 2q^2 \\implies q^2 = 2k^2 \\implies q \\text{ نیز زوج است!}",
        reasonFa: "هر دو $p$ و $q$ زوج شدند، یعنی عامل مشترک ۲ دارند؛ این با فرض $\\gcd(p, q) = 1$ در تناقض است! پس فرض خلف باطل است $\\blacksquare$.",
      },
    ],
    rsConnectionFa: "در بخش دوم، قانون کیرشهف ($\\varepsilon = \\alpha$) را دقیقاً با برهان خلف و نقض قانون دوم ترمودینامیک ثابت می‌کنیم!",
  },
  {
    id: "induction",
    order: 4,
    titleFa: "۴. استقرای ریاضی (اثر دومینو)",
    englishName: "Mathematical Induction",
    blueprintLatex: "\\big[P(1) \\;\\land\\; (\\forall k:\\; P(k) \\implies P(k+1))\\big] \\implies \\forall n \\in \\mathbb{N}:\\; P(n)",
    whenToUseFa:
      "هر وقت حکم درباره همه‌ی اعداد طبیعی $n = 1, 2, 3, \\dots$ باشد (مثل تعداد سطوح کوانتیزاسیون $n$-بیتی $L = 2^n$ یا مجموع دنباله‌ها).",
    howItWorksFa:
      "دقیقاً مثل چیدن دومینو: ۱) ثابت می‌کنیم اولین مهره ($n=1$) می‌افتد (پایه‌ی استقرا)؛ ۲) ثابت می‌کنیم اگر هر مهره‌ی دلخواه $k$ بیفتد، حتماً مهره‌ی بعدی $k+1$ را هم می‌اندازد (گام استقرا). آنگاه تمام بی‌نهایت مهره می‌افتند!",
    baseExampleTitleFa: "قضیه‌ی پایه: یک سنجنده‌ی $n$-بیتی دقیقاً $L(n) = 2^n$ سطح روشنایی متمایز دارد.",
    baseExampleSteps: [
      {
        labelFa: "گام ۱: پایه‌ی استقرا ($n = 1$)",
        latex: "n = 1 \\implies \\{0, 1\\} \\implies L(1) = 2 = 2^1",
        reasonFa: "یک بیت فقط دو حالت ۰ یا ۱ دارد؛ پس پایه برقرار است.",
      },
      {
        labelFa: "گام ۲: فرض استقرا برای $k$ بیت",
        latex: "\\text{فرض می‌کنیم برای } k \\text{ بیت: } L(k) = 2^k",
        reasonFa: "این فرضِ افتادن مهره‌ی $k$-اُم است.",
      },
      {
        labelFa: "گام ۳: گام استقرا برای $k + 1$ بیت",
        latex: "L(k+1) = L(k) + L(k) = 2\\cdot L(k) = 2\\cdot 2^k = 2^{k+1} \\;\\blacksquare",
        reasonFa: "بیت جدید می‌تواند ۰ یا ۱ باشد؛ در برابر هر کدام، کل $2^k$ حالت قبلی تکرار می‌شود. پس برای هر $n \\ge 1$ ثابت شد.",
      },
    ],
    rsConnectionFa: "مستقیماً در بخش تفکیک رادیومتری سنجنده‌ها (۸ بیت = ۲۵۶ سطح، ۱۲ بیت = ۴۰۹۶ سطح، ۱۶ بیت = ۶۵٬۵۳۶ سطح) به کار می‌رود.",
  },
  {
    id: "cases-counter",
    order: 5,
    titleFa: "۵. تحلیل حالات و مثال نقض",
    englishName: "Proof by Cases & Counterexample",
    blueprintLatex: "(P_1 \\lor P_2) \\land (P_1 \\implies Q) \\land (P_2 \\implies Q) \\implies Q",
    whenToUseFa:
      "وقتی سیستم در رژیم‌های متفاوت رفتار متفاوتی دارد (مثل طول‌موج کوتاه در برابر طول‌موج بلند در قانون پلانک، یا علامت مثبت/منفی یک متغیر).",
    howItWorksFa:
      "تمام فضای ممکن را به حالت‌های جامع تقسیم می‌کنیم و هر حالت را جداگانه ثابت می‌کنیم. از سوی دیگر، اگر بخواهیم یک ادعای کلی غلط را رد کنیم، فقط یک «مثال نقض» کافی است.",
    baseExampleTitleFa: "مثال نقض + تحلیل حالات: آیا «اگر $a^2 = b^2$ آنگاه $a = b$» همیشه درست است؟",
    baseExampleSteps: [
      {
        labelFa: "گام ۱: رد ادعای کلی با یک مثال نقض",
        latex: "a = 3,\\; b = -3 \\implies a^2 = 9 = b^2 \\quad \\text{اما } a \\neq b",
        reasonFa: "یک مثال نقض کافی است تا حکم کلی بدون شرط باطل شود.",
      },
      {
        labelFa: "گام ۲: تحلیل حالات دقیق روی $a^2 - b^2 = 0$",
        latex: "(a - b)(a + b) = 0 \\implies \\text{حالت ۱: } a = b \\quad \\text{یا} \\quad \\text{حالت ۲: } a = -b",
        reasonFa: "در فیزیک معمولاً شرط $a, b > 0$ (مثل دما، طول‌موج یا شعاع مدار) حالت دوم را حذف می‌کند و تنها جواب فیزیکی $a = b$ می‌ماند $\\blacksquare$.",
      },
    ],
    rsConnectionFa: "دقیقاً به همین روش در قانون پلانک، دو رژیم حدی $x \\ll 1$ (ریلی–جینز در مایکروویو) و $x \\gg 1$ (تقریب وین در اپتیک) را جداگانه استخراج می‌کنیم.",
  },
  {
    id: "differential",
    order: 6,
    titleFa: "۶. اثبات دیفرانسیلی–انتگرالی و پایستگی",
    englishName: "Differential & Conservation Proof",
    blueprintLatex: "\\text{قانون در جزء کوچک } (dx, ds, dA) \\;\\xrightarrow{\\int}\\; \\text{قانون کلان}",
    whenToUseFa:
      "ستون فقرات اثبات‌های فیزیک! هرگاه کمیتی در فضا یا زمان به طور پیوسته تغییر کند (تضعیف نور در جو، جمع شار روی نیم‌کره، انتشار موج).",
    howItWorksFa:
      "۱) یک جزء بسیار کوچک (لایه‌ی نازک $ds$ یا سطح کوچک $dA$) انتخاب می‌کنیم که در آن همه چیز تقریباً خطی و ثابت است؛ ۲) قانون پایستگی یا تعادل را برای آن جزء می‌نویسیم؛ ۳) با انتگرال‌گیری روی کل بازه، فرمول نهایی را می‌سازیم.",
    baseExampleTitleFa: "الگوی پایه: کمیتی که نرخ کاهشش متناسب با خودش است، حتماً نمایی افت می‌کند.",
    baseExampleSteps: [
      {
        labelFa: "گام ۱: مدل محلی در بازه‌ی کوچک $ds$",
        latex: "dy = -k\\,y\\,ds",
        reasonFa: "هر چه مقدار $y$ بیشتر باشد، در گام $ds$ افت بیشتری داریم.",
      },
      {
        labelFa: "گام ۲: تفکیک متغیرها",
        latex: "\\frac{dy}{y} = -k\\,ds",
        reasonFa: "جمع کردن همه‌ی $y$ها در یک طرف و همه‌ی $s$ها در طرف دیگر.",
      },
      {
        labelFa: "گام ۳: انتگرال از ابتدا تا نقطه $s$ و نمایی کردن",
        latex: "\\int_{y_0}^{y} \\frac{dy'}{y'} = -\\int_0^s k\\,ds' \\implies \\ln\\!\\left(\\frac{y}{y_0}\\right) = -ks \\implies y(s) = y_0 e^{-ks} \\;\\blacksquare",
        reasonFa: "تابع نمایی از هیچ اختراع نشده؛ نتیجه‌ی اجباریِ تناسب نرخ تغییر با مقدار فعلی است!",
      },
    ],
    rsConnectionFa: "پایه‌ی اثبات بیر–لامبرت، استفان–بولتزمن ($M = \\pi L$ و $T^4$)، قانون کسینوس لامبرت و معادله‌ی موج ماکسول.",
  },
];

export const PROOF_CHALLENGES: ProofChallenge[] = [
  {
    id: "fallacy-div-zero",
    kindFa: "کارآگاه مغلطه",
    promptFa:
      "در اثبات جعلی معروف «$1 = 2$»، از فرض $a = b$ شروع می‌کنیم: خط ۱) $a^2 = ab$؛ خط ۲) $a^2 - b^2 = ab - b^2$؛ خط ۳) $(a-b)(a+b) = b(a-b)$؛ خط ۴) $a + b = b$؛ خط ۵) $2b = b \\implies 2 = 1$. دقیقاً کدام خط قانون «عمل‌های مجاز» را شکسته است؟",
    statementLatex: "(a - b)(a + b) = b(a - b) \\;\\xrightarrow{\\text{؟}}\\; a + b = b",
    options: [
      { id: "line2", labelFa: "خط ۲: کم کردن $b^2$ از دو طرف مجاز نیست" },
      { id: "line3", labelFa: "خط ۳: اتحاد مزدوج $a^2 - b^2$ اشتباه نوشته شده است" },
      { id: "line4", labelFa: "خط ۴: تقسیم بر $(a - b)$ انجام شده، در حالی که چون $a = b$ است، $(a - b) = 0$ است!" },
      { id: "line5", labelFa: "خط ۵: جایگذاری $a = b$ در $a + b$ غیرمجاز است" },
    ],
    correctOptionId: "line4",
    explanationFa:
      "دقیقاً! در خط ۴ دو طرف را بر $(a - b)$ تقسیم کرده‌ایم تا خط بخورد؛ اما طبق فرض اولیه $a = b$ یعنی $a - b = 0$. تقسیم بر صفر عمل غیرمجاز است و کل اثبات از همین خط بی‌اعتبار می‌شود.",
    relatedOpOrMethodFa: "عمل ۲ (توازن دو طرف) و عمل ۳ (خط‌زدن عامل غیرصفر)",
  },
  {
    id: "converse-trap",
    kindFa: "منطق استلزام",
    promptFa:
      "می‌دانیم در سنجش از دور: «اگر گیاه سالم و پرتراکم باشد ($P$)، آنگاه بازتاب NIR آن زیاد است ($Q$)». کدام نتیجه‌گیری از نظر منطقی «حتماً درست» است (هم‌ارزِ $P \\implies Q$)؟",
    statementLatex: "P \\implies Q \\quad \\text{با کدام گزاره هم‌ارز است؟}",
    options: [
      { id: "converse", labelFa: "اگر بازتاب NIR زیاد باشد، پس حتماً گیاه سالم است ($Q \\implies P$)" },
      { id: "contrapositive", labelFa: "اگر بازتاب NIR زیاد نباشد، پس قطعاً گیاه سالم و پرتراکم نیست ($\\neg Q \\implies \\neg P$)" },
      { id: "inverse", labelFa: "اگر گیاه سالم نباشد، پس بازتاب NIR آن حتماً کم است ($\\neg P \\implies \\neg Q$)" },
      { id: "none", labelFa: "هیچ نتیجه‌ای نمی‌توان گرفت" },
    ],
    correctOptionId: "contrapositive",
    explanationFa:
      "فقط عکس نقیض ($\\neg Q \\implies \\neg P$) همیشه با $P \\implies Q$ هم‌ارز است! گزینه‌ی اول (عکس قضیه) غلط است چون ابر یا برف تازه هم می‌تواند بازتاب NIR بالایی داشته باشد بی‌آنکه گیاه باشد.",
    relatedOpOrMethodFa: "روش ۲ (عکس نقیض) و نماد استلزام ($\\implies$)",
  },
  {
    id: "kirchhoff-method",
    kindFa: "انتخاب روش اثبات",
    promptFa:
      "در اثبات قانون کیرشهف می‌خواهیم نشان دهیم در تعادل گرمایی برای هر طول‌موج $\\varepsilon(\\lambda) = \\alpha(\\lambda)$ است. اگر فرض کنیم $\\varepsilon > \\alpha$ باشد، جسم در حفره‌ی هم‌دما بدون منبع خارجی سردتر می‌شود و گرما خودبه‌خود از سرد به گرم می‌رود. این چه روشی از اثبات است؟",
    statementLatex: "\\text{فرض } \\varepsilon \\neq \\alpha \\implies \\text{نقض قانون دوم ترمودینامیک} \\implies \\varepsilon = \\alpha",
    options: [
      { id: "induction", labelFa: "استقرای ریاضی" },
      { id: "contradiction", labelFa: "برهان خلف (اثبات از راه تناقض)" },
      { id: "taylor", labelFa: "بسط تیلور مرتبه‌ی اول" },
      { id: "counterexample", labelFa: "رد حکم با مثال نقض" },
    ],
    correctOptionId: "contradiction",
    explanationFa:
      "دقیقاً برهان خلف است! نقیض حکم ($\\varepsilon \\neq \\alpha$) را فرض گرفتیم و نشان دادیم به تناقض با یکی از اصول مسلم فیزیک (قانون دوم ترمودینامیک) می‌رسد.",
    relatedOpOrMethodFa: "روش ۳ (برهان خلف)",
  },
  {
    id: "stefan-change-var",
    kindFa: "رمزگشایی عمل ریاضی",
    promptFa:
      "در اثبات قانون استفان–بولتزمن از انتگرال قانون پلانک، چرا با وجود شکل ظاهراً پیچیده‌ی $B(\\lambda,T)$، ناگهان فاکتور $T^4$ به سادگی از انتگرال بیرون می‌آید؟",
    statementLatex: "\\int_0^\\infty \\frac{2hc^2}{\\lambda^5 (e^{hc/(\\lambda k_B T)} - 1)}\\,d\\lambda \\;\\xrightarrow{x = \\frac{hc}{\\lambda k_B T}}\\; \\text{const}\\cdot T^4 \\int_0^\\infty \\frac{x^3}{e^x - 1}\\,dx",
    options: [
      { id: "change-var", labelFa: "با عمل «تغییر متغیر بی‌بعد» $x = hc/(\\lambda k_B T)$ تمام $T$ها از داخل انتگرال بیرون کشیده می‌شوند" },
      { id: "small-angle", labelFa: "با تقریب زاویه‌ی کوچک $\\tan\\theta \\approx \\theta$" },
      { id: "induction", labelFa: "با استقرای ریاضی روی توان‌های $T$" },
      { id: "cancel-sum", labelFa: "با خط زدن $1$ در مخرج $e^x - 1$" },
    ],
    correctOptionId: "change-var",
    explanationFa:
      "تغییر متغیر $x = \\frac{hc}{\\lambda k_B T}$ باعث می‌شود $\\lambda \\propto T^{-1}$ و $d\\lambda \\propto T^{-1}dx$ شود؛ بنابراین $\\frac{d\\lambda}{\\lambda^5} \\propto \\frac{T^{-1}}{T^{-5}} = T^4$ از انتگرال بیرون می‌آید و یک انتگرال عددی خالص می‌ماند!",
    relatedOpOrMethodFa: "عمل ۴ (تغییر متغیر و بی‌بعدسازی)",
  },
  {
    id: "ndvi-illegal-cancel",
    kindFa: "خطایابی جبری",
    promptFa:
      "دانشجویی برای ساده‌سازی شاخص $\\text{NDVI} = \\frac{\\rho_{\\text{NIR}} - \\rho_{\\text{Red}}}{\\rho_{\\text{NIR}} + \\rho_{\\text{Red}}}$، عبارت $\\rho_{\\text{NIR}}$ را از صورت و مخرج خط می‌زند و می‌نویسد $-1$. چرا این کار غیرمجاز است؟",
    statementLatex: "\\frac{\\rho_{\\text{NIR}} - \\rho_{\\text{Red}}}{\\rho_{\\text{NIR}} + \\rho_{\\text{Red}}} \\;\\neq\\; \\frac{-\\rho_{\\text{Red}}}{+\\rho_{\\text{Red}}}",
    options: [
      { id: "units", labelFa: "چون بازتاب‌ها واحد متر دارند" },
      { id: "sum-not-factor", labelFa: "چون $\\rho_{\\text{NIR}}$ جمله‌ی جمع و تفریق است، نه عامل ضربی مشترک در کل صورت و مخرج" },
      { id: "negative", labelFa: "چون NDVI نمی‌تواند منفی شود" },
      { id: "radian", labelFa: "چون باید ابتدا بر حسب رادیان نوشته شود" },
    ],
    correctOptionId: "sum-not-factor",
    explanationFa:
      "خط زدن فقط برای عامل ضربی مشترک ($\\frac{kA}{kB} = \\frac{A}{B}$) مجاز است. به عنوان مثال نقض: $\\frac{5-1}{5+1} = \\frac{4}{6} = \\frac{2}{3}$ است، نه $-1$!",
    relatedOpOrMethodFa: "عمل ۳ (فاکتورگیری و خط‌زدن) و مثال نقض",
  },
  {
    id: "taylor-unit-trap",
    kindFa: "شروط و تقریب‌ها",
    promptFa:
      "در اثبات فرمول $\\text{GSD} = 2H\\tan(\\text{IFOV}/2) \\approx H\\cdot\\text{IFOV}$، برای استفاده از تقریب $\\tan\\alpha \\approx \\alpha$ چه شرطی حیاتی است؟",
    statementLatex: "\\tan\\alpha \\approx \\alpha",
    options: [
      { id: "degree", labelFa: "زاویه‌ی $\\alpha$ حتماً بر حسب درجه باشد و بزرگ‌تر از ۴۵ درجه باشد" },
      { id: "radian", labelFa: "زاویه‌ی $\\alpha$ بسیار کوچک (مثلاً چند میلی‌رادیان) و حتماً بر حسب «رادیان» باشد" },
      { id: "altitude", labelFa: "ارتفاع ماهواره $H$ حتماً کمتر از ۱۰۰ کیلومتر باشد" },
      { id: "no-cond", labelFa: "هیچ شرطی ندارد و برای هر زاویه‌ای دقیق است" },
    ],
    correctOptionId: "radian",
    explanationFa:
      "بسط تیلور $\\tan\\alpha = \\alpha + \\frac{\\alpha^3}{3} + \\dots$ فقط زمانی برقرار است که $\\alpha$ بر حسب رادیان و کوچک ($\\alpha \\ll 1$) باشد. مثلاً برای $1^\\circ$، $\\tan(1^\\circ) \\approx 0.01745$ است که برابر $1^\\circ$ در رادیان است، نه عدد $1$!",
    relatedOpOrMethodFa: "عمل ۷ (تقریب حدی و بسط تیلور)",
  },
];
