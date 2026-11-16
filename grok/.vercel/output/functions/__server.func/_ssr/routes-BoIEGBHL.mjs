import { Y as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as FlaskConical, i as ListChecks, n as Sigma, r as PenLine } from "../_libs/lucide-react.mjs";
import { S as faInt, _ as lessons, d as exams, l as labs, s as Shell, w as useProgress } from "./router-D2pIiRI7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BoIEGBHL.js
var import_jsx_runtime = require_jsx_runtime();
var order = new Intl.NumberFormat("fa-IR", { minimumIntegerDigits: 2 });
function Home() {
	const { data, ready, reset } = useProgress();
	const read = lessons.filter((lesson) => data.lessons[lesson.slug]).length;
	const labsDone = labs.filter((lab) => data.labs[lab.id]).length;
	const exam = exams()[0];
	const examScore = exam ? data.quizzes[exam.id] : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-medium text-cane",
			children: "از موج تا مدار"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 max-w-2xl text-4xl font-semibold leading-tight",
			children: "فیزیک سنجش از دور، جزءبه‌جزء"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft",
			children: "روی هر نماد فرمول بزن تا همان جزء باز شود. ریاضی همان‌جا که فرمول به آن نیاز دارد می‌آید، و حل مسئله همان فرمول را با عدد واقعی تا آخر می‌برد."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "mt-6 grid grid-cols-3 gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "درس",
					value: faInt(ready ? read : 0),
					total: faInt(lessons.length)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "آزمایش",
					value: faInt(ready ? labsDone : 0),
					total: faInt(labs.length)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "آزمون",
					value: examScore && ready ? faInt(examScore.correct) : "—",
					total: examScore && ready ? faInt(examScore.total) : "هنوز"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-10 flex flex-col gap-3",
			children: lessons.map((lesson) => {
				const done = ready && data.lessons[lesson.slug];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/lessons/$slug",
					params: { slug: lesson.slug },
					className: "flex items-start gap-4 rounded-2xl border border-line bg-card p-4 transition-colors hover:border-cane",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-11 shrink-0 items-center justify-center rounded-full bg-ink text-sm text-parchment tabular-nums",
							children: order.format(lesson.order)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-semibold",
								children: lesson.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-sm leading-relaxed text-muted",
								children: lesson.summary
							})]
						}),
						done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 text-sm text-cane",
							children: "خوانده شده"
						}) : null
					]
				}) }, lesson.slug);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-3 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Door, {
					to: "/math",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sigma, { className: "size-5" }),
					title: "ریاضیات پایه",
					text: "از مشتق تا وارون کردن خود فرمول"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Door, {
					to: "/solve",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "size-5" }),
					title: "حل مسئله",
					text: "ده حل کامل: پلانک، جو، NDVI، مدار، رادار"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Door, {
					to: "/labs",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, { className: "size-5" }),
					title: "آزمایشگاه",
					text: "پنج ابزار برای موج، تابش، سطح، جو و مدار"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Door, {
					to: "/exams",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, { className: "size-5" }),
					title: "آزمون دوره",
					text: "هشت سؤال، بدون دیدن جواب تا ثبت"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => {
				if (window.confirm("پیشرفت ذخیره‌شده روی همین دستگاه پاک شود؟")) reset();
			},
			className: "mt-8 inline-flex min-h-11 items-center text-sm text-muted",
			children: "پاک کردن پیشرفت"
		})
	] });
}
function Stat({ label, value, total }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-line bg-card px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-sm text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
			className: "mt-1 text-2xl font-semibold tabular-nums",
			children: [value, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-sm text-muted",
				children: [" / ", total]
			})]
		})]
	});
}
function Door({ to, icon, title, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "rounded-2xl border border-line bg-paper p-4 hover:border-cane",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-cane",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-3 block font-semibold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 block text-sm leading-relaxed text-muted",
				children: text
			})
		]
	});
}
//#endregion
export { Home as component };
