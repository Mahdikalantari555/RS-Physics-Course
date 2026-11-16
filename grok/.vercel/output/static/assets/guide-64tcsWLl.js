import{c as e,t}from"./shell-CvTLpkHw.js";var n=e();function r(){return(0,n.jsxs)(t,{children:[(0,n.jsx)(`h1`,{className:`text-3xl font-semibold`,children:`افزودن مطلب`}),(0,n.jsx)(`p`,{className:`mt-3 max-w-2xl text-lg leading-relaxed text-ink-soft`,children:`هسته‌ی صفحه را دست نزن. هر درس، فرمول، یادداشت ریاضی، سؤال و آزمایش یک فایل است و خودکار به فهرست می‌آید.`}),(0,n.jsxs)(i,{title:`درس`,children:[(0,n.jsxs)(`p`,{children:[`یک فایل تازه در `,(0,n.jsx)(a,{children:`src/content/lessons`}),` بساز. نام فایل مهم نیست؛ فیلد `,(0,n.jsx)(a,{children:`order`}),` جای درس را در مسیر تعیین می‌کند و `,(0,n.jsx)(a,{children:`slug`}),` آدرس را.`]}),(0,n.jsx)(o,{children:`import type { Lesson } from "../types";

export const sample: Lesson = {
  kind: "lesson",
  slug: "sample",
  title: "عنوان درس",
  order: 7,
  summary: "یک خط.",
  prerequisites: ["exponentials"],
  blocks: [
    { type: "p", text: "متن. فرمول درون‌خطی با $E = hf$." },
    { type: "formula", id: "planck" },
    { type: "math", primer: "exponentials", text: "اگر نمایی ناآشناست." },
    { type: "lab", id: "blackbody" },
    { type: "quiz", id: "sample-quiz" },
  ],
};`})]}),(0,n.jsxs)(i,{title:`فرمول کلیک‌پذیر`,children:[(0,n.jsxs)(`p`,{children:[`فایل جدید در `,(0,n.jsx)(a,{children:`src/content/formulas`}),`. آرایه‌ی `,(0,n.jsx)(a,{children:`tokens`}),` همان چیزی است که دیده می‌شود: تکه‌های ثابت با `,(0,n.jsx)(a,{children:`tex`}),` و نمادهای کلیک‌خور با `,(0,n.jsx)(a,{children:`sym`}),`. هر `,(0,n.jsx)(a,{children:`id`}),` باید در `,(0,n.jsx)(a,{children:`parts`}),` توضیح داشته باشد. اگر یک نماد چند بار آمده، همان id را تکرار کن.`]}),(0,n.jsx)(o,{children:`import { sym, tex } from "../tokens";
import type { Formula } from "../types";

export const sample: Formula = {
  kind: "formula",
  id: "sample",
  title: "عنوان",
  summary: "یک خط.",
  tokens: [sym("a"), tex("="), sym("b")],
  parts: [
    { id: "a", latex: "a", name: "نام", explanation: "توضیح." },
    { id: "b", latex: "b", name: "نام", explanation: "توضیح." },
  ],
  relatedLabs: ["wave"],
  relatedMath: ["derivatives"],
};`})]}),(0,n.jsx)(i,{title:`ریاضی، سؤال، آزمون، حل`,children:(0,n.jsxs)(`p`,{children:[`یادداشت ریاضی در `,(0,n.jsx)(a,{children:`src/content/math`}),` با `,(0,n.jsx)(a,{children:`kind: "primer"`}),`. سؤال کوتاه در`,` `,(0,n.jsx)(a,{children:`src/content/quizzes`}),` با `,(0,n.jsx)(a,{children:`kind: "quiz"`}),`. آزمون در `,(0,n.jsx)(a,{children:`src/content/exams`}),` با`,` `,(0,n.jsx)(a,{children:`kind: "exam"`}),`. حل عددی در `,(0,n.jsx)(a,{children:`src/content/problems`}),` با `,(0,n.jsx)(a,{children:`kind: "problem"`}),` و در درس با `,(0,n.jsx)(a,{children:`{ type: "problem", id }`}),`. شناسه‌ها یکتا باشند. گزینه‌ی درست، شماره‌ی `,(0,n.jsx)(a,{children:`answer`}),` `,`است و از صفر شروع می‌شود.`]})}),(0,n.jsx)(i,{title:`آزمایش`,children:(0,n.jsxs)(`p`,{children:[`یک فایل `,(0,n.jsx)(a,{children:`src/components/labs/نام-lab.tsx`}),` که دو خروجی دارد: `,(0,n.jsx)(a,{children:`labMeta`}),` و تابع`,` `,(0,n.jsx)(a,{children:`Lab`}),`. پسوند فایل باید به `,(0,n.jsx)(a,{children:`-lab.tsx`}),` ختم شود تا پیدا شود. در درس با`,` `,(0,n.jsx)(a,{children:`{ type: "lab", id }`}),` صدایش کن.`]})}),(0,n.jsx)(i,{title:`قرارداد نام`,children:(0,n.jsxs)(`ul`,{className:`flex list-disc flex-col gap-2 ps-5 leading-relaxed`,children:[(0,n.jsxs)(`li`,{children:[`شناسه‌ها انگلیسی و با خط تیره: `,(0,n.jsx)(`span`,{dir:`ltr`,children:`blackbody-basics`})]}),(0,n.jsx)(`li`,{children:`هیچ نام شخص یا مؤسسه‌ای در متن نیاید`}),(0,n.jsxs)(`li`,{children:[`نماد ریاضی داخل متن با دلار: `,(0,n.jsx)(`span`,{dir:`ltr`,children:`$\\\\rho$`})]}),(0,n.jsx)(`li`,{children:`واحد و جهت قرارداد را در توضیح همان جزء بنویس، نه در حاشیه‌ی جدا`})]})})]})}function i({title:e,children:t}){return(0,n.jsxs)(`section`,{className:`mt-8`,children:[(0,n.jsx)(`h2`,{className:`text-xl font-semibold`,children:e}),(0,n.jsx)(`div`,{className:`mt-3 flex flex-col gap-3 leading-relaxed text-ink-soft`,children:t})]})}function a({children:e}){return(0,n.jsx)(`code`,{dir:`ltr`,className:`rounded-md bg-paper px-1.5 py-0.5 text-sm text-ink`,children:e})}function o({children:e}){return(0,n.jsx)(`pre`,{dir:`ltr`,className:`overflow-x-auto rounded-xl bg-ink p-4 text-sm leading-relaxed text-parchment`,children:e})}export{r as component};