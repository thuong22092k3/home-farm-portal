"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AppIconButtonProps = {
  icon: ReactNode;
  tooltip?: string;
  variant?: "default" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size" | "children">;

const sizeMap = {
  sm: "h-8 w-8",
  md: "h-9 w-9",
  lg: "h-10 w-10",
} as const;

const iconSizeMap = {
  sm: "h-4 w-4",
  md: "h-4 w-4",
  lg: "h-5 w-5",
} as const;

const AppIconButton = forwardRef<HTMLButtonElement, AppIconButtonProps>(
  (
    {
      icon,
      tooltip,
      variant = "ghost",
      size = "md",
      className,
      title,
      ...props
    },
    ref,
  ) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        size="icon"
        className={cn(sizeMap[size], className)}
        title={tooltip || title}
        {...props}
      >
        <span
          className={cn("flex items-center justify-center", iconSizeMap[size])}
        >
          {icon}
        </span>
      </Button>
    );
  },
);

AppIconButton.displayName = "AppIconButton";

export { AppIconButton, type AppIconButtonProps };
