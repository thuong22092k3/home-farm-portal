"use client";

import * as React from "react";
import { useCallback, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export interface AppInfiniteScrollProps<TItem> {
  items: TItem[];
  renderItem: (item: TItem, index: number) => React.ReactNode;
  itemKey: (item: TItem) => string | number;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  emptyComponent?: React.ReactNode;
  gap?: number;
  enabled?: boolean;
  skeletonComponent?: React.ReactNode;
  skeletonCount?: number;
  className?: string;
}

export const AppInfiniteScroll = <TItem,>({
  items,
  renderItem,
  itemKey,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  onLoadMore,
  emptyComponent,
  gap = 12,
  enabled = true,
  skeletonComponent,
  skeletonCount = 3,
  className,
}: AppInfiniteScrollProps<TItem>) => {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || !enabled) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
            onLoadMore();
          }
        },
        {
          threshold: 0.1,
          rootMargin: "100px",
        },
      );

      if (node) observer.current.observe(node);
    },
    [hasNextPage, isFetchingNextPage, isLoading, onLoadMore, enabled],
  );

  if (isLoading) {
    return (
      <div
        className={cn("flex flex-col", className)}
        style={{ gap: `${gap}px` }}
      >
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <div
            key={`skeleton-${index}`}
            className="animate-in fade-in slide-in-from-bottom-2 duration-300"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {skeletonComponent || (
              <Skeleton className="h-24 w-full rounded-xl" />
            )}
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0 && !isLoading) {
    return (
      emptyComponent || (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <p className="text-sm text-muted-foreground">No data available</p>
        </div>
      )
    );
  }

  return (
    <div className={cn("flex flex-col", className)} style={{ gap: `${gap}px` }}>
      {items.map((item, index) => {
        const isLastItem = index === items.length - 1;
        return (
          <div
            key={itemKey(item)}
            className="animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-forwards"
            style={{ animationDelay: `${Math.min(index * 0.05, 0.3)}s` }}
          >
            {renderItem(item, index)}
            {isLastItem && <div ref={lastElementRef} className="h-px w-full" />}
          </div>
        );
      })}

      {isFetchingNextPage && (
        <div className="flex justify-center p-4">
          {skeletonComponent ? (
            <div className="w-full animate-pulse">{skeletonComponent}</div>
          ) : (
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          )}
        </div>
      )}
    </div>
  );
};
