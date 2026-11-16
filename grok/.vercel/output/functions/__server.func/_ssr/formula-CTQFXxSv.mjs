import { i as __toESM } from "../_runtime.mjs";
import { X as require_react, Y as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as getLab, f as getFormula, m as getPrimer } from "./router-D2pIiRI7.mjs";
import { t as katex } from "../_libs/katex.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/formula-CTQFXxSv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DisplayMath({ latex }) {
	const html = (0, import_react.useMemo)(() => katex.renderToString(latex, {
		throwOnError: false,
		displayMode: true,
		strict: "ignore"
	}), [latex]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		dir: "ltr",
		className: "formula-display overflow-x-auto rounded-xl bg-ink px-3 py-4 text-center text-parchment",
		dangerouslySetInnerHTML: { __html: html }
	});
}
function InlineMath({ latex }) {
	const html = (0, import_react.useMemo)(() => katex.renderToString(latex, {
		throwOnError: false,
		displayMode: false,
		strict: "ignore"
	}), [latex]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		dir: "ltr",
		className: "mx-0.5 inline-block align-middle",
		dangerouslySetInnerHTML: { __html: html }
	});
}
function buildLatex(formula, activeId) {
	return formula.tokens.map((token) => {
		if (token.t === "tex") return token.latex;
		const part = formula.parts.find((item) => item.id === token.id);
		const body = token.latex ?? part?.latex ?? token.id;
		const on = activeId === token.id ? " is-on" : "";
		return `\\htmlClass{fp part-${token.id}${on}}{${body}}`;
	}).join("");
}
function InlineTex({ latex }) {
	const html = katex.renderToString(latex, {
		throwOnError: false,
		displayMode: false,
		strict: "ignore"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		dir: "ltr",
		className: "inline-block align-middle",
		dangerouslySetInnerHTML: { __html: html }
	});
}
function Formula({ id }) {
	const formula = getFormula(id);
	const [activeId, setActiveId] = (0, import_react.useState)(formula?.parts[0]?.id ?? null);
	const html = (0, import_react.useMemo)(() => {
		if (!formula) return "";
		return katex.renderToString(buildLatex(formula, activeId), {
			throwOnError: false,
			displayMode: true,
			strict: "ignore",
			trust: (context) => context.command === "\\htmlClass"
		});
	}, [formula, activeId]);
	if (!formula) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "text-copper",
		children: [
			"فرمول «",
			id,
			"» پیدا نشد."
		]
	});
	const active = formula.parts.find((part) => part.id === activeId) ?? formula.parts[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl border border-line bg-card p-4 sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-baseline justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-lg font-semibold",
					children: formula.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: formula.summary
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "formula-display mt-4 overflow-x-auto rounded-xl bg-ink px-4 py-6 text-parchment",
				dir: "ltr",
				onClick: (event) => {
					const node = event.target.closest(".fp");
					if (!node) return;
					const token = [...node.classList].find((name) => name.startsWith("part-"));
					if (token) setActiveId(token.slice(5));
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { dangerouslySetInnerHTML: { __html: html } })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: formula.parts.map((part) => {
					const on = part.id === active?.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						"aria-pressed": on,
						onClick: () => setActiveId(part.id),
						className: "inline-flex min-h-11 items-center gap-2 rounded-full border px-3 text-sm " + (on ? "border-copper bg-copper text-parchment" : "border-line bg-paper text-ink"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineTex, { latex: part.latex }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: part.name })]
					}, part.id);
				})
			}),
			active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 border-s-4 border-copper bg-copper-soft px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-semibold",
					children: active.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 leading-relaxed",
					children: active.explanation
				})]
			}) : null,
			formula.derivationNotes ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				className: "mt-4 rounded-xl border border-line px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
					className: "min-h-11 cursor-pointer font-medium",
					children: "این رابطه از کجا می‌آید؟"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "pb-2 leading-relaxed text-ink-soft",
					children: formula.derivationNotes
				})]
			}) : null,
			formula.relatedMath?.length || formula.relatedLabs?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-col gap-2 text-sm",
				children: [formula.relatedMath?.map((slug) => {
					const primer = getPrimer(slug);
					if (!primer) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/math/$slug",
						params: { slug },
						className: "inline-flex min-h-11 items-center text-cane",
						children: ["ریاضی: ", primer.title]
					}, slug);
				}), formula.relatedLabs?.map((labId) => {
					const lab = getLab(labId);
					if (!lab) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/labs/$id",
						params: { id: labId },
						className: "inline-flex min-h-11 items-center text-cane",
						children: ["آزمایش: ", lab.title]
					}, labId);
				})]
			}) : null
		]
	});
}
//#endregion
export { Formula as n, InlineMath as r, DisplayMath as t };
