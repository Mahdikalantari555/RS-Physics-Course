import { Y as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as Shell, y as primers } from "./router-D2pIiRI7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/math-DGBoUeS4.js
var import_jsx_runtime = require_jsx_runtime();
var order = new Intl.NumberFormat("fa-IR", { minimumIntegerDigits: 2 });
function MathIndex() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-semibold",
			children: "ریاضیات پایه"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-2xl text-lg leading-relaxed text-ink-soft",
			children: "این‌ها کورس ریاضی نیستند. هر کدام فقط همان تکه‌ای است که یک فرمول فیزیک به آن تکیه می‌کند. آخرین یادداشت، خود فرمول را برای مجهول باز می‌کند؛ حساب کامل صحنه‌های واقعی در حل مسئله است."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/solve",
			className: "mt-4 inline-flex min-h-11 items-center rounded-full bg-ink px-4 text-sm text-parchment",
			children: "ده حل عددی کامل"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-8 flex flex-col gap-3",
			children: primers.map((primer) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/math/$slug",
				params: { slug: primer.slug },
				className: "flex items-start gap-4 rounded-2xl border border-line bg-card p-4 hover:border-cane",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-11 shrink-0 items-center justify-center rounded-full bg-copper-soft text-sm text-copper tabular-nums",
					children: order.format(primer.order)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block font-semibold",
					children: primer.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 block text-sm leading-relaxed text-muted",
					children: primer.summary
				})] })]
			}) }, primer.slug))
		})
	] });
}
//#endregion
export { MathIndex as component };
