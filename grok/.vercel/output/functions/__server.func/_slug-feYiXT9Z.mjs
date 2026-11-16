import { Y as require_jsx_runtime, y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { S as faInt, b as problemNeighbors, c as getLab, h as getProblem, m as getPrimer, n as Route, s as Shell, w as useProgress } from "./_ssr/router-D2pIiRI7.mjs";
import { t as Rich } from "./_ssr/rich-text-2MT4T0HB.mjs";
import { n as Formula, r as InlineMath, t as DisplayMath } from "./_ssr/formula-CTQFXxSv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-feYiXT9Z.js
var import_jsx_runtime = require_jsx_runtime();
function ProblemView({ problem }) {
	const progress = useProgress();
	const read = progress.ready && Boolean(progress.data.problems[problem.slug]);
	const { prev, next } = problemNeighbors(problem.slug);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "min-w-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm font-medium text-copper",
				children: [
					problem.topic,
					" · حل ",
					faInt(problem.order)
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-3xl font-semibold",
				children: problem.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-lg leading-relaxed text-ink-soft",
				children: problem.summary
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-pressed": read,
				onClick: () => progress.toggleProblem(problem.slug),
				className: "mt-5 inline-flex min-h-11 items-center rounded-full px-4 text-sm " + (read ? "bg-cane text-parchment" : "border border-line bg-card"),
				children: read ? "خوانده شده" : "این حل را خواندم"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-semibold",
					children: "صحنه"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-lg leading-relaxed",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rich, { text: problem.scene })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 grid gap-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-line bg-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold",
						children: "داده‌ها"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 flex flex-col gap-3",
						children: problem.givens.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "border-b border-line pb-3 last:border-b-0 last:pb-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-baseline justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineMath, { latex: item.symbol }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm leading-relaxed text-ink",
									children: item.value
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm leading-relaxed text-muted",
								children: item.meaning
							})]
						}, `${item.symbol}-${item.meaning}`))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-line bg-paper p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold",
						children: "مجهول"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 leading-relaxed",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rich, { text: problem.ask })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-semibold",
					children: "فرمول اساسی"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex flex-col gap-4",
					children: problem.formulas.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "leading-relaxed",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rich, { text: item.why })
						}), item.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Formula, { id: item.id }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DisplayMath, { latex: item.latex })]
					}, item.name))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-semibold",
					children: "حل، جزءبه‌جزء"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-4 flex flex-col gap-4",
					children: problem.steps.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "rounded-2xl border border-line bg-card p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-9 shrink-0 items-center justify-center rounded-full bg-copper-soft text-sm font-semibold text-copper tabular-nums",
								children: faInt(index + 1)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-lg font-semibold",
										children: step.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 leading-relaxed",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rich, { text: step.text })
									}),
									step.latex ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DisplayMath, { latex: step.latex })
									}) : null
								]
							})]
						})
					}, step.title))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 rounded-2xl bg-cane-soft px-4 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold text-cane",
						children: "جواب"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DisplayMath, { latex: problem.answerLatex })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 leading-relaxed",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rich, { text: problem.answerText })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-semibold",
					children: "این عدد یعنی چه"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-lg leading-relaxed",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rich, { text: problem.meaning })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-semibold",
					children: "جایی که حل معمولاً می‌شکند"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 flex flex-col gap-2",
					children: problem.traps.map((trap) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "border-s-4 border-copper bg-copper-soft px-4 py-3 leading-relaxed",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rich, { text: trap })
					}, trap))
				})]
			}),
			problem.relatedMath.length > 0 || problem.relatedLabs.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-col gap-1 text-sm",
				children: [problem.relatedMath.map((slug) => {
					const primer = getPrimer(slug);
					if (!primer) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/math/$slug",
						params: { slug },
						className: "inline-flex min-h-11 items-center text-cane",
						children: ["ریاضی: ", primer.title]
					}, slug);
				}), problem.relatedLabs.map((id) => {
					const lab = getLab(id);
					if (!lab) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/labs/$id",
						params: { id },
						className: "inline-flex min-h-11 items-center text-cane",
						children: ["آزمایش: ", lab.title]
					}, id);
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex flex-wrap justify-between gap-3 border-t border-line pt-4",
				children: [prev ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/solve/$slug",
					params: { slug: prev.slug },
					className: "inline-flex min-h-11 items-center text-cane",
					children: ["حل قبل: ", prev.title]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), next ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/solve/$slug",
					params: { slug: next.slug },
					className: "inline-flex min-h-11 items-center text-cane",
					children: ["حل بعد: ", next.title]
				}) : null]
			})
		]
	});
}
function SolvePage() {
	const { slug } = Route.useParams();
	const problem = getProblem(slug);
	if (!problem) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/solve",
		className: "inline-flex min-h-11 items-center text-sm text-cane",
		children: "همه‌ی حل‌ها"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProblemView, { problem })
	})] });
}
//#endregion
export { SolvePage as component };
