import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Shell } from "@/components/course/shell";

export const Route = createFileRoute("/guide")({
  component: Guide,
  head: () => ({ meta: [{ title: "افزودن مطلب · فیزیک سنجش از دور" }] }),
});

function Guide() {
  return (
    <Shell>
      <h1 className="text-3xl font-semibold">افزودن مطلب</h1>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-soft">
        هسته‌ی صفحه را دست نزن. هر درس، فرمول، یادداشت ریاضی، سؤال و آزمایش یک فایل است و خودکار به فهرست می‌آید.
      </p>

      <Section title="درس">
        <p>
          یک فایل تازه در <Code>src/content/lessons</Code> بساز. نام فایل مهم نیست؛ فیلد <Code>order</Code> جای درس را در
          مسیر تعیین می‌کند و <Code>slug</Code> آدرس را.
        </p>
        <Pre>{`import type { Lesson } from "../types";

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
};`}</Pre>
      </Section>

      <Section title="فرمول کلیک‌پذیر">
        <p>
          فایل جدید در <Code>src/content/formulas</Code>. آرایه‌ی <Code>tokens</Code> همان چیزی است که دیده می‌شود: تکه‌های ثابت
          با <Code>tex</Code> و نمادهای کلیک‌خور با <Code>sym</Code>. هر <Code>id</Code> باید در <Code>parts</Code> توضیح داشته
          باشد. اگر یک نماد چند بار آمده، همان id را تکرار کن.
        </p>
        <Pre>{`import { sym, tex } from "../tokens";
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
};`}</Pre>
      </Section>

      <Section title="ریاضی، سؤال، آزمون، حل">
        <p>
          یادداشت ریاضی در <Code>src/content/math</Code> با <Code>kind: "primer"</Code>. سؤال کوتاه در{" "}
          <Code>src/content/quizzes</Code> با <Code>kind: "quiz"</Code>. آزمون در <Code>src/content/exams</Code> با{" "}
          <Code>kind: "exam"</Code>. حل عددی در <Code>src/content/problems</Code> با <Code>kind: "problem"</Code> و در
          درس با <Code>{`{ type: "problem", id }`}</Code>. شناسه‌ها یکتا باشند. گزینه‌ی درست، شماره‌ی <Code>answer</Code>{" "}
          است و از صفر شروع می‌شود.
        </p>
      </Section>

      <Section title="آزمایش">
        <p>
          یک فایل <Code>src/components/labs/نام-lab.tsx</Code> که دو خروجی دارد: <Code>labMeta</Code> و تابع{" "}
          <Code>Lab</Code>. پسوند فایل باید به <Code>-lab.tsx</Code> ختم شود تا پیدا شود. در درس با{" "}
          <Code>{`{ type: "lab", id }`}</Code> صدایش کن.
        </p>
      </Section>

      <Section title="قرارداد نام">
        <ul className="flex list-disc flex-col gap-2 ps-5 leading-relaxed">
          <li>شناسه‌ها انگلیسی و با خط تیره: <span dir="ltr">blackbody-basics</span></li>
          <li>هیچ نام شخص یا مؤسسه‌ای در متن نیاید</li>
          <li>نماد ریاضی داخل متن با دلار: <span dir="ltr">$\\rho$</span></li>
          <li>واحد و جهت قرارداد را در توضیح همان جزء بنویس، نه در حاشیه‌ی جدا</li>
        </ul>
      </Section>
    </Shell>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-3 flex flex-col gap-3 leading-relaxed text-ink-soft">{children}</div>
    </section>
  );
}

function Code({ children }: { children: string }) {
  return (
    <code dir="ltr" className="rounded-md bg-paper px-1.5 py-0.5 text-sm text-ink">
      {children}
    </code>
  );
}

function Pre({ children }: { children: string }) {
  return (
    <pre dir="ltr" className="overflow-x-auto rounded-xl bg-ink p-4 text-sm leading-relaxed text-parchment">
      {children}
    </pre>
  );
}
