// The one page container: max width from --maxw, gutters 16 / 32 / 56 / 64px (see .wrap in globals.css).
// Every section, the hero and the footer sit in it so their edges line up.
export function Container({
  as: Tag = "div",
  className,
  children,
}: {
  as?: "div" | "nav" | "header" | "section";
  className?: string;
  children: React.ReactNode;
}) {
  return <Tag className={className ? `wrap ${className}` : "wrap"}>{children}</Tag>;
}
