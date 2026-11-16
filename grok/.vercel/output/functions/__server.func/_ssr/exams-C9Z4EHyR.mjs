import { Y as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as faInt, d as exams, s as Shell, w as useProgress } from "./router-D2pIiRI7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/exams-C9Z4EHyR.js
var import_jsx_runtime = require_jsx_runtime();
function ExamIndex() {
	const { data, ready } = useProgress();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-semibold",
			children: "آزمون"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-2xl text-lg leading-relaxed text-ink-soft",
			children: "سؤال‌های داخل هر درس همان لحظه توضیح می‌دهند. این‌جا جواب تا وقتی همه‌ی گزینه‌ها را ثبت نکنی پنهان است."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-8 flex flex-col gap-3",
			children: exams().map((exam) => {
				const score = data.quizzes[exam.id];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/exams/$id",
					params: { id: exam.id },
					className: "block rounded-2xl border border-line bg-card p-4 hover:border-cane",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: exam.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-sm leading-relaxed text-muted",
							children: exam.summary
						}),
						ready && score ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-2 block text-sm tabular-nums text-cane",
							children: [
								"بهترین نتیجه: ",
								faInt(score.correct),
								" از ",
								faInt(score.total)
							]
						}) : null
					]
				}) }, exam.id);
			})
		})
	] });
}
//#endregion
export { ExamIndex as component };
