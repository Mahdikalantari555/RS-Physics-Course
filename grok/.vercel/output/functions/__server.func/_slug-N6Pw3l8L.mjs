import { Y as require_jsx_runtime, b as useNavigate, y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { _ as lessons, i as Route$4, m as getPrimer, p as getLesson, s as Shell, v as neighbors, w as useProgress } from "./_ssr/router-D2pIiRI7.mjs";
import { t as Blocks } from "./_ssr/blocks-N_v8fqrw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-N6Pw3l8L.js
var import_jsx_runtime = require_jsx_runtime();
function LessonPage() {
	const { slug } = Route$4.useParams();
	const lesson = getLesson(slug);
	const navigate = useNavigate();
	const progress = useProgress();
	if (!lesson) return null;
	const { prev, next } = neighbors(lesson.slug);
	const read = progress.ready && Boolean(progress.data.lessons[lesson.slug]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid items-start gap-8 lg:grid-cols-[15rem_minmax(0,1fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "sticky top-24 hidden flex-col gap-1 lg:flex",
			children: lessons.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/lessons/$slug",
				params: { slug: item.slug },
				className: "rounded-xl px-3 py-2 text-sm text-ink-soft hover:bg-paper data-[status=active]:bg-ink data-[status=active]:text-parchment",
				children: item.title
			}, item.slug))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mb-5 block text-sm lg:hidden",
					children: ["رفتن به درس", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: "mt-1 h-11 w-full rounded-xl border border-line bg-card px-3",
						value: lesson.slug,
						onChange: (event) => void navigate({
							to: "/lessons/$slug",
							params: { slug: event.target.value }
						}),
						children: lessons.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: item.slug,
							children: item.title
						}, item.slug))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-cane",
					children: ["درس ", new Intl.NumberFormat("fa-IR").format(lesson.order)]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 text-3xl font-semibold",
					children: lesson.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-lg leading-relaxed text-ink-soft",
					children: lesson.summary
				}),
				lesson.prerequisites.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-sm leading-relaxed text-muted",
					children: [
						"پیش از فرمول‌ها، اگر لازم شد:",
						" ",
						lesson.prerequisites.map((slugId, index) => {
							const primer = getPrimer(slugId);
							if (!primer) return null;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [index > 0 ? "، " : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/math/$slug",
								params: { slug: slugId },
								className: "text-cane",
								children: primer.title
							})] }, slugId);
						})
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": read,
					onClick: () => progress.toggleLesson(lesson.slug),
					className: "mt-5 inline-flex min-h-11 items-center rounded-full px-4 text-sm " + (read ? "bg-cane text-parchment" : "border border-line bg-card"),
					children: read ? "خوانده شده" : "این درس را خواندم"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Blocks, { blocks: lesson.blocks })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 flex flex-wrap justify-between gap-3 border-t border-line pt-4",
					children: [prev ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/lessons/$slug",
						params: { slug: prev.slug },
						className: "inline-flex min-h-11 items-center text-cane",
						children: ["درس قبل: ", prev.title]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), next ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/lessons/$slug",
						params: { slug: next.slug },
						className: "inline-flex min-h-11 items-center text-cane",
						children: ["درس بعد: ", next.title]
					}) : null]
				})
			]
		})]
	}) });
}
//#endregion
export { LessonPage as component };
