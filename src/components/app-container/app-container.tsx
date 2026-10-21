import { cn } from "@/lib/utils";
import { type ReactNode } from "react";
import { AppHeader, type AppHeaderProps } from "../app-header/app-header";

type AppContainerProps = {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
  children: ReactNode;
  className?: string;
} & AppHeaderProps;

const maxWidthMap = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  full: "max-w-full",
} as const;

function AppContainer({
  maxWidth = "full",
  children,
  className,
  title,
  subTitle,
}: AppContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full pt-6 px-4 sm:px-6 lg:px-8 gap-3 flex flex-col",
        maxWidthMap[maxWidth],
        className,
      )}
    >
      {(title || subTitle) && <AppHeader title={title} subTitle={subTitle} />}
      {children}
    </div>
  );
}

export { AppContainer, type AppContainerProps };
