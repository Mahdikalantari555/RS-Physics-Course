import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Shell } from "@/components/course/shell";
import { getLab } from "@/components/labs/load-labs";

export const Route = createFileRoute("/labs/$id")({
  loader: ({ params }) => {
    const lab = getLab(params.id);
    if (!lab) throw notFound();
    return { title: lab.title, id: lab.id };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData ? `${loaderData.title} · آزمایش` : "آزمایش" }],
  }),
  component: LabPage,
});

function LabPage() {
  const { id } = Route.useParams();
  const lab = getLab(id);
  if (!lab) return null;
  const View = lab.Component;
  return (
    <Shell>
      <Link to="/labs" className="inline-flex min-h-11 items-center text-sm text-cane">
        همه‌ی آزمایش‌ها
      </Link>
      <h1 className="mt-2 text-3xl font-semibold">{lab.title}</h1>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-soft">{lab.summary}</p>
      <div className="mt-6 rounded-2xl border border-line bg-card p-4 sm:p-5">
        <View />
      </div>
    </Shell>
  );
}
