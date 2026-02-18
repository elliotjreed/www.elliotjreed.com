import type { ReactElement, ReactNode } from "react";

interface PageHeaderProps {
  title: ReactNode;
  meta?: ReactNode;
  children?: ReactNode;
}

export const PageHeader = ({ title, meta, children }: PageHeaderProps): ReactElement => (
  <div className="space-y-2 pt-6 pb-8 md:space-y-5">
    <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-700 sm:text-4xl sm:leading-10 md:text-6xl dark:text-gray-200">
      {title}
    </h1>
    {meta}
    {children}
  </div>
);
