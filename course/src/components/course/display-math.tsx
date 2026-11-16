import katex from "katex";
import { useMemo } from "react";

export function DisplayMath({ latex }: { latex: string }) {
  const html = useMemo(
    () => katex.renderToString(latex, { throwOnError: false, displayMode: true, strict: "ignore" }),
    [latex],
  );
  return (
    <div
      dir="ltr"
      className="formula-display overflow-x-auto rounded-xl bg-ink px-3 py-4 text-center text-parchment"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function InlineMath({ latex }: { latex: string }) {
  const html = useMemo(
    () => katex.renderToString(latex, { throwOnError: false, displayMode: false, strict: "ignore" }),
    [latex],
  );
  return <span dir="ltr" className="mx-0.5 inline-block align-middle" dangerouslySetInnerHTML={{ __html: html }} />;
}
