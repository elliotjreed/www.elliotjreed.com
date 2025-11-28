import type { FC, ReactElement } from "react";

export const DropdownMenuIcon: FC<{ isOpen: boolean }> = ({ isOpen }): ReactElement => (
  <svg
    className={`w-2.5 h-2.5 ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 10 6"
  >
    <title>Toggle Submenu</title>
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
  </svg>
);
