import { Y as require_jsx_runtime, y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as Route$6, c as getLab, s as Shell } from "./_ssr/router-D2pIiRI7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-DresZm6w.js
var import_jsx_runtime = require_jsx_runtime();
function LabPage() {
	const { id } = Route$6.useParams();
	const lab = getLab(id);
	if (!lab) return null;
	const View = lab.Component;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/labs",
			className: "inline-flex min-h-11 items-center text-sm text-cane",
			children: "همه‌ی آزمایش‌ها"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 text-3xl font-semibold",
			children: lab.title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-2xl text-lg leading-relaxed text-ink-soft",
			children: lab.summary
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 rounded-2xl border border-line bg-card p-4 sm:p-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(View, {})
		})
	] });
}
//#endregion
export { LabPage as component };
