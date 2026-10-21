"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AppButtonProps = {
  variant?:
    | "default"
    | "primary"
    | "destructive"
    | "outline"
    | "ghost"
    | "cta"
    | "success";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size">;

const variantMap = {
  primary: "default",
  default: "secondary",
  destructive: "destructive",
  outline: "outline",
  ghost: "ghost",
  cta: "default",
  success: "default",
} as const;

const sizeMap = {
  sm: "sm",
  md: "default",
  lg: "lg",
} as const;

const customVariantStyles = {
  cta: "bg-[oklch(0.68_0.20_40)] hover:bg-[oklch(0.62_0.22_40)] text-white",
  success:
    "bg-(--status-success) text-(--status-success-foreground) hover:bg-[color-mix(in_oklch,var(--status-success)_88%,black)]",
} as const;

const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(
  (
    {
      variant = "default",
      size = "md",
      loading,
      leftIcon,
      rightIcon,
      children,
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    const shadcnVariant =
      variant === "cta" || variant === "success"
        ? "default"
        : variantMap[variant];
    const customStyle =
      variant === "cta" || variant === "success"
        ? customVariantStyles[variant]
        : "";

    return (
      <Button
        ref={ref}
        variant={shadcnVariant}
        size={sizeMap[size]}
        disabled={disabled || loading}
        className={cn(customStyle, className)}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </Button>
    );
  },
);

AppButton.displayName = "AppButton";

export { AppButton, type AppButtonProps };
