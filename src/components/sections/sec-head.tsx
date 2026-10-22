// Section heading: mono "file path" eyebrow, big display title, optional intro line.
export function SecHead({
  path,
  title,
  children,
}: {
  path: React.ReactNode;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="sec-head">
      <div>
        <div className="path">{path}</div>
        <h2>{title}</h2>
      </div>
      {children && <p>{children}</p>}
    </div>
  );
}

export function SampleTag({ show = true, children = "sample" }: { show?: boolean; children?: string }) {
  return show ? <span className="tag sample">{children}</span> : null;
}

// Renders `backtick` spans in content strings as inline code.
export function InlineCode({ text }: { text: string }) {
  return text
    .split(/(`[^`]+`)/)
    .map((part, i) =>
      part.startsWith("`") && part.endsWith("`") ? <code key={i}>{part.slice(1, -1)}</code> : part,
    );
}
