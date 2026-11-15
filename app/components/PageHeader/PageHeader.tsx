import type { ReactElement, ReactNode } from "react";

interface PageHeaderProps {
  title: ReactNode;
  meta?: ReactNode;
  children?: ReactNode;
}

export const PageHeader = ({ title, meta, children }: PageHeaderProps): ReactElement => (
  <header className="max-w-(--measure) space-y-4 pt-12 pb-8">
    <h1 className="text-heading-1 sm:text-display">{title}</h1>
    {meta}
    {children}
  </header>
);
