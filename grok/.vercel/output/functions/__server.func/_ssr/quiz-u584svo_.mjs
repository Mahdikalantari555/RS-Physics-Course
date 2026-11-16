import { i as __toESM } from "../_runtime.mjs";
import { X as require_react, Y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as faInt, g as getQuiz, w as useProgress } from "./router-D2pIiRI7.mjs";
import { t as Rich } from "./rich-text-2MT4T0HB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quiz-u584svo_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Quiz({ id, mode = "tutor" }) {
	const quiz = getQuiz(id);
	const progress = useProgress();
	const [picked, setPicked] = (0, import_react.useState)({});
	const [revealed, setRevealed] = (0, import_react.useState)(false);
	const [step, setStep] = (0, import_react.useState)(0);
	const [showExplain, setShowExplain] = (0, import_react.useState)(false);
	if (!quiz) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "text-copper",
		children: [
			"پرسش «",
			id,
			"» پیدا نشد."
		]
	});
	const questions = quiz.questions;
	const stored = progress.data.quizzes[quiz.id];
	const scoreOf = (map) => questions.reduce((sum, question) => sum + (map[question.id] === question.answer ? 1 : 0), 0);
	function choose(question, index) {
		if (mode === "tutor" && showExplain) return;
		const next = {
			...picked,
			[question.id]: index
		};
		setPicked(next);
		if (mode === "tutor") setShowExplain(true);
	}
	function finish(map) {
		progress.saveQuiz(quiz.id, scoreOf(map), questions.length);
		setRevealed(true);
	}
	if (revealed) {
		const score = scoreOf(picked);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-2xl border border-line bg-card p-4 sm:p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-lg font-semibold",
					children: quiz.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-2xl font-semibold tabular-nums",
					children: [faInt(score), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-base text-muted",
						children: [" از ", faInt(questions.length)]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 flex flex-col gap-3",
					children: questions.map((question, index) => {
						const ok = picked[question.id] === question.answer;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-xl border border-line px-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-medium",
								children: [
									faInt(index + 1),
									". ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rich, { text: question.prompt })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm " + (ok ? "text-cane" : "text-copper"),
								children: [
									ok ? "درست" : "نادرست",
									" — ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rich, { text: question.explain })
								]
							})]
						}, question.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mt-4 inline-flex min-h-11 items-center rounded-full bg-ink px-4 text-parchment",
					onClick: () => {
						setPicked({});
						setRevealed(false);
						setStep(0);
						setShowExplain(false);
					},
					children: "دوباره"
				})
			]
		});
	}
	if (mode === "exam") {
		const answered = questions.filter((question) => picked[question.id] !== void 0).length;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-2xl border border-line bg-card p-4 sm:p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-lg font-semibold",
					children: quiz.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: quiz.summary
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-5 flex flex-col gap-6",
					children: questions.map((question, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-medium leading-relaxed",
						children: [
							faInt(index + 1),
							". ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rich, { text: question.prompt })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex flex-col gap-2",
						children: question.choices.map((choice, choiceIndex) => {
							const on = picked[question.id] === choiceIndex;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": on,
								onClick: () => choose(question, choiceIndex),
								className: "min-h-11 rounded-xl border px-3 py-2 text-start leading-relaxed " + (on ? "border-ink bg-ink text-parchment" : "border-line bg-paper"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rich, { text: choice })
							}, choice);
						})
					})] }, question.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: answered < questions.length,
					onClick: () => finish(picked),
					className: "mt-6 inline-flex min-h-11 items-center rounded-full bg-cane px-5 text-parchment disabled:opacity-40",
					children: "ثبت پاسخ‌ها"
				}),
				stored && progress.ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-muted",
					children: [
						"بهترین نتیجه‌ی ذخیره‌شده: ",
						faInt(stored.correct),
						" از ",
						faInt(stored.total)
					]
				}) : null
			]
		});
	}
	const question = questions[step];
	if (!question) return null;
	const pickedIndex = picked[question.id];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl border border-line bg-card p-4 sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-lg font-semibold",
					children: quiz.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm tabular-nums text-muted",
					children: [
						faInt(step + 1),
						" / ",
						faInt(questions.length)
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-lg leading-relaxed",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rich, { text: question.prompt })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-col gap-2",
				children: question.choices.map((choice, index) => {
					const on = pickedIndex === index;
					const show = showExplain;
					const correct = index === question.answer;
					let tone = "border-line bg-paper";
					if (show && correct) tone = "border-cane bg-cane-soft";
					else if (show && on && !correct) tone = "border-copper bg-copper-soft";
					else if (on) tone = "border-ink bg-ink text-parchment";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: showExplain,
						onClick: () => choose(question, index),
						className: "min-h-11 rounded-xl border px-3 py-2 text-start leading-relaxed " + tone,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rich, { text: choice })
					}, choice);
				})
			}),
			showExplain ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 leading-relaxed text-ink-soft",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rich, { text: question.explain })
			}) : null,
			showExplain ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-4 inline-flex min-h-11 items-center rounded-full bg-ink px-4 text-parchment",
				onClick: () => {
					if (step + 1 >= questions.length) finish(picked);
					else {
						setStep((value) => value + 1);
						setShowExplain(false);
					}
				},
				children: step + 1 >= questions.length ? "نتیجه" : "بعدی"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: "یک گزینه را انتخاب کن."
			})
		]
	});
}
//#endregion
export { Quiz as t };
