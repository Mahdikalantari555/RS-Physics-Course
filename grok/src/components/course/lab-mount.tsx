import { getLab } from "@/components/labs/load-labs";

export function LabMount({ id }: { id: string }) {
  const lab = getLab(id);
  if (!lab) return <p className="text-copper">آزمایش «{id}» پیدا نشد.</p>;
  const View = lab.Component;
  return (
    <section className="rounded-2xl border border-line bg-card p-4 sm:p-5">
      <h3 className="text-lg font-semibold">{lab.title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-muted">{lab.summary}</p>
      <div className="mt-4">
        <View />
      </div>
    </section>
  );
}
