import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type AppCardProps = {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
};

function AppCard({ children, className = "", onClick }: AppCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-6 shadow-sm overflow-hidden",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export { AppCard, type AppCardProps };
