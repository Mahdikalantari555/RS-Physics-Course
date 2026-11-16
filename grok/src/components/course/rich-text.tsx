import katex from "katex";

export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\$[^$]+\$)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (!(part.startsWith("$") && part.endsWith("$") && part.length > 2)) {
          return <span key={index}>{part}</span>;
        }
        const latex = part.slice(1, -1);
        const html = katex.renderToString(latex, { throwOnError: false, displayMode: false, strict: "ignore" });
        return (
          <span
            key={index}
            dir="ltr"
            className="mx-1 inline-block align-middle"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      })}
    </>
  );
}
