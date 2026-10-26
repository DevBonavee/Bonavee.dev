import { Container } from "@/components/container";

// Top of a standalone page: mono path eyebrow, big title and a short lede. Rises in on arrival.
export function PageHead({
  path,
  title,
  children,
}: {
  path: React.ReactNode;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="page-head">
      <Container>
        <div className="path mono">{path}</div>
        <h1>{title}</h1>
        {children && <p>{children}</p>}
      </Container>
    </header>
  );
}
