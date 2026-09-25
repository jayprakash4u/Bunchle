import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "outline"
  | "neutral";

export type BadgeSize = "sm" | "md";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: "bg-primary-soft text-primary font-semibold border border-primary/10",
  secondary: "bg-stone-900 text-white font-medium",
  success: "bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-medium",
  warning: "bg-amber-50 text-amber-800 border border-amber-200/60 font-medium",
  outline: "bg-transparent text-text-secondary border border-border font-medium",
  neutral: "bg-surface-warm text-text-secondary font-medium",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "text-[11px] px-2 py-0.5 min-h-[1.25rem] rounded-full",
  md: "text-xs px-2.5 py-1 min-h-[1.5rem] rounded-full",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = "primary", size = "md", className, children, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center tracking-tight leading-none select-none transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
});
