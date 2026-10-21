import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type AppStickyActionsProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  align?: "start" | "center" | "end" | "between";
};

const alignClassMap: Record<
  NonNullable<AppStickyActionsProps["align"]>,
  string
> = {
  start: "sm:justify-start",
  center: "sm:justify-center",
  end: "sm:justify-end",
  between: "sm:justify-between",
};

function AppStickyActions({
  children,
  className,
  contentClassName,
  align = "end",
}: AppStickyActionsProps) {
  return (
    <div
      className={cn(
        "sticky bottom-0 z-20 mt-6 -mx-4 border-t border-border bg-background/95 px-4 py-4 backdrop-blur-sm supports-backdrop-filter:bg-background/85 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-full flex-col-reverse gap-3 sm:flex-row sm:gap-4",
          alignClassMap[align],
          contentClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export { AppStickyActions, type AppStickyActionsProps };
