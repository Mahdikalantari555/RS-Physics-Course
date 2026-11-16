import { Y as require_jsx_runtime, y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { _ as lessons, m as getPrimer, r as Route$2, s as Shell } from "./_ssr/router-D2pIiRI7.mjs";
import { t as Blocks } from "./_ssr/blocks-N_v8fqrw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-CzAVXSKX.js
var import_jsx_runtime = require_jsx_runtime();
function PrimerPage() {
	const { slug } = Route$2.useParams();
	const primer = getPrimer(slug);
	if (!primer) return null;
	const usedIn = lessons.filter((lesson) => lesson.prerequisites.includes(primer.slug));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/math",
			className: "inline-flex min-h-11 items-center text-sm text-cane",
			children: "همه‌ی یادداشت‌های ریاضی"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 text-3xl font-semibold",
			children: primer.title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-lg leading-relaxed text-ink-soft",
			children: primer.summary
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Blocks, { blocks: primer.blocks })
		}),
		usedIn.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-medium text-muted",
				children: "در این درس‌ها لازم می‌شود"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 flex flex-col",
				children: usedIn.map((lesson) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/lessons/$slug",
					params: { slug: lesson.slug },
					className: "inline-flex min-h-11 items-center text-cane",
					children: lesson.title
				}) }, lesson.slug))
			})]
		}) : null
	] });
}
//#endregion
export { PrimerPage as component };
