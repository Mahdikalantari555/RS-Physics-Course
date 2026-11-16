import { Y as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as labs, s as Shell, w as useProgress } from "./router-D2pIiRI7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/labs-B09U3FX8.js
var import_jsx_runtime = require_jsx_runtime();
function LabsIndex() {
	const { data, ready } = useProgress();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-semibold",
			children: "آزمایشگاه"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-2xl text-lg leading-relaxed text-ink-soft",
			children: "هر آزمایش از همان تابع‌های فیزیکی درس استفاده می‌کند. شکل موج نمادین است؛ عددها نه."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-8 flex flex-col gap-3",
			children: labs.map((lab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/labs/$id",
				params: { id: lab.id },
				className: "block rounded-2xl border border-line bg-card p-4 hover:border-cane",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-baseline justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold",
						children: lab.title
					}), ready && data.labs[lab.id] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-cane",
						children: "انجام شده"
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 block text-sm leading-relaxed text-muted",
					children: lab.summary
				})]
			}) }, lab.id))
		})
	] });
}
//#endregion
export { LabsIndex as component };
