import Link, { type LinkProps } from "next/link";
import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  forwardRef,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { SpinnerIcon } from "@/components/icons";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "subtle";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white shadow-button hover:bg-primary-hover active:scale-[0.98] focus-visible:ring-primary/30",
  secondary:
    "bg-text text-white hover:bg-stone-800 active:scale-[0.98] focus-visible:ring-text/30",
  outline:
    "border border-border bg-surface text-text hover:border-text hover:bg-surface-warm active:scale-[0.98] focus-visible:ring-primary/20",
  ghost:
    "text-text-secondary hover:bg-surface-warm hover:text-text active:scale-[0.98] focus-visible:ring-text/10",
  subtle:
    "bg-primary-soft text-primary hover:bg-primary-subtle active:scale-[0.98] focus-visible:ring-primary/20",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 rounded-button-sm px-3.5 text-xs font-semibold gap-1.5",
  md: "h-11 rounded-button-md px-5 text-sm font-semibold gap-2",
  lg: "h-12 rounded-button-md px-6 text-base font-semibold gap-2.5",
  icon: "h-10 w-10 rounded-button-md p-0 justify-center",
};

type BaseButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
  className?: string;
};

type ButtonAsButton = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & {
    href?: undefined;
  };

type ButtonAsLink = BaseButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> &
  LinkProps & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      className,
      children,
      ...props
    },
    ref,
  ) {
    const combinedClasses = cn(
      "inline-flex items-center justify-center font-sans transition-all duration-200 cursor-pointer disabled:pointer-events-none disabled:opacity-50 select-none focus-visible:outline-none focus-visible:ring-4",
      variantStyles[variant],
      sizeStyles[size],
      className,
    );

    if ("href" in props && typeof props.href === "string") {
      const { href, ...restLinkProps } = props as ButtonAsLink;
      return (
        <Link
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={combinedClasses}
          {...restLinkProps}
        >
          {isLoading ? <SpinnerIcon className="h-4 w-4" /> : leftIcon}
          {children}
          {!isLoading && rightIcon}
        </Link>
      );
    }

    const { type = "button", disabled, ...buttonProps } = props as ButtonAsButton;

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={combinedClasses}
        {...buttonProps}
      >
        {isLoading ? <SpinnerIcon className="h-4 w-4" /> : leftIcon}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  },
);
