import { Y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as Shell } from "./router-D2pIiRI7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guide-DJT9zM9k.js
var import_jsx_runtime = require_jsx_runtime();
function Guide() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-semibold",
			children: "افزودن مطلب"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-2xl text-lg leading-relaxed text-ink-soft",
			children: "هسته‌ی صفحه را دست نزن. هر درس، فرمول، یادداشت ریاضی، سؤال و آزمایش یک فایل است و خودکار به فهرست می‌آید."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			title: "درس",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"یک فایل تازه در ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { children: "src/content/lessons" }),
				" بساز. نام فایل مهم نیست؛ فیلد ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { children: "order" }),
				" جای درس را در مسیر تعیین می‌کند و ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { children: "slug" }),
				" آدرس را."
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pre, { children: `import type { Lesson } from "../types";

export const sample: Lesson = {
  kind: "lesson",
  slug: "sample",
  title: "عنوان درس",
  order: 7,
  summary: "یک خط.",
  prerequisites: ["exponentials"],
  blocks: [
    { type: "p", text: "متن. فرمول درون‌خطی با $E = hf$." },
    { type: "formula", id: "planck" },
    { type: "math", primer: "exponentials", text: "اگر نمایی ناآشناست." },
    { type: "lab", id: "blackbody" },
    { type: "quiz", id: "sample-quiz" },
  ],
};` })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			title: "فرمول کلیک‌پذیر",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"فایل جدید در ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { children: "src/content/formulas" }),
				". آرایه‌ی ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { children: "tokens" }),
				" همان چیزی است که دیده می‌شود: تکه‌های ثابت با ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { children: "tex" }),
				" و نمادهای کلیک‌خور با ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { children: "sym" }),
				". هر ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { children: "id" }),
				" باید در ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { children: "parts" }),
				" توضیح داشته باشد. اگر یک نماد چند بار آمده، همان id را تکرار کن."
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pre, { children: `import { sym, tex } from "../tokens";
import type { Formula } from "../types";

export const sample: Formula = {
  kind: "formula",
  id: "sample",
  title: "عنوان",
  summary: "یک خط.",
  tokens: [sym("a"), tex("="), sym("b")],
  parts: [
    { id: "a", latex: "a", name: "نام", explanation: "توضیح." },
    { id: "b", latex: "b", name: "نام", explanation: "توضیح." },
  ],
  relatedLabs: ["wave"],
  relatedMath: ["derivatives"],
};` })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: "ریاضی، سؤال، آزمون، حل",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"یادداشت ریاضی در ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { children: "src/content/math" }),
				" با ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { children: "kind: \"primer\"" }),
				". سؤال کوتاه در",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { children: "src/content/quizzes" }),
				" با ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { children: "kind: \"quiz\"" }),
				". آزمون در ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { children: "src/content/exams" }),
				" با",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { children: "kind: \"exam\"" }),
				". حل عددی در ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { children: "src/content/problems" }),
				" با ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { children: "kind: \"problem\"" }),
				" و در درس با ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { children: `{ type: "problem", id }` }),
				". شناسه‌ها یکتا باشند. گزینه‌ی درست، شماره‌ی ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { children: "answer" }),
				" ",
				"است و از صفر شروع می‌شود."
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: "آزمایش",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"یک فایل ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { children: "src/components/labs/نام-lab.tsx" }),
				" که دو خروجی دارد: ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { children: "labMeta" }),
				" و تابع",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { children: "Lab" }),
				". پسوند فایل باید به ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { children: "-lab.tsx" }),
				" ختم شود تا پیدا شود. در درس با",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { children: `{ type: "lab", id }` }),
				" صدایش کن."
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: "قرارداد نام",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "flex list-disc flex-col gap-2 ps-5 leading-relaxed",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["شناسه‌ها انگلیسی و با خط تیره: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						dir: "ltr",
						children: "blackbody-basics"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "هیچ نام شخص یا مؤسسه‌ای در متن نیاید" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["نماد ریاضی داخل متن با دلار: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						dir: "ltr",
						children: "$\\\\rho$"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "واحد و جهت قرارداد را در توضیح همان جزء بنویس، نه در حاشیه‌ی جدا" })
				]
			})
		})
	] });
}
function Section({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-xl font-semibold",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 flex flex-col gap-3 leading-relaxed text-ink-soft",
			children
		})]
	});
}
function Code({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
		dir: "ltr",
		className: "rounded-md bg-paper px-1.5 py-0.5 text-sm text-ink",
		children
	});
}
function Pre({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
		dir: "ltr",
		className: "overflow-x-auto rounded-xl bg-ink p-4 text-sm leading-relaxed text-parchment",
		children
	});
}
//#endregion
export { Guide as component };
