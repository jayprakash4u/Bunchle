import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, interactive = false, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "bg-surface border border-border rounded-card shadow-card overflow-hidden",
        interactive &&
          "transition-all duration-300 hover:-translate-y-1 hover:shadow-lift hover:border-stone-300 cursor-pointer",
        className,
      )}
      {...props}
    />
  );
});

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardHeader({ className, ...props }, ref) {
    return <div ref={ref} className={cn("p-5 sm:p-6 pb-2", className)} {...props} />;
  },
);

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  function CardTitle({ className, ...props }, ref) {
    return (
      <h3
        ref={ref}
        className={cn(
          "font-display text-lg font-semibold tracking-tight text-text sm:text-xl",
          className,
        )}
        {...props}
      />
    );
  },
);

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  function CardDescription({ className, ...props }, ref) {
    return (
      <p
        ref={ref}
        className={cn("text-sm text-text-secondary leading-relaxed", className)}
        {...props}
      />
    );
  },
);

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardContent({ className, ...props }, ref) {
    return <div ref={ref} className={cn("p-5 sm:p-6 pt-0", className)} {...props} />;
  },
);

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardFooter({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("flex items-center p-5 sm:p-6 pt-0 mt-auto", className)}
        {...props}
      />
    );
  },
);

export const CardMedia = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardMedia({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("relative w-full overflow-hidden bg-surface-warm", className)}
        {...props}
      />
    );
  },
);
