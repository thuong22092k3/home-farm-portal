'use client';

import { SPRING_DEFAULT } from '@/components/smoothui/lib/animation';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

export type AppTabsVariant = 'underline' | 'pill' | 'segment';

export type AppTabItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  disabled?: boolean;
  badge?: number | string;
};

export type AppTabsProps = {
  items: AppTabItem[];
  value?: string;
  onChange?: (value: string) => void;
  variant?: AppTabsVariant;
  pathnameKey?: string;
  defaultPathnameValue?: string;
  className?: string;
  tabsListClassName?: string;
  tabClassName?: string;
  size?: 'sm' | 'md' | 'lg';
  showScrollIndicators?: boolean;
};

const sizeConfig = {
  sm: {
    tabsList: 'h-8',
    tab: 'px-3 py-1.5 text-xs',
    icon: 'h-3.5 w-3.5',
  },
  md: {
    tabsList: 'h-10',
    tab: 'px-4 py-2 text-sm',
    icon: 'h-4 w-4',
  },
  lg: {
    tabsList: 'h-12',
    tab: 'px-5 py-2.5 text-base',
    icon: 'h-5 w-5',
  },
};

export function AppTabs({
  items,
  value,
  onChange,
  variant = 'underline',
  pathnameKey,
  defaultPathnameValue,
  className,
  tabsListClassName,
  tabClassName,
  size = 'md',
  showScrollIndicators = false,
}: AppTabsProps) {
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabsRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  // Determine current value from props or pathname
  const currentValue = (() => {
    if (value !== undefined) return value;
    if (pathnameKey) {
      const paramValue = searchParams?.get(pathnameKey);
      return paramValue ?? defaultPathnameValue ?? items[0]?.id;
    }
    return items[0]?.id;
  })();

  useEffect(() => {
    if (value === undefined || !pathnameKey || !onChange) return;

    const paramValue = searchParams?.get(pathnameKey);
    const paramItem = items.find((item) => item.id === paramValue && !item.disabled);

    if (paramItem && paramItem.id !== value) {
      onChange(paramItem.id);
    }
  }, [items, onChange, pathnameKey, searchParams, value]);

  // Handle tab change
  const handleTabChange = useCallback(
    (tabId: string, href?: string) => {
      if (href) {
        router.push(href);
        return;
      }

      if (pathnameKey) {
        const params = new URLSearchParams(searchParams?.toString());
        params.set(pathnameKey, tabId);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      }

      onChange?.(tabId);
    },
    [onChange, pathnameKey, router, searchParams, pathname],
  );

  // Update indicator position
  useEffect(() => {
    if (!tabsRef.current) return;

    const activeIndex = items.findIndex((item) => item.id === currentValue);
    if (activeIndex === -1) return;

    const tabElement = tabsRef.current.children[activeIndex] as HTMLElement;
    if (!tabElement) return;

    setIndicatorStyle({
      left: tabElement.offsetLeft,
      width: tabElement.offsetWidth,
    });
  }, [currentValue, items]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const currentIndex = items.findIndex((item) => item.id === currentValue);

      let newIndex: number;
      switch (e.key) {
        case 'ArrowRight':
          newIndex = (currentIndex + 1) % items.length;
          break;
        case 'ArrowLeft':
          newIndex = (currentIndex - 1 + items.length) % items.length;
          break;
        case 'Home':
          newIndex = 0;
          break;
        case 'End':
          newIndex = items.length - 1;
          break;
        default:
          return;
      }

      e.preventDefault();
      const newItem = items[newIndex];
      if (newItem && !newItem.disabled) {
        handleTabChange(newItem.id, newItem.href);
        // Focus the new tab
        const tabElement = tabsRef.current?.children[newIndex] as HTMLElement;
        tabElement?.focus();
      }
    },
    [currentValue, items, handleTabChange],
  );

  const sizes = sizeConfig[size];

  return (
    <div
      className={cn(
        'relative',
        showScrollIndicators && 'overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        className,
      )}
    >
      <div
        ref={tabsRef}
        role='tablist'
        aria-label='Tabs'
        className={cn(
          'relative inline-flex items-center',
          variant === 'segment' && 'rounded-lg bg-muted p-1',
          variant === 'pill' && 'rounded-full bg-muted p-1',
          sizes.tabsList,
          tabsListClassName,
        )}
        onKeyDown={handleKeyDown}
      >
        {items.map((item) => {
          const isActive = item.id === currentValue;
          const isDisabled = item.disabled;

          return (
            <button
              key={item.id}
              id={`tab-${item.id}`}
              role='tab'
              aria-selected={isActive}
              aria-controls={`tabpanel-${item.id}`}
              aria-disabled={isDisabled}
              tabIndex={isActive ? 0 : -1}
              disabled={isDisabled}
              onClick={() => !isDisabled && handleTabChange(item.id, item.href)}
              className={cn(
                'relative z-10 inline-flex items-center justify-center gap-1.5 font-medium transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                'disabled:pointer-events-none disabled:opacity-50',
                sizes.tab,
                variant === 'underline' && [
                  'rounded-none border-b-2 border-transparent',
                  isActive ? 'text-foreground border-primary' : 'text-muted-foreground hover:text-foreground hover:border-muted-foreground/50',
                ],
                variant === 'pill' && ['rounded-full', isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'],
                variant === 'segment' && ['rounded-md', isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'],
                tabClassName,
              )}
            >
              {item.icon && (
                <span
                  className={cn(
                    "inline-flex shrink-0 items-center justify-center overflow-hidden leading-none [&_svg]:size-full",
                    sizes.icon,
                  )}
                >
                  {item.icon}
                </span>
              )}
              <span>{item.label}</span>
              {item.badge !== undefined && (
                <span
                  className={cn(
                    'ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-semibold leading-none',
                    isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
                  )}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Animated indicator */}
        <AnimatePresence initial={false}>
          {(variant === 'pill' || variant === 'segment') && (
            <motion.div
              className={cn(
                'absolute top-1 bottom-1',
                variant === 'pill' && 'rounded-full bg-background shadow-sm',
                variant === 'segment' && 'rounded-md bg-background shadow-sm',
              )}
              animate={
                shouldReduceMotion
                  ? { left: indicatorStyle.left, width: indicatorStyle.width }
                  : { left: indicatorStyle.left, width: indicatorStyle.width }
              }
              transition={shouldReduceMotion ? { duration: 0 } : SPRING_DEFAULT}
              style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
              }}
            />
          )}
          {variant === 'underline' && (
            <motion.div
              className='absolute bottom-0 h-0.5 bg-primary'
              animate={
                shouldReduceMotion
                  ? { left: indicatorStyle.left, width: indicatorStyle.width }
                  : { left: indicatorStyle.left, width: indicatorStyle.width }
              }
              transition={shouldReduceMotion ? { duration: 0 } : SPRING_DEFAULT}
              style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export type AppTabsContentProps = {
  children: React.ReactNode;
  className?: string;
};

export function AppTabsContent({ children, className }: AppTabsContentProps) {
  return <div className={cn('mt-4', className)}>{children}</div>;
}

export type AppTabPanelProps = {
  id: string;
  activeId: string;
  children: React.ReactNode;
  className?: string;
  keepMounted?: boolean;
};

export function AppTabPanel({ id, activeId, children, className, keepMounted = false }: AppTabPanelProps) {
  const isActive = id === activeId;
  const shouldRender = keepMounted || isActive;

  if (!shouldRender) return null;

  return (
    <div
      id={`tabpanel-${id}`}
      role='tabpanel'
      aria-labelledby={`tab-${id}`}
      tabIndex={0}
      hidden={!isActive}
      className={cn(isActive ? 'block' : 'hidden', className)}
    >
      {children}
    </div>
  );
}
