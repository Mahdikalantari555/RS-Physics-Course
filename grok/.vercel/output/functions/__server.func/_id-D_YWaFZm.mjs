import { Y as require_jsx_runtime, y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { o as Route$8, s as Shell } from "./_ssr/router-D2pIiRI7.mjs";
import { t as Quiz } from "./_ssr/quiz-u584svo_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-D_YWaFZm.js
var import_jsx_runtime = require_jsx_runtime();
function ExamPage() {
	const { id } = Route$8.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/exams",
		className: "inline-flex min-h-11 items-center text-sm text-cane",
		children: "آزمون‌ها"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quiz, {
			id,
			mode: "exam"
		})
	})] });
}
//#endregion
export { ExamPage as component };
