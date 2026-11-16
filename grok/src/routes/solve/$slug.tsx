import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ProblemView } from "@/components/course/problem-view";
import { Shell } from "@/components/course/shell";
import { getProblem } from "@/content/load";

export const Route = createFileRoute("/solve/$slug")({
  loader: ({ params }) => {
    const problem = getProblem(params.slug);
    if (!problem) throw notFound();
    return { title: problem.title };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData ? `${loaderData.title} · حل مسئله` : "حل مسئله" }],
  }),
  component: SolvePage,
});

function SolvePage() {
  const { slug } = Route.useParams();
  const problem = getProblem(slug);
  if (!problem) return null;

  return (
    <Shell>
      <Link to="/solve" className="inline-flex min-h-11 items-center text-sm text-cane">
        همه‌ی حل‌ها
      </Link>
      <div className="mt-2">
        <ProblemView problem={problem} />
      </div>
    </Shell>
  );
}
