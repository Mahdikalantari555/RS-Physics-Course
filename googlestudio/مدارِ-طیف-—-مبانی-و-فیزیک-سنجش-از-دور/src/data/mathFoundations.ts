export interface MathLessonModule {
  id: string;
  orderFa: string;
  titleFa: string;
  subtitleFa: string;
  coreIdeaFa: string;
  stepByStepFa: Array<{
    stepTitleFa: string;
    detailFa: string;
    exampleLtr: string;
  }>;
  formulaId: string;
  rsConnectionFa: string;
}

export interface MathSymbolEntry {
  id: string;
  symbol: string;
  nameFa: string;
  pronunciation: string;
  category: 'greek-var' | 'operator' | 'calculus' | 'constant-unit';
  categoryLabelFa: string;
  mathRoleFa: string;
  rsExampleFa: string;
}

export const MATH_FOUNDATIONS_MODULES: MathLessonModule[] = [
  {
    id: 'scientific-powers',
    orderFa: 'درس ۰۱',
    titleFa: 'نمادگذاری علمی، توان‌های منفی و پیشوندهای SI',
    subtitleFa: 'چگونه از اعداد بسیار بزرگ (سرعت نور) و بسیار کوچک (ثابت پلانک و میکرون) بدون خطا محاسبه کنیم',
    coreIdeaFa:
      'در فیزیک سنجش از دور بازه اعداد ۴۰ مرتبه بزرگی تغییر می‌کند (از 10⁻³⁴ تا 10¹⁴). قواعد توان‌گیری پایه ۱۰ اجازه می‌دهد بدون صفرهای طولانی، ضرب و تقسیم‌های فضایی را با جمع و تفریق ساده توان‌ها انجام دهید.',
    stepByStepFa: [
      {
        stepTitleFa: '۱. معنای توان مثبت و توان منفی',
        detailFa: 'توان مثبت یعنی ضرب مکرر در ۱۰، و توان منفی یعنی قرار گرفتن عدد در مخرج کسر (معکوس).',
        exampleLtr: '10⁻⁶ = 1 / 10⁶ = 0.000001   |   x⁻ⁿ = 1 / xⁿ',
      },
      {
        stepTitleFa: '۲. قانون ضرب و تقسیم توان‌ها',
        detailFa: 'در ضرب دو عدد با پایه ۱۰، توان‌ها با هم جمع می‌شوند و در تقسیم، توان مخرج از صورت کم می‌شود.',
        exampleLtr: '(3 × 10⁸) / (5 × 10⁻⁷) = 0.6 × 10⁸⁻⁽⁻⁷⁾ = 6 × 10¹⁴ Hz',
      },
      {
        stepTitleFa: '۳. تبدیل واحدهای متداول طول‌موج',
        detailFa: 'باندهای اپتیکی معمولاً با نانومتر (nm) یا میکرومتر (μm) بیان می‌شوند که هر ۱ میکرومتر دقیقاً ۱۰۰۰ نانومتر است.',
        exampleLtr: '550 nm = 550 × 10⁻⁹ m = 0.55 × 10⁻⁶ m = 0.55 μm',
      },
    ],
    formulaId: 'wave-eq',
    rsConnectionFa:
      'تبدیل طول‌موج‌های سنجنده (مثل ۰.۵۵ μm) به بسامد (545 THz) و انرژی فوتون مستقیماً با همین قواعد توان پایه ۱۰ انجام می‌شود.',
  },
  {
    id: 'inverse-power-laws',
    orderFa: 'درس ۰۲',
    titleFa: 'نسبت‌های معکوس و قوانین توانی (T⁴ و λ⁻⁴)',
    subtitleFa: 'چرا یک تغییر کوچک در دما یا طول‌موج، نتیجه را ۱۶ برابر تغییر می‌دهد؟',
    coreIdeaFa:
      'تفاوت خطی (y = ax) با رفتار توانی (y = axⁿ) در این است که در قوانین توانی، نرخ رشد یا افت به شدت غیرخطی است. دو قانون ستون فقرات سنجش از دور یعنی «استفان-بولتزمن» و «پراکندگی رایلی» تابع توان ۴ هستند.',
    stepByStepFa: [
      {
        stepTitleFa: '۱. نسبت مستقیم در برابر نسبت معکوس',
        detailFa: 'در نسبت معکوس y = k/x، هر ضریبی که به x بدهید، y به همان نسبت کوچک می‌شود. در قوانین توانی این ضریب به توان n می‌رسد.',
        exampleLtr: 'اگر x₂ = 2·x₁ باشد  ⇒  (x₂)⁴ = (2·x₁)⁴ = 16 · x₁⁴',
      },
      {
        stepTitleFa: '۲. کاربرد در توان ۴ منفی (λ⁻⁴)',
        detailFa: 'وقتی طول‌موج از ۰.۴۵ μm (آبی) به ۰.۹۰ μm (فروسرخ نزدیک) دو برابر می‌شود، پراکندگی با ضریب (1/2)⁴ کاهش می‌یابد.',
        exampleLtr: 'I(0.90) / I(0.45) = (0.45 / 0.90)⁴ = (0.5)⁴ = 1/16 = 6.25%',
      },
      {
        stepTitleFa: '۳. کاربرد در ریشه‌گیری دمای درخشندگی',
        detailFa: 'برای بازگرداندن توان تابشی به دما، باید جذر مرتبه چهارم (توان 1/4 یا 0.25) بگیریم.',
        exampleLtr: 'M = εσT⁴  ⇒  T_brightness = ε^(1/4) · T_kinetic',
      },
    ],
    formulaId: 'stefan-boltzmann',
    rsConnectionFa:
      'همین توان چهارم است که ماهواره‌های پایش آتش‌سوزی (MODIS/VIIRS) را قادر می‌سازد کانون‌های کوچک داغ را میان یک پیکسل ۱ کیلومتری خنک تشخیص دهند.',
  },
  {
    id: 'exponentials-logarithms',
    orderFa: 'درس ۰۳',
    titleFa: 'تابع نمایی (eˣ) و لگاریتم (ln و dB) در جو و رادار',
    subtitleFa: 'فهم عدد اویلر e ≈ 2.718، میرایی پیوسته جو و مقیاس دسی‌بل SAR',
    coreIdeaFa:
      'وقتی نرخ کم شدن یک کمیت با مقدار فعلی خودش متناسب باشد (مانند جذب فوتون در لایه‌های متوالی جو)، مدل خطی جواب نمی‌دهد و تابع نمایی طبیعی با پایه e وارد می‌شود. لگاریتم دقیقاً عملگر معکوس تابع نمایی است.',
    stepByStepFa: [
      {
        stepTitleFa: '۱. معنای تابع نمایی با توان منفی (e⁻ˣ)',
        detailFa: 'در x = 0 مقدار e⁰ = 1 (عبور ۱۰۰٪) است؛ با بزرگ شدن x مقدار خروجی به نرمی به سمت صفر نزدیک می‌شود اما هرگز منفی نمی‌شود.',
        exampleLtr: 'e⁰ = 1  |  e⁻¹ ≈ 0.368  |  e⁻² ≈ 0.135  |  e⁻⁵ ≈ 0.0067',
      },
      {
        stepTitleFa: '۲. لگاریتم طبیعی (ln) به عنوان معکوس exp',
        detailFa: 'برای استخراج عمق نوری جو (k) از میزان عبور اندازه‌گیری‌شده، از طرفین معادله لگاریتم طبیعی می‌گیریم.',
        exampleLtr: 'τ = exp(−k·sec θ)  ⇒  k = −ln(τ) / sec θ',
      },
      {
        stepTitleFa: '۳. لگاریتم پایه ۱۰ و مقیاس دسی‌بل (dB) در رادار',
        detailFa: 'چون بازتاب رادار SAR بین شهر (بسیار روشن) و آب (بسیار تاریک) هزاران برابر فرق دارد، آن را به دسی‌بل می‌برند.',
        exampleLtr: 'σ⁰(dB) = 10 · log₁₀(σ⁰_linear)  |  0.01 → -20 dB ، 10 → +10 dB',
      },
    ],
    formulaId: 'beer-lambert',
    rsConnectionFa:
      'تمامی الگوریتم‌های تصحیح جوی ماهواره‌ای و پردازش تصاویر رادار Sentinel-1 بر تبدیل لگاریتمی و نمایی استوارند.',
  },
  {
    id: 'trigonometry-geometry',
    orderFa: 'درس ۰۴',
    titleFa: 'مثلثات فضایی، رادیان و تقریب زوایای کوچک',
    subtitleFa: 'تبدیل درجه به میلی‌رادیان، محاسبه طول مسیر جو با sec θ و استخراج GSD',
    coreIdeaFa:
      'زاویه در فیزیک مهندسی با «رادیان» اندازه‌گیری می‌شود؛ زیرا در واحد رادیان، طول کمان با حاصل‌ضرب شعاع در زاویه برابر است و توابع مثلثاتی ساده‌ترین تقریب خطی را دارند.',
    stepByStepFa: [
      {
        stepTitleFa: '۱. تبدیل درجه، رادیان و میلی‌رادیان (mrad)',
        detailFa: 'یک دایره کامل ۳۶۰ درجه برابر 2π رادیان است. زاویه دید آشکارسازهای ماهواره‌ای بسیار کوچک و از مرتبه میلی‌رادیان است.',
        exampleLtr: 'π rad = 180°  ⇒  1 rad ≈ 57.2958°  |  1 mrad = 10⁻³ rad ≈ 0.0573°',
      },
      {
        stepTitleFa: '۲. مثلث قائم‌الزاویه دید سنجنده و تابع tan',
        detailFa: 'در تصویربرداری قائم، فاصله ماهواره (H) ضلع مجاور و نصف پیکسل روی زمین (GSD/2) ضلع مقابل زاویه IFOV/2 است.',
        exampleLtr: 'tan(IFOV/2) = (GSD/2) / H  ⇒  GSD = 2H · tan(IFOV/2)',
      },
      {
        stepTitleFa: '۳. تقریب زاویه کوچک و تابع سکانت (sec θ)',
        detailFa: 'وقتی α بر حسب رادیان خیلی کوچک باشد، tan(α) ≈ α می‌شود. همچنین در نگاه مایل، ضخامت موثر جو به اندازه 1/cos θ = sec θ افزایش می‌یابد.',
        exampleLtr: 'اگر θ = 60° باشد: cos(60°) = 0.5  ⇒  sec(60°) = 2.0 (مسیر دو برابر جو)',
      },
    ],
    formulaId: 'gsd-eq',
    rsConnectionFa:
      'با همین سه خط مثلثات می‌توان هم اندازه پیکسل زمین را از مشخصات اپتیکی دوربین حساب کرد و هم افزایش مسیر جوی در لبه‌های تصویر را جبران نمود.',
  },
  {
    id: 'calculus-intuition',
    orderFa: 'درس ۰۵',
    titleFa: 'مفاهیم پایه حسابان (مشتق و انتگرال) در تابش‌سنجی',
    subtitleFa: 'چگونه قانون وین (قله) و استفان-بولتزمن (کل انرژی) هر دو از قانون پلانک زاده می‌شوند؟',
    coreIdeaFa:
      'نیازی نیست از نمادهای d/dλ و ∫ بترسید: «مشتق» فقط شیب نمودار در هر نقطه را می‌دهد (که در قله منحنی صفر است) و «انتگرال» فقط مساحت کل زیر نمودار را جمع می‌زند.',
    stepByStepFa: [
      {
        stepTitleFa: '۱. مشتق و پیدا کردن بیشینه تابع (قانون وین)',
        detailFa: 'در بلندترین نقطه منحنی پلانک، شیب خط مماس افقی و برابر صفر است. اگر مشتق B(λ, T) نسبت به λ را برابر صفر بگذاریم، قانون وین به دست می‌آید.',
        exampleLtr: 'dB(λ, T) / dλ = 0  ⇒  λ_max · T = b = 2897.8 μm·K',
      },
      {
        stepTitleFa: '۲. انتگرال معین به عنوان جمع مساحت (استفان-بولتزمن)',
        detailFa: 'یک باند ماهواره‌ای (مثلاً ۰.۸ تا ۰.۹ μm) انرژی انتگرال‌گیری‌شده روی پهنای باند را ثبت می‌کند؛ انتگرال از ۰ تا ∞ کل توان تابشی جسم را می‌دهد.',
        exampleLtr: 'M(T) = π · ∫₀^∞ B(λ, T) dλ = σ · T⁴',
      },
      {
        stepTitleFa: '۳. زاویه فضایی (استرادیان · sr) در تابندگی',
        detailFa: 'یک کره کامل 4π استرادیان و نیم‌کره بالایی 2π استرادیان دارد؛ برای تبدیل تابندگی (بر sr) به شار تابشی لامبرتی، در π ضرب می‌کنیم.',
        exampleLtr: 'M = π · L  (برای گسیلنده همسانگرد / لامبرتی)',
      },
    ],
    formulaId: 'planck-law',
    rsConnectionFa:
      'هر باند سنجنده ماهواره‌ای در واقع انتگرال منحنی پلانک ضربدر تابع پاسخ طیفی فیلتر (SRF) در آن بازه طول‌موج است.',
  },
  {
    id: 'normalized-algebra',
    orderFa: 'درس ۰۶',
    titleFa: 'جبر نرمال‌سازی، شاخص‌های تفاضلی و فضای چندباندی',
    subtitleFa: 'چرا ساختار (A − B)/(A + B) روشنایی خورشید را حذف می‌کند و کران [1− , 1+] می‌سازد؟',
    coreIdeaFa:
      'اگر شدت نور خورشید روی یک مزرعه در دامنه شمالی کوه نصف دامنه جنوبی باشد، بازتاب مطلق هر باند نصف می‌شود؛ اما نسبت‌های نرمال‌شده مانند NDVI مستقل از ضریب مقیاس روشنایی باقی می‌مانند.',
    stepByStepFa: [
      {
        stepTitleFa: '۱. خط خوردن ضریب مقیاس روشنایی (k)',
        detailFa: 'فرض کنید سایه ابر نازک یا شیب زمین مقدار هر دو باند را در عدد k ضرب کند؛ چون k در صورت و مخرج فاکتور گرفته می‌شود، از بین می‌رود.',
        exampleLtr: '(k·NIR − k·Red) / (k·NIR + k·Red) = k(NIR − Red) / k(NIR + Red) = NDVI',
      },
      {
        stepTitleFa: '۲. اثبات کران [-1 , +1] برای مقادیر نامنفی',
        detailFa: 'از آنجا که بازتاب فیزیکی A, B ≥ 0 است، همواره تفاضل دو عدد نامنفی از مجموعشان کوچکتر یا مساوی است؛ پس قدر مطلق کسر هرگز از ۱ فراتر نمی‌رود.',
        exampleLtr: 'اگر B = 0 باشد ⇒ A/A = +1  |  اگر A = 0 باشد ⇒ -B/B = -1',
      },
      {
        stepTitleFa: '۳. توان‌های دودویی (2ⁿ) در داده‌های دیجیتال (DN)',
        detailFa: 'تصاویر ماهواره‌ای به صورت اعداد صحیح با عمق n بیت ذخیره می‌شوند که حداکثر عدد دیجیتال (DN_max) برابر 2ⁿ − 1 است.',
        exampleLtr: '8-bit: 2⁸ = 256 (0..255)  |  12-bit: 2¹² = 4096 (0..4095)',
      },
    ],
    formulaId: 'ndvi-eq',
    rsConnectionFa:
      'همین جبر ساده پایه ده‌ها شاخص کلیدی سنجش از دور از جمله NDVI (گیاه)، NDWI (آب)، NDSI (برف) و NBR (شدت سوختگی) است.',
  },
];

