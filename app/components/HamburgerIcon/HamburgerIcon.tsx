import type { FC } from "react";

export const HamburgerIcon: FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <>
    <span className="sr-only">{isOpen ? "Close main menu" : "Open main menu"}</span>
    {isOpen ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
      >
        <title>Close main menu</title>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
      >
        <title>Open main menu</title>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18M3 18h18" />
      </svg>
    )}
  </>
);
