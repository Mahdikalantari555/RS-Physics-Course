import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Quiz } from "@/components/course/quiz";
import { Shell } from "@/components/course/shell";
import { getQuiz } from "@/content/load";

export const Route = createFileRoute("/exams/$id")({
  loader: ({ params }) => {
    const exam = getQuiz(params.id);
    if (!exam || exam.kind !== "exam") throw notFound();
    return { title: exam.title };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData ? `${loaderData.title} · آزمون` : "آزمون" }],
  }),
  component: ExamPage,
});

function ExamPage() {
  const { id } = Route.useParams();
  return (
    <Shell>
      <Link to="/exams" className="inline-flex min-h-11 items-center text-sm text-cane">
        آزمون‌ها
      </Link>
      <div className="mt-4">
        <Quiz id={id} mode="exam" />
      </div>
    </Shell>
  );
}
