import { getPrimer, getProblem } from "@/content/load";
import type { Block } from "@/content/types";
import { Link } from "@tanstack/react-router";
import { DisplayMath } from "./display-math";
import { LabMount } from "./lab-mount";
import { Formula } from "./formula";
import { Quiz } from "./quiz";
import { Rich } from "./rich-text";
import { ExpWidget, StefanSlopeWidget } from "./widgets";

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((block, index) => (
        <BlockView key={index} block={block} />
      ))}
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  if (block.type === "h2") {
    return <h2 className="pt-2 text-2xl font-semibold">{block.text}</h2>;
  }
  if (block.type === "p") {
    return (
      <p className="text-lg leading-relaxed">
        <Rich text={block.text} />
      </p>
    );
  }
  if (block.type === "ul") {
    return (
      <ul className="flex flex-col gap-2 ps-5 text-lg leading-relaxed">
        {block.items.map((item) => (
          <li key={item} className="list-disc">
            <Rich text={item} />
          </li>
        ))}
      </ul>
    );
  }
  if (block.type === "note") {
    return (
      <aside className="border-s-4 border-cane bg-cane-soft px-4 py-3 leading-relaxed">
        <Rich text={block.text} />
      </aside>
    );
  }
  if (block.type === "display") return <DisplayMath latex={block.latex} />;
  if (block.type === "formula") return <Formula key={block.id} id={block.id} />;
  if (block.type === "lab") return <LabMount id={block.id} />;
  if (block.type === "quiz") return <Quiz id={block.id} />;
  if (block.type === "problem") {
    const problem = getProblem(block.id);
    if (!problem) return <p className="text-copper">حل «{block.id}» پیدا نشد.</p>;
    return (
      <Link
        to="/solve/$slug"
        params={{ slug: problem.slug }}
        className="block rounded-2xl border border-line bg-card p-4 hover:border-cane"
      >
        <span className="text-sm font-medium text-copper">حل کامل</span>
        <span className="mt-1 block font-semibold">{problem.title}</span>
        <span className="mt-1 block text-sm leading-relaxed text-muted">{problem.summary}</span>
      </Link>
    );
  }
  if (block.type === "widget") {
    return block.id === "exp" ? <ExpWidget /> : <StefanSlopeWidget />;
  }
  const primer = getPrimer(block.primer);
  return (
    <aside className="rounded-2xl border border-line bg-copper-soft px-4 py-4">
      <p className="text-sm font-medium text-copper">ریاضی لازم</p>
      <p className="mt-2 leading-relaxed">
        <Rich text={block.text} />
      </p>
      {primer ? (
        <Link to="/math/$slug" params={{ slug: primer.slug }} className="mt-2 inline-flex min-h-11 items-center font-medium">
          {primer.title}
        </Link>
      ) : null}
    </aside>
  );
}
