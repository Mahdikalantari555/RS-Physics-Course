import { Y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as katex } from "../_libs/katex.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rich-text-2MT4T0HB.js
var import_jsx_runtime = require_jsx_runtime();
function Rich({ text }) {
	const parts = text.split(/(\$[^$]+\$)/g);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: parts.map((part, index) => {
		if (!(part.startsWith("$") && part.endsWith("$") && part.length > 2)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: part }, index);
		const latex = part.slice(1, -1);
		const html = katex.renderToString(latex, {
			throwOnError: false,
			displayMode: false,
			strict: "ignore"
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			dir: "ltr",
			className: "mx-1 inline-block align-middle",
			dangerouslySetInnerHTML: { __html: html }
		}, index);
	}) });
}
//#endregion
export { Rich as t };
