import type { ReactElement, ReactNode } from "react";

type CalloutVariant = "note" | "success" | "warning" | "danger";

interface CalloutProps {
  variant?: CalloutVariant;
  label?: string;
  children: ReactNode;
}

const VARIANTS: Record<CalloutVariant, { label: string; className: string }> = {
  note: { label: "Note", className: "ejr-callout" },
  success: { label: "Success", className: "ejr-callout ejr-callout-success" },
  warning: { label: "Warning", className: "ejr-callout ejr-callout-warning" },
  danger: { label: "Danger", className: "ejr-callout ejr-callout-danger" },
};

export const Callout = ({ variant = "note", label, children }: CalloutProps): ReactElement => (
  <div className={VARIANTS[variant].className} role={variant === "danger" ? "alert" : "note"}>
    <p className="ejr-callout-label">{label ?? VARIANTS[variant].label}</p>
    {children}
  </div>
);