export const MATHEMATICAL_SYMBOLS_TABLE: MathSymbolEntry[] = [
  // Greek letters & RS Variables
  {
    id: 'sym-lambda',
    symbol: 'λ',
    nameFa: 'لامبدا (طول‌موج)',
    pronunciation: 'Lambda',
    category: 'greek-var',
    categoryLabelFa: 'حروف یونانی و متغیرها',
    mathRoleFa: 'متغیر مستقل فضایی طول یک دوره تناوب موج',
    rsExampleFa: 'مرئی: 0.4–0.7 μm · حرارتی: 8–14 μm · رادار C: 5.6 cm',
  },
  {
    id: 'sym-nu',
    symbol: 'ν',
    nameFa: 'نو (بسامد / فرکانس)',
    pronunciation: 'Nu',
    category: 'greek-var',
    categoryLabelFa: 'حروف یونانی و متغیرها',
    mathRoleFa: 'تعداد چرخه‌ها در واحد زمان (معکوس دوره تناوب، ν = c/λ)',
    rsExampleFa: 'باند سبز ~545 THz · رادار باند C ~5.4 GHz',
  },
  {
    id: 'sym-rho',
    symbol: 'ρ',
    nameFa: 'رو (بازتاب طیفی سطح)',
    pronunciation: 'Rho',
    category: 'greek-var',
    categoryLabelFa: 'حروف یونانی و متغیرها',
    mathRoleFa: 'نسبت بی‌بعد شار بازتابیده به شار فرودی (0 ≤ ρ ≤ 1)',
    rsExampleFa: 'در گیاه سالم: ρ_Red ≈ 0.05 و ρ_NIR ≈ 0.50',
  },
  {
    id: 'sym-eps',
    symbol: 'ε',
    nameFa: 'اپسیلون (گسیلندگی)',
    pronunciation: 'Epsilon',
    category: 'greek-var',
    categoryLabelFa: 'حروف یونانی و متغیرها',
    mathRoleFa: 'ضریب کارایی گسیل حرارتی نسبت به جسم سیاه (0 تا 1)',
    rsExampleFa: 'آب: ε ≈ 0.98 · پوشش گیاهی متراکم: ε ≈ 0.97 · کوارتز: ε ≈ 0.85',
  },
  {
    id: 'sym-tau',
    symbol: 'τ',
    nameFa: 'تاو (ضریب عبور جوی)',
    pronunciation: 'Tau',
    category: 'greek-var',
    categoryLabelFa: 'حروف یونانی و متغیرها',
    mathRoleFa: 'کسر تابش عبوری مستقیم از جو؛ گاهی برای عمق نوری هم به کار می‌رود',
    rsExampleFa: 'در پنجره‌های جوی τ ≈ 0.8–0.9 و در باند جذب 1.4 μm، τ ≈ 0.02',
  },
  {
    id: 'sym-theta',
    symbol: 'θ',
    nameFa: 'تتا (زاویه سرسویی / تابش)',
    pronunciation: 'Theta',
    category: 'greek-var',
    categoryLabelFa: 'حروف یونانی و متغیرها',
    mathRoleFa: 'متغیر زاویه‌ای نسبت به خط قائم یا نرمال سطح (رادیان یا درجه)',
    rsExampleFa: 'زاویه سرسویی خورشید (SZA) و زاویه فرود پالس رادار SAR',
  },
  {
    id: 'sym-sigma0',
    symbol: 'σ⁰',
    nameFa: 'سیگما نات (ضریب پس‌پراکنش رادار)',
    pronunciation: 'Sigma-naught',
    category: 'greek-var',
    categoryLabelFa: 'حروف یونانی و متغیرها',
    mathRoleFa: 'سطح مقطع راداری نرمال‌شده به واحد مساحت زمین (بی‌بعد یا dB)',
    rsExampleFa: 'آب آرام: 22− dB (تاریک) · بافت شهری: 2+ dB (بسیار روشن)',
  },
  {
    id: 'sym-delta',
    symbol: 'Δ',
    nameFa: 'دلتا بزرگ (تغییر یا پهنای بازه)',
    pronunciation: 'Delta',
    category: 'greek-var',
    categoryLabelFa: 'حروف یونانی و متغیرها',
    mathRoleFa: 'اختلاف گسسته بین دو مقدار: Δx = x₂ − x₁',
    rsExampleFa: 'Δλ یعنی پهنای طیفی (FWHM) یک باند ماهواره‌ای (مثلاً 30 nm)',
  },
  {
    id: 'sym-T',
    symbol: 'T',
    nameFa: 'دمای مطلق (کلوین)',
    pronunciation: 'Absolute Temp',
    category: 'greek-var',
    categoryLabelFa: 'حروف یونانی و متغیرها',
    mathRoleFa: 'متغیر ترمودینامیکی اندازه‌گیری‌شده از صفر مطلق (T(K) = °C + 273.15)',
    rsExampleFa: 'میانگین زمین 288 K · خورشید 5778 K',
  },

  // Operators & Functions
  {
    id: 'sym-exp',
    symbol: 'exp(x) / eˣ',
    nameFa: 'تابع نمایی پایه اویلر',
    pronunciation: 'Exponential',
    category: 'operator',
    categoryLabelFa: 'عملگرها و توابع ریاضی',
    mathRoleFa: 'به توان رساندن عدد e ≈ 2.71828؛ توصیف رشد یا زوال پیوسته درصدی',
    rsExampleFa: 'قانون بیر-لامبرت exp(−k·sec θ) و مخرج قانون پلانک',
  },
  {
    id: 'sym-ln',
    symbol: 'ln(x)',
    nameFa: 'لگاریتم طبیعی (پایه e)',
    pronunciation: 'Natural Log',
    category: 'operator',
    categoryLabelFa: 'عملگرها و توابع ریاضی',
    mathRoleFa: 'عملگر معکوس تابع نمایی: ln(eˣ) = x و ln(1) = 0',
    rsExampleFa: 'استخراج عمق نوری جو از داده‌های عبور طیفی (τ)',
  },
  {
    id: 'sym-log10',
    symbol: 'log₁₀(x)',
    nameFa: 'لگاریتم اعشاری (پایه ۱۰)',
    pronunciation: 'Base-10 Log',
    category: 'operator',
    categoryLabelFa: 'عملگرها و توابع ریاضی',
    mathRoleFa: 'فشرده‌سازی مقیاس‌های بسیار وسیع به اعداد کوچک قابل نمایش',
    rsExampleFa: 'محاسبه دسی‌بل رادار 10·log₁₀(σ⁰) و رسم محور لگاریتمی طیف',
  },
  {
    id: 'sym-tan',
    symbol: 'tan(α)',
    nameFa: 'تانژانت زاویه',
    pronunciation: 'Tangent',
    category: 'operator',
    categoryLabelFa: 'عملگرها و توابع ریاضی',
    mathRoleFa: 'نسبت ضلع مقابل به مجاور در مثلث قائم‌الزاویه (sin α / cos α)',
    rsExampleFa: 'محاسبه GSD و پهنای جاروب (Swath = 2H·tan(FOV/2))',
  },
  {
    id: 'sym-sec',
    symbol: 'sec(θ)',
    nameFa: 'سکانت زاویه (1 / cos θ)',
    pronunciation: 'Secant',
    category: 'operator',
    categoryLabelFa: 'عملگرها و توابع ریاضی',
    mathRoleFa: 'نسبت وتر مثلث قائم‌الزاویه به ضلع مجاور (معکوس کسینوس)',
    rsExampleFa: 'ضریب جرم هوا (Air Mass Factor): مسیر پرتو در جو هنگام تابش مایل',
  },
  {
    id: 'sym-neg-pow',
    symbol: 'x⁻ⁿ',
    nameFa: 'توان منفی',
    pronunciation: 'Negative Power',
    category: 'operator',
    categoryLabelFa: 'عملگرها و توابع ریاضی',
    mathRoleFa: 'قرار گرفتن پایه با توان مثبت در مخرج کسر: x⁻ⁿ = 1 / xⁿ',
    rsExampleFa: 'λ⁻⁴ در پراکندگی رایلی و [ ]⁻¹ در معادله پلانک',
  },
  {
    id: 'sym-prop',
    symbol: '∝',
    nameFa: 'نماد تناسب مستقیم',
    pronunciation: 'Proportional to',
    category: 'operator',
    categoryLabelFa: 'عملگرها و توابع ریاضی',
    mathRoleFa: 'A ∝ B یعنی A = k·B برای یک ثابت k (مناسب مقایسه نسبت‌ها)',
    rsExampleFa: 'I_Rayleigh ∝ λ⁻⁴ (پراکندگی متناسب با معکوس توان ۴ طول‌موج)',
  },

  // Calculus & Logic
  {
    id: 'sym-deriv',
    symbol: 'd / dλ',
    nameFa: 'مشتق نسبت به طول‌موج',
    pronunciation: 'Derivative',
    category: 'calculus',
    categoryLabelFa: 'حسابان و منطق',
    mathRoleFa: 'نرخ تغییر لحظه‌ای تابع (شیب خط مماس) نسبت به تغییر جزئی طول‌موج',
    rsExampleFa: 'حل dB/dλ = 0 برای یافتن قله قانون وین و محاسبه شیب «لبه قرمز» گیاهان',
  },
  {
    id: 'sym-int',
    symbol: '∫',
    nameFa: 'انتگرال (جمع پیوسته)',
    pronunciation: 'Integral',
    category: 'calculus',
    categoryLabelFa: 'حسابان و منطق',
    mathRoleFa: 'محاسبه مساحت زیر منحنی پیوسته بین دو حد کران',
    rsExampleFa: 'انتگرال‌گیری از B(λ,T) روی یک باند طیفی برای محاسبه انرژی دریافتی آشکارساز',
  },
  {
    id: 'sym-sum',
    symbol: '∑',
    nameFa: 'سیگما بزرگ (مجموع گسسته)',
    pronunciation: 'Summation',
    category: 'calculus',
    categoryLabelFa: 'حسابان و منطق',
    mathRoleFa: 'جمع زدن دنباله‌ای از مقادیر گسسته (مانند پیکسل‌ها یا باندها)',
    rsExampleFa: 'محاسبه میانگین رادیانس یک ناحیه یا جمع خطای مربعات (RMSE)',
  },
  {
    id: 'sym-approx',
    symbol: '≈ / ≪ / ≫',
    nameFa: 'تقریباً برابر / بسیار کوچکتر و بزرگتر',
    pronunciation: 'Approx / Much less',
    category: 'calculus',
    categoryLabelFa: 'حسابان و منطق',
    mathRoleFa: 'نشان‌دهنده تقریب عددی مهندسی یا اختلاف چند مرتبه بزرگی دو کمیت',
    rsExampleFa: 'شرط پراکندگی رایلی: قطر مولکول d ≪ λ',
  },

  // Constants & Units
  {
    id: 'sym-c',
    symbol: 'c',
    nameFa: 'سرعت نور در خلأ',
    pronunciation: '2.998 × 10⁸ m/s',
    category: 'constant-unit',
    categoryLabelFa: 'ثابت‌های فیزیکی و واحدها',
    mathRoleFa: 'ثابت جهانی تبدیل طول‌موج و بسامد (c = λν)',
    rsExampleFa: 'مبنای زمان‌سنجی دقیق رفت‌وبرگشت پالس در رادار و LiDAR',
  },
  {
    id: 'sym-h',
    symbol: 'h',
    nameFa: 'ثابت پلانک',
    pronunciation: '6.626 × 10⁻³⁴ J·s',
    category: 'constant-unit',
    categoryLabelFa: 'ثابت‌های فیزیکی و واحدها',
    mathRoleFa: 'ضریب کوانتش انرژی فوتون (E = hν)',
    rsExampleFa: 'حاضر در قانون انرژی فوتون و تابع تابش جسم سیاه پلانک',
  },
  {
    id: 'sym-kB',
    symbol: 'k_B',
    nameFa: 'ثابت بولتزمن',
    pronunciation: '1.381 × 10⁻²³ J/K',
    category: 'constant-unit',
    categoryLabelFa: 'ثابت‌های فیزیکی و واحدها',
    mathRoleFa: 'تبدیل دمای کلوین به واحد انرژی جنبشی حرارتی',
    rsExampleFa: 'مخرج نمای قانون پلانک (hc / λk_BT)',
  },
  {
    id: 'sym-sigma-const',
    symbol: 'σ',
    nameFa: 'ثابت استفان-بولتزمن',
    pronunciation: '5.670 × 10⁻⁸ W·m⁻²·K⁻⁴',
    category: 'constant-unit',
    categoryLabelFa: 'ثابت‌های فیزیکی و واحدها',
    mathRoleFa: 'ضریب کل شار گسیلی جسم سیاه بر حسب توان چهارم دما',
    rsExampleFa: 'محاسبه M = εσT⁴ برای زمین (~390 W/m²) و خورشید (~63 MW/m²)',
  },
  {
    id: 'sym-sr',
    symbol: 'sr',
    nameFa: 'استرادیان (واحد زاویه فضایی)',
    pronunciation: 'Steradian',
    category: 'constant-unit',
    categoryLabelFa: 'ثابت‌های فیزیکی و واحدها',
    mathRoleFa: 'معادل سه‌بعدی رادیان؛ مساحت کروی تقسیم بر مجذور شعاع (Ω = A/r²)',
    rsExampleFa: 'واحد تابندگی طیفی: وات بر مترمربع بر استرادیان بر میکرومتر',
  },
  {
    id: 'sym-um',
    symbol: 'μm / mrad',
    nameFa: 'میکرومتر (10⁻⁶ m) و میلی‌رادیان (10⁻³ rad)',
    pronunciation: 'Micrometer / Milliradian',
    category: 'constant-unit',
    categoryLabelFa: 'ثابت‌های فیزیکی و واحدها',
    mathRoleFa: 'پیشوندهای استاندارد SI برای طول‌موج اپتیکی و زاویه دید دقیق سنجنده',
    rsExampleFa: 'باند حرارتی ۱۰.۵ μm و زاویه دید 0.043 mrad',
  },
];
