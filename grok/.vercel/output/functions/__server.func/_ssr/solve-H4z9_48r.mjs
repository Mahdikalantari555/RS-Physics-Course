import { Y as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as faInt, s as Shell, w as useProgress, x as problems } from "./router-D2pIiRI7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/solve-H4z9_48r.js
var import_jsx_runtime = require_jsx_runtime();
var topics = [
	"موج",
	"تابش",
	"سطح",
	"جو",
	"مدار"
];
function SolveIndex() {
	const { data, ready } = useProgress();
	const done = problems.filter((item) => data.problems[item.slug]).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-medium text-cane",
			children: "از داده تا عدد، با واحد"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 text-3xl font-semibold",
			children: "حل مسئله"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-2xl text-lg leading-relaxed text-ink-soft",
			children: "ده صحنه‌ی واقعی. هر کدام فرمول اساسی را جزءبه‌جزء باز می‌کند، حساب را نشان می‌دهد، و می‌گوید جواب در تصویر ماهواره‌ای چه معنایی دارد. ثابت‌ها همان‌هایی است که در آزمایش‌ها استفاده شده."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm text-muted",
			children: ready ? `${faInt(done)} از ${faInt(problems.length)} خوانده شده` : "پیشرفت بعد از بار شدن صفحه می‌آید"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 flex flex-col gap-8",
			children: topics.map((topic) => {
				const items = problems.filter((item) => item.topic === topic);
				if (items.length === 0) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium text-muted",
					children: topic
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 flex flex-col gap-3",
					children: items.map((item) => {
						const read = ready && data.problems[item.slug];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/solve/$slug",
							params: { slug: item.slug },
							className: "flex items-start gap-4 rounded-2xl border border-line bg-card p-4 hover:border-cane",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex size-11 shrink-0 items-center justify-center rounded-full bg-copper-soft text-sm text-copper tabular-nums",
									children: faInt(item.order)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block font-semibold",
										children: item.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 block text-sm leading-relaxed text-muted",
										children: item.summary
									})]
								}),
								read ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "shrink-0 text-sm text-cane",
									children: "خوانده شده"
								}) : null
							]
						}) }, item.slug);
					})
				})] }, topic);
			})
		})
	] });
}
//#endregion
export { SolveIndex as component };
