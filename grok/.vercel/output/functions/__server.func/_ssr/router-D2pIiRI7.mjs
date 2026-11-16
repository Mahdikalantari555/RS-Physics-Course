import { i as __toESM } from "../_runtime.mjs";
import { G as redirect, J as notFound, X as require_react, Y as require_jsx_runtime, _ as createFileRoute, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, v as createRootRoute, x as useRouter, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as CartesianGrid, c as ResponsiveContainer, i as Line, l as Tooltip, n as YAxis, o as ReferenceArea, r as XAxis, s as ReferenceDot, t as LineChart } from "../_libs/recharts+[...].mjs";
import { t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rolldown-runtime-D7D4PA-g.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/format-DmZjn_ul.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KEY = "rs-physics-progress-v1";
var empty = {
	lessons: {},
	labs: {},
	quizzes: {},
	problems: {}
};
var Ctx = (0, import_react.createContext)(null);
function sanitize(raw) {
	if (!raw || typeof raw !== "object") return empty;
	const v = raw;
	return {
		lessons: v.lessons && typeof v.lessons === "object" ? v.lessons : {},
		labs: v.labs && typeof v.labs === "object" ? v.labs : {},
		quizzes: v.quizzes && typeof v.quizzes === "object" ? v.quizzes : {},
		problems: v.problems && typeof v.problems === "object" ? v.problems : {}
	};
}
function ProgressProvider({ children }) {
	const [data, setData] = (0, import_react.useState)(empty);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(KEY);
			if (raw) setData(sanitize(JSON.parse(raw)));
		} catch {}
		setReady(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		localStorage.setItem(KEY, JSON.stringify(data));
	}, [data, ready]);
	const api = (0, import_react.useMemo)(() => ({
		data,
		ready,
		toggleLesson(slug) {
			setData((d) => {
				const lessons = { ...d.lessons };
				if (lessons[slug]) delete lessons[slug];
				else lessons[slug] = true;
				return {
					...d,
					lessons
				};
			});
		},
		toggleProblem(slug) {
			setData((d) => {
				const problems = { ...d.problems };
				if (problems[slug]) delete problems[slug];
				else problems[slug] = true;
				return {
					...d,
					problems
				};
			});
		},
		markLab(id) {
			setData((d) => d.labs[id] ? d : {
				...d,
				labs: {
					...d.labs,
					[id]: true
				}
			});
		},
		saveQuiz(id, correct, total) {
			setData((d) => {
				const prev = d.quizzes[id];
				if (prev && prev.correct / prev.total > correct / total) return d;
				return {
					...d,
					quizzes: {
						...d.quizzes,
						[id]: {
							correct,
							total
						}
					}
				};
			});
		},
		reset() {
			setData(empty);
		}
	}), [data, ready]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value: api,
		children
	});
}
function useProgress() {
	const ctx = (0, import_react.useContext)(Ctx);
	if (!ctx) throw new Error("useProgress outside provider");
	return ctx;
}
var SUP = {
	"-": "⁻",
	"0": "⁰",
	"1": "¹",
	"2": "²",
	"3": "³",
	"4": "⁴",
	"5": "⁵",
	"6": "⁶",
	"7": "⁷",
	"8": "⁸",
	"9": "⁹"
};
function faNum(n, digits = 2) {
	if (!Number.isFinite(n)) return "—";
	return new Intl.NumberFormat("fa-IR", {
		maximumFractionDigits: digits,
		minimumFractionDigits: 0
	}).format(n);
}
function faInt(n) {
	return new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 0 }).format(Math.round(n));
}
function faSup(n) {
	return String(Math.trunc(n)).split("").map((ch) => SUP[ch] ?? ch).join("");
}
function faSci(n, digits = 2) {
	if (!Number.isFinite(n)) return "—";
	if (n === 0) return "۰";
	const exp = Math.floor(Math.log10(Math.abs(n)));
	const mant = n / 10 ** exp;
	if (Math.abs(exp) < 3) return faNum(n, digits);
	return `${faNum(mant, digits)}×۱۰${faSup(exp)}`;
}
function formatHz(f) {
	for (const [scale, unit] of [
		[0xe8d4a51000, "THz"],
		[1e9, "GHz"],
		[1e6, "MHz"],
		[1e3, "kHz"],
		[1, "Hz"]
	]) if (f >= scale) {
		const v = f / scale;
		return `${faNum(v, v >= 100 ? 1 : 2)} ${unit}`;
	}
	return `${faNum(f, 2)} Hz`;
}
function formatLength(m) {
	const abs = Math.abs(m);
	if (abs >= 1e3) return `${faNum(m / 1e3, 2)} km`;
	if (abs >= 1) return `${faNum(m, 2)} m`;
	if (abs >= .01) return `${faNum(m * 100, 2)} cm`;
	if (abs >= .001) return `${faNum(m * 1e3, 2)} mm`;
	if (abs >= 1e-6) return `${faNum(m * 1e6, 2)} μm`;
	return `${faNum(m * 1e9, 1)} nm`;
}
function formatEv(energyEv) {
	if (energyEv >= .01) return `${faNum(energyEv, 2)} eV`;
	if (energyEv >= .001) return `${faNum(energyEv * 1e3, 2)} meV`;
	return `${faSci(energyEv, 2)} eV`;
}
function formatDuration(seconds) {
	if (seconds < 90) return `${faNum(seconds, 0)} ثانیه`;
	const minutes = seconds / 60;
	if (minutes < 180) return `${faNum(minutes, 1)} دقیقه`;
	const hours = seconds / 3600;
	if (hours < 48) return `${faNum(hours, 2)} ساعت`;
	return `${faNum(hours / 24, 2)} روز`;
}
function spectrumBand(lambdaM) {
	const um = lambdaM * 1e6;
	if (um < .4) return "فرابنفش";
	if (um < .7) return "مرئی";
	if (um < 1.4) return "فروسرخ نزدیک";
	if (um < 3) return "فروسرخ موج‌کوتاه";
	if (um < 8) return "فروسرخ میانی";
	if (um < 100) return "فروسرخ حرارتی";
	if (um < 1e5) return "مایکروویو";
	return "رادیو";
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/load-CsRhSqdv.js
function tex(latex) {
	return {
		t: "tex",
		latex
	};
}
function sym(id, latex) {
	return {
		t: "part",
		id,
		latex
	};
}
var beer_exports = /* @__PURE__ */ __exportAll({ beer: () => beer });
var beer = {
	kind: "formula",
	id: "beer",
	title: "قانون بیر–لامبرت",
	summary: "نور مستقیم در یک محیط جاذب، نمایی ضعیف می‌شود.",
	tokens: [
		sym("I"),
		tex("="),
		sym("I0", "I_0"),
		tex("e^{-"),
		sym("tau", "\\tau"),
		tex("}")
	],
	parts: [
		{
			id: "I",
			latex: "I",
			name: "شدت باقی‌مانده",
			explanation: "توانی که بعد از عبور از مسیر هنوز در باریکه‌ی مستقیم مانده. پراکندگی به بیرون باریکه هم این‌جا مثل جذب عمل می‌کند."
		},
		{
			id: "I0",
			latex: "I_0",
			name: "شدت اولیه",
			explanation: "توان باریکه پیش از ورود به محیط. مثلاً تابش خورشید در بالای جو، قبل از برخورد به هوا."
		},
		{
			id: "tau",
			latex: "\\tau",
			name: "عمق اپتیکی",
			explanation: "عددی بی‌بعد. جمع جذب و پراکندگی در طول مسیر است. اگر τ = ۱ باشد حدود ۳۷٪ نور مستقیم می‌ماند. اگر صفر باشد هیچ اتلافی نیست."
		}
	],
	derivationNotes: "از dI = −κρ I ds انتگرال بگیر. جواب I = I₀ e^{−τ} است با τ = ∫ κρ ds. برای τ کوچک، e^{−τ} ≈ ۱ − τ.",
	relatedLabs: ["atmosphere"],
	relatedMath: ["exponentials", "integrals"]
};
var brdf_exports = /* @__PURE__ */ __exportAll({ brdf: () => brdf });
var brdf = {
	kind: "formula",
	id: "brdf",
	title: "تابع توزیع بازتاب دوجهته",
	summary: "سطح واقعی در همه‌ی جهت‌ها یکسان برنمی‌گرداند.",
	tokens: [
		sym("fr", "f_r"),
		tex("=\\frac{"),
		sym("dLr", "dL_r"),
		tex("}{"),
		sym("Li", "L_i"),
		tex("\\cos"),
		sym("theta", "\\theta_i"),
		tex("\\, d"),
		sym("omega", "\\omega_i"),
		tex("}")
	],
	parts: [
		{
			id: "fr",
			latex: "f_r",
			name: "BRDF",
			explanation: "نسبت رادیانس بازتابیده در یک جهت، به ایرَدیانس فرودی از جهتی دیگر. واحدش یک بر استرادیان است. برای یک سطح واقعی تابع هر دو جهت است."
		},
		{
			id: "dLr",
			latex: "dL_r",
			name: "رادیانس بازتابیده",
			explanation: "سهم کوچکی از درخشندگی که در جهت دید سنجنده می‌رود. سنجنده همین جهت را می‌بیند، نه کل نیم‌کره را."
		},
		{
			id: "Li",
			latex: "L_i",
			name: "رادیانس فرودی",
			explanation: "درخشندگی تابشی که از یک تکه‌ی کوچک آسمان یا از خورشید می‌آید. در مخرج، همراه زاویه، به ایرَدیانس روی سطح تبدیل می‌شود."
		},
		{
			id: "theta",
			latex: "\\theta_i",
			name: "زاویه‌ی فرود",
			explanation: "زاویه نسبت به عمود سطح. کسینوسش می‌گوید باریکه چقدر مایل به سطح می‌خورد: هرچه مایل‌تر، توان کمتری روی واحد سطح می‌نشیند."
		},
		{
			id: "omega",
			latex: "\\omega_i",
			name: "زاویه‌ی فضایی فرود",
			explanation: "تکه‌ی کوچکی از جهت‌های آمدن نور، با واحد استرادیان. دیفرانسیل است چون BRDF را برای یک جهت تعریف می‌کنیم نه برای کل آسمان."
		}
	],
	relatedLabs: ["ndvi"],
	relatedMath: ["integrals"]
};
var brightness_exports = /* @__PURE__ */ __exportAll({ brightness: () => brightness });
var brightness = {
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
		tex("}\\right)}")
	],
	parts: [
		{
			id: "Tb",
			latex: "T_b",
			name: "دمای درخشندگی",
			explanation: "دمای جسم سیاهی که در همین طول‌موج همین رادیانس را گسیل کند. دمای جنبشی سطح نیست، مگر گسیلندگی یک باشد و جو در مسیر نباشد."
		},
		{
			id: "c2",
			latex: "c_2",
			name: "ثابت دوم تابش",
			explanation: "c₂ = hc/k ≈ ۱٫۴۳۹×۱۰⁻² مترکلوین. صورتِ وارونِ پلانک است. با λ به متر، حاصل کلوین است."
		},
		{
			id: "lambda",
			latex: "\\lambda",
			name: "طول‌موج",
			explanation: "باید به متر باشد اگر c₁ و c₂ در SI باشند. جا انداختن تبدیل میکرومتر به متر، دما را بی‌معنی می‌کند. طول‌موج مؤثر باند را بگذار، نه مرکز اسمی را اگر فرقشان مهم است."
		},
		{
			id: "c1",
			latex: "c_1",
			name: "ثابت اول تابش",
			explanation: "c₁ = 2hc² ≈ ۱٫۱۹۱×۱۰⁻¹⁶ وات‌مترمربع. همان صورت قانون پلانک، پیش از تقسیم بر λ⁵."
		},
		{
			id: "L",
			latex: "L",
			name: "رادیانسی که وارون می‌شود",
			explanation: "اگر L را خودِ سطح نداده باشد، T_b دمای سطح نیست. گسیلندگی کمتر از یک، L را کوچک می‌کند و T_b را سردتر از واقع نشان می‌دهد."
		}
	],
	derivationNotes: "از B = c₁ λ⁻⁵ / (e^{c₂/λT} − 1) بنویس L = B، مخرج را جدا کن، دو طرف را وارون کن، یک را اضافه کن، لگاریتم بگیر و T را بیاور بالا.",
	relatedLabs: ["blackbody"],
	relatedMath: ["exponentials", "solving"]
};
var cosine_law_exports = /* @__PURE__ */ __exportAll({ cosineLaw: () => cosineLaw });
var cosineLaw = {
	kind: "formula",
	id: "cosine-law",
	title: "قانون کسینوس برای تابش فرودی",
	summary: "همان باریکه، روی سطح کج، روی مساحت بیشتری پخش می‌شود.",
	tokens: [
		sym("E"),
		tex("="),
		sym("E0", "E_0"),
		sym("mu", "\\cos\\theta_s")
	],
	parts: [
		{
			id: "E",
			latex: "E",
			name: "تابش روی سطح",
			explanation: "توان فرودی بر واحد سطح افقی محلی، یا بر واحد سطح خود هدف اگر θ از خط عمود سطح سنجیده شود. واحدش وات بر مترمربع است، اغلب بر واحد طول‌موج اگر طیفی باشد."
		},
		{
			id: "E0",
			latex: "E_0",
			name: "تابش عمود",
			explanation: "تابشی که اگر سطح رو به چشمه باشد به آن می‌رسد. در بالای جو برای خورشید، این همان E_sun باند است. پایین جو باید عبور هم در آن نشسته باشد."
		},
		{
			id: "mu",
			latex: "\\cos\\theta_s",
			name: "کسینوس زنیت",
			explanation: "θ_s زاویه از سمت‌الرأس است، نه از افق. صفر یعنی خورشید بالای سر و کسینوس یک. در ۶۰ درجه انرژی روی سطح نصف می‌شود. کسینوس را با درجه حساب نکن."
		}
	],
	derivationNotes: "توان باریکه ثابت است. سطح کج مساحت بزرگ‌تری از جبهه‌ی موج را می‌پوشاند: dA_surface = dA_beam / cosθ. پس توان بر واحد سطح در cosθ ضرب می‌شود.",
	relatedLabs: ["ndvi"],
	relatedMath: ["vectors"]
};
var doppler_exports = /* @__PURE__ */ __exportAll({ doppler: () => doppler });
var doppler = {
	kind: "formula",
	id: "doppler",
	title: "جابه‌جایی دوپلر",
	summary: "نزدیک شدن طول‌موج را کوتاه می‌کند، دور شدن بلند.",
	tokens: [
		tex("\\frac{"),
		sym("dlambda", "\\Delta\\lambda"),
		tex("}{"),
		sym("lambda", "\\lambda"),
		tex("}=\\frac{"),
		sym("vr", "v_r"),
		tex("}{"),
		sym("c"),
		tex("}")
	],
	parts: [
		{
			id: "dlambda",
			latex: "\\Delta\\lambda",
			name: "جابه‌جایی طول‌موج",
			explanation: "تفاوت طول‌موج دریافتی با طول‌موج فرستاده‌شده. در این قرارداد، دور شدن هدف طول‌موج را زیاد می‌کند و Δλ مثبت است."
		},
		{
			id: "lambda",
			latex: "\\lambda",
			name: "طول‌موج حامل",
			explanation: "طول‌موجی که سنجنده فرستاده یا انتظار دارد. جابه‌جایی نسبی است: یک سرعت مشخص، در طول‌موج بلندتر، Δλ بزرگ‌تری به متر می‌دهد."
		},
		{
			id: "vr",
			latex: "v_r",
			name: "سرعت شعاعی",
			explanation: "فقط مؤلفه‌ی سرعت در راستای دید. حرکت کاملاً مماسی، در این تقریب، جابه‌جایی نمی‌دهد. رادار با همین مؤلفه سرعت سطح یا موقعیت در راستای آزیموت را می‌سازد."
		},
		{
			id: "c",
			latex: "c",
			name: "سرعت نور",
			explanation: "چون v_r خیلی کوچک‌تر از c است، تقریب غیرنسبیتی کافی است. برای ماهواره‌ی پایین، v/c از مرتبه‌ی ۱۰⁻⁵ است."
		}
	],
	derivationNotes: "برای رفت‌وبرگشت رادار، جابه‌جایی بسامد تقریباً دو برابر حالت یک‌طرفه است: Δf/f ≈ 2v_r/c. این فرمول شکل یک‌طرفه را نشان می‌دهد تا مفهوم قاطی نشود.",
	relatedLabs: ["orbit"]
};
var em_speed_exports = /* @__PURE__ */ __exportAll({ emSpeed: () => emSpeed });
var emSpeed = {
	kind: "formula",
	id: "em-speed",
	title: "سرعت نور از ثابت‌های خلأ",
	summary: "سرعت موج الکترومغناطیسی را ε₀ و μ₀ تعیین می‌کنند.",
	tokens: [
		sym("c"),
		tex("=\\dfrac{1}{\\sqrt{"),
		sym("mu", "\\mu_0"),
		sym("eps", "\\varepsilon_0"),
		tex("}}")
	],
	parts: [
		{
			id: "c",
			latex: "c",
			name: "سرعت نور",
			explanation: "همان سرعتی که در c = fλ هست. این‌جا از معادله‌ی موج درآمده، نه از یک تعریف جدا. عددش حدود ۳×۱۰⁸ متر بر ثانیه است."
		},
		{
			id: "mu",
			latex: "\\mu_0",
			name: "تراوایی خلأ",
			explanation: "مقاومت خلأ در برابر برپایی میدان مغناطیسی. بزرگ‌تر شدنش موج را کند می‌کند."
		},
		{
			id: "eps",
			latex: "\\varepsilon_0",
			name: "گذردهی خلأ",
			explanation: "مقاومت خلأ در برابر برپایی میدان الکتریکی. حاصل‌ضرب این دو زیر رادیکال، زمان‌مقیاس موج را می‌سازد."
		}
	],
	derivationNotes: "از حذف یکی از میدان‌ها بین فارادی و آمپر–ماکسول، ضریب جلوی ∇² برابر 1/(μ₀ε₀) می‌شود و این ضریب همان c² است.",
	relatedMath: ["derivatives"]
};
var gifov_exports = /* @__PURE__ */ __exportAll({ gifov: () => gifov });
var gifov = {
	kind: "formula",
	id: "gifov",
	title: "اندازه‌ی پیکسل روی زمین",
	summary: "زاویه‌ی دید آنی، ضرب در فاصله، می‌شود رد پیکسل.",
	tokens: [
		sym("G"),
		tex("="),
		sym("h"),
		sym("beta", "\\beta")
	],
	parts: [
		{
			id: "G",
			latex: "G",
			name: "رد پیکسل",
			explanation: "پهنای زمینی که یک آشکارساز، در دید نادیر، یک‌جا می‌بیند. این حد هندسی است. تاری حرکت، پخش جو و بازنمونه‌برداری جداگانه‌اند و می‌توانند پیکسل مؤثر را درشت‌تر کنند."
		},
		{
			id: "h",
			latex: "h",
			name: "فاصله تا سطح",
			explanation: "برای دید عمودی همان ارتفاع است. در لبه‌ی تصویر مسیر مایل است و رد پیکسل کش می‌آید؛ این فرمول ساده آن تصحیح را ندارد."
		},
		{
			id: "beta",
			latex: "\\beta",
			name: "زاویه‌ی دید آنی",
			explanation: "بر حسب رادیان. اگر میلی‌رادیان داری، پیش از ضرب در ۱۰⁻³ ضرب کن. درجه را مستقیم در ارتفاع ضرب نکن."
		}
	],
	derivationNotes: "کمان کوچک: طول = شعاع × زاویه. این‌جا شعاع فاصله‌ی سنجنده تا سطح است و زاویه، میدان یک آشکارساز.",
	relatedLabs: ["orbit"],
	relatedMath: ["polar"]
};
var kepler_exports = /* @__PURE__ */ __exportAll({ kepler: () => kepler });
var kepler = {
	kind: "formula",
	id: "kepler",
	title: "قانون سوم کپلر",
	summary: "دوره‌ی تناوب را اندازه‌ی مدار تعیین می‌کند، نه جرم ماهواره.",
	tokens: [
		sym("T", "T^{2}"),
		tex("=\\frac{4\\pi^{2}}{"),
		sym("G"),
		sym("M"),
		tex("}"),
		sym("a", "a^{3}")
	],
	parts: [
		{
			id: "T",
			latex: "T",
			name: "دوره‌ی تناوب",
			explanation: "زمان یک دور کامل به دور زمین. در مدار دایره‌ای پایین، حدود ۹۰ دقیقه است. در مدار زمین‌آهنگ با چرخش زمین یکی می‌شود: حدود ۲۳ ساعت و ۵۶ دقیقه."
		},
		{
			id: "G",
			latex: "G",
			name: "ثابت گرانش",
			explanation: "۶٫۶۷۴×۱۰⁻¹¹ در یکاهای SI. در کار مداری معمولاً حاصل GM را یکجا با نماد μ می‌نویسند تا از عدم قطعیت G جدا شود."
		},
		{
			id: "M",
			latex: "M",
			name: "جرم زمین",
			explanation: "جرم جسم مرکزی. جرم خود ماهواره در این قانون نیست، به شرطی که خیلی کوچک‌تر از زمین باشد. GM زمین حدود ۳٫۹۸۶×۱۰¹⁴ مترمکعب بر مجذور ثانیه است."
		},
		{
			id: "a",
			latex: "a",
			name: "نیم‌قطر بزرگ",
			explanation: "نصف قطر بلند بیضی، به متر. برای مدار دایره‌ای همان شعاع مدار است: شعاع زمین به‌علاوه‌ی ارتفاع. توان سوم این‌جاست، پس بالا رفتن مدار دوره را تند زیاد می‌کند."
		}
	],
	derivationNotes: "از برابری نیروی گرانش و شتاب مرکزگرا در مدار دایره‌ای، یا از قانون مساحت‌ها در بیضی. نتیجه‌ی آموزشی‌اش این است: ارتفاع را که انتخاب کردی، دوره دیگر انتخابی نیست.",
	relatedLabs: ["orbit"],
	relatedMath: ["polar"]
};
var lambert_exports = /* @__PURE__ */ __exportAll({ lambert: () => lambert });
var lambert = {
	kind: "formula",
	id: "lambert",
	title: "سطح لامبرتی",
	summary: "اگر سطح کاملاً پخشنده باشد، BRDF ثابت است.",
	tokens: [
		sym("fr", "f_r"),
		tex("=\\frac{"),
		sym("rho", "\\rho"),
		tex("}{"),
		sym("pi", "\\pi"),
		tex("}")
	],
	parts: [
		{
			id: "fr",
			latex: "f_r",
			name: "BRDF ثابت",
			explanation: "برای سطح لامبرتی به جهت بستگی ندارد. رادیانس بازتابیده از هر سو یکی به نظر می‌رسد، هرچند ایرَدیانس روی سطح با کسینوس زاویه کم می‌شود."
		},
		{
			id: "rho",
			latex: "\\rho",
			name: "بازتابندگی نیم‌کره‌ای",
			explanation: "کسری از توان فرودی که به کل نیم‌کره‌ی بالا برمی‌گردد. عددی بین صفر و یک. برگ، خاک و بتن اغلب با همین یک عدد تقریب زده می‌شوند، هرچند دقیق نیستند."
		},
		{
			id: "pi",
			latex: "\\pi",
			name: "انتگرال کسینوس",
			explanation: "از انتگرال cosθ روی نیم‌کره می‌آید و برابر π استرادیان است. به همین خاطر L = ρE/π، نه L = ρE. جا انداختن π خطاهای رادیومتری رایج است."
		}
	],
	derivationNotes: "اگر f_r ثابت باشد و انتگرال f_r cosθ dω روی نیم‌کره برابر ρ شود، آن وقت f_r = ρ/π.",
	relatedLabs: ["ndvi", "atmosphere"],
	relatedMath: ["integrals"]
};
var maxwell_ampere_exports = /* @__PURE__ */ __exportAll({ maxwellAmpere: () => maxwellAmpere });
var maxwellAmpere = {
	kind: "formula",
	id: "maxwell-ampere",
	title: "آمپر–ماکسول",
	summary: "جریان و تغییر میدان الکتریکی، میدان مغناطیسی می‌سازند.",
	tokens: [
		sym("curl", "\\nabla\\times"),
		sym("B", "\\mathbf{B}"),
		tex("="),
		sym("mu", "\\mu_0"),
		sym("J", "\\mathbf{J}"),
		tex("+"),
		sym("mu", "\\mu_0"),
		sym("eps", "\\varepsilon_0"),
		tex("\\frac{\\partial"),
		sym("E", "\\mathbf{E}"),
		tex("}{\\partial"),
		sym("t"),
		tex("}")
	],
	parts: [
		{
			id: "curl",
			latex: "\\nabla\\times",
			name: "تاو",
			explanation: "همان چرخش میدان. این‌جا روی B نشسته: جریان و تغییر E دور خودشان B می‌سازند."
		},
		{
			id: "B",
			latex: "\\mathbf{B}",
			name: "میدان مغناطیسی",
			explanation: "حاصل سمت راست. در فضای خالی، فقط جمله‌ی دوم می‌ماند و B را تغییر E تغذیه می‌کند."
		},
		{
			id: "mu",
			latex: "\\mu_0",
			name: "تراوایی خلأ",
			explanation: "۱٫۲۵۷×۱۰⁻⁶ هنری بر متر. شدت پاسخ مغناطیسی خلأ. همراه ε₀ سرعت نور را می‌دهد."
		},
		{
			id: "J",
			latex: "\\mathbf{J}",
			name: "چگالی جریان",
			explanation: "بار در حال حرکت، در واحد سطح. در خلأ بین ماهواره و زمین معمولاً صفر است و موج آزاد منتشر می‌شود."
		},
		{
			id: "eps",
			latex: "\\varepsilon_0",
			name: "گذردهی خلأ",
			explanation: "در جمله‌ی جریان جابه‌جایی ظاهر می‌شود. بدون این جمله، معادله‌ها موج الکترومغناطیسی نمی‌دهند."
		},
		{
			id: "E",
			latex: "\\mathbf{E}",
			name: "میدان الکتریکی",
			explanation: "تغییر زمانی E، حتی بدون سیم و جریان، چشمه‌ی B است. این جمله‌ی ماکسول است که آمپر کم داشت."
		},
		{
			id: "t",
			latex: "t",
			name: "زمان",
			explanation: "مشتق زمانی E. اگر E ثابت باشد و جریانی هم نباشد، سمت راست صفر است."
		}
	],
	derivationNotes: "در فضای تهی ρ و J صفرند. ترکیب این معادله با فارادی، برای هر مؤلفه‌ی میدان، معادله‌ی موج ∂²/∂t² = c²∇² را می‌دهد.",
	relatedMath: ["derivatives", "vectors"]
};
var maxwell_faraday_exports = /* @__PURE__ */ __exportAll({ maxwellFaraday: () => maxwellFaraday });
var maxwellFaraday = {
	kind: "formula",
	id: "maxwell-faraday",
	title: "فارادی",
	summary: "تغییر میدان مغناطیسی، میدان الکتریکی می‌سازد.",
	tokens: [
		sym("curl", "\\nabla\\times"),
		sym("E", "\\mathbf{E}"),
		tex("=-\\frac{\\partial"),
		sym("B", "\\mathbf{B}"),
		tex("}{\\partial"),
		sym("t"),
		tex("}")
	],
	parts: [
		{
			id: "curl",
			latex: "\\nabla\\times",
			name: "تاو",
			explanation: "میزان چرخش میدان دور یک نقطه. تاو غیرصفر یعنی اگر یک حلقه‌ی کوچک این‌جا بگذاری، میدان در امتداد حلقه جمع نمی‌شود و یک نیروی محرکه می‌ماند."
		},
		{
			id: "E",
			latex: "\\mathbf{E}",
			name: "میدان الکتریکی",
			explanation: "این‌جا E را بار نساخته؛ تغییر B ساخته است. در موج، همین جفت‌شدگی E و B است که انتشار را ممکن می‌کند."
		},
		{
			id: "B",
			latex: "\\mathbf{B}",
			name: "میدان مغناطیسی",
			explanation: "اگر B با زمان عوض شود، دور آن یک E حلقوی پدید می‌آید. علامت منفی قانون لنز است: اثر، با علت مخالفت می‌کند."
		},
		{
			id: "t",
			latex: "t",
			name: "زمان",
			explanation: "مشتق نسبت به زمان است، نه نسبت به مکان. میدان ایستا موج نمی‌سازد؛ تغییر زمانی لازم است."
		}
	],
	relatedMath: ["derivatives", "vectors"]
};
var maxwell_gauss_b_exports = /* @__PURE__ */ __exportAll({ maxwellGaussB: () => maxwellGaussB });
var maxwellGaussB = {
	kind: "formula",
	id: "maxwell-gauss-b",
	title: "گاوس برای میدان مغناطیسی",
	summary: "تک‌قطبی مغناطیسی وجود ندارد.",
	tokens: [
		sym("div", "\\nabla\\cdot"),
		sym("B", "\\mathbf{B}"),
		tex("=0")
	],
	parts: [{
		id: "div",
		latex: "\\nabla\\cdot",
		name: "واگرایی",
		explanation: "اگر واگرایی B همه‌جا صفر باشد، خطوط میدان مغناطیسی بسته هستند. شروع و پایان ندارند."
	}, {
		id: "B",
		latex: "\\mathbf{B}",
		name: "میدان مغناطیسی",
		explanation: "در موج الکترومغناطیسی، B هم عمود بر جهت انتشار است و هم عمود بر E. انرژی موج بین این دو میدان رد و بدل می‌شود."
	}],
	derivationNotes: "صفر سمت راست یعنی هیچ بار مغناطیسی‌ای در کار نیست. این تفاوت ساختاری E و B است.",
	relatedMath: ["vectors"]
};
var maxwell_gauss_e_exports = /* @__PURE__ */ __exportAll({ maxwellGaussE: () => maxwellGaussE });
var maxwellGaussE = {
	kind: "formula",
	id: "maxwell-gauss-e",
	title: "گاوس برای میدان الکتریکی",
	summary: "بار، چشمه‌ی میدان الکتریکی است.",
	tokens: [
		sym("div", "\\nabla\\cdot"),
		sym("E", "\\mathbf{E}"),
		tex("=\\frac{"),
		sym("rho", "\\rho"),
		tex("}{"),
		sym("eps", "\\varepsilon_0"),
		tex("}")
	],
	parts: [
		{
			id: "div",
			latex: "\\nabla\\cdot",
			name: "واگرایی",
			explanation: "میزان «بیرون‌زدن» میدان از یک نقطه. واگرایی مثبت یعنی چشمه، منفی یعنی چاه. روی یک میدان یکنواخت صفر است."
		},
		{
			id: "E",
			latex: "\\mathbf{E}",
			name: "میدان الکتریکی",
			explanation: "برداری که به بار نیروی F = qE وارد می‌کند. در موج الکترومغناطیسی، این بردار عمود بر جهت انتشار نوسان می‌کند."
		},
		{
			id: "rho",
			latex: "\\rho",
			name: "چگالی بار",
			explanation: "بار الکتریکی در واحد حجم. جایی که بار خالص نباشد، واگرایی E صفر است و خطوط میدان از آن نقطه شروع نمی‌شوند."
		},
		{
			id: "eps",
			latex: "\\varepsilon_0",
			name: "گذردهی خلأ",
			explanation: "۸٫۸۵×۱۰⁻¹² فاراد بر متر. می‌گوید خلأ در برابر برپایی میدان الکتریکی چقدر «نرم» است. همراه μ₀ سرعت نور را می‌سازد."
		}
	],
	relatedMath: ["vectors"]
};
var ndvi_exports = /* @__PURE__ */ __exportAll({ ndvi: () => ndvi$1 });
var ndvi$1 = {
	kind: "formula",
	id: "ndvi",
	title: "شاخص گیاهی تفاضلی نرمال",
	summary: "تفاوت سرخ و فروسرخ نزدیک، تقسیم بر جمعشان.",
	tokens: [
		sym("ndvi", "\\mathrm{NDVI}"),
		tex("=\\frac{"),
		sym("nir", "\\rho_{\\mathrm{NIR}}"),
		tex("-"),
		sym("red", "\\rho_{\\mathrm{red}}"),
		tex("}{"),
		sym("nir", "\\rho_{\\mathrm{NIR}}"),
		tex("+"),
		sym("red", "\\rho_{\\mathrm{red}}"),
		tex("}")
	],
	parts: [
		{
			id: "ndvi",
			latex: "\\mathrm{NDVI}",
			name: "شاخص",
			explanation: "عددی بی‌بعد، معمولاً بین −۱ و ۱. ویژگی فیزیکی بنیادی مثل رادیانس نیست؛ نسبتی از دو باند است تا روشنایی کلی تا حدی حذف شود."
		},
		{
			id: "nir",
			latex: "\\rho_{\\mathrm{NIR}}",
			name: "بازتاب فروسرخ نزدیک",
			explanation: "حدود ۰٫۸ میکرومتر. ساختار درونی برگ این باند را زیاد برمی‌گرداند. گیاه سالم این‌جا روشن است، حتی اگر در نور مرئی تیره به نظر برسد."
		},
		{
			id: "red",
			latex: "\\rho_{\\mathrm{red}}",
			name: "بازتاب سرخ",
			explanation: "حدود ۰٫۶۵ میکرومتر. کلروفیل این نور را برای فتوسنتز جذب می‌کند، پس برگ سالم در سرخ تیره است. خاک معمولاً سرخ و فروسرخ را شبیه‌تر برمی‌گرداند."
		}
	],
	derivationNotes: "نرمال کردن با جمع دو باند، اثر یک ضریب روشنایی مشترک (مثل شیب ملایم یا سایه‌ی نازک) را کم می‌کند. ابر، خاک خیس و سایه‌ی غلیظ هنوز شاخص را جابه‌جا می‌کنند.",
	relatedLabs: ["ndvi"]
};
var optical_depth_exports = /* @__PURE__ */ __exportAll({ opticalDepth: () => opticalDepth });
var opticalDepth = {
	kind: "formula",
	id: "optical-depth",
	title: "عمق اپتیکی",
	summary: "جمع خاموشی در طول مسیر دید.",
	tokens: [
		sym("tau", "\\tau"),
		tex("=\\int_{0}^{s}"),
		sym("kappa", "\\kappa"),
		sym("rho", "\\rho"),
		tex("\\, ds")
	],
	parts: [
		{
			id: "tau",
			latex: "\\tau",
			name: "عمق اپتیکی",
			explanation: "بی‌بعد است. مسیر مایل از مسیر عمودی عمق بیشتری دارد، چون s بلندتر است. به همین خاطر خورشید در افق سرخ‌تر است."
		},
		{
			id: "kappa",
			latex: "\\kappa",
			name: "ضریب خاموشی جرمی",
			explanation: "سطح مقطع جذب به‌اضافه‌ی پراکندگی، به ازای واحد جرم. به جنس گاز یا ذره و به طول‌موج بستگی دارد. واحدش مترمربع بر کیلوگرم است."
		},
		{
			id: "rho",
			latex: "\\rho",
			name: "چگالی جرمی",
			explanation: "این ρ چگالی ماده‌ی جاذب است، کیلوگرم بر مترمکعب، نه بازتابندگی سطح. تشابه نمادها را قاطی نکن. حاصل κρ واحدش یک بر متر است."
		}
	],
	relatedLabs: ["atmosphere"],
	relatedMath: ["integrals"]
};
var orbit_velocity_exports = /* @__PURE__ */ __exportAll({ orbitVelocity: () => orbitVelocity });
var orbitVelocity = {
	kind: "formula",
	id: "orbit-velocity",
	title: "سرعت مدار دایره‌ای",
	summary: "هرچه بالاتر، آهسته‌تر.",
	tokens: [
		sym("v"),
		tex("=\\sqrt{\\frac{"),
		sym("G"),
		sym("M"),
		tex("}{"),
		sym("r"),
		tex("}}")
	],
	parts: [
		{
			id: "v",
			latex: "v",
			name: "سرعت مداری",
			explanation: "تندی مماسی نسبت به مرکز زمین. در مدار ۴۰۰ کیلومتری حدود ۷٫۷ کیلومتر بر ثانیه است. این سرعتِ روی زمین نیست؛ زمین هم زیر ماهواره می‌چرخد."
		},
		{
			id: "G",
			latex: "G",
			name: "ثابت گرانش",
			explanation: "همراه M فقط به صورت حاصل‌ضرب GM وارد می‌شود."
		},
		{
			id: "M",
			latex: "M",
			name: "جرم زمین",
			explanation: "جرم مرکزی. اگر سیاره عوض شود سرعت عوض می‌شود. جرم ماهواره دوباره غایب است."
		},
		{
			id: "r",
			latex: "r",
			name: "شعاع مدار",
			explanation: "فاصله از مرکز زمین، نه از سطح. فراموش کردن شعاع زمین (حدود ۶۳۷۱ کیلومتر) ارتفاع را با شعاع عوض می‌کند و سرعت را غلط می‌دهد."
		}
	],
	derivationNotes: "از GMm/r² = mv²/r جمله m حذف می‌شود. پس v = √(GM/r). مدار بالاتر، گرانش ضعیف‌تر و سرعت کمتر.",
	relatedLabs: ["orbit"],
	relatedMath: ["vectors"]
};
var photon_energy_exports = /* @__PURE__ */ __exportAll({ photonEnergy: () => photonEnergy });
var photonEnergy = {
	kind: "formula",
	id: "photon-energy",
	title: "انرژی فوتون",
	summary: "انرژی هر دانه نور فقط به بسامدش بستگی دارد.",
	tokens: [
		sym("E"),
		tex("="),
		sym("h"),
		sym("f"),
		tex("="),
		tex("\\frac{"),
		sym("h"),
		sym("c"),
		tex("}{"),
		sym("lambda", "\\lambda"),
		tex("}")
	],
	parts: [
		{
			id: "E",
			latex: "E",
			name: "انرژی فوتون",
			explanation: "انرژی یک دانه‌ی نور، نه شدت باریکه. شدت یعنی تعداد فوتون در ثانیه. دو باریکه‌ی هم‌رنگ با شدت متفاوت، فوتون‌هایی با انرژی یکسان دارند."
		},
		{
			id: "h",
			latex: "h",
			name: "ثابت پلانک",
			explanation: "۶٫۶۲۶×۱۰⁻³⁴ ژول‌ثانیه. پل بین تصویر موجی و تصویر ذره‌ای نور."
		},
		{
			id: "f",
			latex: "f",
			name: "بسامد",
			explanation: "فوتون آبی‌تر، بسامد بالاتر و انرژی بیشتر دارد. فوتون حرارتی خیلی کم‌انرژی است و سنجنده باید آن را با دقت جمع کند."
		},
		{
			id: "c",
			latex: "c",
			name: "سرعت نور",
			explanation: "برای نوشتن انرژی بر حسب طول‌موج، از f = c/λ استفاده می‌شود."
		},
		{
			id: "lambda",
			latex: "\\lambda",
			name: "طول‌موج",
			explanation: "در مخرج است: طول‌موج کوتاه‌تر، انرژی بیشتر. به همین دلیل پراکندگی و جذب در آبی و فرابنفش شدیدتر از فروسرخ نزدیک‌اند."
		}
	],
	relatedLabs: ["wave"],
	relatedMath: []
};
var planck_exports = /* @__PURE__ */ __exportAll({ planck: () => planck });
var planck = {
	kind: "formula",
	id: "planck",
	title: "قانون پلانک",
	summary: "طیف گسیل جسم سیاه فقط به دما و طول‌موج بستگی دارد.",
	tokens: [
		sym("B", "B_{\\lambda}(T)"),
		tex("="),
		tex("\\frac{2"),
		sym("h"),
		sym("c", "c^{2}"),
		tex("}{"),
		sym("lambda", "\\lambda^{5}"),
		tex("}\\frac{1}{e^{"),
		sym("h"),
		sym("c"),
		tex("/"),
		sym("lambda", "\\lambda"),
		sym("k"),
		sym("T"),
		tex("}-1}")
	],
	parts: [
		{
			id: "B",
			latex: "B_{\\lambda}(T)",
			name: "درخشندگی طیفی",
			explanation: "رادیانسی که جسم سیاه در طول‌موج λ و دمای T گسیل می‌کند: توان بر واحد سطح، بر واحد زاویه‌ی فضایی، بر واحد طول‌موج. با λ به متر، واحدش وات بر مترمربع بر استرادیان بر متر است."
		},
		{
			id: "h",
			latex: "h",
			name: "ثابت پلانک",
			explanation: "۶٫۶۲۶×۱۰⁻³⁴ ژول‌ثانیه. انرژی فوتون hν است. همین ثابت جلوی واگرایی کلاسیک در طول‌موج کوتاه را می‌گیرد."
		},
		{
			id: "c",
			latex: "c",
			name: "سرعت نور",
			explanation: "۲٫۹۹۸×۱۰⁸ متر بر ثانیه. همراه h مقیاس انرژی hc/λ را می‌سازد."
		},
		{
			id: "lambda",
			latex: "\\lambda",
			name: "طول‌موج",
			explanation: "هم به توان پنج در مخرج است و هم داخل نما. برای همین منحنی هم جابه‌جا می‌شود و هم شکلش عوض می‌شود. قله‌ی همین B_λ قانون وین است، نه قله‌ی طیف بر حسب بسامد."
		},
		{
			id: "k",
			latex: "k",
			name: "ثابت بولتزمن",
			explanation: "۱٫۳۸۱×۱۰⁻²³ ژول بر کلوین. دما را به انرژی ترجمه می‌کند. نسبت hc/λkT بی‌بعد است: فوتون نسبت به انرژی گرمایی چقدر گران است."
		},
		{
			id: "T",
			latex: "T",
			name: "دمای مطلق",
			explanation: "به کلوین. تنها ویژگی جسم سیاه که طیف را تعیین می‌کند. افزایش T قله را به طول‌موج کوتاه‌تر می‌برد و خروج کل انرژی را با توان چهارم زیاد می‌کند."
		}
	],
	derivationNotes: "شمارش حالت‌های موج در یک کاواک، با آمار بوز–اینشتین برای فوتون‌ها. انرژی میانگین هر حالت hf/(e^{hf/kT}−1) است. اگر hf خیلی کوچک‌تر از kT باشد به رایلی–جینز می‌رسیم؛ اگر خیلی بزرگ‌تر باشد، افت نمایی وین.",
	relatedLabs: ["blackbody"],
	relatedMath: ["exponentials", "derivatives"]
};
var radar_range_exports = /* @__PURE__ */ __exportAll({ radarRange: () => radarRange });
var radarRange = {
	kind: "formula",
	id: "radar-range",
	title: "تفکیک برد رادار",
	summary: "پهنای باند تپ، نه طول تپِ فشرده‌نشده، اندازه‌ی سلول برد را می‌سازد.",
	tokens: [
		sym("dr", "\\delta_r"),
		tex("=\\frac{"),
		sym("c"),
		tex("}{2\\,"),
		sym("B"),
		tex("}")
	],
	parts: [
		{
			id: "dr",
			latex: "\\delta_r",
			name: "تفکیک برد مایل",
			explanation: "کمترین اختلاف فاصله در راستای دید که دو هدف را جدا می‌کند. این برد مایل است. برد زمینی به زاویه‌ی فرود بستگی دارد و از این کوچک‌تر یا بزرگ‌تر دیده می‌شود."
		},
		{
			id: "c",
			latex: "c",
			name: "سرعت نور",
			explanation: "تپ با سرعت نور می‌رود و برمی‌گردد. در هوا تقریباً همان سرعت خلأ است."
		},
		{
			id: "B",
			latex: "B",
			name: "پهنای باند",
			explanation: "پهنای باند چیرپ، به هرتز. باند پهن‌تر، تپ فشرده کوتاه‌تر، سلول برد کوچک‌تر. ۱۰۰ مگاهرتز حدود ۱٫۵ متر می‌دهد. ضریب ۲ چون مسیر رفت‌وبرگشت است."
		}
	],
	derivationNotes: "تپ فشرده‌شده طول زمانی حدود ۱/B دارد. در این مدت نور c/B متر می‌رود، ولی هدف در رفت و برگشت دو برابر جابه‌جا به نظر می‌رسد، پس δr = c/(2B).",
	relatedLabs: [],
	relatedMath: []
};
var stefan_exports = /* @__PURE__ */ __exportAll({ stefan: () => stefan$1 });
var stefan$1 = {
	kind: "formula",
	id: "stefan",
	title: "استفان–بولتزمن",
	summary: "خروج کل انرژی جسم سیاه با توان چهارم دما زیاد می‌شود.",
	tokens: [
		sym("M"),
		tex("="),
		sym("sigma", "\\sigma"),
		sym("T", "T^{4}")
	],
	parts: [
		{
			id: "M",
			latex: "M",
			name: "خروج تابشی",
			explanation: "توان گسیل‌شده از واحد سطح به همه‌ی جهت‌ها و همه‌ی طول‌موج‌ها، با واحد وات بر مترمربع. این رادیانس طیفی نیست. برای جسم سیاه، رادیانس انتگرال‌گرفته L = M/π است."
		},
		{
			id: "sigma",
			latex: "\\sigma",
			name: "ثابت استفان–بولتزمن",
			explanation: "۵٫۶۷۰×۱۰⁻⁸ وات بر مترمربع بر کلوین به توان چهار. از انتگرال قانون پلانک روی همه‌ی طول‌موج‌ها و نیم‌کره درمی‌آید."
		},
		{
			id: "T",
			latex: "T^{4}",
			name: "توان چهارم دما",
			explanation: "دو برابر شدن دما، خروج انرژی را شانزده برابر می‌کند. خطای نسبی دما هم چهار برابر خودش به M نشت می‌کند: dM/M = 4 dT/T."
		}
	],
	relatedLabs: ["blackbody"],
	relatedMath: ["integrals", "derivatives"]
};
var toa_exports = /* @__PURE__ */ __exportAll({ toa: () => toa });
var toa = {
	kind: "formula",
	id: "toa",
	title: "بازتابندگی بالای جو",
	summary: "از رادیانس سنجنده به یک بازتاب بی‌بعد، پیش از تصحیح جو.",
	tokens: [
		sym("rho", "\\rho"),
		tex("=\\frac{\\pi\\,"),
		sym("L"),
		sym("d", "d^{2}"),
		tex("}{"),
		sym("Es", "E_{s}"),
		sym("mu", "\\cos\\theta_s"),
		tex("}")
	],
	parts: [
		{
			id: "rho",
			latex: "\\rho",
			name: "بازتابندگی ظاهری",
			explanation: "اگر جو نبود و سطح لامبرتی بود، این همان ρ سطح می‌شد. با جو، این بازتابندگی بالای جو است: سطح و مسیر قاطی‌اند. بی‌بعد است و مقایسه بین باندها را ممکن می‌کند."
		},
		{
			id: "L",
			latex: "L",
			name: "رادیانسی که سنجنده دیده",
			explanation: "بعد از تبدیل عدد خام با ضرایب کالیبراسیون. واحد باید با E_s یکی باشد، معمولاً وات بر مترمربع بر استرادیان بر میکرومتر. عدد دیجیتال را مستقیم در این فرمول نگذار."
		},
		{
			id: "d",
			latex: "d",
			name: "فاصله‌ی زمین–خورشید",
			explanation: "بر حسب واحد نجومی. در یک ژانویه حدود ۰٫۹۸۳ است و در یک ژوئیه حدود ۱٫۰۱۷. مربع می‌شود، پس چند درصد در تابش بالای جو اثر دارد. اگر ندانیش و ۱ بگذاری، برای کار آموزشی خطای کوچکی است."
		},
		{
			id: "Es",
			latex: "E_s",
			name: "تابش خورشید در باند",
			explanation: "میانگین برون‌جوِ طیف خورشید، وزن‌شده با پاسخ طیفی همان باند. هر باند عدد خودش را دارد. رادیانس برابر در دو باند، بازتاب برابر نیست."
		},
		{
			id: "mu",
			latex: "\\cos\\theta_s",
			name: "کسینوس زنیت خورشید",
			explanation: "هندسه‌ی تصویر را از بازتاب جدا می‌کند. بدون آن، ظهر روشن‌تر از عصر به نظر می‌رسد حتی اگر سطح یکی باشد."
		}
	],
	derivationNotes: "برای سطح لامبرتی L = ρ E cosθ / π. E در بالای جو برابر E_s / d² است. حل برای ρ همان فرمول بالاست. π از تعریف لامبرت می‌آید و نباید حذف شود.",
	relatedLabs: ["ndvi"],
	relatedMath: ["solving"]
};
var wave_speed_exports = /* @__PURE__ */ __exportAll({ waveSpeed: () => waveSpeed });
var waveSpeed = {
	kind: "formula",
	id: "wave-speed",
	title: "سرعت موج",
	summary: "بسامد و طول‌موج در یک محیط، یک حاصل‌ضرب ثابت دارند.",
	tokens: [
		sym("c"),
		tex("="),
		sym("f"),
		sym("lambda", "\\lambda")
	],
	parts: [
		{
			id: "c",
			latex: "c",
			name: "سرعت نور",
			explanation: "در خلأ ۲٫۹۹۸×۱۰⁸ متر بر ثانیه. در هوا تقریباً همین است. اگر محیط عوض شود سرعت عوض می‌شود، ولی برای مسیر ماهواره تا زمین همان مقدار خلأ را می‌گیریم."
		},
		{
			id: "f",
			latex: "f",
			name: "بسامد",
			explanation: "تعداد نوسان در یک ثانیه، با واحد هرتز. بسامد در عبور از محیط عوض نمی‌شود؛ چیزی که عوض می‌شود طول‌موج و سرعت است."
		},
		{
			id: "lambda",
			latex: "\\lambda",
			name: "طول‌موج",
			explanation: "فاصله‌ی دو قله‌ی متوالی. نور سبز حدود ۵۵۰ نانومتر است، فروسرخ حرارتی حدود ۱۰ میکرومتر، و یک رادار باند C حدود ۵ سانتی‌متر."
		}
	],
	derivationNotes: "از تعریف سرعت: موج در یک دوره به اندازه‌ی یک طول‌موج جلو می‌رود، پس c = λ / T و چون f = 1/T، نتیجه c = fλ است.",
	relatedLabs: ["wave"],
	relatedMath: []
};
var wien_exports = /* @__PURE__ */ __exportAll({ wien: () => wien });
var wien = {
	kind: "formula",
	id: "wien",
	title: "قانون جابه‌جایی وین",
	summary: "جسم داغ‌تر، قله‌ی طیفش در طول‌موج کوتاه‌تر است.",
	tokens: [
		sym("lambda", "\\lambda_{\\max}"),
		sym("T"),
		tex("="),
		sym("b")
	],
	parts: [
		{
			id: "lambda",
			latex: "\\lambda_{\\max}",
			name: "طول‌موج قله",
			explanation: "طول‌موجی که B_λ در آن بیشینه است. برای خورشید حدود ۰٫۵ میکرومتر (سبز–آبی) و برای زمین حدود ۱۰ میکرومتر (فروسرخ حرارتی)."
		},
		{
			id: "T",
			latex: "T",
			name: "دمای مطلق",
			explanation: "در مخرجِ ضمنی نشسته: λ_max = b/T. دما که دو برابر شود، قله نصف می‌شود."
		},
		{
			id: "b",
			latex: "b",
			name: "ثابت وین",
			explanation: "حدود ۲۸۹۸ میکرومترکلوین. از مشتق‌گرفتن از قانون پلانک نسبت به λ و صفر گذاشتن آن به دست می‌آید. این ثابت برای طیفِ بر حسب طول‌موج است، نه بر حسب بسامد."
		}
	],
	derivationNotes: "∂B_λ/∂λ = 0 به یک معادله‌ی غیرجبری برای x = hc/λkT می‌رسد که جواب عددی‌اش x ≈ ۴٫۹۶۵ است. از همان‌جا b = hc/(k x).",
	relatedLabs: ["blackbody"],
	relatedMath: ["derivatives"]
};
var _01_introduction_exports = /* @__PURE__ */ __exportAll({ introduction: () => introduction });
var introduction = {
	kind: "lesson",
	slug: "introduction",
	title: "مقدمه و تعاریف",
	order: 1,
	summary: "سنجش از دور چیست و سه کمیتی که بقیه‌ی فرمول‌ها روی آن سوار می‌شوند.",
	prerequisites: [],
	blocks: [
		{
			type: "p",
			text: "سنجش از دور یعنی اندازه‌گیری انرژی الکترومغناطیسی که از سطح، جو، یا یک هدف می‌آید، بدون تماس با آن. سنجنده این انرژی را در یک یا چند بازه‌ی طول‌موج ثبت می‌کند. ما از روی شکل طیفی، جهت، و زمان رسیدن، ویژگی فیزیکی را حدس می‌زنیم."
		},
		{
			type: "h2",
			text: "فعال و غیرفعال"
		},
		{
			type: "ul",
			items: ["سنجنده‌ی غیرفعال فقط نوری را می‌گیرد که از جای دیگری آمده: خورشید، یا تابش گرمایی خود سطح. دوربین مرئی و سنجنده‌ی فروسرخ حرارتی از این دسته‌اند.", "سنجنده‌ی فعال خودش موج می‌فرستد و برگشت را می‌سنجد. رادار و لیدار این‌طور کار می‌کنند. زمان رفت‌وبرگشت فاصله را می‌دهد و شدت برگشت، ویژگی سطح را."]
		},
		{
			type: "h2",
			text: "سه کمیت که نباید قاطی شوند"
		},
		{
			type: "p",
			text: "تقریباً هر فرمول بعدی روی همین‌ها می‌ایستد. اسم ماهواره را بگذار برای بعد."
		},
		{
			type: "ul",
			items: [
				"انرژی، به ژول. خودِ چیزی که موج حمل می‌کند.",
				"توان، به وات. انرژی در واحد زمان. شار یعنی همین توان از یک سطح.",
				"رادیانس $L$: وات بر مترمربع بر استرادیان. توانی که از واحد سطح، در یک جهت مشخص، در یک زاویه‌ی فضایی کوچک می‌آید. سنجنده معمولاً همین را می‌بیند.",
				"ایرَدیانس $E$: وات بر مترمربع. توانی که روی یک سطح می‌نشیند، جمع همه‌ی جهت‌ها.",
				"بازتابندگی $\\rho$: کسری بین صفر و یک. چه سهمی از توان فرودی برمی‌گردد."
			]
		},
		{
			type: "note",
			text: "رادیانس به جهت بستگی دارد؛ ایرَدیانس نه. اگر این دو را یکی بگیری، ضریب π در سطح‌های پخشنده بی‌دلیل به نظر می‌رسد و بعداً خطا می‌دهد."
		},
		{
			type: "p",
			text: "یک سطح مات و پخشنده (لامبرتی) رادیانس تقریباً ثابتی به همه‌ی جهت‌ها می‌فرستد و رابطه‌اش با ایرَدیانس ساده است: $L = \\rho E / \\pi$. چرا π این‌جاست را در درس برهم‌کنش باز می‌کنیم."
		},
		{
			type: "quiz",
			id: "intro-basics"
		}
	]
};
var _02_waves_exports = /* @__PURE__ */ __exportAll({ waves: () => waves });
var waves = {
	kind: "lesson",
	slug: "waves",
	title: "موج الکترومغناطیسی",
	order: 2,
	summary: "نور، گرما و رادار یک موج‌اند. فرقشان طول‌موج است.",
	prerequisites: [],
	blocks: [
		{
			type: "p",
			text: "نور مرئی، فروسرخ، مایکروویو و امواج رادیویی یک خانواده‌اند: میدان الکتریکی و مغناطیسی که با هم، و عمود بر جهت انتشار، نوسان می‌کنند. چیزی که عوض می‌شود طول‌موج است، نه جنس موج."
		},
		{
			type: "h2",
			text: "یک موج، سه عدد"
		},
		{
			type: "formula",
			id: "wave-speed"
		},
		{
			type: "p",
			text: "بسامد را که زیاد کنی طول‌موج کوتاه می‌شود. حاصل‌ضربشان در خلأ ثابت است. بسامد در عبور از هوا عوض نمی‌شود؛ اگر سرعت کمی کم شود، طول‌موج هم کمی کوتاه می‌شود."
		},
		{
			type: "h2",
			text: "انرژی هر دانه"
		},
		{
			type: "p",
			text: "در اپتیک گاهی موج را پیوسته می‌بینیم و گاهی دانه‌دانه. انرژی هر فوتون فقط به بسامدش بسته است. شدت نور تعداد فوتون‌هاست، نه انرژی هر کدام."
		},
		{
			type: "formula",
			id: "photon-energy"
		},
		{
			type: "p",
			text: "فوتون آبی از فوتون فروسرخ پرانرژی‌تر است و فوتون حرارتی از هر دو کم‌انرژی‌تر. سنجنده‌ی حرارتی باید به انرژی خیلی کوچک حساس باشد. رادار معمولاً با تصویر موجی کار می‌کند، چون فوتون مایکروویو انرژی ناچیزی دارد و شمارش دانه‌دانه عملی نیست."
		},
		{
			type: "lab",
			id: "wave"
		},
		{
			type: "problem",
			id: "photon-bands"
		},
		{
			type: "quiz",
			id: "waves-basics"
		}
	]
};
var _03_radiation_exports = /* @__PURE__ */ __exportAll({ radiation: () => radiation });
var radiation = {
	kind: "lesson",
	slug: "radiation",
	title: "ماکسول و تابش جسم سیاه",
	order: 3,
	summary: "موج از کجا می‌آید، و طیف یک جسم فقط با دما چطور عوض می‌شود.",
	prerequisites: ["exponentials", "derivatives"],
	blocks: [
		{
			type: "h2",
			text: "چهار معادله"
		},
		{
			type: "p",
			text: "میدان الکتریکی و مغناطیسی از بار و جریان زاده می‌شوند و یکدیگر را هم تغذیه می‌کنند. موج الکترومغناطیسی جواب این معادله‌ها در فضای تهی است، نه یک فرض اضافه."
		},
		{
			type: "formula",
			id: "maxwell-gauss-e"
		},
		{
			type: "formula",
			id: "maxwell-gauss-b"
		},
		{
			type: "formula",
			id: "maxwell-faraday"
		},
		{
			type: "formula",
			id: "maxwell-ampere"
		},
		{
			type: "math",
			primer: "vectors",
			text: "واگرایی و تاو، عملگرهای برداری‌اند. اگر ضرب داخلی و خارجی هنوز دستت نیست، همین یادداشت کوتاه بس است."
		},
		{
			type: "p",
			text: "وقتی بار و جریانی در مسیر نباشد، این چهار معادله یک معادله‌ی موج می‌سازند. سرعت آن موج از دو ثابت خلأ درمی‌آید."
		},
		{
			type: "formula",
			id: "em-speed"
		},
		{
			type: "h2",
			text: "جسم سیاه"
		},
		{
			type: "p",
			text: "جسم سیاه ایده‌آلی است که هر تابشی به آن بخورد را کامل جذب می‌کند، و طیف گسیلش فقط تابع دماست. خورشید، زمین و حتی یک برگ تقریب‌هایی از همین رفتارند، ضرب در یک گسیلندگی که از یک کوچک‌تر است."
		},
		{
			type: "math",
			primer: "exponentials",
			text: "در قانون پلانک یک تابع نمایی در مخرج است. اگر شکل $e^{x}$ برایت آشنا نیست، اول این بخش را ببین."
		},
		{
			type: "formula",
			id: "planck"
		},
		{
			type: "p",
			text: "دو حد این فرمول را خوب است بشناسی. در طول‌موج خیلی بلند، مخرج تقریباً خطی می‌شود و به تقریب رایلی–جینز می‌رسیم. در طول‌موج کوتاه، جمله‌ی نمایی غول می‌شود و تابش فرو می‌ریزد. فیزیک کلاسیک همین‌جا غلط و بی‌نهایت جواب می‌داد."
		},
		{
			type: "formula",
			id: "wien"
		},
		{
			type: "formula",
			id: "stefan"
		},
		{
			type: "math",
			primer: "derivatives",
			text: "قله‌ی وین از صفر گذاشتن مشتق پلانک می‌آید، و حساسیت استفان–بولتزمن از مشتق $T^{4}$."
		},
		{
			type: "p",
			text: "وین می‌گوید با داغ‌تر شدن جسم، قله به طول‌موج کوتاه‌تر می‌رود. استفان–بولتزمن می‌گوید کل انرژی گسیل‌شده با توان چهارم دما زیاد می‌شود: دو برابر شدن دما، شانزده برابر شدن خروج انرژی."
		},
		{
			type: "lab",
			id: "blackbody"
		},
		{
			type: "h2",
			text: "همین رابطه‌ها را با عدد حل کن"
		},
		{
			type: "problem",
			id: "wien-peaks"
		},
		{
			type: "problem",
			id: "stefan-sensitivity"
		},
		{
			type: "problem",
			id: "brightness-temp"
		},
		{
			type: "quiz",
			id: "radiation-basics"
		}
	]
};
var _04_interaction_exports = /* @__PURE__ */ __exportAll({ interaction: () => interaction });
var interaction = {
	kind: "lesson",
	slug: "interaction",
	title: "برهم‌کنش با ماده",
	order: 4,
	summary: "جذب، پراکندگی، بازتاب جهت‌دار، و یک شاخص ساده از دو باند.",
	prerequisites: [],
	blocks: [
		{
			type: "h2",
			text: "سه سرنوشت"
		},
		{
			type: "p",
			text: "موجی که به سطح یا به یک لایه می‌رسد سه کار می‌تواند بکند: جذب شود، عبور کند، یا پراکنده و بازتاب شود. پایستگی انرژی می‌گوید این سه کسر روی هم یک می‌شوند. آنچه سنجنده‌ی غیرفعال اپتیکی می‌بیند، عمدتاً بخشی است که به سمت او پراکنده شده."
		},
		{
			type: "ul",
			items: [
				"جذب: انرژی به گرما یا به یک گذار مولکولی تبدیل می‌شود. کلروفیل در سرخ قوی جذب می‌کند. آب در چند باند فروسرخ تقریباً سیاه است.",
				"پراکندگی: جهت عوض می‌شود، طول‌موج معمولاً نه. ذرات ریز (جو) آبی را بیشتر می‌پراکنند. ذرات درشت‌تر همه‌ی رنگ‌ها را شبیه‌تر پراکنده می‌کنند.",
				"بازتاب سطح: همان پراکندگی، اما از مرز یک محیط چگال. جهت فرود و زبری سطح تعیین می‌کنند نور به کدام سو برود."
			]
		},
		{
			type: "h2",
			text: "جهت مهم است"
		},
		{
			type: "p",
			text: "سطح واقعی در همه‌ی جهت‌ها یکسان برنمی‌گرداند. خاک شخم‌خورده، تاج درخت، و بام فلزی سه تابع متفاوت دارند. BRDF همین وابستگی به جهت فرود و جهت دید است."
		},
		{
			type: "formula",
			id: "brdf"
		},
		{
			type: "p",
			text: "اگر سطح را کاملاً مات و پخشنده فرض کنیم، این تابع ثابت می‌شود و فقط به بازتابندگی نیم‌کره‌ای بند است."
		},
		{
			type: "formula",
			id: "lambert"
		},
		{
			type: "math",
			primer: "integrals",
			text: "آن π از جمع کسینوس روی نیم‌کره می‌آید. اگر انتگرال برایت فقط نماد است، یادداشت کوتاه انتگرال کافی است."
		},
		{
			type: "h2",
			text: "دو باند، یک شاخص"
		},
		{
			type: "p",
			text: "برگ سالم در سرخ تیره است و در فروسرخ نزدیک روشن. خاک این دو باند را شبیه‌تر برمی‌گرداند. تفاوت تقسیم بر جمع، یک شاخص بی‌بعد می‌سازد که روشنایی مشترک را تا حدی خط می‌زند."
		},
		{
			type: "formula",
			id: "ndvi"
		},
		{
			type: "note",
			text: "NDVI رادیانس نیست و واحد فیزیکی ندارد. ابر، سایه‌ی غلیظ و خاک خیس آن را جابه‌جا می‌کنند. عدد را بدون نگاه به صحنه تفسیر نکن."
		},
		{
			type: "lab",
			id: "ndvi"
		},
		{
			type: "h2",
			text: "از رادیانس تا شاخص، با عدد"
		},
		{
			type: "problem",
			id: "lambert-cosine"
		},
		{
			type: "problem",
			id: "toa-reflectance"
		},
		{
			type: "problem",
			id: "ndvi-ratio"
		},
		{
			type: "quiz",
			id: "interaction-basics"
		}
	]
};
var _05_atmosphere_exports = /* @__PURE__ */ __exportAll({ atmosphere: () => atmosphere });
var atmosphere = {
	kind: "lesson",
	slug: "atmosphere",
	title: "مسیر تابش در جو",
	order: 5,
	summary: "جو هم نور را کم می‌کند و هم نور اضافه به مسیر می‌ریزد.",
	prerequisites: ["exponentials", "integrals"],
	blocks: [
		{
			type: "p",
			text: "بین خورشید و سطح، و بین سطح و سنجنده، جو هست. مولکول و ذره هم جذب می‌کنند و هم نور را به جهت‌های دیگر می‌پراکنند. عددی که سنجنده می‌خواند بازتاب خود سطح نیست."
		},
		{
			type: "h2",
			text: "خاموشی نمایی"
		},
		{
			type: "math",
			primer: "integrals",
			text: "عمق اپتیکی جمع خاموشی در طول مسیر است. اگر انتگرال را فقط «مساحت زیر منحنی» بلدی، برای این درس کافی است."
		},
		{
			type: "formula",
			id: "optical-depth"
		},
		{
			type: "formula",
			id: "beer"
		},
		{
			type: "math",
			primer: "exponentials",
			text: "عبور $e^{-\\tau}$ است. شاخه‌ی کاهشی تابع نمایی دقیقاً همین‌جاست."
		},
		{
			type: "p",
			text: "اگر عمق اپتیکی کوچک باشد، عبور تقریباً $1-\\tau$ است. اگر بزرگ باشد تقریباً هیچ نور مستقیمی نمی‌رسد و آنچه می‌بینی عمدتاً نور پراکنده است. مسیر مایل، مثل خورشید در افق، $s$ بلندتری دارد و τ بزرگ‌تری."
		},
		{
			type: "h2",
			text: "یک مدل آموزشی، نه یک تصحیح عملیاتی"
		},
		{
			type: "p",
			text: "برای فهمیدن، درخشندگی در سنجنده را دو تکه بگیر: نوری که از سطح آمده و در راه ضعیف شده، به‌اضافه‌ی نوری که خود جو به سمت سنجنده پراکنده است."
		},
		{
			type: "p",
			text: "$L = L_{\\mathrm{path}} + T \\, L_{\\mathrm{surface}}$"
		},
		{
			type: "p",
			text: "در آزمایش این درس، سطح را لامبرتی و روشنایی را طوری مقیاس کرده‌ایم که رادیانس سطح همان $\\rho$ باشد. عبور $T = e^{-\\tau}$ است و نور مسیر را متناسب با $1-T$ گرفته‌ایم. این مدل وارون‌سازی واقعی جو نیست؛ فقط جهت خطا را نشان می‌دهد."
		},
		{
			type: "ul",
			items: [
				"هدف تیره روشن‌تر از واقع دیده می‌شود، چون نور مسیر به آن اضافه شده.",
				"هدف روشن تیره‌تر دیده می‌شود، چون بخشی از نورش در راه جذب یا پراکنده شده.",
				"کنتراست صحنه فشرده می‌شود. تصحیح اتمسفری یعنی جدا کردن این دو تکه."
			]
		},
		{
			type: "lab",
			id: "atmosphere"
		},
		{
			type: "problem",
			id: "beer-path"
		},
		{
			type: "quiz",
			id: "atmosphere-basics"
		}
	]
};
var _06_orbit_exports = /* @__PURE__ */ __exportAll({ orbit: () => orbit });
var orbit = {
	kind: "lesson",
	slug: "orbit",
	title: "مدار ماهواره",
	order: 6,
	summary: "ارتفاع، دوره و سرعت از گرانش می‌آیند. دوپلر فقط سرعت در راستای دید را می‌بیند.",
	prerequisites: ["polar"],
	blocks: [
		{
			type: "p",
			text: "ماهواره روی یک بیضی می‌گردد که یکی از کانون‌هایش مرکز زمین است. ارتفاع را که انتخاب کردی، دوره و سرعت دیگر آزاد نیستند. انتخاب مدار یعنی انتخاب اینکه هر چند وقت یک‌بار از بالای یک نقطه بگذری و با چه سرعتی صحنه را جارو کنی."
		},
		{
			type: "math",
			primer: "polar",
			text: "مدار در صفحه با شعاع و زاویه وصف می‌شود. اگر مختصات قطبی برایت دور است، یک نگاه به یادداشتش کافی است."
		},
		{
			type: "formula",
			id: "kepler"
		},
		{
			type: "formula",
			id: "orbit-velocity"
		},
		{
			type: "p",
			text: "برای مدار دایره‌ای، نیم‌قطر بزرگ همان شعاع مدار است: شعاع زمین به‌علاوه‌ی ارتفاع. شعاع زمین را جا نینداز؛ ۴۰۰ کیلومتر ارتفاع یعنی حدود ۶۷۷۰ کیلومتر فاصله از مرکز. هرچه بالاتر بروی کندتر حرکت می‌کنی و دوره بلندتر می‌شود. حدود ۳۶ هزار کیلومتر بالاتر از سطح، دوره با چرخش زمین یکی می‌شود. این مدار زمین‌آهنگ است."
		},
		{
			type: "note",
			text: "جرم ماهواره در این دو فرمول نیست. سرعت مداری سرعت روی نقشه نیست؛ زمین زیر مسیر هم می‌چرخد و رد زمینی از هر دو حرکت ساخته می‌شود."
		},
		{
			type: "h2",
			text: "دوپلر"
		},
		{
			type: "p",
			text: "اگر سنجنده و سطح در راستای دید به هم نزدیک یا دور شوند، بسامد برگشتی جابه‌جا می‌شود. حرکت کاملاً عرضی، در این تقریب، اثری ندارد. رادار این جابه‌جایی را به سرعت، یا در دهانه‌ی مصنوعی به موقعیت، تبدیل می‌کند."
		},
		{
			type: "formula",
			id: "doppler"
		},
		{
			type: "lab",
			id: "orbit"
		},
		{
			type: "problem",
			id: "orbit-pixel"
		},
		{
			type: "problem",
			id: "radar-range"
		},
		{
			type: "quiz",
			id: "orbit-basics"
		}
	]
};
var derivatives_exports = /* @__PURE__ */ __exportAll({ derivatives: () => derivatives });
var derivatives = {
	kind: "primer",
	slug: "derivatives",
	title: "مشتق و نرخ تغییر",
	order: 1,
	summary: "شیب لحظه‌ای، و این‌که چرا خطای دما در تابش چهار برابر می‌شود.",
	blocks: [
		{
			type: "p",
			text: "مشتق یعنی نرخ تغییر. اگر $y$ با $x$ عوض شود، مشتق $dy/dx$ می‌گوید به ازای یک قدم خیلی کوچک در $x$، ‏$y$ چقدر جابه‌جا می‌شود. روی نمودار، شیب خط مماس است."
		},
		{
			type: "p",
			text: "برای توان، قاعده ساده است: مشتق $x^{n}$ برابر $n x^{n-1}$ است. پس مشتق $T^{4}$ می‌شود $4T^{3}$. این همان حساسیت قانون استفان–بولتزمن است."
		},
		{
			type: "ul",
			items: ["تغییر مطلق: $\\Delta M \\approx 4\\sigma T^{3}\\,\\Delta T$. در دمای بالا، یک کلوین جابه‌جایی انرژی خیلی بیشتری می‌دهد.", "تغییر نسبی: $\\Delta M / M \\approx 4\\,\\Delta T / T$. درصد خطا در خروج انرژی، چهار برابر درصد خطا در دماست."]
		},
		{
			type: "widget",
			id: "stefan-slope"
		},
		{
			type: "p",
			text: "قله‌ی قانون وین هم از مشتق می‌آید: جایی که شیب منحنی پلانک نسبت به طول‌موج صفر شود، همان $\\lambda_{\\max}$ است. صفر بودن شیب یعنی قله یا دره، نه لزوماً مقدار صفر خود تابع."
		},
		{
			type: "h2",
			text: "یک کلوین روی زمین"
		},
		{
			type: "p",
			text: "سطح سیاه ۲۸۸ کلوین حدود $M = 390\\,\\mathrm{W/m^2}$ گسیل می‌کند. یک کلوین خطا یعنی $\\Delta T/T = 1/288$."
		},
		{
			type: "display",
			latex: "\\frac{\\Delta M}{M} \\approx 4 \\times \\frac{1}{288} = 1.39\\%"
		},
		{
			type: "p",
			text: "پس $\\Delta M \\approx 5.4\\,\\mathrm{W/m^2}$. درصد خطا در انرژی چهار برابر درصد خطا در دماست. حساب گام‌به‌گام، همراه با مقایسه‌ی خورشید، در حل مسئله است."
		},
		{
			type: "problem",
			id: "stefan-sensitivity"
		}
	]
};
var exponentials_exports = /* @__PURE__ */ __exportAll({ exponentials: () => exponentials });
var exponentials = {
	kind: "primer",
	slug: "exponentials",
	title: "تابع نمایی",
	order: 4,
	summary: "رشد و فروپاشی. بیر و پلانک هر دو همین‌جا نشسته‌اند.",
	blocks: [
		{
			type: "p",
			text: "تابع $e^{x}$ تنها تابعی است که مشتقش با خودش برابر است. با زیاد شدن $x$ تند بالا می‌رود. $e^{-x}$ همان منحنی است که وارونه شده: تند فرو می‌ریزد و به صفر نزدیک می‌شود، ولی در زمان محدود به صفر نمی‌رسد."
		},
		{
			type: "widget",
			id: "exp"
		},
		{
			type: "ul",
			items: [
				"قانون بیر عبور را $e^{-\\tau}$ می‌نویسد. τ که ۱ شود، حدود ۳۷٪ می‌ماند. τ که ۳ شود، حدود ۵٪.",
				"برای τ کوچک، $e^{-\\tau} \\approx 1-\\tau$. این تقریب خطی در جو صاف و باندهای پنجره‌ای به‌درد می‌خورد.",
				"در پلانک، نما $hc/\\lambda kT$ است. اگر این نسبت بزرگ باشد (فوتون گران نسبت به گرما)، مخرج عظیم می‌شود و تابش تقریباً قطع می‌شود."
			]
		},
		{
			type: "p",
			text: "لگاریتم وارون نماست. اگر $y = e^{-\\tau}$ باشد، آن‌گاه $\\tau = -\\ln y$. یعنی از روی عبور می‌شود عمق اپتیکی را خواند، به شرطی که فقط خاموشی در کار باشد و نور مسیر قاطی نشده باشد."
		},
		{
			type: "h2",
			text: "وارون، با یک عدد"
		},
		{
			type: "p",
			text: "عبور مستقیم ۰٫۷۲ را اندازه گرفته‌ای. لگاریتم طبیعی‌اش $-0.329$ است، پس عمق اپتیکی همان مسیر ۰٫۳۲۹ است. اگر $\\tau = 0.18$ را در مسیر قائم داشته باشی، عبور $e^{-0.18} = 0.835$ است. در زنیت ۶۰ درجه مسیر دو برابر می‌شود و عبور به ۰٫۷۰ می‌افتد."
		},
		{
			type: "display",
			latex: "\\tau = -\\ln 0.72 = 0.329"
		},
		{
			type: "problem",
			id: "beer-path"
		}
	]
};
var integrals_exports = /* @__PURE__ */ __exportAll({ integrals: () => integrals });
var integrals = {
	kind: "primer",
	slug: "integrals",
	title: "انتگرال به‌عنوان جمع",
	order: 2,
	summary: "جمع پیوسته: از عمق اپتیکی تا خروج کل انرژی.",
	blocks: [
		{
			type: "p",
			text: "انتگرال جمع است، وقتی تکه‌ها بی‌نهایت کوچک و بی‌نهایت زیاد شوند. اگر در طول یک مسیر، هر تکه‌ی کوچک $ds$ به اندازه‌ی $\\kappa\\rho\\,ds$ خاموشی اضافه کند، جمع همه‌ی تکه‌ها عمق اپتیکی است."
		},
		{
			type: "p",
			text: "$\\tau = \\int \\kappa\\rho\\, ds$. لازم نیست این انتگرال را همیشه تحلیلی بگیری. معنی‌اش این است: خاموشی محلی را در طول مسیر روی هم بگذار."
		},
		{
			type: "ul",
			items: [
				"مسیر بلندتر، اگر غلظت همان باشد، τ بزرگ‌تر می‌دهد. خورشید در افق از هوای بیشتری می‌گذرد.",
				"قانون استفان–بولتزمن انتگرال قانون پلانک روی همه‌ی طول‌موج‌ها و روی نیم‌کره است. $M$ جمع $B_\\lambda$ است، نه یک نقطه‌ی طیف.",
				"آن $\\pi$ در سطح لامبرتی هم یک انتگرال است: جمع $\\cos\\theta$ روی همه‌ی جهت‌های نیم‌کره برابر $\\pi$ استرادیان می‌شود."
			]
		},
		{
			type: "note",
			text: "مشتق و انتگرال وارون هم‌اند. اگر نرخ خاموشی را داری و کل را می‌خواهی، انتگرال بگیر. اگر کل را داری و حساسیت به یک متغیر را می‌خواهی، مشتق بگیر."
		},
		{
			type: "h2",
			text: "انتگرال وقتی لایه همگن است"
		},
		{
			type: "p",
			text: "اگر در یک لایه $\\kappa$ ثابت باشد، انتگرال به ضرب برمی‌گردد: $\\tau_i = \\kappa_i s_i$. سه لایه را جمع کن. مثلاً ۱٫۵ کیلومتر با ۰٫۰۴، ۳ کیلومتر با ۰٫۰۱۲، و ۶ کیلومتر با ۰٫۰۰۳."
		},
		{
			type: "display",
			latex: "\\tau = 0.060 + 0.036 + 0.018 = 0.114"
		},
		{
			type: "p",
			text: "بیش از نصف خاموشی در کوتاه‌ترین لایه است، همان پایین جو. عبور متناظر $e^{-0.114} = 0.892$ است. ادامه‌ی عددی، با مسیر مایل، در حل جو است."
		},
		{
			type: "problem",
			id: "beer-path"
		}
	]
};
var polar_exports = /* @__PURE__ */ __exportAll({ polar: () => polar });
var polar = {
	kind: "primer",
	slug: "polar",
	title: "مختصات قطبی",
	order: 5,
	summary: "شعاع و زاویه، به‌جای طول و عرض. زبان طبیعی مدار.",
	blocks: [
		{
			type: "p",
			text: "در صفحه، به‌جای $x$ و $y$ می‌شود یک نقطه را با فاصله از مبدأ ($r$) و زاویه از یک محور ($\\theta$) نوشت: $x = r\\cos\\theta$ و $y = r\\sin\\theta$. برای مداری که دور یک مرکز می‌گردد، این مختصات طبیعی‌تر از شبکه‌ی راست‌گوشه است."
		},
		{
			type: "ul",
			items: [
				"مدار دایره‌ای یعنی $r$ ثابت و $\\theta$ با زمان یکنواخت زیاد می‌شود. سرعت مماسی $v = r\\, d\\theta/dt$ است.",
				"بیضی کپلر یعنی $r$ با $\\theta$ کم و زیاد می‌شود. نزدیک‌ترین نقطه حضیض است و دورترین نقطه اوج.",
				"نیم‌قطر بزرگ $a$ اندازه‌ی بیضی است، نه ارتفاع لحظه‌ای. در مدار دایره‌ای این دو یکی می‌شوند: $a = R_{\\oplus} + h$."
			]
		},
		{
			type: "note",
			text: "ارتفاعی که در معرفی ماهواره می‌شنوی فاصله از سطح است، نه از مرکز. در فرمول سرعت و دوره، فاصله از مرکز لازم است."
		},
		{
			type: "p",
			text: "زاویه‌ی زنیت در سنجش از دور هم یک مختص قطبی محلی است: صفر یعنی درست بالای سر، ۹۰ درجه یعنی افق. مسیر مایل در جو متناظر با زنیت بزرگ است و عمق اپتیکی بیشتری دارد."
		},
		{
			type: "h2",
			text: "ارتفاع غیر از شعاع است"
		},
		{
			type: "p",
			text: "ماهواره‌ای در ۷۰۵ کیلومتری سطح، فاصله‌اش از مرکز $r = 6371 + 705 = 7076$ کیلومتر است. سرعت و دوره با همین $r$ حساب می‌شوند. اندازه‌ی پیکسل با ارتفاع از سطح: برای ۳۰ متر، زاویه‌ی دید $30/705000 = 4.26\\times 10^{-5}$ رادیان است."
		},
		{
			type: "problem",
			id: "orbit-pixel"
		}
	]
};
var solving_exports = /* @__PURE__ */ __exportAll({ solving: () => solving });
var solving = {
	kind: "primer",
	slug: "solving",
	title: "حل فرمول برای مجهول",
	order: 6,
	summary: "وارون کردن عملیات از بیرون به درون، با واحد درست. همین‌جا وین، بیر و NDVI حل می‌شوند.",
	blocks: [
		{
			type: "p",
			text: "بیشتر فرمول‌های سنجش از دور را یک‌بار برای یک نماد نوشته‌اند و تو نماد دیگری را لازم داری. کار، جبر تازه نیست: هر عملیاتی که روی مجهول نشسته را از بیرون باز کن، و واحد را پیش از عدد ثابت کن."
		},
		{
			type: "h2",
			text: "از بیرون به درون"
		},
		{
			type: "p",
			text: "ضرب با تقسیم باز می‌شود، توان با ریشه، نمایی با لگاریتم. همیشه آخرین کاری که روی مجهول انجام شده را اول باز کن. اگر $M = \\sigma T^4$ و $M$ را داری، اول بر $\\sigma$ تقسیم کن و بعد ریشه‌ی چهارم بگیر. اگر اول ریشه بگیری، $\\sigma$ هنوز داخل است و جواب دما نیست."
		},
		{
			type: "display",
			latex: "T = \\left(\\frac{M}{\\sigma}\\right)^{1/4}"
		},
		{
			type: "p",
			text: "امتحان برگشت اجباری است. $T$ را که پیدا کردی بگذار داخل فرمول اصلی. اگر $M$ اول برنگشت، یا ریشه را با توان عوض کرده‌ای یا واحد $\\sigma$ با واحد $M$ یکی نبوده."
		},
		{
			type: "h2",
			text: "وین، یک تقسیم"
		},
		{
			type: "p",
			text: "قانون $\\lambda T = b$ است. اگر قله را در ۱۰٫۰ میکرومتر دیده باشی و $b = 2898\\,\\mu\\mathrm{m\\,K}$ باشد، مجهول دماست. ضرب به تقسیم باز می‌شود و واحد کلوین درمی‌آید، نه سانتی‌گراد."
		},
		{
			type: "display",
			latex: "T = \\frac{2898}{10.0} = 289.8\\,\\mathrm{K}"
		},
		{
			type: "p",
			text: "۲۹۰ کلوین حدود ۱۷ درجه‌ی سلسیوس است. اگر ۲۹۰ را به‌عنوان سانتی‌گراد می‌خواندی، سطحی نزدیک نقطه جوش ساخته بودی و قله‌اش به ۵ میکرومتر پرت می‌شد. واحدِ خارج از نماد، جزئی از حل است."
		},
		{
			type: "h2",
			text: "نمایی با لگاریتم باز می‌شود"
		},
		{
			type: "p",
			text: "از $T = e^{-\\tau}$ بخواهی $\\tau$ را بخوانی، لگاریتم طبیعی دو طرف را می‌گیرد. لگاریتم عدد کوچک‌تر از یک منفی است و آن منفی با نما خط می‌خورد، پس عمق اپتیکی مثبت می‌ماند."
		},
		{
			type: "display",
			latex: "\\ln T = -\\tau \\qquad\\Rightarrow\\qquad \\tau = -\\ln T"
		},
		{
			type: "p",
			text: "برای عبور ۰٫۷۲: $\\ln 0.72 = -0.329$ و بنابراین $\\tau = 0.329$. اگر لگاریتم معمولی بگیری باید در ۲٫۳۰۳ ضرب کنی. $\\log_{10} 0.72 = -0.142$ و $-2.303\\times(-0.142)$ همان ۰٫۳۲۹ است. یکی از این دو مسیر را تا آخر برو؛ قاطی کردنشان $\\tau$ را نصف می‌کند."
		},
		{
			type: "note",
			text: "بسط $e^{-\\tau}\\approx 1-\\tau$ فقط وقتی $\\tau$ کوچک است حل را عوض می‌کند. برای ۰٫۰۸، نما ۰٫۹۲۳ است و خط ۰٫۹۲۰. برای ۰٫۳۶، نما ۰٫۶۹۸ است و خط ۰٫۶۴. هر جا خورشید پایین است، بسط را کنار بگذار."
		},
		{
			type: "h2",
			text: "یک نسبت را از شاخص دربیاور"
		},
		{
			type: "p",
			text: "NDVI را برای نسبت دو باند حل می‌کنیم تا معلوم شود شاخص واقعاً چه شکلی از طیف را نگه داشته. بگذار $V$ شاخص باشد، $n$ فروسرخ نزدیک و $r$ سرخ."
		},
		{
			type: "display",
			latex: "V = \\frac{n-r}{n+r}"
		},
		{
			type: "p",
			text: "دو طرف را در مخرج ضرب کن، سپس هر چه $n$ دارد را یک طرف ببر و هر چه $r$ دارد را طرف دیگر. این همان «از بیرون به درون» است، فقط بیرونْ یک کسر است."
		},
		{
			type: "display",
			latex: "\\begin{aligned} V(n+r) &= n-r \\\\ Vn + Vr &= n - r \\\\ Vr + r &= n - Vn \\\\ r(1+V) &= n(1-V) \\\\ \\frac{n}{r} &= \\frac{1+V}{1-V} \\end{aligned}"
		},
		{
			type: "p",
			text: "اگر $V = 0.80$ باشد، نسبت فروسرخ به سرخ $(1.80)/(0.20) = 9$ است. شاخص ۰٫۸ یعنی یک باند نُه برابر دیگری است، نه «هشتاد درصد سبزی». برای $V = 0$ نسبت دقیقاً ۱ است: دو باند برابر. نزدیک $V = 1$ مخرج صفر می‌شود و نسبت به بی‌نهایت می‌رود؛ به همین دلیل بالای طیف، شاخص اشباع می‌شود و دو تاج خیلی انبوه را از هم جدا نمی‌کند."
		},
		{
			type: "h2",
			text: "پیش از عدد، سه چک"
		},
		{
			type: "ul",
			items: [
				"بعد معادله: دو طرف باید یک جنس داشته باشند. رادیانس تقسیم بر تابش بی‌بعد است. متر تقسیم بر کلوین طول‌موج نیست.",
				"مقیاس: میکرومتر داخل فرمولی که ثابتش برای متر ساخته شده، جواب را در توانی از ده پرت می‌کند. یک بار بنویس هر نماد با چه واحدی وارد می‌شود.",
				"برگشت: جواب را در رابطه‌ی اصلی بگذار. اگر ورودی برنگشت، عملیات وارون را اشتباه باز کرده‌ای."
			]
		},
		{
			type: "p",
			text: "حساب کامل با صحنه‌ی واقعی، عددهای میانی و خطاهای رایج در بخش حل مسئله است. این یادداشت فقط کلید را می‌دهد."
		},
		{
			type: "problem",
			id: "wien-peaks"
		},
		{
			type: "problem",
			id: "beer-path"
		},
		{
			type: "problem",
			id: "ndvi-ratio"
		}
	]
};
var vectors_exports = /* @__PURE__ */ __exportAll({ vectors: () => vectors });
var vectors = {
	kind: "primer",
	slug: "vectors",
	title: "بردار، ضرب داخلی و خارجی",
	order: 3,
	summary: "اندازه و جهت؛ چرا کسینوس در تابش می‌آید و تاو یعنی چه.",
	blocks: [
		{
			type: "p",
			text: "بردار هم اندازه دارد هم جهت. میدان الکتریکی، میدان مغناطیسی، سرعت ماهواره و راستای دید سنجنده همه بردارند. یک عدد تنها جهت را دور می‌ریزد."
		},
		{
			type: "h2",
			text: "ضرب داخلی"
		},
		{
			type: "p",
			text: "$\\mathbf{a}\\cdot\\mathbf{b} = |a|\\,|b|\\cos\\theta$. نتیجه‌اش عدد است، نه بردار. وقتی تابش مایل به سطح می‌خورد، فقط مؤلفه‌ی عمود بر سطح توان را روی واحد سطح می‌نشاند. همان $\\cos\\theta_i$ داخل تعریف BRDF از این‌جا می‌آید."
		},
		{
			type: "p",
			text: "واگرایی $\\nabla\\cdot\\mathbf{E}$ هم یک جور مشتقِ جهت‌دار است: می‌سنجد میدان از یک نقطه بیرون می‌زند یا نه. چشمه‌ی میدان الکتریکی بار است، پس واگرایی‌اش متناسب با $\\rho$ است."
		},
		{
			type: "h2",
			text: "ضرب خارجی"
		},
		{
			type: "p",
			text: "$\\mathbf{a}\\times\\mathbf{b}$ برداری عمود بر هر دو است. اندازه‌اش $|a|\\,|b|\\sin\\theta$ است. تاو $\\nabla\\times\\mathbf{E}$ می‌سنجد میدان دور یک نقطه می‌چرخد یا نه. فارادی می‌گوید تغییر B همین چرخش را در E می‌سازد."
		},
		{
			type: "p",
			text: "در موج تخت، $\\mathbf{E}$، $\\mathbf{B}$ و جهت انتشار دو به دو عمودند. راستای انتشار را می‌شود با ضرب خارجی E و B نشان داد. برای قانون سوم کپلر به ضرب خارجی نیاز نداری، ولی علامت بردارها در نیروی وارد بر بار متحرک از همین‌جا می‌آید."
		},
		{
			type: "h2",
			text: "کسینوس، یک عدد"
		},
		{
			type: "p",
			text: "زنیت ۶۰ درجه یعنی زاویه‌ی بین راستای خورشید و خط عمود سطح. $\\cos 60^\\circ = 1/2$. اگر تابش عمود ۸۵۰ وات بر مترمربع باشد، روی سطح می‌ماند ۴۲۵. این همان ضرب داخلیِ جهت تابش در نرمال سطح است، تقسیم بر اندازه‌ها که این‌جا یکی‌اند."
		},
		{
			type: "display",
			latex: "E = E_0 \\cos\\theta_s = 850 \\times \\tfrac{1}{2} = 425"
		},
		{
			type: "problem",
			id: "lambert-cosine"
		}
	]
};
var atmosphere_exports = /* @__PURE__ */ __exportAll({ atmosphereQuiz: () => atmosphereQuiz });
var atmosphereQuiz = {
	kind: "quiz",
	id: "atmosphere-basics",
	title: "جو",
	summary: "عمق اپتیکی و نور مسیر.",
	questions: [
		{
			id: "q1",
			prompt: "اگر عمق اپتیکی صفر باشد، عبور چقدر است؟",
			choices: [
				"صفر",
				"یک",
				"بی‌نهایت"
			],
			answer: 1,
			explain: "$e^{0} = 1$. هیچ اتلافی در باریکه‌ی مستقیم نیست."
		},
		{
			id: "q2",
			prompt: "نور مسیر بیشتر چه اثری روی هدف تیره دارد؟",
			choices: [
				"آن را روشن‌تر از واقع نشان می‌دهد",
				"آن را کاملاً سیاه می‌کند",
				"فقط طول‌موج را عوض می‌کند و روشنایی را نه"
			],
			answer: 0,
			explain: "پراکندگی جو به سیگنال سطح اضافه می‌شود. تیره جایی است که این اضافه بیشتر به چشم می‌آید."
		},
		{
			id: "q3",
			prompt: "عبور در قانون بیر با عمق اپتیکی چطور کم می‌شود؟",
			choices: [
				"خطی",
				"نمایی",
				"با توان چهارم"
			],
			answer: 1,
			explain: "$I = I_0 e^{-\\tau}$. توان چهارم مال استفان است."
		}
	]
};
var interaction_exports = /* @__PURE__ */ __exportAll({ interactionQuiz: () => interactionQuiz });
var interactionQuiz = {
	kind: "quiz",
	id: "interaction-basics",
	title: "برهم‌کنش",
	summary: "لامبرت، NDVI، جذب برگ.",
	questions: [
		{
			id: "q1",
			prompt: "برای سطح لامبرتی، BRDF برابر است با…",
			choices: [
				"$\\rho$",
				"$\\rho/\\pi$",
				"$\\pi\\rho$"
			],
			answer: 1,
			explain: "انتگرال کسینوس روی نیم‌کره $\\pi$ است، پس $f_r = \\rho/\\pi$ و $L = \\rho E/\\pi$."
		},
		{
			id: "q2",
			prompt: "NDVI نزدیک ۰٫۸ بیشتر شبیه کدام سطح است؟",
			choices: [
				"آب عمیق",
				"پوشش گیاهی انبوه",
				"خاک لخت روشن"
			],
			answer: 1,
			explain: "گیاه در فروسرخ نزدیک خیلی روشن‌تر از سرخ است. آب معمولاً NDVI منفی یا نزدیک صفر دارد."
		},
		{
			id: "q3",
			prompt: "چرا برگ سالم در باند سرخ تیره است؟",
			choices: [
				"چون برگ فروسرخ را جذب می‌کند و سرخ را نه",
				"چون کلروفیل نور سرخ را جذب می‌کند",
				"چون برگ تابش حرارتی ندارد"
			],
			answer: 1,
			explain: "کلروفیل در سرخ جذب قوی دارد. فروسرخ نزدیک را ساختار برگ زیاد بازمی‌تاباند."
		}
	]
};
var intro_exports = /* @__PURE__ */ __exportAll({ introQuiz: () => introQuiz });
var introQuiz = {
	kind: "quiz",
	id: "intro-basics",
	title: "تعریف‌ها",
	summary: "سه سؤال کوتاه از کمیت‌های پایه.",
	questions: [
		{
			id: "q1",
			prompt: "رادیانس $L$ کدام است؟",
			choices: [
				"توان فرودی روی سطح، بدون توجه به جهت",
				"توان در واحد سطح، در واحد زاویه‌ی فضایی، در یک جهت",
				"انرژی یک فوتون",
				"بازتابندگی بی‌بعد"
			],
			answer: 1,
			explain: "رادیانس جهت‌دار است. توان فرودی روی سطح، بدون تفکیک جهت، ایرَدیانس است."
		},
		{
			id: "q2",
			prompt: "کدام سنجنده فعال است؟",
			choices: [
				"دوربینی که فقط تابش گرمایی زمین را می‌گیرد",
				"راداری که تپ می‌فرستد و برگشت را می‌سنجد",
				"تصویربردار نور خورشید در باند آبی"
			],
			answer: 1,
			explain: "فعال یعنی خود سنجنده موج بفرستد. دو گزینه‌ی دیگر غیرفعال‌اند."
		},
		{
			id: "q3",
			prompt: "بازتابندگی $\\rho$ معمولاً در چه بازه‌ای است؟",
			choices: [
				"هر عدد منفی",
				"صفر تا یک",
				"همیشه بزرگ‌تر از یک"
			],
			answer: 1,
			explain: "کسر توان برگشتی به توان فرودی است. بیشتر از یک یعنی انرژی از هیچ ساخته شده."
		}
	]
};
var orbit_exports = /* @__PURE__ */ __exportAll({ orbitQuiz: () => orbitQuiz });
var orbitQuiz = {
	kind: "quiz",
	id: "orbit-basics",
	title: "مدار",
	summary: "سرعت، زمین‌آهنگ، دوپلر.",
	questions: [
		{
			id: "q1",
			prompt: "در مدار دایره‌ای بالاتر، سرعت مداری…",
			choices: [
				"بیشتر است",
				"کمتر است",
				"فقط به جرم ماهواره بستگی دارد"
			],
			answer: 1,
			explain: "$v = \\sqrt{GM/r}$. شعاع بزرگ‌تر، سرعت کمتر. جرم ماهواره حذف می‌شود."
		},
		{
			id: "q2",
			prompt: "مدار زمین‌آهنگ تقریباً در چه ارتفاعی است؟",
			choices: [
				"۴۰۰ کیلومتر",
				"۲۰۰۰ کیلومتر",
				"حدود ۳۶ هزار کیلومتر"
			],
			answer: 2,
			explain: "دوره باید با چرخش زمین یکی شود. این اتفاق نزدیک ۳۵۸۰۰ کیلومتر بالاتر از سطح می‌افتد."
		},
		{
			id: "q3",
			prompt: "جابه‌جایی دوپلر به کدام سرعت حساس است؟",
			choices: [
				"سرعت کاملاً مماسی، بدون مؤلفه‌ی دید",
				"مؤلفه‌ی سرعت در راستای دید",
				"فقط سرعت چرخش زمین، نه سرعت نسبی"
			],
			answer: 1,
			explain: "در تقریب $\\Delta\\lambda/\\lambda = v_r/c$ فقط سرعت شعاعی می‌ماند."
		}
	]
};
var radiation_exports = /* @__PURE__ */ __exportAll({ radiationQuiz: () => radiationQuiz });
var radiationQuiz = {
	kind: "quiz",
	id: "radiation-basics",
	title: "تابش",
	summary: "وین، استفان، جسم سیاه.",
	questions: [
		{
			id: "q1",
			prompt: "طبق وین، اگر دمای جسم سیاه دو برابر شود، طول‌موج قله…",
			choices: [
				"دو برابر می‌شود",
				"نصف می‌شود",
				"شانزده برابر می‌شود"
			],
			answer: 1,
			explain: "$\\lambda_{\\max} T$ ثابت است. شانزده برابر مربوط به توان چهارم استفان است، نه جای قله."
		},
		{
			id: "q2",
			prompt: "خروج کل انرژی جسم سیاه با چه توانی از دما زیاد می‌شود؟",
			choices: [
				"خطی",
				"مربع",
				"توان چهارم"
			],
			answer: 2,
			explain: "$M = \\sigma T^{4}$. دما دو برابر، انرژی شانزده برابر."
		},
		{
			id: "q3",
			prompt: "طیف جسم سیاه ایده‌آل به چه چیزی بستگی دارد؟",
			choices: [
				"فقط به جنس سطح",
				"فقط به دما",
				"به رنگ ظاهری در نور اتاق، نه به دما"
			],
			answer: 1,
			explain: "جسم سیاه جنس ندارد؛ هر تابشی را جذب می‌کند و طیف گسیلش فقط تابع دماست. سطح واقعی یک ضریب گسیلندگی هم دارد."
		}
	]
};
var waves_exports = /* @__PURE__ */ __exportAll({ wavesQuiz: () => wavesQuiz });
var wavesQuiz = {
	kind: "quiz",
	id: "waves-basics",
	title: "موج",
	summary: "بسامد، طول‌موج، انرژی فوتون.",
	questions: [
		{
			id: "q1",
			prompt: "اگر بسامد موجی در خلأ دو برابر شود، طول‌موج آن…",
			choices: [
				"دو برابر می‌شود",
				"نصف می‌شود",
				"ثابت می‌ماند چون سرعت هم دو برابر می‌شود"
			],
			answer: 1,
			explain: "در خلأ $c$ ثابت است و $\\lambda = c/f$. بسامد دو برابر، طول‌موج نصف."
		},
		{
			id: "q2",
			prompt: "انرژی هر فوتون به کدام کمیت بند است؟",
			choices: [
				"شدت تابش",
				"بسامد",
				"مساحت دهانه‌ی سنجنده"
			],
			answer: 1,
			explain: "$E = hf$. شدت، تعداد فوتون است نه انرژی هر دانه."
		},
		{
			id: "q3",
			prompt: "کدام طول‌موج بلندتر است؟",
			choices: [
				"آبی",
				"فروسرخ حرارتی",
				"فرابنفش"
			],
			answer: 1,
			explain: "حرارتی حدود ۱۰ میکرومتر است. آبی و فرابنفش چند صد نانومترند."
		}
	]
};
var midterm_1_exports = /* @__PURE__ */ __exportAll({ midterm: () => midterm });
var midterm = {
	kind: "exam",
	id: "midterm-1",
	title: "آزمون دوره",
	summary: "هشت سؤال از موج، تابش، سطح، جو و مدار. پاسخ‌ها بعد از ثبت نشان داده می‌شوند.",
	questions: [
		{
			id: "e1",
			prompt: "سنجنده معمولاً کدام کمیت را مستقیم می‌بیند؟",
			choices: [
				"رادیانس در جهت دید",
				"بازتابندگی سطح، بدون جو",
				"جرم مولکول‌های جو"
			],
			answer: 0,
			explain: "آنچه به دهانه می‌رسد رادیانس است. بازتاب سطح بعد از مدل به دست می‌آید."
		},
		{
			id: "e2",
			prompt: "طول‌موج نور سبز حدود ۵۵۰ نانومتر است. بسامدش در خلأ از چه مرتبه‌ای است؟",
			choices: [
				"چند کیلوهرتز",
				"چند گیگاهرتز",
				"حدود ۵۵۰ تراهرتز"
			],
			answer: 2,
			explain: "$f = c/\\lambda$. با $\\lambda = 5.5\\times 10^{-7}$ متر، بسامد نزدیک $5.5\\times 10^{14}$ هرتز است."
		},
		{
			id: "e3",
			prompt: "کدام جمله درباره‌ی جسم سیاه درست است؟",
			choices: [
				"قله‌ی طیف بر حسب طول‌موج با دما به سمت بلندتر می‌رود",
				"خروج کل انرژی با $T^{4}$ متناسب است",
				"طیف به جنس سطح بستگی دارد و به دما نه"
			],
			answer: 1,
			explain: "وین قله را با دما به طول‌موج کوتاه‌تر می‌برد. استفان خروج کل را با توان چهارم می‌دهد."
		},
		{
			id: "e4",
			prompt: "چرا در رابطه‌ی لامبرتی $L = \\rho E / \\pi$ یک $\\pi$ هست؟",
			choices: [
				"چون دایره‌ی زمین است",
				"چون انتگرال کسینوس روی نیم‌کره $\\pi$ استرادیان است",
				"چون ثابت پلانک را گرد کرده‌اند"
			],
			answer: 1,
			explain: "BRDF ثابت $\\rho/\\pi$ است تا انتگرال بازتاب روی نیم‌کره همان $\\rho$ شود."
		},
		{
			id: "e5",
			prompt: "کدام جفت برای برگ سالم درست است؟",
			choices: [
				"سرخ روشن، فروسرخ نزدیک تیره",
				"سرخ تیره، فروسرخ نزدیک روشن",
				"هر دو باند کاملاً سیاه"
			],
			answer: 1,
			explain: "کلروفیل سرخ را جذب می‌کند و ساختار برگ فروسرخ نزدیک را برمی‌گرداند. NDVI از همین تضاد است."
		},
		{
			id: "e6",
			prompt: "عمق اپتیکی ۱ یعنی عبور نور مستقیم حدوداً…",
			choices: [
				"۱۰۰٪",
				"۳۷٪",
				"صفر"
			],
			answer: 1,
			explain: "$e^{-1} \\approx 0.37$. صفر نیست؛ نمایی در زمان محدود قطع نمی‌شود."
		},
		{
			id: "e7",
			prompt: "در حضور نور مسیر، کنتراست بین هدف تیره و روشن…",
			choices: [
				"زیاد می‌شود",
				"فشرده می‌شود",
				"فقط در رادار معنی دارد و در اپتیک نه"
			],
			answer: 1,
			explain: "تیره روشن‌تر و روشن کمی تیره‌تر دیده می‌شود. اختلافشان کم می‌شود."
		},
		{
			id: "e8",
			prompt: "دو ماهواره در یک مدار دایره‌ای یکسان‌اند و جرم یکی دو برابر دیگری است. سرعت مداری‌شان…",
			choices: [
				"برای سنگین‌تر بیشتر است",
				"یکی است",
				"برای سنگین‌تر نصف است"
			],
			answer: 1,
			explain: "در $v = \\sqrt{GM/r}$ جرم ماهواره حذف شده. دوره هم از قانون کپلر به جرم ماهواره بند نیست."
		}
	]
};
var _01_photon_bands_exports = /* @__PURE__ */ __exportAll({ photonBands: () => photonBands });
var photonBands = {
	kind: "problem",
	slug: "photon-bands",
	title: "انرژی فوتون و مرز آشکارساز",
	order: 1,
	topic: "موج",
	summary: "از طول‌موج به الکترون‌ولت، و اینکه سیلیکون کجا تمام می‌شود.",
	scene: "می‌خواهی بدانی یک باند را آشکارساز سیلیکونی می‌بیند یا نه. سیلیکون فقط وقتی جفت الکترون–حفره می‌سازد که انرژی فوتون از گافش، حدود ۱٫۱۲ الکترون‌ولت، بیشتر باشد. شدت باریکه این آستانه را عوض نمی‌کند.",
	givens: [
		{
			symbol: "hc",
			meaning: "ثابت کاربردی انرژی",
			value: "۱٫۲۴۰ الکترون‌ولت·میکرومتر"
		},
		{
			symbol: "E_g",
			meaning: "گاف سیلیکون",
			value: "۱٫۱۲ الکترون‌ولت"
		},
		{
			symbol: "\\lambda",
			meaning: "پنج طول‌موج نمونه",
			value: "۰٫۴۵، ۰٫۶۵، ۰٫۸۵، ۱٫۶۵ و ۱۱ میکرومتر"
		}
	],
	ask: "انرژی فوتون هر باند چند الکترون‌ولت است، و کدام‌ها را سیلیکون ذاتاً نمی‌بیند؟",
	formulas: [{
		id: "photon-energy",
		name: "انرژی فوتون",
		latex: "E = hf = hc/\\lambda",
		why: "آستانه‌ی آشکارساز به انرژی هر دانه بسته است، نه به توان باریکه. پس اول باید λ را به انرژی برگردانی."
	}],
	steps: [
		{
			title: "ثابت را به واحدی ببر که دستت باشد",
			text: "در ژول و متر، hc = ۱٫۹۸۶×۱۰⁻²⁵ ژول·متر است. یک الکترون‌ولت ۱٫۶۰۲×۱۰⁻¹⁹ ژول است، پس hc = ۱٫۲۴۰×۱۰⁻⁶ الکترون‌ولت·متر. هر میکرومتر ۱۰⁻⁶ متر است. آن ۱۰⁻⁶ خط می‌خورد و می‌ماند:",
			latex: "E\\,(\\mathrm{eV}) = \\frac{1.240}{\\lambda\\,(\\mu\\mathrm{m})}"
		},
		{
			title: "پنج باند را یکی‌یکی حساب کن",
			text: "فقط تقسیم است. واحد طول‌موج باید میکرومتر باشد؛ اگر نانومتر گذاشتی جواب هزار برابر غلط می‌شود.",
			latex: "\\begin{aligned} E(0.45) &= 1.240/0.45 = 2.76\\,\\mathrm{eV}\\\\ E(0.65) &= 1.240/0.65 = 1.91\\,\\mathrm{eV}\\\\ E(0.85) &= 1.240/0.85 = 1.46\\,\\mathrm{eV}\\\\ E(1.65) &= 1.240/1.65 = 0.751\\,\\mathrm{eV}\\\\ E(11) &= 1.240/11 = 0.113\\,\\mathrm{eV} \\end{aligned}"
		},
		{
			title: "هر انرژی را با گاف مقایسه کن",
			text: "شرط دیدن در سیلیکون E > ۱٫۱۲ eV است، یعنی λ کوتاه‌تر از حدود ۱٫۱ میکرومتر. آبی، سرخ و فروسرخ نزدیک ۰٫۸۵ از گاف رد می‌شوند. فروسرخ موج‌کوتاه ۱٫۶۵ میکرومتر زیر گاف است: فوتون جذب ذاتی نمی‌شود. فروسرخ حرارتی ۱۱ میکرومتر حدود ده برابر کم‌انرژی‌تر از گاف است."
		},
		{
			title: "نتیجه را به جنس سنجنده وصل کن",
			text: "باند ۱٫۶۵ میکرومتر آشکارساز دیگری می‌خواهد، مثلاً ماده‌ای با گاف کوچک‌تر. باند ۱۱ میکرومتر دیگر مسئله‌ی شمردن فوتون پرانرژی نیست؛ انرژی هر دانه آن‌قدر کم است که نویز گرمایی خود سنجنده رقیب سیگنال می‌شود و آشکارساز را سرد می‌کنند. رادار از این هم کم‌انرژی‌تر است و با تصویر موجی کار می‌کند، نه با شمارش دانه."
		}
	],
	answerLatex: "\\begin{aligned} E &= 2.76,\\ 1.91,\\ 1.46,\\ 0.751,\\ 0.113\\,\\mathrm{eV}\\\\ \\lambda &= 0.45,\\ 0.65,\\ 0.85,\\ 1.65,\\ 11\\,\\mu\\mathrm{m} \\end{aligned}",
	answerText: "سه باند اول را سیلیکون می‌بیند. ۱٫۶۵ میکرومتر را نه، و ۱۱ میکرومتر را به طریق اولی نه. انرژی حرارتی حدود سیزده برابر کوچک‌تر از فروسرخ نزدیک ۰٫۸۵ است.",
	meaning: "انتخاب باند یک انتخاب رنگی نیست؛ یک آستانه‌ی انرژی است. هر جا طول‌موج را بلندتر می‌کنی، هم انرژی دانه کم می‌شود و هم جنس آشکارساز و حتی لزوم سرد کردن عوض می‌شود.",
	traps: [
		"گذاشتن نانومتر در فرمول ۱٫۲۴۰. آن فرمول فقط با میکرومتر درست است.",
		"یکی گرفتن شدت با انرژی فوتون. نور بیشتر، دانه‌ی پرانرژی‌تر نمی‌سازد.",
		"فرض اینکه یک آشکارساز «فروسرخ» همه‌ی فروسرخ را می‌بیند. ۰٫۸۵ و ۱۱ میکرومتر دو فیزیک متفاوت‌اند."
	],
	relatedMath: ["solving"],
	relatedLabs: ["wave"]
};
var _02_wien_peaks_exports = /* @__PURE__ */ __exportAll({ wienPeaks: () => wienPeaks });
var wienPeaks = {
	kind: "problem",
	slug: "wien-peaks",
	title: "قلهٔ طیف خورشید و زمین",
	order: 2,
	topic: "تابش",
	summary: "چرا یک سنجنده مرئی است و یکی حرارتی، از روی یک تقسیم.",
	scene: "خورشید را جسم سیاه ۵۸۰۰ کلوین بگیر و سطح زمین را ۲۸۸ کلوین. می‌خواهی بدانی انرژی گسیل هر کدام کجای طیف جمع می‌شود، تا بفهمی باند مرئی و باند حرارتی از کدام فیزیک می‌آیند. بازتاب برگ را با گسیل برگ قاطی نکن: برگ هم حدود ۳۰۰ کلوین است.",
	givens: [
		{
			symbol: "b",
			meaning: "ثابت وین برای طیف بر حسب طول‌موج",
			value: "۲۸۹۸ میکرومتر·کلوین"
		},
		{
			symbol: "T_\\odot",
			meaning: "دمای مؤثر خورشید",
			value: "۵۸۰۰ کلوین"
		},
		{
			symbol: "T_\\oplus",
			meaning: "دمای سطح زمین",
			value: "۲۸۸ کلوین"
		}
	],
	ask: "طول‌موج قله‌ی هر کدام چند میکرومتر است و در کدام پنجره‌ی سنجش از دور می‌نشیند؟",
	formulas: [{
		id: "wien",
		name: "قانون وین",
		latex: "\\lambda_{\\max} T = b",
		why: "قله را بدون حل کامل پلانک می‌دهد، به شرطی که طیف بر حسب طول‌موج باشد نه بسامد."
	}],
	steps: [
		{
			title: "مجهول را جدا کن",
			text: "ثابت و دما را داری و طول‌موج را می‌خواهی. ضرب به تقسیم وارون می‌شود. واحد b میکرومترکلوین است، پس λ مستقیم به میکرومتر درمی‌آید. اگر b را به متر می‌بردند، جواب متر بود.",
			latex: "\\lambda_{\\max} = \\frac{b}{T}"
		},
		{
			title: "خورشید",
			text: "۵۸۰۰ در مخرج می‌نشیند. تقسیم را تا سه رقم نگه دار؛ بیشتر از دقت خودِ ۵۸۰۰ نیست.",
			latex: "\\lambda_{\\max,\\odot} = \\frac{2898}{5800} = 0.500\\,\\mu\\mathrm{m}"
		},
		{
			title: "زمین",
			text: "همان ثابت، دمای دیگر. نسبت دماها ۵۸۰۰/۲۸۸ ≈ ۲۰٫۱ است، پس قله‌ی زمین باید حدود بیست برابر بلندتر از قله‌ی خورشید باشد.",
			latex: "\\lambda_{\\max,\\oplus} = \\frac{2898}{288} = 10.06\\,\\mu\\mathrm{m}"
		},
		{
			title: "هر قله را در یک پنجره بگذار",
			text: "۰٫۵۰ میکرومتر میانه‌ی مرئی است: نور خورشید که سطح برمی‌گرداند. ۱۰٫۱ میکرومتر میانه‌ی فروسرخ حرارتی است: چیزی که خود سطح گسیل می‌کند. اگر دمای مؤثرِ بدون جو را ۲۵۵ کلوین بگیری، قله ۱۱٫۴ میکرومتر می‌شود و هنوز همان پنجره است. برگِ سالم هم نزدیک ۳۰۰ کلوین است، پس گسیل خودش حوالی ۱۰ میکرومتر است، نه در سرخ."
		},
		{
			title: "لبه‌ی سرخ را با این قله عوض نکن",
			text: "جهش بازتاب گیاه بین سرخ و فروسرخ نزدیک، گسیل گرمایی برگ نیست. آن‌جا برگ دارد نور خورشید را برمی‌گرداند. گسیل گرمایی برگ در پنجره‌ای است که خورشید دیگر چشمه‌ی غالب نیست. مرز تقریبی این دو رژیم حوالی ۳ تا ۵ میکرومتر است: کوتاه‌تر از آن، روزها بازتاب خورشید غلبه دارد؛ بلندتر، گسیل خود سطح."
		}
	],
	answerLatex: "\\begin{aligned} \\lambda_{\\max}(5800\\,\\mathrm{K}) &= 0.500\\,\\mu\\mathrm{m}\\\\ \\lambda_{\\max}(288\\,\\mathrm{K}) &= 10.06\\,\\mu\\mathrm{m} \\end{aligned}",
	answerText: "قله‌ی خورشید در سبز–آبی می‌نشیند و قله‌ی زمین در فروسرخ حرارتی، حدود بیست برابر دورتر. باند مرئی بازتاب خورشید را می‌بیند و باند ۱۰–۱۲ میکرومتر گسیل خود زمین را.",
	meaning: "یک تقسیم، معماری طیفی سنجش از دور را می‌سازد: دو چشمه، دو دما، دو پنجره. دیدن گیاه در سرخ، دیدن تابش گرمایی گیاه نیست.",
	traps: [
		"استفاده از ثابت وینِ طیف بسامدی برای محوری که طول‌موج است. دو ثابت متفاوت‌اند.",
		"خواندن NDVI یا لبه‌ی سرخ به‌عنوان قله‌ی گسیل برگ.",
		"گذاشتن دما به سانتی‌گراد. ۲۸۸ را اگر ۱۵ می‌گذاشتی قله نزدیک ۲۰۰ میکرومتر درمی‌آمد."
	],
	relatedMath: ["derivatives", "solving"],
	relatedLabs: ["blackbody"]
};
var _03_stefan_sensitivity_exports = /* @__PURE__ */ __exportAll({ stefanSensitivity: () => stefanSensitivity });
var stefanSensitivity = {
	kind: "problem",
	slug: "stefan-sensitivity",
	title: "توان چهارم و بهای یک کلوین",
	order: 3,
	topic: "تابش",
	summary: "خروج انرژی زمین و خورشید، و اینکه خطای دما چهار برابر نشت می‌کند.",
	scene: "برای بیلان انرژی سطح، کل توان گسیل‌شده مهم است نه یک طول‌موج. سطح را جسم سیاه ۲۸۸ کلوین بگیر. می‌خواهی خروج تابشی‌اش را حساب کنی، با خورشید مقایسه کنی، و ببینی یک کلوین خطا در دما چند وات بر مترمربع در انرژی گسیل جابه‌جا می‌کند.",
	givens: [
		{
			symbol: "\\sigma",
			meaning: "ثابت استفان–بولتزمن",
			value: "۵٫۶۷۰×۱۰⁻⁸ W·m⁻²·K⁻⁴"
		},
		{
			symbol: "T",
			meaning: "دمای سطح",
			value: "۲۸۸ کلوین"
		},
		{
			symbol: "T_\\odot",
			meaning: "دمای خورشید برای مقایسه",
			value: "۵۸۰۰ کلوین"
		},
		{
			symbol: "\\Delta T",
			meaning: "خطای دما",
			value: "۱ کلوین"
		}
	],
	ask: "M سطح و نسبت M خورشید به زمین چیست، و ΔM متناظر با یک کلوین چقدر است؟",
	formulas: [{
		id: "stefan",
		name: "استفان–بولتزمن",
		latex: "M = \\sigma T^4",
		why: "کل خروج، انتگرال پلانک روی طول‌موج و نیم‌کره است. برای جسم سیاه فقط دما می‌ماند، با توان چهار."
	}],
	steps: [
		{
			title: "توان را از داخل حساب کن",
			text: "اول مربع، بعد مربعِ مربع. ۲۸۸² = ۸۲۹۴۴. مربع این عدد ۶٫۸۸۰×۱۰⁹ است (مقدار دقیق ۶٫۸۷۹۷×۱۰⁹). σ را در توان ده جدا ضرب کن.",
			latex: "M = (5.670\\times 10^{-8})(6.880\\times 10^{9}) = 5.670\\times 6.880\\times 10^{1} = 390\\,\\mathrm{W\\,m^{-2}}"
		},
		{
			title: "رقم را با حساب دقیق یکی کن",
			text: "با T⁴ دقیق و همین σ، حاصل ۳۹۰٫۱ وات بر مترمربع است. گرد کردن ۶٫۸۸۰ به‌جای ۶٫۸۸۰۰ در رقم اول اثری ندارد. این توانی است که یک مترمربع جسم سیاه ۲۸۸ کلوین به همه‌ی جهت‌ها و همه‌ی طول‌موج‌ها می‌فرستد."
		},
		{
			title: "خورشید را با نسبت دما حساب کن، نه از نو",
			text: "چون M با T⁴ می‌رود، نسبت خروج‌ها توان چهارم نسبت دماهاست. لازم نیست σ را دوباره در عدد بزرگی ضرب کنی.",
			latex: "\\frac{5800}{288} = 20.14,\\qquad 20.14^{2} = 405.6,\\qquad 405.6^{2} = 1.645\\times 10^{5}"
		},
		{
			title: "خروج خورشید",
			text: "۳۹۰٫۱ را در این نسبت ضرب کن: حدود ۶٫۴۲×۱۰⁷ وات بر مترمربع. خورشید، بر واحد سطح خودش، صد و شصت‌وپنج هزار برابر زمین می‌تاباند. این را با تابشی که به زمین می‌رسد عوض نکن؛ آن یکی در زاویه‌ی فضایی کوچک خورشید و فاصله ضرب شده است."
		},
		{
			title: "خطای نسبی را از مشتق بگیر",
			text: "اگر M = σT⁴، آن‌گاه dM/M = ۴ dT/T. درصد خطا در خروج، چهار برابر درصد خطا در دماست. برای یک کلوین روی ۲۸۸:",
			latex: "\\frac{\\Delta M}{M} \\approx 4\\times\\frac{1}{288} = \\frac{1}{72} = 1.39\\%"
		},
		{
			title: "خطای مطلق",
			text: "۱٫۳۹ درصد از ۳۹۰٫۱ می‌شود ۵٫۴۲ وات بر مترمربع. مشتق محلی است. اختلاف واقعی M(۲۸۹)−M(۲۸۸) برابر ۵٫۴۵ است؛ دو صدم وات فرق، از این‌که در ۲۸۹ کلوین شیب کمی تندتر است. برای بودجه‌ی خطا همان ۵٫۴ کافی است.",
			latex: "\\Delta M \\approx 4\\sigma T^{3}\\Delta T = 5.4\\,\\mathrm{W\\,m^{-2}}"
		}
	],
	answerLatex: "\\begin{aligned} M(288\\,\\mathrm{K}) &= 390.1\\,\\mathrm{W\\,m^{-2}}\\\\ M_\\odot / M_\\oplus &= 1.645\\times 10^{5}\\\\ \\Delta M(1\\,\\mathrm{K}) &\\approx 5.4\\,\\mathrm{W\\,m^{-2}} \\end{aligned}",
	answerText: "سطح سیاه ۲۸۸ کلوین حدود ۳۹۰ وات بر مترمربع گسیل می‌کند. سطح خورشید ۱۶۵ هزار برابر. یک کلوین خطا، حدود ۵٫۴ وات بر مترمربع در همین کلّ خروج جابه‌جا می‌کند، یعنی ۱٫۴ درصد.",
	meaning: "توان چهارم یعنی دما را شل حساب کردن در انرژی گران تمام می‌شود. این حساسیت برای بیلان کل است. در یک باند حرارتی باریک، عدد مربوط همان مشتق پلانک است نه مشتق استفان؛ آن را در حل دمای درخشندگی می‌بینی.",
	traps: [
		"دما به سانتی‌گراد داخل T⁴. پانزده به توان چهار هیچ شباهتی به ۲۸۸ به توان چهار ندارد.",
		"یکی گرفتن M با رادیانس طیفی. M جمع همه‌ی طول‌موج‌ها و همه‌ی جهت‌هاست.",
		"گفتن اینکه یک کلوین همیشه ۵٫۴ وات است. این عدد مال ۲۸۸ کلوین و مال خروج کل است، نه مال هر باند."
	],
	relatedMath: [
		"derivatives",
		"integrals",
		"solving"
	],
	relatedLabs: ["blackbody"]
};
var _04_brightness_temp_exports = /* @__PURE__ */ __exportAll({ brightnessTemp: () => brightnessTemp });
var brightnessTemp = {
	kind: "problem",
	slug: "brightness-temp",
	title: "وارون پلانک و بهای گسیلندگی",
	order: 4,
	topic: "تابش",
	summary: "رادیانسی در ۱۱ میکرومتر را به دما برگردان، و ببین ۰٫۹۷ چه قدر سردت می‌کند.",
	scene: "سنجنده‌ای در ۱۱ میکرومتر رادیانس طیفی یک سطح را می‌خواند. سطح را اول جسم سیاه ۳۰۰ کلوین فرض کن تا خود فرمول را امتحان کنی. بعد گسیلندگی را ۰٫۹۷ بگذار، همان‌طور که برای آب و پوشش گیاهی در این پنجره واقعی است، و دما را با فرض اشتباهِ ε = ۱ وارون کن.",
	givens: [
		{
			symbol: "c_1",
			meaning: "۲hc²",
			value: "۱٫۱۹۱×۱۰⁻¹⁶ W·m²"
		},
		{
			symbol: "c_2",
			meaning: "hc/k",
			value: "۱٫۴۳۸۸×۱۰⁻² m·K"
		},
		{
			symbol: "\\lambda",
			meaning: "طول‌موج",
			value: "۱۱ میکرومتر = ۱۱×۱۰⁻⁶ متر"
		},
		{
			symbol: "T",
			meaning: "دمای جنبشی سطح",
			value: "۳۰۰ کلوین"
		},
		{
			symbol: "\\varepsilon",
			meaning: "گسیلندگی در مرحله‌ی دوم",
			value: "۰٫۹۷"
		}
	],
	ask: "رادیانسی جسم سیاه ۳۰۰ کلوین در این طول‌موج چقدر است، و اگر ε را نادیده بگیری دمای درخشندگی چند کلوین خطا دارد؟",
	formulas: [{
		id: "planck",
		name: "پلانک",
		latex: "B_\\lambda(T) = \\frac{c_1}{\\lambda^5}\\frac{1}{e^{c_2/\\lambda T}-1}",
		why: "رابطه‌ی مستقیم: دما را می‌گیری و رادیانس می‌گیری. واحدها باید SI بمانند."
	}, {
		id: "brightness",
		name: "وارون، دمای درخشندگی",
		latex: "T_b = \\frac{c_2}{\\lambda\\ln(1+c_1/(\\lambda^5 L))}",
		why: "سنجنده رادیانس می‌بیند نه دما. این همان پلانک است که برای T حل شده. اگر L کمتر از گسیل جسم سیاه باشد، T_b سردتر از دمای جنبشی درمی‌آید."
	}],
	steps: [
		{
			title: "λ⁵ را در متر حساب کن",
			text: "۱۱×۱۰⁻⁶ = ۱٫۱×۱۰⁻⁵. توان‌ها را یکی‌یکی بالا ببر: مربع ۱٫۲۱×۱۰⁻¹⁰، مکعب ۱٫۳۳۱×۱۰⁻¹⁵، توان چهار ۱٫۴۶۴×۱۰⁻²⁰، توان پنج ۱٫۶۱۱×۱۰⁻²⁵ متر به توان پنج.",
			latex: "\\frac{c_1}{\\lambda^5} = \\frac{1.191\\times 10^{-16}}{1.611\\times 10^{-25}} = 7.395\\times 10^{8}"
		},
		{
			title: "نما را حساب کن",
			text: "صورت و مخرج باید هر دو مترکلوین باشند. λT = ۱۱×۱۰⁻⁶ × ۳۰۰ = ۳٫۳×۱۰⁻³ مترکلوین.",
			latex: "\\frac{c_2}{\\lambda T} = \\frac{1.4388\\times 10^{-2}}{3.3\\times 10^{-3}} = 4.360"
		},
		{
			title: "رادیانسی جسم سیاه",
			text: "e⁴·³⁶⁰ = ۷۸٫۲۵. مخرج ۷۸٫۲۵ − ۱ = ۷۷٫۲۵ است. رادیانس بر متر طول‌موج عدد بزرگی است؛ سنجنده‌ها معمولاً بر میکرومتر گزارش می‌کنند و آن یعنی تقسیم بر ۱۰⁶.",
			latex: "B = \\frac{7.395\\times 10^{8}}{77.25} = 9.57\\times 10^{6}\\,\\mathrm{W\\,m^{-2}\\,sr^{-1}\\,m^{-1}} = 9.57\\,\\mathrm{W\\,m^{-2}\\,sr^{-1}\\,\\mu m^{-1}}"
		},
		{
			title: "گسیلندگی را وارد کن",
			text: "در این تقریب ساده جو را کنار می‌گذاریم و L = εB می‌گیریم. ۰٫۹۷ × ۹٫۵۷×۱۰⁶ = ۹٫۲۹×۱۰⁶ با واحد بر متر. سطح همان ۳۰۰ کلوین است، ولی رادیانسی که بیرون می‌آید ۳ درصد کمتر است."
		},
		{
			title: "وارون را قدم‌به‌قدم پر کن",
			text: "داخل لگاریتم بی‌بعد است. اول نسبت ثابت به رادیانس، بعد لگاریتم طبیعی، بعد ضرب در λ، بعد تقسیم c₂.",
			latex: "\\begin{aligned} \\frac{c_1}{\\lambda^5 L} &= \\frac{7.395\\times 10^{8}}{9.29\\times 10^{6}} = 79.6\\\\ \\ln(1+79.6) &= \\ln(80.6) = 4.390\\\\ \\lambda\\ln &= 11\\times 10^{-6}\\times 4.390 = 4.83\\times 10^{-5}\\\\ T_b &= \\frac{1.4388\\times 10^{-2}}{4.83\\times 10^{-5}} = 297.9\\,\\mathrm{K} \\end{aligned}"
		},
		{
			title: "حساسیت طیفی را با تفاضل محدود ببین",
			text: "همان پلانک در ۲۹۰ کلوین می‌دهد ۸٫۲۲ و در ۳۱۰ کلوین ۱۱٫۰۴، با واحد بر میکرومتر. دور و بر ۳۰۰ کلوین، هر کلوین حدود ۰٫۱۴ وات بر مترمربع بر استرادیان بر میکرومتر رادیانس را جابه‌جا می‌کند. اگر کسی ۰٫۱ کلوین بخواهد، باید حدود ۰٫۰۱۴ از همین واحد را از نویز جدا کند. این مشتقِ باند حرارتی است، نه آن ۵ واتِ خروج کل."
		}
	],
	answerLatex: "\\begin{aligned} B(11\\,\\mu\\mathrm{m},300\\,\\mathrm{K}) &= 9.57\\,\\mathrm{W\\,m^{-2}\\,sr^{-1}\\,\\mu m^{-1}}\\\\ T_b(\\varepsilon{=}0.97) &= 297.9\\,\\mathrm{K} \\end{aligned}",
	answerText: "جسم سیاه ۳۰۰ کلوین در ۱۱ میکرومتر ۹٫۵۷ واحد رادیانس طیفی دارد. با ε = ۰٫۹۷ و فرض اشتباهِ جسم سیاه، دما ۲۹۷٫۹ کلوین درمی‌آید: حدود ۲٫۱ کلوین سردتر از واقع.",
	meaning: "دمای درخشندگی دمای سطح نیست تا وقتی گسیلندگی و جو را برنگردانی. سه درصد کم بودن گسیلندگی در این پنجره، خطایی از مرتبه‌ی دو کلوین می‌سازد؛ برای آب‌های ساحلی یا تبخیر–تعرق این دیگر خطای کوچک نیست.",
	traps: [
		"λ را به میکرومتر داخل c₁ و c₂ِ SI گذاشتن. نما چهارصد هزار برابر غلط می‌شود.",
		"لگاریتم معمولی به‌جای طبیعی. ضریبی حدود ۲٫۳۰ وارد دما می‌شود.",
		"خواندن T_b به‌عنوان دمای جنبشی وقتی ε را نمی‌دانی.",
		"یکی گرفتن حساسیت خروج کل (وات بر مترمربع) با حساسیت یک باند باریک."
	],
	relatedMath: [
		"exponentials",
		"solving",
		"derivatives"
	],
	relatedLabs: ["blackbody"]
};
var _05_lambert_cosine_exports = /* @__PURE__ */ __exportAll({ lambertCosine: () => lambertCosine });
var lambertCosine = {
	kind: "problem",
	slug: "lambert-cosine",
	title: "سطح لامبرتی زیر خورشید کج",
	order: 5,
	topic: "سطح",
	summary: "کسینوس انرژی را نصف می‌کند؛ π رادیانس را از تابش جدا می‌کند.",
	scene: "یک خاک لخت را لامبرتی بگیر با بازتاب نیم‌کره‌ای ۰٫۲۵. تابش فرودی وقتی خورشید عمود است ۸۵۰ وات بر مترمربع است (پهن‌باند، پایین جو، فقط برای دیدن هندسه). دو حالت را مقایسه کن: خورشید در سمت‌الرأس، و خورشید با زنیت ۶۰ درجه. جو را در این مسئله ثابت فرض کن تا فقط هندسه‌ی سطح دیده شود.",
	givens: [
		{
			symbol: "\\rho",
			meaning: "بازتابندگی نیم‌کره‌ای",
			value: "۰٫۲۵"
		},
		{
			symbol: "E_0",
			meaning: "تابش فرودی در زنیت صفر",
			value: "۸۵۰ وات بر مترمربع"
		},
		{
			symbol: "\\theta_s",
			meaning: "زاویه‌ی زنیت خورشید",
			value: "۰ درجه و ۶۰ درجه"
		}
	],
	ask: "تابش روی سطح و رادیانس بازتابیده در هر حالت چقدر است؟",
	formulas: [{
		id: "cosine-law",
		name: "کسینوس",
		latex: "E = E_0\\cos\\theta_s",
		why: "توان باریکه ثابت است و روی سطح کج پخش می‌شود. فقط مؤلفه‌ی عمود بر سطح می‌ماند."
	}, {
		id: "lambert",
		name: "لامبرت",
		latex: "L = \\rho E / \\pi",
		why: "بازتابندگی کسر توان است. رادیانس توان بر استرادیان است. آن π استرادیانِ مؤثرِ نیم‌کره است و بدون آن واحد و مقدار هر دو غلط می‌شوند."
	}],
	steps: [
		{
			title: "حالت عمود",
			text: "کسینوس صفر درجه یک است. همه‌ی ۸۵۰ وات بر هر مترمربع می‌نشیند. رادیانس را با تقسیم بر π بساز، نه با ضرب ρ در E.",
			latex: "\\begin{aligned} E(0^\\circ) &= 850\\\\ L &= \\frac{0.25\\times 850}{\\pi} = \\frac{212.5}{3.142} = 67.6\\,\\mathrm{W\\,m^{-2}\\,sr^{-1}} \\end{aligned}"
		},
		{
			title: "زنیت ۶۰ درجه",
			text: "کسینوس ۶۰ درجه دقیقاً ۱/۲ است. این یکی از جاهایی است که حساب دستی تمیزتر از ماشین‌حساب است. انرژی روی سطح نصف می‌شود و چون سطح لامبرتی است رادیانس هم نصف می‌شود.",
			latex: "\\begin{aligned} E(60^\\circ) &= 850\\times 0.5 = 425\\\\ L &= 67.6 / 2 = 33.8\\,\\mathrm{W\\,m^{-2}\\,sr^{-1}} \\end{aligned}"
		},
		{
			title: "یک زاویه‌ی میانی برای اینکه کسینوس خطی نیست",
			text: "در ۳۰ درجه، cos = √۳/۲ = ۰٫۸۶۶، نه ۰٫۵ و نه میانه‌ی حسابی صفر و شصت. E = ۷۳۶ و L = ۵۸٫۶. از صفر تا سی درجه فقط ۱۴ درصد انرژی کم می‌شود؛ از سی تا شصت، ۲۷ درصد دیگر. عصرها افت تندتر از صبح نزدیک‌ظهر است."
		},
		{
			title: "ρ را از روی L برگردان",
			text: "اگر رادیانس و تابش را داشته باشی، بازتاب همان معادله است که برای ρ حل شده. در حالت عمود: ρ = πL/E = ۳٫۱۴۲×۶۷٫۶/۸۵۰ = ۰٫۲۵. اگر π را جا بگذاری ۰٫۰۸۰ درمی‌آوری و خاک روشن را با آب عوض می‌کنی.",
			latex: "\\rho = \\frac{\\pi L}{E}"
		}
	],
	answerLatex: "\\begin{aligned} L(0^\\circ) &= 67.6\\,\\mathrm{W\\,m^{-2}\\,sr^{-1}}\\\\ L(60^\\circ) &= 33.8\\,\\mathrm{W\\,m^{-2}\\,sr^{-1}} \\end{aligned}",
	answerText: "با خورشید عمود، رادیانس ۶۷٫۶ است و در زنیت ۶۰ درجه دقیقاً نصف، ۳۳٫۸ وات بر مترمربع بر استرادیان. بازتابندگی سطح عوض نشده؛ هندسه‌ی تابش عوض شده.",
	meaning: "دو تصویر از یک خاک، صبح و عصر، رادیانس متفاوت دارند بی‌آنکه سطح عوض شده باشد. بازتابندگی برای مقایسه ساخته شده، نه خود رادیانس. و π یک ضریب تزئینی نیست: حذفش ρ را حدود سه‌برابر غلط می‌کند.",
	traps: [
		"سنجیدن θ از افق. ارتفاع ۳۰ درجه یعنی زنیت ۶۰ درجه.",
		"کسینوسِ درجه به‌جای رادیان در کدی که تابعش رادیان می‌خواهد.",
		"نوشتن L = ρE. آن یکی تابش بازتابیده‌ی نیم‌کره‌ای است، نه رادیانس.",
		"فرض لامبرت برای آب آرام یا بام فلزی. این حل فقط سطح پخشنده را می‌گوید."
	],
	relatedMath: [
		"vectors",
		"integrals",
		"solving"
	],
	relatedLabs: ["ndvi"]
};
var _06_toa_reflectance_exports = /* @__PURE__ */ __exportAll({ toaReflectance: () => toaReflectance });
var toaReflectance = {
	kind: "problem",
	slug: "toa-reflectance",
	title: "از رادیانس سنجنده تا بازتاب",
	order: 6,
	topic: "سطح",
	summary: "کالیبراسیون یک باند، و اینکه رادیانس برابر بازتاب برابر نیست.",
	scene: "بالای جو، در یک باند سبز، سنجنده ۴۰ وات بر مترمربع بر استرادیان بر میکرومتر می‌خواند. تابش خورشیدی برون‌جوِ همین باند ۱۸۴۰ در همان واحدِ بدون استرادیان است. زنیت خورشید ۴۰ درجه است و فاصله‌ی زمین–خورشید را ۱ واحد نجومی بگیر. جو را هنوز برنمی‌داریم؛ حاصل، بازتابندگی بالای جو است نه ρ سطح.",
	givens: [
		{
			symbol: "L",
			meaning: "رادیانسی بالای جو، باند سبز",
			value: "۴۰"
		},
		{
			symbol: "E_s",
			meaning: "تابش خورشید در همین باند",
			value: "۱۸۴۰"
		},
		{
			symbol: "\\theta_s",
			meaning: "زنیت خورشید",
			value: "۴۰ درجه، کسینوس ۰٫۷۶۶"
		},
		{
			symbol: "d",
			meaning: "فاصله‌ی زمین–خورشید",
			value: "۱ واحد نجومی"
		}
	],
	ask: "بازتابندگی بالای جو چقدر است؟ اگر π یا کسینوس را جا بگذاری چه عددی می‌گیری؟ و اگر دو باند رادیانس برابر داشته باشند، بازتابشان برابر است؟",
	formulas: [{
		id: "toa",
		name: "بازتابندگی بالای جو",
		latex: "\\rho = \\pi L d^2 / (E_s \\cos\\theta_s)",
		why: "رادیانسی به هندسه‌ی خورشید و به روشنایی خود باند بند است. این فرمول هر دو را برمی‌دارد. جو هنوز داخل ρ مانده."
	}],
	steps: [
		{
			title: "مخرج را جدا بساز",
			text: "اول کسینوس را در تابش خورشید ضرب کن. این تابشی است که در آن روز، در آن باند، بر واحد سطح عمود بر زمین موجود است، هنوز تقسیم بر π نشده.",
			latex: "E_s\\cos 40^\\circ = 1840 \\times 0.766 = 1409"
		},
		{
			title: "صورت",
			text: "d² = ۱. صورت فقط πL است. π را ۳٫۱۴۲ بگیر.",
			latex: "\\pi L = 3.142 \\times 40 = 125.7"
		},
		{
			title: "تقسیم",
			text: "بی‌بعد بودن جواب را همین‌جا چک کن: صورت و مخرج هر دو وات بر مترمربع بر میکرومتر‌اند، استرادیان در π جمع شده. اگر واحد L و E_s یکی نباشد، ρ دیگر بین صفر و یک نمی‌ماند.",
			latex: "\\rho = 125.7 / 1409 = 0.089"
		},
		{
			title: "دو خطای کلاسیک را عمداً حساب کن",
			text: "بدون π: ۴۰/۱۴۰۹ = ۰٫۰۲۸، یعنی سطح را بیش از حد تیره می‌بینی. بدون کسینوس: ۱۲۵٫۷/۱۸۴۰ = ۰٫۰۶۸. هر دو هنوز «عدد معقول»‌اند و همین خطرشان است؛ علامت هشدار داخل خود عدد نیست."
		},
		{
			title: "رادیانسی برابر در دو باند",
			text: "زنیت را ۳۲ درجه بگیر، cos = ۰٫۸۴۸. در باند سرخ L = ۲۸ و E_s = ۱۵۵۱. در فروسرخ نزدیک هم L = ۲۸ ولی E_s = ۱۰۴۴، چون خود خورشید در فروسرخ نزدیک کم‌نورتر است.",
			latex: "\\begin{aligned} \\rho_{\\mathrm{red}} &= \\pi\\times 28 / (1551\\times 0.848) = 87.96/1315 = 0.0669\\\\ \\rho_{\\mathrm{NIR}} &= \\pi\\times 28 / (1044\\times 0.848) = 87.96/885 = 0.0994 \\end{aligned}"
		},
		{
			title: "شاخص را روی بازتاب حساب کن، نه روی رادیانس",
			text: "NDVI این دو بازتاب ۰٫۱۹۵ است. اگر خام‌دستی شاخص را روی خود رادیانس بگذاری، چون هر دو باند ۲۸اند، شاخص صفر می‌شود. سطح یکی است؛ فقط صورت‌حساب خورشید در دو باند فرق دارد. صفر یک محصول غلط از واحد است، نه یک خاک عاری از پوشش.",
			latex: "\\mathrm{NDVI} = \\frac{0.0994-0.0669}{0.0994+0.0669} = \\frac{0.0325}{0.1663} = 0.195"
		}
	],
	answerLatex: "\\begin{aligned} \\rho_{\\mathrm{green}} &= 0.089\\\\ \\mathrm{NDVI}(L_{\\mathrm{red}}=L_{\\mathrm{NIR}}) &= 0.195 \\end{aligned}",
	answerText: "بازتاب بالای جو در سبز ۰٫۰۸۹ است. بدون π می‌شد ۰٫۰۲۸ و بدون کسینوس ۰٫۰۶۸. دو باند با رادیانس برابر ۲۸، بازتاب ۰٫۰۶۷ و ۰٫۰۹۹ دارند و NDVIشان ۰٫۲۰ است، نه صفر.",
	meaning: "تبدیل به بازتاب، هندسه‌ی خورشید و رنگ خود خورشید را از صحنه جدا می‌کند. تا این کار را نکرده‌ای، مقایسهٔ باندها مقایسهٔ سطح نیست. و این ρ هنوز بالای جو است: نور مسیر و خاموشی داخلش مانده‌اند.",
	traps: [
		"گذاشتن عدد دیجیتال به‌جای رادیانس کالیبره‌شده.",
		"E_s یک باند را برای باند دیگر قرض گرفتن.",
		"حذف π چون «فقط یک ثابت است».",
		"صدا کردن بازتاب بالای جو به‌نام بازتاب سطح."
	],
	relatedMath: ["solving", "vectors"],
	relatedLabs: ["ndvi", "atmosphere"]
};
var _07_ndvi_ratio_exports = /* @__PURE__ */ __exportAll({ ndviRatio: () => ndviRatio });
var ndviRatio = {
	kind: "problem",
	slug: "ndvi-ratio",
	title: "NDVI، نسبت باندها، و نور نصف",
	order: 7,
	topic: "سطح",
	summary: "چهار سطح، یک اثبات که روشنایی مشترک خط می‌خورد، و خواندن نسبت از روی شاخص.",
	scene: "بازتاب سطح را بعد از تصحیح جو داری، نه عدد دیجیتال را. چهار هدف در یک صحنه است: تاج انبوه، همان تاج زیر نوری که دقیقاً نصف شده، تاج تنک، خاک، و آب تیره. می‌خواهی شاخص را حساب کنی و ببینی کدام تفاوت فیزیکی است و کدام بازی نور.",
	givens: [
		{
			symbol: "\\rho_n,\\rho_r",
			meaning: "تاج انبوه",
			value: "۰٫۴۶ و ۰٫۰۵"
		},
		{
			symbol: "\\rho_n,\\rho_r",
			meaning: "همان تاج، نور نصف",
			value: "۰٫۲۳ و ۰٫۰۲۵"
		},
		{
			symbol: "\\rho_n,\\rho_r",
			meaning: "پوشش تنک",
			value: "۰٫۳۰ و ۰٫۱۱"
		},
		{
			symbol: "\\rho_n,\\rho_r",
			meaning: "خاک",
			value: "۰٫۳۲ و ۰٫۲۶"
		},
		{
			symbol: "\\rho_n,\\rho_r",
			meaning: "آب",
			value: "۰٫۰۲ و ۰٫۰۷"
		}
	],
	ask: "NDVI هر هدف، و نسبت ρ_NIR/ρ_red برای تاج انبوه و پوشش تنک.",
	formulas: [{
		id: "ndvi",
		name: "شاخص",
		latex: "\\mathrm{NDVI} = (\\rho_n-\\rho_r)/(\\rho_n+\\rho_r)",
		why: "تفاوت، روشنایی مشترک را هم با خودش بزرگ می‌کند. تقسیم بر جمع، آن عامل مشترک را برمی‌دارد و نتیجه را بین −۱ و ۱ نگه می‌دارد."
	}],
	steps: [
		{
			title: "تاج انبوه",
			text: "صورت و مخرج را جدا بنویس تا بعداً بتوانی عامل مشترک را ببینی.",
			latex: "\\mathrm{NDVI} = \\frac{0.46-0.05}{0.46+0.05} = \\frac{0.41}{0.51} = 0.804"
		},
		{
			title: "ثابت کن نور نصف شاخص را عوض نمی‌کند",
			text: "فرض کن هر دو باند در یک ضریب a ضرب شوند. a روشنایی، سایه، یا یک بهرهٔ مشترک است. در صورت و مخرج عامل می‌گیرد و خط می‌خورد. این دلیل وجود نسبت است، نه یک اتفاق عددی.",
			latex: "\\frac{a\\rho_n - a\\rho_r}{a\\rho_n + a\\rho_r} = \\frac{a(\\rho_n-\\rho_r)}{a(\\rho_n+\\rho_r)} = \\mathrm{NDVI}"
		},
		{
			title: "همان تاج با نور نصف، عدد به عدد",
			text: "۰٫۲۳ و ۰٫۰۲۵ دقیقاً نصف حالت اول‌اند. صورت ۰٫۲۰۵ و مخرج ۰٫۲۵۵، نسبت باز ۰٫۸۰۴. اگر این دو را دو «سبزی» متفاوت گزارش کنی، سایه را با تنش عوض کرده‌ای."
		},
		{
			title: "تنک، خاک، آب",
			text: "هر بار صورت را پیش از تقسیم نگاه کن. خاک صورتش کوچک است چون دو باند شبیه‌اند. آب صورتش منفی است چون در فروسرخ نزدیک از سرخ تیره‌تر است.",
			latex: "\\begin{aligned} V_{\\mathrm{sparse}} &= 0.19/0.41 = 0.463\\\\ V_{\\mathrm{soil}} &= 0.06/0.58 = 0.103\\\\ V_{\\mathrm{water}} &= -0.05/0.09 = -0.556 \\end{aligned}"
		},
		{
			title: "شاخص را به نسبت دو باند برگردان",
			text: "گاهی خود نسبت از شاخص گویاتر است. بگذار V = NDVI. از V(n+r) = n−r شروع کن، جمله‌های n را یک سو و r را سوی دیگر ببر.",
			latex: "\\begin{aligned} V n + V r &= n - r\\\\ r(V+1) &= n(1-V)\\\\ \\frac{\\rho_n}{\\rho_r} &= \\frac{1+V}{1-V} \\end{aligned}"
		},
		{
			title: "نسبت‌ها",
			text: "برای تاج انبوه (۱٫۸۰۴)/(۰٫۱۹۶) = ۹٫۲. فروسرخ نزدیک ۹ برابر سرخ است: جذب کلروفیل به‌اضافه‌ی پراکندگی درونی برگ. برای پوشش تنک (۱٫۴۶۳)/(۰٫۵۳۷) = ۲٫۷۳، و ۰٫۳۰/۰٫۱۱ = ۲٫۷۳ همان را می‌دهد. خاک با شاخص ۰٫۱۰ نسبتی نزدیک ۱٫۲ دارد؛ دو باند تقریباً یکی‌اند."
		}
	],
	answerLatex: "\\begin{aligned} V &= 0.804,\\ 0.804,\\ 0.463,\\ 0.103,\\ -0.556\\\\ \\rho_n/\\rho_r &= 9.2,\\ 2.73 \\end{aligned}",
	answerText: "تاج انبوه و نسخه‌ی نیمه‌روشناش هر دو ۰٫۸۰ هستند. تنک ۰٫۴۶، خاک ۰٫۱۰، آب −۰٫۵۶. نسبت فروسرخ به سرخ برای تاج انبوه ۹٫۲ است و برای پوشش تنک ۲٫۷.",
	meaning: "شاخص، روشنایی مشترک را دور می‌ریزد و شکل طیف را نگه می‌دارد. به همین دلیل سایهٔ یکنواخت بی‌اثر است و به همین دلیل جو، که سرخ را بیشتر از فروسرخ نزدیک روشن می‌کند، اثرش خط نمی‌خورد. عدد بالا هنوز زیست‌توده نیست: بالای حدود ۰٫۸ شاخص اشباع می‌شود و دو تاج انبوه را یکی نشان می‌دهد.",
	traps: [
		"حساب کردن شاخص روی عدد دیجیتال یا رادیانس کالیبره‌نشده. حل قبلی نشان داد رادیانس برابر، بازتاب برابر نیست.",
		"گفتن اینکه ۰٫۸ یعنی هشتاد درصد پوشش. مقیاس خطی نیست.",
		"تفسیر آب منفی به‌عنوان خطای محاسبه. صورت منفی فیزیکی است.",
		"فراموش کردن که اگر فقط یک باند زیر سایه باشد، a عامل مشترک نیست و اثبات این صفحه دیگر کار نمی‌کند."
	],
	relatedMath: ["solving"],
	relatedLabs: ["ndvi"]
};
var _08_beer_path_exports = /* @__PURE__ */ __exportAll({ beerPath: () => beerPath });
var beerPath = {
	kind: "problem",
	slug: "beer-path",
	title: "عبور جو، مسیر مایل، و جمع سه لایه",
	order: 8,
	topic: "جو",
	summary: "از τ قائم تا عبور رفت‌وبرگشت، به‌اضافه‌ی خواندن τ از روی عبور.",
	scene: "در یک باند مرئی و هوای صاف، عمق اپتیکی قائم ۰٫۱۸ است. خورشید زنیت ۶۰ درجه دارد و سنجنده تقریباً عمودی نگاه می‌کند. می‌خواهی بدانی از نور مستقیم خورشید تا سطح، و از نور بازتابیده تا سنجنده، چه کسری می‌ماند. بعد، جداگانه، سه لایه‌ی همگن را مثل یک انتگرال قطعه‌قطعه جمع می‌کنی.",
	givens: [
		{
			symbol: "\\tau_0",
			meaning: "عمق اپتیکی قائم",
			value: "۰٫۱۸"
		},
		{
			symbol: "\\theta_s",
			meaning: "زنیت خورشید",
			value: "۶۰ درجه"
		},
		{
			symbol: "\\theta_v",
			meaning: "زنیت دید",
			value: "۰، دید نادیر"
		},
		{
			symbol: "T_{\\mathrm{meas}}",
			meaning: "عبور مستقیم اندازه‌گیری‌شده در یک مسیر دیگر",
			value: "۰٫۷۲"
		}
	],
	ask: "عبور قائم، عبور مایل، عبور رفت‌وبرگشت، و عمق اپتیکی متناظر با عبور ۰٫۷۲. سپس τ سه لایه.",
	formulas: [{
		id: "beer",
		name: "بیر–لامبرت",
		latex: "T = e^{-\\tau}",
		why: "نور مستقیم نمایی کم می‌شود. این عبور باریکه‌ی مستقیم است، نه همه‌ی نوری که با پراکندگی چندگانه بالاخره می‌رسد."
	}, {
		id: "optical-depth",
		name: "عمق اپتیکی",
		latex: "\\tau = \\int \\kappa\\rho\\,ds",
		why: "τ یک عدد جادویی نیست؛ جمع خاموشی در طول مسیر است. لایه‌های همگن این انتگرال را به ضرب و جمع معمولی برمی‌گردانند."
	}],
	steps: [
		{
			title: "عبور قائم",
			text: "مسیر نادیر همان τ₀ را دارد. e⁻⁰·¹⁸ را یا از ماشین می‌گیری یا از بسط می‌سنجی. بسط خطی ۱−τ = ۰٫۸۲۰ است. مقدار درست ۰٫۸۳۵ است. برای ۰٫۱۸، تقریب حدود ۱٫۵ صدم خوش‌بینانه به خاموشی است؛ بد نیست، ولی دیگر دقیق نیست.",
			latex: "T_\\uparrow = e^{-0.18} = 0.835"
		},
		{
			title: "مسیر مایل خورشید",
			text: "برای جو تخت و زنیت نه‌چندان نزدیک افق، مسیر با ۱/cosθ بلند می‌شود. این را جرم هوا می‌گویند. در ۶۰ درجه کسینوس ۱/۲ است، پس هوایی که خورشید می‌بیند دو برابر مسیر قائم است.",
			latex: "\\tau_s = \\frac{\\tau_0}{\\cos 60^\\circ} = \\frac{0.18}{0.5} = 0.36"
		},
		{
			title: "عبور پایین‌رونده",
			text: "همان نما، با τ بزرگ‌تر. این‌جا بسط خطی ۱−۰٫۳۶ = ۰٫۶۴ در برابر ۰٫۶۹۸ دیگر حدود ۶ صدم خطا دارد. هر چه خورشید پایین‌تر، حق نداری نمایی را خطی کنی.",
			latex: "T_\\downarrow = e^{-0.36} = 0.698"
		},
		{
			title: "رفت و برگشت نور بازتابیده",
			text: "نور مستقیم باید پایین بیاید و بعد از بازتاب بالا برود. اگر پراکندگی به داخل باریکه را نادیده بگیری، دو عبور در هم ضرب می‌شوند. دید نادیر همان ۰٫۸۳۵ را دارد.",
			latex: "T_\\downarrow T_\\uparrow = 0.698 \\times 0.835 = 0.583"
		},
		{
			title: "معنی ۰٫۵۸",
			text: "فقط ۵۸ درصد باریکه‌ی مستقیمِ بازتابیده به سنجنده می‌رسد. ۴۲ درصد یا حذف شده یا از باریکه بیرون پراکنده شده. بخشی از همان پراکندگی به‌صورت نور مسیر برمی‌گردد و به رادیانس اضافه می‌شود؛ این ضرب به‌تنهایی تصویر را تصحیح نمی‌کند، فقط اتلاف مستقیم را می‌گوید."
		},
		{
			title: "از روی عبور، τ را بخوان",
			text: "لگاریتم وارون نماست. اگر عبور مستقیم ۰٫۷۲ اندازه‌گیری شده باشد، عمق اپتیکی همان مسیر منفی لگاریتم طبیعی عبور است. لگاریتم معمولی را باید در ۲٫۳۰۳ ضرب کنی؛ اگر فراموش کنی τ را ۰٫۱۴۲ می‌خوانی به‌جای ۰٫۳۲۹.",
			latex: "\\tau = -\\ln 0.72 = 0.329"
		},
		{
			title: "انتگرال را با سه لایه عوض کن",
			text: "لایه‌ی مرزی: ضخامت ۱٫۵ کیلومتر و ضریب خاموشی ۰٫۰۴ بر کیلومتر. لایه‌ی میانی: ۳ کیلومتر با ۰٫۰۱۲. بالای آن: ۶ کیلومتر با ۰٫۰۰۳. در هر لایه κ یکنواخت است، پس انتگرال ضرب است.",
			latex: "\\begin{aligned} \\tau_1 &= 0.04\\times 1.5 = 0.060\\\\ \\tau_2 &= 0.012\\times 3.0 = 0.036\\\\ \\tau_3 &= 0.003\\times 6.0 = 0.018\\\\ \\tau &= 0.114,\\qquad e^{-0.114} = 0.892 \\end{aligned}"
		}
	],
	answerLatex: "\\begin{aligned} T_\\uparrow &= 0.835,\\quad T_\\downarrow = 0.698,\\quad T_\\downarrow T_\\uparrow = 0.583\\\\ \\tau(0.72) &= 0.329,\\quad \\tau_{\\mathrm{3\\,layers}} = 0.114 \\end{aligned}",
	answerText: "عبور قائم ۸۴ درصد است، عبور خورشید در زنیت ۶۰ درجه ۷۰ درصد، و رفت‌وبرگشت ۵۸ درصد. عبور ۰٫۷۲ یعنی τ = ۰٫۳۳. سه لایه روی هم τ = ۰٫۱۱ می‌دهند و بیش از نصف این خاموشی در همان ۱٫۵ کیلومتر پایین است.",
	meaning: "خاموشی در مرز پایین جو جمع می‌شود، مسیر عصر تقریباً دو برابر ظهر تمام می‌شود، و نور سطح پیش از هر تصحیح پیچیده‌ای همین‌حالا نزدیک نصف شده است. خواندن τ از روی عبور فقط یک لگاریتم است، به شرطی که نوری که اندازه گرفته‌ای همان باریکه‌ی مستقیم باشد.",
	traps: [
		"تقریب ۱−τ وقتی τ از حدود ۰٫۱ بزرگ‌تر است.",
		"لگاریتم دهدهی به‌جای طبیعی در τ = −ln T.",
		"استفاده از ۱/cosθ نزدیک افق. در ۸۵ درجه جو دیگر تخت نیست و جرم هوا را از مدل کروی می‌گیرند.",
		"ضرب کردن T↓T↑ و تمام دانستن تصحیح. نور مسیر در این ضرب نیست."
	],
	relatedMath: [
		"exponentials",
		"integrals",
		"solving"
	],
	relatedLabs: ["atmosphere"]
};
var _09_orbit_pixel_exports = /* @__PURE__ */ __exportAll({ orbitPixel: () => orbitPixel });
var orbitPixel = {
	kind: "problem",
	slug: "orbit-pixel",
	title: "مدار ۷۰۵ کیلومتر و پیکسل ۳۰ متر",
	order: 9,
	topic: "مدار",
	summary: "از شعاع واقعی تا سرعت، دوره، و زاویه‌ای که یک پیکسل را می‌سازد.",
	scene: "ماهواره‌ای در مدار دایره‌ای، ۷۰۵ کیلومتر بالاتر از سطح، می‌خواهی حدود ۳۰ متر را روی زمین جدا کند. شعاع زمین را ۶۳۷۱ کیلومتر بگیر و GM زمین را ۳٫۹۸۶×۱۰¹⁴ مترمکعب بر مجذور ثانیه. دید را نادیر فرض کن.",
	givens: [
		{
			symbol: "h",
			meaning: "ارتفاع از سطح",
			value: "۷۰۵ کیلومتر"
		},
		{
			symbol: "R",
			meaning: "شعاع زمین",
			value: "۶۳۷۱ کیلومتر"
		},
		{
			symbol: "GM",
			meaning: "ثابت گرانشی زمین",
			value: "۳٫۹۸۶×۱۰¹⁴ m³/s²"
		},
		{
			symbol: "G",
			meaning: "رد پیکسل مطلوب",
			value: "۳۰ متر"
		}
	],
	ask: "سرعت مداری، دوره‌ی تناوب، تعداد دور در شبانه‌روز نجومی، و زاویه‌ی دید آنی لازم برای پیکسل ۳۰ متری.",
	formulas: [
		{
			id: "orbit-velocity",
			name: "سرعت دایره‌ای",
			latex: "v = \\sqrt{GM/r}",
			why: "گرانش شتاب مرکزگرا را می‌سازد و جرم ماهواره خط می‌خورد. r فاصله از مرکز است."
		},
		{
			id: "kepler",
			name: "دوره",
			latex: "T = 2\\pi r / v",
			why: "در مدار دایره‌ای محیط تقسیم بر سرعت همان دوره‌ای است که قانون سوم کپلر می‌دهد. لازم نیست هر دو را از صفر حساب کنی."
		},
		{
			id: "gifov",
			name: "رد پیکسل",
			latex: "G = h\\,\\beta",
			why: "کمان کوچک. این‌جا شعاع، ارتفاع از سطح است نه فاصله از مرکز؛ پیکسل روی سطح سنجیده می‌شود."
		}
	],
	steps: [
		{
			title: "شعاع را از مرکز حساب کن",
			text: "فرمول گرانش سطح را نمی‌شناسد. اگر ۷۰۵ را به‌جای ۷۰۷۶ بگذاری، زیر رادیکال ده برابر بزرگ می‌شود و سرعت را حدود سه‌برابر تند درمی‌آوری.",
			latex: "r = 6371 + 705 = 7076\\,\\mathrm{km} = 7.076\\times 10^{6}\\,\\mathrm{m}"
		},
		{
			title: "زیر رادیکال، بعد ریشه",
			text: "۳٫۹۸۶×۱۰¹⁴ تقسیم بر ۷٫۰۷۶×۱۰⁶ می‌شود ۵٫۶۳۳×۱۰⁷. ریشه‌ی ۱۰⁷ حدود ۳۱۶۲ است و ریشه‌ی ۵٫۶۳۳ حدود ۲٫۳۷۳. ضربشان ۷۵۰۵ متر بر ثانیه است. چک: ۷۵۰۵² = ۵٫۶۳۲۵×۱۰⁷، نزدیک همان زیر رادیکال.",
			latex: "v = \\sqrt{5.633\\times 10^{7}} = 7.505\\,\\mathrm{km\\,s^{-1}}"
		},
		{
			title: "دوره از روی محیط",
			text: "محیط ۲πr = ۲×۳٫۱۴۱۶×۷۰۷۶ = ۴۴۴۷۰ کیلومتر است. تقسیم بر سرعت:",
			latex: "T = \\frac{44470}{7.505} = 5924\\,\\mathrm{s} = 98.7\\,\\mathrm{min}"
		},
		{
			title: "چند بار در روز از استوا می‌گذرد",
			text: "شبانه‌روز نجومی ۸۶۱۶۴ ثانیه است، کمی کوتاه‌تر از ۲۴ ساعت خورشیدی، چون ملاک بازگشت نسبت به ستاره‌هاست نه نسبت به خورشید.",
			latex: "N = 86164 / 5924 = 14.55"
		},
		{
			title: "سرعت رد زمینی، با یک احتیاط",
			text: "اگر زمین نمی‌چرخید، سرعت اثر ماهواره روی سطح v×R/r بود: ۷٫۵۰۵×۶۳۷۱/۷۰۷۶ = ۶٫۷۶ کیلومتر بر ثانیه. چرخش زمین این عدد را بسته به جهت مدار کم یا زیاد می‌کند. برای طراحی زمان نوردهی مرتبه‌اش مهم است، برای عدد نهایی مأموریت کافی نیست."
		},
		{
			title: "زاویه‌ی لازم برای ۳۰ متر",
			text: "این‌جا ارتفاع از سطح در فرمول است، چون قاعده‌ی مثلث روی سطح است. β به رادیان درمی‌آید. ضرب در یک میلیون، میکرورادیان می‌دهد.",
			latex: "\\beta = \\frac{30}{705000} = 4.26\\times 10^{-5}\\,\\mathrm{rad} = 42.6\\,\\mu\\mathrm{rad}"
		},
		{
			title: "مقایسه با هواپیما",
			text: "همان رابطه در ارتفاع ۳ کیلومتر با زاویه‌ی دید ۲٫۵ میلی‌رادیان: G = ۳۰۰۰×۰٫۰۰۲۵ = ۷٫۵ متر. زاویه‌ی درشت‌تر، ارتفاع خیلی کمتر، پیکسل ریزتر. تفکیک خوب از زاویه‌ی کوچک در مدار می‌آید یا از نزدیک شدن به سطح."
		}
	],
	answerLatex: "\\begin{aligned} v &= 7.505\\,\\mathrm{km\\,s^{-1}}\\\\ T &= 98.7\\,\\mathrm{min},\\quad N = 14.55\\\\ \\beta_{30\\,\\mathrm{m}} &= 42.6\\,\\mu\\mathrm{rad} \\end{aligned}",
	answerText: "ماهواره ۷٫۵۰ کیلومتر بر ثانیه حرکت می‌کند، هر ۹۸٫۷ دقیقه یک دور می‌زند و در شبانه‌روز نجومی ۱۴٫۶ دور می‌زند. پیکسل ۳۰ متری از این ارتفاع زاویه‌ای برابر ۴۳ میکرورادیان می‌خواهد.",
	meaning: "ارتفاع را که انتخاب کردی، سرعت و دوره دیگر آزاد نیستند و اندازه‌ی پیکسل فقط یک زاویه است. ۱۴٫۶ دور در روز یعنی ردهای متوالی روی استوا با چرخش زمین از هم جدا می‌شوند؛ تکرار دقیق یک نقطه طراحی جداگانه‌ای است و از این عدد تنها درنمی‌آید.",
	traps: [
		"گذاشتن ارتفاع به‌جای شعاع مرکزی در سرعت و دوره.",
		"گذاشتن شعاع مرکزی به‌جای ارتفاع در اندازه‌ی پیکسل.",
		"رادیان نساختن زاویه پیش از ضرب در ارتفاع.",
		"یکی گرفتن سرعت مداری با سرعت رد روی نقشه."
	],
	relatedMath: ["polar", "solving"],
	relatedLabs: ["orbit"]
};
var _10_radar_range_exports = /* @__PURE__ */ __exportAll({ radarRangeProblem: () => radarRangeProblem });
var radarRangeProblem = {
	kind: "problem",
	slug: "radar-range",
	title: "تفکیک برد با پهنای باند",
	order: 10,
	topic: "مدار",
	summary: "چرا تپ رادار را پهن‌باند می‌سازند، و آن ضریب دو از کجا می‌آید.",
	scene: "یک رادار تصویربردار دو حالت دارد: پهنای باند چیرپ ۱۰۰ مگاهرتز، و حالت درشت‌تر ۲۰ مگاهرتز. می‌خواهی سلول برد مایل را حساب کنی و بفهمی چرا با بلندتر کردن «طول تپ» پیش از فشرده‌سازی، تفکیک خراب نمی‌شود.",
	givens: [{
		symbol: "c",
		meaning: "سرعت نور",
		value: "۲٫۹۹۸×۱۰⁸ متر بر ثانیه"
	}, {
		symbol: "B",
		meaning: "پهنای باند دو حالت",
		value: "۱۰۰ و ۲۰ مگاهرتز"
	}],
	ask: "تفکیک برد مایل در هر حالت چند متر است؟",
	formulas: [{
		id: "radar-range",
		name: "تفکیک برد",
		latex: "\\delta_r = c/(2B)",
		why: "بعد از فشرده‌سازی، طول زمانی تپ حدود ۱/B است. ضریب دو مال رفت‌وبرگشت است."
	}],
	steps: [
		{
			title: "باند را به هرتز ببر",
			text: "۱۰۰ مگاهرتز = ۱۰⁸ هرتز. ۲۰ مگاهرتز = ۲×۱۰⁷ هرتز. مگاهرتز را مستقیم در مخرج کنار سرعت نور نگذار."
		},
		{
			title: "ضریب دو را پیش از تقسیم جدا کن",
			text: "نور تا هدف می‌رود و برمی‌گردد. اگر هدف فقط یک متر دورتر باشد، مسیر اضافه دو متر است. پس طولی که تپ در زمان ۱/B طی می‌کند باید نصف شود تا به اختلاف فاصله برسد.",
			latex: "\\frac{c}{2} = 1.499\\times 10^{8}\\,\\mathrm{m\\,s^{-1}}"
		},
		{
			title: "حالت ریز",
			text: "تقسیم بر ۱۰⁸ یعنی ممیز هشت رقم می‌آید جلو. حاصل ۱٫۵۰ متر است. با سه رقم سرعت نور، ادعای میلی‌متر بی‌معنی است.",
			latex: "\\delta_r = \\frac{1.499\\times 10^{8}}{1.00\\times 10^{8}} = 1.50\\,\\mathrm{m}"
		},
		{
			title: "حالت درشت",
			text: "باند پنج برابر باریک‌تر است، سلول پنج برابر درشت‌تر. این نسبت را بدون حساب مجدد هم می‌دانستی: تفکیک با B نسبت عکس دارد.",
			latex: "\\delta_r = \\frac{1.499\\times 10^{8}}{2.0\\times 10^{7}} = 7.50\\,\\mathrm{m}"
		},
		{
			title: "طول تپ و پهنای باند را از هم جدا کن",
			text: "تپ بلند انرژی بیشتر برمی‌گرداند، چون مدت روشن بودن فرستنده بیشتر است. تفکیک را پهنای باند فرکانسی همان تپ می‌سازد، نه مدت خامش. فشرده‌سازی، تپ بلندِ پهن‌باند را به تپ کوتاهی به طول حدود ۱/B برمی‌گرداند. اگر فقط مدت تپ را بلند کنی و باند را باز نکنی، سلول برد ریز نمی‌شود."
		},
		{
			title: "برد مایل غیر از برد زمینی است",
			text: "۱٫۵۰ متر در راستای دید است. روی زمین، بسته به زاویه‌ی فرود، اثر این سلول کش می‌آید. این فرمول آن تصویر را انجام نمی‌دهد؛ اگر کسی ۳۰ متر زمینی نقل کرد، هندسه‌ی فرود را هم داخلش کرده است."
		}
	],
	answerLatex: "\\delta_r(100\\,\\mathrm{MHz}) = 1.50\\,\\mathrm{m},\\qquad \\delta_r(20\\,\\mathrm{MHz}) = 7.50\\,\\mathrm{m}",
	answerText: "با پهنای باند ۱۰۰ مگاهرتز سلول برد مایل ۱٫۵ متر است و با ۲۰ مگاهرتز ۷٫۵ متر. پنج برابر باند باریک‌تر، پنج برابر سلول درشت‌تر.",
	meaning: "تفکیک برد رادار یک حد هندسی اپتیکی نیست؛ از پهنای باند و از رفت‌وبرگشت نور می‌آید. انرژی تپ و ریز بودن سلول دو بودجه‌ی جدا هستند و فقط وقتی با هم بهتر می‌شوند که باند هم باز شود.",
	traps: [
		"جا انداختن ضریب ۲ و گرفتن ۳ متر به‌جای ۱٫۵.",
		"گذاشتن مگاهرتز به‌جای هرتز و درآمدن جواب به ۱۵۰ میلیون متر.",
		"یکی گرفتن مدت تپ با ۱/B، پیش از آنکه باند را دانسته باشی.",
		"خواندن برد مایل به‌عنوان اندازه‌ی پیکسل روی نقشه."
	],
	relatedMath: ["solving"],
	relatedLabs: []
};
function isFormula(value) {
	if (!value || typeof value !== "object") return false;
	const v = value;
	return v.kind === "formula" && typeof v.id === "string" && Array.isArray(v.parts);
}
function isLesson(value) {
	if (!value || typeof value !== "object") return false;
	const v = value;
	return v.kind === "lesson" && typeof v.slug === "string" && Array.isArray(v.blocks);
}
function isPrimer(value) {
	if (!value || typeof value !== "object") return false;
	const v = value;
	return v.kind === "primer" && typeof v.slug === "string" && Array.isArray(v.blocks);
}
function isQuiz(value) {
	if (!value || typeof value !== "object") return false;
	const v = value;
	return (v.kind === "quiz" || v.kind === "exam") && typeof v.id === "string" && Array.isArray(v.questions);
}
function isProblem(value) {
	if (!value || typeof value !== "object") return false;
	const v = value;
	return v.kind === "problem" && typeof v.slug === "string" && Array.isArray(v.steps) && Array.isArray(v.givens);
}
function gather(mods, guard) {
	const out = [];
	for (const mod of Object.values(mods)) {
		if (!mod || typeof mod !== "object") continue;
		for (const value of Object.values(mod)) if (guard(value)) out.push(value);
	}
	return out;
}
var formulaMods = /* #__PURE__ */ Object.assign({
	"./formulas/beer.ts": beer_exports,
	"./formulas/brdf.ts": brdf_exports,
	"./formulas/brightness.ts": brightness_exports,
	"./formulas/cosine-law.ts": cosine_law_exports,
	"./formulas/doppler.ts": doppler_exports,
	"./formulas/em-speed.ts": em_speed_exports,
	"./formulas/gifov.ts": gifov_exports,
	"./formulas/kepler.ts": kepler_exports,
	"./formulas/lambert.ts": lambert_exports,
	"./formulas/maxwell-ampere.ts": maxwell_ampere_exports,
	"./formulas/maxwell-faraday.ts": maxwell_faraday_exports,
	"./formulas/maxwell-gauss-b.ts": maxwell_gauss_b_exports,
	"./formulas/maxwell-gauss-e.ts": maxwell_gauss_e_exports,
	"./formulas/ndvi.ts": ndvi_exports,
	"./formulas/optical-depth.ts": optical_depth_exports,
	"./formulas/orbit-velocity.ts": orbit_velocity_exports,
	"./formulas/photon-energy.ts": photon_energy_exports,
	"./formulas/planck.ts": planck_exports,
	"./formulas/radar-range.ts": radar_range_exports,
	"./formulas/stefan.ts": stefan_exports,
	"./formulas/toa.ts": toa_exports,
	"./formulas/wave-speed.ts": wave_speed_exports,
	"./formulas/wien.ts": wien_exports
});
var lessonMods = /* #__PURE__ */ Object.assign({
	"./lessons/01-introduction.ts": _01_introduction_exports,
	"./lessons/02-waves.ts": _02_waves_exports,
	"./lessons/03-radiation.ts": _03_radiation_exports,
	"./lessons/04-interaction.ts": _04_interaction_exports,
	"./lessons/05-atmosphere.ts": _05_atmosphere_exports,
	"./lessons/06-orbit.ts": _06_orbit_exports
});
var primerMods = /* #__PURE__ */ Object.assign({
	"./math/derivatives.ts": derivatives_exports,
	"./math/exponentials.ts": exponentials_exports,
	"./math/integrals.ts": integrals_exports,
	"./math/polar.ts": polar_exports,
	"./math/solving.ts": solving_exports,
	"./math/vectors.ts": vectors_exports
});
var quizMods = /* #__PURE__ */ Object.assign({
	"./quizzes/atmosphere.ts": atmosphere_exports,
	"./quizzes/interaction.ts": interaction_exports,
	"./quizzes/intro.ts": intro_exports,
	"./quizzes/orbit.ts": orbit_exports,
	"./quizzes/radiation.ts": radiation_exports,
	"./quizzes/waves.ts": waves_exports
});
var examMods = /* #__PURE__ */ Object.assign({ "./exams/midterm-1.ts": midterm_1_exports });
var problemMods = /* #__PURE__ */ Object.assign({
	"./problems/01-photon-bands.ts": _01_photon_bands_exports,
	"./problems/02-wien-peaks.ts": _02_wien_peaks_exports,
	"./problems/03-stefan-sensitivity.ts": _03_stefan_sensitivity_exports,
	"./problems/04-brightness-temp.ts": _04_brightness_temp_exports,
	"./problems/05-lambert-cosine.ts": _05_lambert_cosine_exports,
	"./problems/06-toa-reflectance.ts": _06_toa_reflectance_exports,
	"./problems/07-ndvi-ratio.ts": _07_ndvi_ratio_exports,
	"./problems/08-beer-path.ts": _08_beer_path_exports,
	"./problems/09-orbit-pixel.ts": _09_orbit_pixel_exports,
	"./problems/10-radar-range.ts": _10_radar_range_exports
});
var formulas = gather(formulaMods, isFormula);
var lessons = gather(lessonMods, isLesson).sort((a, b) => a.order - b.order);
var primers = gather(primerMods, isPrimer).sort((a, b) => a.order - b.order);
var quizzes = gather({
	...quizMods,
	...examMods
}, isQuiz);
var problems = gather(problemMods, isProblem).sort((a, b) => a.order - b.order);
var formulaMap = new Map(formulas.map((item) => [item.id, item]));
var lessonMap = new Map(lessons.map((item) => [item.slug, item]));
var primerMap = new Map(primers.map((item) => [item.slug, item]));
var quizMap = new Map(quizzes.map((item) => [item.id, item]));
var problemMap = new Map(problems.map((item) => [item.slug, item]));
function getFormula(id) {
	return formulaMap.get(id);
}
function getLesson(slug) {
	return lessonMap.get(slug);
}
function getPrimer(slug) {
	return primerMap.get(slug);
}
function getQuiz(id) {
	return quizMap.get(id);
}
function getProblem(slug) {
	return problemMap.get(slug);
}
function exams() {
	return quizzes.filter((item) => item.kind === "exam");
}
function neighbors(slug) {
	const index = lessons.findIndex((item) => item.slug === slug);
	if (index < 0) return {};
	return {
		prev: index > 0 ? lessons[index - 1] : void 0,
		next: index < lessons.length - 1 ? lessons[index + 1] : void 0
	};
}
function problemNeighbors(slug) {
	const index = problems.findIndex((item) => item.slug === slug);
	if (index < 0) return {};
	return {
		prev: index > 0 ? problems[index - 1] : void 0,
		next: index < problems.length - 1 ? problems[index + 1] : void 0
	};
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/load-labs-C0eWt1XQ.js
var C = 299792458;
var H = 662607015e-42;
var K_B = 1380649e-29;
var SIGMA = 5.670374419e-8;
var WIEN_B = .002897771955;
var MU_EARTH = 3986004418e5;
var R_EARTH = 6371e3;
var SIDEREAL_DAY = 86164;
var EV = 1602176634e-28;
function planckB(lambdaM, tempK) {
	if (lambdaM <= 0 || tempK <= 0) return 0;
	const exponent = H * C / (lambdaM * K_B * tempK);
	if (exponent > 700) return 0;
	const denom = Math.exp(exponent) - 1;
	if (denom <= 0) return 0;
	return 2 * H * C * C / lambdaM ** 5 / denom;
}
function wienPeak(tempK) {
	return WIEN_B / tempK;
}
function stefan(tempK) {
	return SIGMA * tempK ** 4;
}
function photonEv(lambdaM) {
	return H * C / lambdaM / EV;
}
function circularOrbit(altitudeM) {
	const r = R_EARTH + altitudeM;
	return {
		r,
		v: Math.sqrt(MU_EARTH / r),
		period: 2 * Math.PI * Math.sqrt(r ** 3 / MU_EARTH)
	};
}
function ndvi(nir, red) {
	const den = nir + red;
	if (den === 0) return 0;
	return (nir - red) / den;
}
function transmittance(tau) {
	return Math.exp(-Math.max(0, tau));
}
function apparentReflectance(rho, tau, path) {
	const t = transmittance(tau);
	return path * (1 - t) + rho * t;
}
function logMap(t, min, max) {
	const a = Math.log(min);
	return Math.exp(a + (Math.log(max) - a) * clamp01(t));
}
function logUnmap(value, min, max) {
	return clamp01((Math.log(value) - Math.log(min)) / (Math.log(max) - Math.log(min)));
}
function clamp01(t) {
	return Math.min(1, Math.max(0, t));
}
function orbitClass(altitudeKm) {
	if (altitudeKm < 2e3) return "مدار پایین (LEO)";
	if (altitudeKm < 2e4) return "مدار میانی (MEO)";
	if (altitudeKm < 36e3) return "نزدیک زمین‌آهنگ";
	return "زمین‌آهنگ و بالاتر";
}
function ndviLabel(value) {
	if (value < 0) return "نزدیک آب، برف، یا ابر";
	if (value < .2) return "خاک لخت یا سطح بدون پوشش";
	if (value < .4) return "پوشش تنک";
	if (value < .6) return "پوشش متوسط";
	return "پوشش گیاهی انبوه";
}
var atmosphere_lab_exports = /* @__PURE__ */ __exportAll({
	Lab: () => Lab$4,
	labMeta: () => labMeta$4
});
var labMeta$4 = {
	id: "atmosphere",
	title: "عبور و نور مسیر",
	summary: "مدل آموزشی یک‌لایه: سطح لامبرتی ضعیف می‌شود و جو نور اضافه می‌ریزد. این تصحیح عملیاتی نیست.",
	order: 4
};
function Lab$4() {
	const [tau, setTau] = (0, import_react.useState)(.35);
	const [rho, setRho] = (0, import_react.useState)(.25);
	const [path, setPath] = (0, import_react.useState)(.18);
	const [ready, setReady] = (0, import_react.useState)(false);
	const { markLab } = useProgress();
	(0, import_react.useEffect)(() => setReady(true), []);
	const trans = transmittance(tau);
	const apparent = apparentReflectance(rho, tau, path);
	const bias = apparent - rho;
	const curve = (0, import_react.useMemo)(() => Array.from({ length: 61 }, (_, index) => {
		const value = index / 20;
		return {
			tau: value,
			t: transmittance(value)
		};
	}), []);
	function touch() {
		markLab("atmosphere");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider$1, {
				label: "عمق اپتیکی",
				value: faNum(tau, 2),
				min: 0,
				max: 3,
				step: .01,
				current: tau,
				onChange: (value) => {
					setTau(value);
					touch();
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider$1, {
				label: "بازتاب واقعی سطح",
				value: faNum(rho, 2),
				min: 0,
				max: 1,
				step: .01,
				current: rho,
				onChange: (value) => {
					setRho(value);
					touch();
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider$1, {
				label: "شدت نور مسیر",
				value: faNum(path, 2),
				min: 0,
				max: .6,
				step: .01,
				current: path,
				onChange: (value) => {
					setPath(value);
					touch();
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-48 w-full",
				dir: "ltr",
				children: ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
						data: curve,
						margin: {
							top: 8,
							right: 8,
							left: 0,
							bottom: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "tau",
								type: "number",
								domain: [0, 3],
								tickFormatter: (value) => faNum(Number(value), 0),
								stroke: "var(--color-muted)",
								tick: {
									fill: "var(--color-muted)",
									fontSize: 12
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								domain: [0, 1],
								tickFormatter: (value) => faNum(Number(value), 1),
								stroke: "var(--color-muted)",
								tick: {
									fill: "var(--color-muted)",
									fontSize: 12
								},
								width: 32
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								formatter: (value) => [faNum(Number(value), 2), "عبور"],
								labelFormatter: (label) => `τ = ${faNum(Number(label), 2)}`,
								contentStyle: {
									background: "var(--color-card)",
									border: "1px solid var(--color-line)",
									borderRadius: 12
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "t",
								stroke: "var(--color-cane)",
								dot: false,
								strokeWidth: 2,
								isAnimationActive: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceDot, {
								x: tau,
								y: trans,
								r: 5,
								fill: "var(--color-copper)",
								stroke: "var(--color-ink)"
							})
						]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full rounded-xl bg-paper" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact$3, {
					label: "عبور",
					value: faNum(trans, 3)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact$3, {
					label: "بازتاب ظاهری",
					value: faNum(apparent, 3)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "leading-relaxed",
				children: Math.abs(bias) < .01 ? "در این تنظیم، ظاهری و واقعی تقریباً یکی‌اند." : bias > 0 ? "سطح تیره‌تر از چیزی است که سنجنده می‌بیند: نور مسیر روشنایی اضافه کرده." : "سطح روشن‌تر از چیزی است که سنجنده می‌بیند: عبور، بخشی از نور را برده."
			})
		]
	});
}
function Fact$3({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-paper px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-sm text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1 text-xl font-semibold tabular-nums",
			dir: "ltr",
			children: value
		})]
	});
}
function Slider$1({ label, value, min, max, step, current, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tabular-nums",
				dir: "ltr",
				children: value
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "range",
			min,
			max,
			step,
			value: current,
			onChange: (event) => onChange(Number(event.target.value)),
			className: "mt-1 h-11 w-full accent-cane"
		})]
	});
}
var blackbody_lab_exports = /* @__PURE__ */ __exportAll({
	Lab: () => Lab$3,
	labMeta: () => labMeta$3
});
var labMeta$3 = {
	id: "blackbody",
	title: "جسم سیاه",
	summary: "دما را عوض کن. قله جابه‌جا می‌شود و خروج کل انرژی با توان چهارم تغییر می‌کند. محور عمودی به قله مقیاس شده است.",
	order: 2
};
var PRESETS$2 = [
	{
		name: "زمین",
		t: 255
	},
	{
		name: "بدن",
		t: 310
	},
	{
		name: "شعله",
		t: 1200
	},
	{
		name: "رشته",
		t: 2800
	},
	{
		name: "خورشید",
		t: 5772
	}
];
function Lab$3() {
	const [temp, setTemp] = (0, import_react.useState)(5772);
	const [ready, setReady] = (0, import_react.useState)(false);
	const { markLab } = useProgress();
	(0, import_react.useEffect)(() => setReady(true), []);
	const model = (0, import_react.useMemo)(() => {
		const peak = wienPeak(temp);
		const min = Math.min(2e-7, peak / 6);
		const max = peak * 5;
		let ymax = 0;
		const raw = [];
		const n = 90;
		for (let i = 0; i < n; i += 1) {
			const lambda = min + (max - min) * i / 89;
			const value = planckB(lambda, temp);
			if (value > ymax) ymax = value;
			raw.push({
				x: lambda * 1e6,
				y: value
			});
		}
		return {
			peak,
			min,
			max,
			rows: raw.map((row) => ({
				x: row.x,
				y: ymax > 0 ? row.y / ymax : 0
			})),
			exitance: stefan(temp),
			ratio: (temp / 300) ** 4
		};
	}, [temp]);
	const showVisible = model.max * 1e6 > .4 && model.min * 1e6 < .7;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: PRESETS$2.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setTemp(preset.t);
						markLab("blackbody");
					},
					className: "inline-flex min-h-11 items-center rounded-full border border-line bg-paper px-3 text-sm",
					children: preset.name
				}, preset.name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "دما" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tabular-nums",
						children: [faNum(temp, 0), " K"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "range",
					min: 250,
					max: 6e3,
					step: 10,
					value: temp,
					onChange: (event) => {
						setTemp(Number(event.target.value));
						markLab("blackbody");
					},
					className: "mt-1 h-11 w-full accent-copper"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-72 w-full",
				dir: "ltr",
				children: ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
						data: model.rows,
						margin: {
							top: 12,
							right: 12,
							left: 0,
							bottom: 8
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "var(--color-line)",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "x",
								type: "number",
								domain: [model.min * 1e6, model.max * 1e6],
								tickFormatter: (value) => faNum(Number(value), Number(value) < 10 ? 1 : 0),
								stroke: "var(--color-muted)",
								tick: {
									fill: "var(--color-muted)",
									fontSize: 12
								},
								label: {
									value: "μm",
									position: "insideBottom",
									offset: -2,
									fill: "var(--color-muted)"
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								domain: [0, 1],
								tickFormatter: (value) => faNum(Number(value), 1),
								stroke: "var(--color-muted)",
								tick: {
									fill: "var(--color-muted)",
									fontSize: 12
								},
								width: 36
							}),
							showVisible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceArea, {
								x1: Math.max(.4, model.min * 1e6),
								x2: Math.min(.7, model.max * 1e6),
								fill: "var(--color-copper)",
								fillOpacity: .15
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								formatter: (value) => [faNum(Number(value), 2), "نسبت به قله"],
								labelFormatter: (label) => `λ = ${faNum(Number(label), 2)} μm`,
								contentStyle: {
									background: "var(--color-card)",
									border: "1px solid var(--color-line)",
									borderRadius: 12
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "y",
								stroke: "var(--color-cane)",
								strokeWidth: 2,
								dot: false,
								isAnimationActive: false
							})
						]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full rounded-xl bg-paper" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: showVisible ? "نوار مسی، اگر در قاب باشد، بازه‌ی مرئی است." : "قله بیرون از نور مرئی است؛ قاب با دما جابه‌جا شده تا شکل طیف دیده شود."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-2 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact$2, {
						label: "طول‌موج قله",
						value: formatLength(model.peak)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact$2, {
						label: "باند قله",
						value: spectrumBand(model.peak)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact$2, {
						label: "خروج کل",
						value: `${faSci(model.exitance, 2)} W/m²`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact$2, {
						label: "نسبت به ۳۰۰ K",
						value: `× ${faNum(model.ratio, model.ratio >= 100 ? 0 : 1)}`
					})
				]
			})
		]
	});
}
function Fact$2({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-paper px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-sm text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1 font-semibold",
			dir: "ltr",
			children: value
		})]
	});
}
var ndvi_lab_exports = /* @__PURE__ */ __exportAll({
	Lab: () => Lab$2,
	labMeta: () => labMeta$2
});
var labMeta$2 = {
	id: "ndvi",
	title: "بازتاب و NDVI",
	summary: "سرخ و فروسرخ نزدیک را عوض کن. شاخص از تفاوتشان ساخته می‌شود، نه از روشنایی مطلق.",
	order: 3
};
var PRESETS$1 = [
	{
		name: "آب",
		red: .05,
		nir: .02
	},
	{
		name: "خاک",
		red: .28,
		nir: .34
	},
	{
		name: "تنک",
		red: .16,
		nir: .3
	},
	{
		name: "کشت",
		red: .08,
		nir: .46
	},
	{
		name: "انبوه",
		red: .04,
		nir: .58
	}
];
function Lab$2() {
	const [red, setRed] = (0, import_react.useState)(.08);
	const [nir, setNir] = (0, import_react.useState)(.46);
	const { markLab } = useProgress();
	const value = ndvi(nir, red);
	const marker = (value + 1) / 2 * 100;
	function touch(nextRed, nextNir) {
		setRed(nextRed);
		setNir(nextNir);
		markLab("ndvi");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: PRESETS$1.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => touch(preset.red, preset.nir),
					className: "inline-flex min-h-11 items-center rounded-full border border-line bg-paper px-3 text-sm",
					children: preset.name
				}, preset.name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
				label: "بازتاب سرخ",
				value: red,
				onChange: (next) => touch(next, nir)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
				label: "بازتاب فروسرخ نزدیک",
				value: nir,
				onChange: (next) => touch(red, next)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-paper px-4 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "NDVI"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-4xl font-semibold tabular-nums " + (value >= .4 ? "text-cane" : value < .1 ? "text-copper" : "text-ink"),
						dir: "ltr",
						children: faNum(value, 2)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1",
						children: ndviLabel(value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mt-4 h-3 rounded-full bg-line",
						dir: "ltr",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-y-0 left-0 w-1/2 rounded-full bg-copper-soft" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-y-0 right-0 w-1/2 rounded-full bg-cane-soft" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute top-1/2 size-4 -translate-y-1/2 rounded-full border-2 border-ink bg-parchment",
								style: { left: `calc(${marker}% - 8px)` }
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex justify-between text-xs text-muted",
						dir: "ltr",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "−1" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "0" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "+1" })
						]
					})
				]
			})
		]
	});
}
function Slider({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tabular-nums",
				dir: "ltr",
				children: faNum(value, 2)
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "range",
			min: 0,
			max: 1,
			step: .01,
			value,
			onChange: (event) => onChange(Number(event.target.value)),
			className: "mt-1 h-11 w-full accent-cane"
		})]
	});
}
var orbit_lab_exports = /* @__PURE__ */ __exportAll({
	Lab: () => Lab$1,
	labMeta: () => labMeta$1
});
var labMeta$1 = {
	id: "orbit",
	title: "مدار دایره‌ای",
	summary: "ارتفاع را عوض کن. سرعت و دوره از گرانش می‌آیند. فاصله در تصویر فشرده شده تا مدار بالا هم در قاب بماند.",
	order: 5
};
var MIN_KM = 160;
var MAX_KM = 42e3;
function Lab$1() {
	const [t, setT] = (0, import_react.useState)(logUnmap(400, MIN_KM, MAX_KM));
	const [vr, setVr] = (0, import_react.useState)(.2);
	const canvasRef = (0, import_react.useRef)(null);
	const altRef = (0, import_react.useRef)(400);
	const { markLab } = useProgress();
	const altitude = logMap(t, MIN_KM, MAX_KM);
	altRef.current = altitude;
	const orbit = circularOrbit(altitude * 1e3);
	const perDay = SIDEREAL_DAY / orbit.period;
	const frac = vr * 1e3 / C;
	const carrier = 54e8;
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		let frame = 0;
		let angle = .8;
		let last = performance.now();
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const draw = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			const w = canvas.clientWidth;
			const h = canvas.clientHeight;
			if (w < 2 || h < 2) return;
			if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
				canvas.width = Math.floor(w * dpr);
				canvas.height = Math.floor(h * dpr);
			}
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.clearRect(0, 0, w, h);
			const styles = getComputedStyle(canvas);
			const ink = styles.getPropertyValue("--color-ink").trim();
			const cane = styles.getPropertyValue("--color-cane").trim();
			const copper = styles.getPropertyValue("--color-copper").trim();
			const paper = styles.getPropertyValue("--color-parchment").trim();
			const line = styles.getPropertyValue("--color-line").trim();
			const cx = w / 2;
			const cy = h / 2 + 8;
			const earth = Math.min(w, h) * .16;
			const geoR = R_EARTH + 35786e3;
			const r = R_EARTH + altRef.current * 1e3;
			const scaled = Math.log(r / R_EARTH) / Math.log(geoR / R_EARTH);
			const radius = earth + 12 + Math.min(Math.max(scaled, .08), 1.2) * (Math.min(w, h) * .36);
			ctx.beginPath();
			ctx.strokeStyle = line;
			ctx.lineWidth = 1.5;
			ctx.arc(cx, cy, radius, 0, Math.PI * 2);
			ctx.stroke();
			ctx.beginPath();
			ctx.fillStyle = cane;
			ctx.arc(cx, cy, earth, 0, Math.PI * 2);
			ctx.fill();
			ctx.beginPath();
			ctx.fillStyle = paper;
			ctx.arc(cx - earth * .25, cy - earth * .2, earth * .28, 0, Math.PI * 2);
			ctx.fill();
			const sx = cx + radius * Math.cos(angle);
			const sy = cy + radius * Math.sin(angle);
			ctx.beginPath();
			ctx.fillStyle = copper;
			ctx.arc(sx, sy, 6, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = ink;
			ctx.font = "12px Vazirmatn, sans-serif";
			ctx.direction = "rtl";
			ctx.textAlign = "right";
			ctx.fillText("فاصله فشرده شده", w - 12, 18);
		};
		const loop = (now) => {
			const dt = Math.min(.05, (now - last) / 1e3);
			last = now;
			const period = circularOrbit(altRef.current * 1e3).period;
			if (!reduced) angle += dt * (.7 / Math.sqrt(period / 5400));
			draw();
			if (!reduced) frame = requestAnimationFrame(loop);
		};
		if (reduced) draw();
		else frame = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(frame);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				className: "h-64 w-full rounded-xl bg-paper"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ارتفاع" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tabular-nums",
						children: [faNum(altitude, altitude >= 1e3 ? 0 : 0), " km"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "range",
					min: 0,
					max: 1,
					step: .001,
					value: t,
					onChange: (event) => {
						setT(Number(event.target.value));
						markLab("orbit");
					},
					className: "mt-1 h-11 w-full accent-cane"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: orbitClass(altitude)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-2 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact$1, {
						label: "سرعت",
						value: `${faNum(orbit.v / 1e3, 2)} km/s`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact$1, {
						label: "دوره",
						value: formatDuration(orbit.period)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact$1, {
						label: "دور در شبانه‌روز نجومی",
						value: faNum(perDay, 2)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact$1, {
						label: "شعاع از مرکز",
						value: `${faNum(orbit.r / 1e3, 0)} km`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-line px-3 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: "دوپلر یک‌طرفه"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "مطابق فرمول درس. برای رفت‌وبرگشت رادار تقریباً دو برابر این است."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-3 block text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "سرعت شعاعی" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums",
								dir: "ltr",
								children: [faNum(vr, 2), " km/s"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: -8,
							max: 8,
							step: .05,
							value: vr,
							onChange: (event) => {
								setVr(Number(event.target.value));
								markLab("orbit");
							},
							className: "mt-1 h-11 w-full accent-copper"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-3 grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact$1, {
							label: "Δλ / λ",
							value: faNum(frac, 6)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact$1, {
							label: "Δf در ۵٫۴ GHz",
							value: formatHz(Math.abs(frac * carrier)).replace(/^/, frac < 0 ? "−" : "")
						})]
					})
				]
			})
		]
	});
}
function Fact$1({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-paper px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-sm text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1 font-semibold",
			dir: "ltr",
			children: value
		})]
	});
}
var wave_lab_exports = /* @__PURE__ */ __exportAll({
	Lab: () => Lab,
	labMeta: () => labMeta
});
var labMeta = {
	id: "wave",
	title: "موج و طیف",
	summary: "بسامد را جابه‌جا کن. طول‌موج، انرژی فوتون و نام باند از همان رابطه‌ی c = fλ می‌آیند. شکل موج نمادین است.",
	order: 1
};
var MIN_F = 1e8;
var MAX_F = 0x38d7ea4c68000;
var PRESETS = [
	{
		name: "رادیو",
		f: 1e8
	},
	{
		name: "مایکروویو",
		f: 54e8
	},
	{
		name: "حرارتی",
		f: 3e13
	},
	{
		name: "فروسرخ نزدیک",
		f: 3e14
	},
	{
		name: "سبز",
		f: 55e13
	},
	{
		name: "آبی",
		f: 67e13
	}
];
function Lab() {
	const [t, setT] = (0, import_react.useState)(logUnmap(55e13, MIN_F, MAX_F));
	const [amp, setAmp] = (0, import_react.useState)(.7);
	const canvasRef = (0, import_react.useRef)(null);
	const ampRef = (0, import_react.useRef)(amp);
	ampRef.current = amp;
	const { markLab } = useProgress();
	const frequency = logMap(t, MIN_F, MAX_F);
	const lambda = C / frequency;
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		let frame = 0;
		let phase = 0;
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const draw = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			const w = canvas.clientWidth;
			const h = canvas.clientHeight;
			if (w < 2 || h < 2) return;
			if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
				canvas.width = Math.floor(w * dpr);
				canvas.height = Math.floor(h * dpr);
			}
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.clearRect(0, 0, w, h);
			const styles = getComputedStyle(canvas);
			const ink = styles.getPropertyValue("--color-ink").trim();
			const cane = styles.getPropertyValue("--color-cane").trim();
			const copper = styles.getPropertyValue("--color-copper").trim();
			const line = styles.getPropertyValue("--color-line").trim();
			ctx.strokeStyle = line;
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.moveTo(12, h / 2);
			ctx.lineTo(w - 12, h / 2);
			ctx.stroke();
			ctx.beginPath();
			ctx.strokeStyle = cane;
			ctx.lineWidth = 2;
			const amplitude = ampRef.current * h * .32;
			for (let x = 12; x <= w - 12; x += 1) {
				const u = (x - 12) / (w - 24);
				const y = h / 2 - amplitude * Math.sin(u * Math.PI * 6 + phase);
				if (x === 12) ctx.moveTo(x, y);
				else ctx.lineTo(x, y);
			}
			ctx.stroke();
			ctx.fillStyle = copper;
			ctx.beginPath();
			ctx.moveTo(w - 36, h - 28);
			ctx.lineTo(w - 16, h - 22);
			ctx.lineTo(w - 36, h - 16);
			ctx.fill();
			ctx.fillStyle = ink;
			ctx.direction = "rtl";
			ctx.font = "12px Vazirmatn, sans-serif";
			ctx.textAlign = "right";
			ctx.fillText("جهت انتشار", w - 42, h - 16);
		};
		const loop = () => {
			if (!reduced) phase += .05;
			draw();
			if (!reduced) frame = requestAnimationFrame(loop);
		};
		loop();
		return () => cancelAnimationFrame(frame);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				className: "h-40 w-full rounded-xl bg-paper"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: PRESETS.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setT(logUnmap(preset.f, MIN_F, MAX_F));
						markLab("wave");
					},
					className: "inline-flex min-h-11 items-center rounded-full border border-line bg-paper px-3 text-sm",
					children: preset.name
				}, preset.name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "بسامد" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums",
						dir: "ltr",
						children: formatHz(frequency)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "range",
					min: 0,
					max: 1,
					step: .001,
					value: t,
					onChange: (event) => {
						setT(Number(event.target.value));
						markLab("wave");
					},
					className: "mt-1 h-11 w-full accent-cane"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "دامنه‌ی شکل (نمادین)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums",
						children: faNum(amp, 2)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "range",
					min: .15,
					max: 1,
					step: .01,
					value: amp,
					onChange: (event) => setAmp(Number(event.target.value)),
					className: "mt-1 h-11 w-full accent-copper"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "طول‌موج",
						value: formatLength(lambda)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "باند",
						value: spectrumBand(lambda)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "انرژی فوتون",
						value: formatEv(photonEv(lambda))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "دوره",
						value: formatLengthTime(1 / frequency)
					})
				]
			})
		]
	});
}
function formatLengthTime(seconds) {
	if (seconds >= 1) return `${faNum(seconds, 2)} s`;
	if (seconds >= .001) return `${faNum(seconds * 1e3, 2)} ms`;
	if (seconds >= 1e-6) return `${faNum(seconds * 1e6, 2)} μs`;
	if (seconds >= 1e-9) return `${faNum(seconds * 1e9, 2)} ns`;
	return `${faNum(seconds * 0xe8d4a51000, 2)} ps`;
}
function Fact({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-paper px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-sm text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1 font-semibold",
			dir: "ltr",
			children: value
		})]
	});
}
var labs = Object.values(/* @__PURE__ */ Object.assign({
	"./atmosphere-lab.tsx": atmosphere_lab_exports,
	"./blackbody-lab.tsx": blackbody_lab_exports,
	"./ndvi-lab.tsx": ndvi_lab_exports,
	"./orbit-lab.tsx": orbit_lab_exports,
	"./wave-lab.tsx": wave_lab_exports
})).filter((mod) => Boolean(mod.labMeta && mod.Lab)).map((mod) => ({
	...mod.labMeta,
	Component: mod.Lab
})).sort((a, b) => a.order - b.order);
function getLab(id) {
	return labs.find((lab) => lab.id === id);
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-D2pIiRI7.js
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-parchment px-6 text-center text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-copper",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "این صفحه درست بار نشد"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: errorMessage(error)
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var NAV = [
	{
		to: "/",
		label: "درس‌ها",
		exact: true
	},
	{
		to: "/math",
		label: "ریاضی",
		exact: false
	},
	{
		to: "/solve",
		label: "حل",
		exact: false
	},
	{
		to: "/labs",
		label: "آزمایش",
		exact: false
	},
	{
		to: "/exams",
		label: "آزمون",
		exact: false
	}
];
function Shell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-20 border-b border-line bg-parchment/95 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex w-full max-w-5xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex min-h-11 items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/favicon.svg",
							alt: "",
							width: 36,
							height: 36,
							className: "size-9"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-xs text-muted",
							children: "کورس تعاملی"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-semibold",
							children: "فیزیک سنجش از دور"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex gap-1 overflow-x-auto pb-1",
						children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							activeOptions: { exact: item.exact },
							className: "inline-flex min-h-11 shrink-0 items-center rounded-full px-3 text-sm text-ink-soft hover:bg-paper data-[status=active]:bg-ink data-[status=active]:text-parchment",
							children: item.label
						}, item.to))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto w-full max-w-5xl px-4 py-8",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex w-full max-w-5xl flex-col gap-1 px-4 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "پیشرفت فقط روی همین دستگاه ذخیره می‌شود." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/guide",
						className: "inline-flex min-h-11 items-center text-cane",
						children: "افزودن درس و فرمول"
					})]
				})
			})
		]
	});
}
var styles_default = "/assets/styles-Ds-NaNn4.css";
var Route$12 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "فیزیک سنجش از دور" },
			{
				name: "description",
				content: "کورس تعاملی فیزیک سنجش از دور: فرمول کلیک‌پذیر، ریاضی درجا، آزمایشگاه و آزمون. پیشرفت فقط روی همین دستگاه."
			},
			{
				name: "theme-color",
				content: "#f3eee6"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: Root,
	notFoundComponent: NotFound
});
function Root() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "fa",
		dir: "rtl",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
function NotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-semibold",
			children: "این صفحه نیست"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-muted",
			children: "درس یا آزمایشی با این نام در کورس نیست."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "mt-4 inline-flex min-h-11 items-center text-cane",
			children: "برگشت به درس‌ها"
		})
	] });
}
var $$splitComponentImporter$10 = () => import("./routes-BoIEGBHL.mjs");
var Route$11 = createFileRoute("/")({
	component: lazyRouteComponent($$splitComponentImporter$10, "component"),
	head: () => ({ meta: [{ title: "فیزیک سنجش از دور" }] })
});
var $$splitComponentImporter$9 = () => import("./guide-DJT9zM9k.mjs");
var Route$10 = createFileRoute("/guide")({
	component: lazyRouteComponent($$splitComponentImporter$9, "component"),
	head: () => ({ meta: [{ title: "افزودن مطلب · فیزیک سنجش از دور" }] })
});
var $$splitComponentImporter$8 = () => import("./exams-C9Z4EHyR.mjs");
var Route$9 = createFileRoute("/exams/")({
	component: lazyRouteComponent($$splitComponentImporter$8, "component"),
	head: () => ({ meta: [{ title: "آزمون · فیزیک سنجش از دور" }] })
});
var $$splitComponentImporter$7 = () => import("../_id-D_YWaFZm.mjs");
var Route$8 = createFileRoute("/exams/$id")({
	loader: ({ params }) => {
		const exam = getQuiz(params.id);
		if (!exam || exam.kind !== "exam") throw notFound();
		return { title: exam.title };
	},
	head: ({ loaderData }) => ({ meta: [{ title: loaderData ? `${loaderData.title} · آزمون` : "آزمون" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./labs-B09U3FX8.mjs");
var Route$7 = createFileRoute("/labs/")({
	component: lazyRouteComponent($$splitComponentImporter$6, "component"),
	head: () => ({ meta: [{ title: "آزمایشگاه · فیزیک سنجش از دور" }] })
});
var $$splitComponentImporter$5 = () => import("../_id-DresZm6w.mjs");
var Route$6 = createFileRoute("/labs/$id")({
	loader: ({ params }) => {
		const lab = getLab(params.id);
		if (!lab) throw notFound();
		return {
			title: lab.title,
			id: lab.id
		};
	},
	head: ({ loaderData }) => ({ meta: [{ title: loaderData ? `${loaderData.title} · آزمایش` : "آزمایش" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var Route$5 = createFileRoute("/lessons/")({ beforeLoad: () => {
	throw redirect({ to: "/" });
} });
var $$splitComponentImporter$4 = () => import("../_slug-N6Pw3l8L.mjs");
var Route$4 = createFileRoute("/lessons/$slug")({
	loader: ({ params }) => {
		const lesson = getLesson(params.slug);
		if (!lesson) throw notFound();
		return { title: lesson.title };
	},
	head: ({ loaderData }) => ({ meta: [{ title: loaderData ? `${loaderData.title} · فیزیک سنجش از دور` : "درس" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./math-DGBoUeS4.mjs");
var Route$3 = createFileRoute("/math/")({
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	head: () => ({ meta: [{ title: "ریاضیات پایه · فیزیک سنجش از دور" }] })
});
var $$splitComponentImporter$2 = () => import("../_slug-CzAVXSKX.mjs");
var Route$2 = createFileRoute("/math/$slug")({
	loader: ({ params }) => {
		const primer = getPrimer(params.slug);
		if (!primer) throw notFound();
		return { title: primer.title };
	},
	head: ({ loaderData }) => ({ meta: [{ title: loaderData ? `${loaderData.title} · ریاضی` : "ریاضی" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./solve-H4z9_48r.mjs");
var Route$1 = createFileRoute("/solve/")({
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	head: () => ({ meta: [{ title: "حل مسئله · فیزیک سنجش از دور" }] })
});
var $$splitComponentImporter = () => import("../_slug-feYiXT9Z.mjs");
var Route = createFileRoute("/solve/$slug")({
	loader: ({ params }) => {
		const problem = getProblem(params.slug);
		if (!problem) throw notFound();
		return { title: problem.title };
	},
	head: ({ loaderData }) => ({ meta: [{ title: loaderData ? `${loaderData.title} · حل مسئله` : "حل مسئله" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$11.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$12
});
var GuideRoute = Route$10.update({
	id: "/guide",
	path: "/guide",
	getParentRoute: () => Route$12
});
var ExamsIndexRoute = Route$9.update({
	id: "/exams/",
	path: "/exams/",
	getParentRoute: () => Route$12
});
var ExamsIdRoute = Route$8.update({
	id: "/exams/$id",
	path: "/exams/$id",
	getParentRoute: () => Route$12
});
var LabsIndexRoute = Route$7.update({
	id: "/labs/",
	path: "/labs/",
	getParentRoute: () => Route$12
});
var LabsIdRoute = Route$6.update({
	id: "/labs/$id",
	path: "/labs/$id",
	getParentRoute: () => Route$12
});
var LessonsIndexRoute = Route$5.update({
	id: "/lessons/",
	path: "/lessons/",
	getParentRoute: () => Route$12
});
var LessonsSlugRoute = Route$4.update({
	id: "/lessons/$slug",
	path: "/lessons/$slug",
	getParentRoute: () => Route$12
});
var MathIndexRoute = Route$3.update({
	id: "/math/",
	path: "/math/",
	getParentRoute: () => Route$12
});
var MathSlugRoute = Route$2.update({
	id: "/math/$slug",
	path: "/math/$slug",
	getParentRoute: () => Route$12
});
var SolveIndexRoute = Route$1.update({
	id: "/solve/",
	path: "/solve/",
	getParentRoute: () => Route$12
});
var rootRouteChildren = {
	IndexRoute,
	GuideRoute,
	ExamsIdRoute,
	LabsIdRoute,
	LessonsSlugRoute,
	MathSlugRoute,
	SolveSlugRoute: Route.update({
		id: "/solve/$slug",
		path: "/solve/$slug",
		getParentRoute: () => Route$12
	}),
	ExamsIndexRoute,
	LabsIndexRoute,
	LessonsIndexRoute,
	MathIndexRoute,
	SolveIndexRoute
};
var routeTree = Route$12._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { faNum as C, faInt as S, lessons as _, Route$6 as a, problemNeighbors as b, getLab as c, exams as d, getFormula as f, getQuiz as g, getProblem as h, Route$4 as i, labs as l, getPrimer as m, Route as n, Route$8 as o, getLesson as p, Route$2 as r, Shell as s, router_exports as t, stefan as u, neighbors as v, useProgress as w, problems as x, primers as y };
