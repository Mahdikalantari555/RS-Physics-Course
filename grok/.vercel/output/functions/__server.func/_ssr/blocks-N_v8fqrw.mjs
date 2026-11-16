import { i as __toESM } from "../_runtime.mjs";
import { X as require_react, Y as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as faNum, c as getLab, h as getProblem, m as getPrimer, u as stefan } from "./router-D2pIiRI7.mjs";
import { t as Rich } from "./rich-text-2MT4T0HB.mjs";
import { t as Quiz } from "./quiz-u584svo_.mjs";
import { n as Formula, t as DisplayMath } from "./formula-CTQFXxSv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blocks-N_v8fqrw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LabMount({ id }) {
	const lab = getLab(id);
	if (!lab) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "text-copper",
		children: [
			"آزمایش «",
			id,
			"» پیدا نشد."
		]
	});
	const View = lab.Component;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl border border-line bg-card p-4 sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-lg font-semibold",
				children: lab.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm leading-relaxed text-muted",
				children: lab.summary
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(View, {})
			})
		]
	});
}
function ExpWidget() {
	const [x, setX] = (0, import_react.useState)(1);
	const grow = Math.exp(x);
	const decay = Math.exp(-x);
	const width = (value) => `${Math.min(100, value / Math.exp(4) * 100)}%`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-line bg-card p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "توان x" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums",
						dir: "ltr",
						children: faNum(x, 2)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "range",
					min: 0,
					max: 4,
					step: .05,
					value: x,
					onChange: (event) => setX(Number(event.target.value)),
					className: "mt-2 h-11 w-full accent-cane"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					label: "eˣ رشد",
					value: faNum(grow, 2),
					width: width(grow),
					tone: "bg-copper"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					label: "e⁻ˣ فروپاشی",
					value: faNum(decay, 3),
					width: width(decay),
					tone: "bg-cane"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm leading-relaxed text-muted",
				children: [
					"در قانون بیر، x همان عمق اپتیکی است و فقط شاخه‌ی فروپاشی را می‌بینیم. در x = ۱ حدود ",
					faNum(Math.exp(-1) * 100, 0),
					"٪ می‌ماند."
				]
			})
		]
	});
}
function Bar({ label, value, width, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-1 flex justify-between text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "tabular-nums",
			dir: "ltr",
			children: value
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-3 overflow-hidden rounded-full bg-line",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full rounded-full " + tone,
			style: { width }
		})
	})] });
}
function StefanSlopeWidget() {
	const [temp, setTemp] = (0, import_react.useState)(300);
	const base = stefan(temp);
	const plus = stefan(temp + 1) - base;
	const relative = 4 / temp * 100;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-line bg-card p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "دما" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tabular-nums",
						children: [faNum(temp, 0), " کلوین"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "range",
					min: 250,
					max: 6e3,
					step: 10,
					value: temp,
					onChange: (event) => setTemp(Number(event.target.value)),
					className: "mt-2 h-11 w-full accent-copper"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Readout, {
						label: "خروج انرژی",
						value: `${faNum(base, base >= 1e3 ? 0 : 1)} W/m²`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Readout, {
						label: "اثر +۱ کلوین",
						value: `${faNum(plus, plus >= 100 ? 0 : 2)} W/m²`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Readout, {
						label: "تغییر نسبی +۱ K",
						value: `${faNum(relative, 2)}٪`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-relaxed text-muted",
				children: "درصد خطا در خروج انرژی همیشه حدود چهار برابر درصد خطای دماست. اثر مطلقِ یک کلوین در دمای بالا خیلی بزرگ‌تر است، چون شیب با توان سوم دما رشد می‌کند؛ اثر نسبی همان یک کلوین در دمای پایین بیشتر است."
			})
		]
	});
}
function Readout({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-paper px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-sm text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1 font-semibold tabular-nums",
			dir: "ltr",
			children: value
		})]
	});
}
function Blocks({ blocks }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col gap-5",
		children: blocks.map((block, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlockView, { block }, index))
	});
}
function BlockView({ block }) {
	if (block.type === "h2") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "pt-2 text-2xl font-semibold",
		children: block.text
	});
	if (block.type === "p") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-lg leading-relaxed",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rich, { text: block.text })
	});
	if (block.type === "ul") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "flex flex-col gap-2 ps-5 text-lg leading-relaxed",
		children: block.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
			className: "list-disc",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rich, { text: item })
		}, item))
	});
	if (block.type === "note") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
		className: "border-s-4 border-cane bg-cane-soft px-4 py-3 leading-relaxed",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rich, { text: block.text })
	});
	if (block.type === "display") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DisplayMath, { latex: block.latex });
	if (block.type === "formula") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Formula, { id: block.id }, block.id);
	if (block.type === "lab") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabMount, { id: block.id });
	if (block.type === "quiz") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quiz, { id: block.id });
	if (block.type === "problem") {
		const problem = getProblem(block.id);
		if (!problem) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-copper",
			children: [
				"حل «",
				block.id,
				"» پیدا نشد."
			]
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/solve/$slug",
			params: { slug: problem.slug },
			className: "block rounded-2xl border border-line bg-card p-4 hover:border-cane",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-medium text-copper",
					children: "حل کامل"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 block font-semibold",
					children: problem.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 block text-sm leading-relaxed text-muted",
					children: problem.summary
				})
			]
		});
	}
	if (block.type === "widget") return block.id === "exp" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpWidget, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StefanSlopeWidget, {});
	const primer = getPrimer(block.primer);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "rounded-2xl border border-line bg-copper-soft px-4 py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-copper",
				children: "ریاضی لازم"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 leading-relaxed",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rich, { text: block.text })
			}),
			primer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/math/$slug",
				params: { slug: primer.slug },
				className: "mt-2 inline-flex min-h-11 items-center font-medium",
				children: primer.title
			}) : null
		]
	});
}
//#endregion
export { Blocks as t };
