'use client';

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type AppChartContainerProps = {
  children?: ReactNode;
  title?: string;
  description?: string;
  className?: string;
  action?: ReactNode;
};

export function AppChartContainer({ children, title, description, className, action }: AppChartContainerProps) {
  return (
    <div className={cn('rounded-lg border border-border/60 bg-card overflow-hidden', className)}>
      {(title || action) && (
        <div className='flex items-center justify-between border-b border-border/50 px-4 py-3 bg-muted/20'>
          <div>
            {title && <h3 className='text-sm font-semibold text-foreground'>{title}</h3>}
            {description && <p className='text-xs text-muted-foreground mt-0.5'>{description}</p>}
          </div>
          {action}
        </div>
      )}
      <div className='p-5'>{children}</div>
    </div>
  );
}
