import { type HTMLAttributes, type ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Container = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function Container({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8",
          className,
        )}
        {...props}
      />
    );
  },
);

export const Section = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  function Section({ className, ...props }, ref) {
    return (
      <section
        ref={ref}
        className={cn("py-12 sm:py-16 lg:py-24", className)}
        {...props}
      />
    );
  },
);

export interface SectionHeadingProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center mx-auto" : "items-start text-left",
        className,
      )}
      {...props}
    >
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-semibold leading-[1.15] text-text sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
          {description}
        </p>
      )}
      {action && <div className="mt-2 flex items-center gap-3">{action}</div>}
    </div>
  );
}
