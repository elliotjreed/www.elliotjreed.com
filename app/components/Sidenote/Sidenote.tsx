import type { ReactElement, ReactNode } from "react";

interface SidenoteProps {
  id: string;
  number: number;
  punctuation?: string;
  children: ReactNode;
}

export const Sidenote = ({ id, number, punctuation, children }: SidenoteProps): ReactElement => (
  <>
    <button className="ejr-sn-ref" type="button" aria-describedby={id} aria-label={`Sidenote ${number}`} />
    {punctuation}
    <small className="ejr-sidenote" id={id} role="note">
      <span className="ejr-sidenote-num">{number}</span>
      {children}
    </small>
  </>
);
