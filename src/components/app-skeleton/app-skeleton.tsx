"use client";

import { type ReactNode, useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type AppSkeletonProps = {
  loading: boolean;
  children: ReactNode;
  className?: string;
  skeletonClassName?: string;
};

/**
 * Auto-adaptive skeleton loader that wraps any component
 * and matches its exact dimensions while loading.
 *
 * Features:
 * - Auto-adaptive: Wraps any component and skeleton matches its exact dimensions
 * - Uses Tailwind's animate-pulse for smooth animation
 * - Toggle loading/loaded states with `loading` prop
 * - ARIA accessibility attributes included
 *
 * Usage:
 * ```tsx
 * <AppSkeleton loading={isLoading}>
 *   <UserCard user={user} />
 * </AppSkeleton>
 * ```
 */
function AppSkeleton({
  loading,
  children,
  className,
  skeletonClassName,
}: AppSkeletonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (loading && containerRef.current) {
      const updateDimensions = () => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          setDimensions({ width: rect.width, height: rect.height });
        }
      };

      updateDimensions();

      // Update on resize
      const resizeObserver = new ResizeObserver(updateDimensions);
      resizeObserver.observe(containerRef.current);

      return () => resizeObserver.disconnect();
    }
  }, [loading]);

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      aria-busy={loading}
      aria-live="polite"
    >
      {/* Content - hidden but maintains dimensions */}
      <div className={cn(loading && "invisible")}>{children}</div>

      {/* Skeleton overlay */}
      {loading && (
        <div
          className={cn(
            "absolute inset-0 animate-pulse rounded-md bg-muted",
            "pointer-events-none",
            skeletonClassName,
          )}
          style={{
            width: dimensions.width,
            height: dimensions.height,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export { AppSkeleton, type AppSkeletonProps };
