import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "alert" | "success" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

/** Boutons ≥ 48dp de hauteur (ESMF_SPEC.md §2, accessibilité/tactile). */
const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-esmf-primary text-white hover:bg-esmf-primary-light",
  secondary: "bg-esmf-secondary text-white hover:brightness-95",
  alert: "bg-esmf-alert text-white hover:brightness-95",
  success: "bg-esmf-success text-white hover:brightness-95",
  ghost: "bg-transparent text-esmf-primary border border-esmf-border hover:bg-esmf-bg",
};

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    />
  );
}
