import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type SkeletonTextProps = {
  lines?: number;
  className?: string;
  lineClassName?: string;
};

/**
 * Skeleton placeholder for text content
 */
function SkeletonText({ lines = 3, className, lineClassName }: SkeletonTextProps) {
  const widths = ['w-full', 'w-4/5', 'w-3/4', 'w-2/3', 'w-1/2'];

  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={cn('h-4', widths[i % widths.length], lineClassName)} />
      ))}
    </div>
  );
}

type SkeletonAvatarProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const avatarSizeMap = {
  sm: 'size-8',
  md: 'size-10',
  lg: 'size-12',
} as const;

/**
 * Skeleton placeholder for avatar
 */
function SkeletonAvatar({ size = 'md', className }: SkeletonAvatarProps) {
  return <Skeleton className={cn('rounded-full', avatarSizeMap[size], className)} />;
}

type SkeletonCardProps = {
  className?: string;
  showHeader?: boolean;
  showFooter?: boolean;
};

/**
 * Skeleton placeholder for card component
 */
function SkeletonCard({ className, showHeader = true, showFooter = false }: SkeletonCardProps) {
  return (
    <div className={cn('rounded-lg border p-4 space-y-4', className)}>
      {showHeader && (
        <div className='flex items-center gap-4'>
          <SkeletonAvatar />
          <div className='space-y-2 flex-1'>
            <Skeleton className='h-4 w-1/3' />
            <Skeleton className='h-3 w-1/4' />
          </div>
        </div>
      )}
      <SkeletonText lines={3} />
      {showFooter && (
        <div className='flex gap-2 pt-2'>
          <Skeleton className='h-9 w-20' />
          <Skeleton className='h-9 w-20' />
        </div>
      )}
    </div>
  );
}

type SkeletonTableRowProps = {
  columns?: number;
  className?: string;
};

/**
 * Skeleton placeholder for table row
 */
function SkeletonTableRow({ columns = 4, className }: SkeletonTableRowProps) {
  return (
    <div className={cn('flex items-center gap-4 py-4', className)}>
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={i} className='h-4 flex-1' />
      ))}
    </div>
  );
}

type SkeletonTableProps = {
  rows?: number;
  columns?: number;
  className?: string;
};

/**
 * Skeleton placeholder for table
 */
function SkeletonTable({ rows = 5, columns = 4, className }: SkeletonTableProps) {
  return (
    <div className={cn('rounded-md border', className)}>
      {/* Header */}
      <div className='border-b bg-muted/50 px-4'>
        <SkeletonTableRow columns={columns} className='py-3' />
      </div>
      {/* Body */}
      <div className='divide-y'>
        {Array.from({ length: rows }).map((_, i) => (
          <SkeletonTableRow key={i} columns={columns} className='px-4' />
        ))}
      </div>
    </div>
  );
}

type SkeletonFormProps = {
  fields?: number;
  className?: string;
  showSubmit?: boolean;
};

/**
 * Skeleton placeholder for form
 */
function SkeletonForm({ fields = 3, className, showSubmit = true }: SkeletonFormProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className='space-y-2'>
          <Skeleton className='h-4 w-1/4' />
          <Skeleton className='h-10 w-full' />
        </div>
      ))}
      {showSubmit && <Skeleton className='h-10 w-full max-w-[200px]' />}
    </div>
  );
}

export {
  SkeletonAvatar,
  type SkeletonAvatarProps,
  SkeletonCard,
  type SkeletonCardProps,
  SkeletonForm,
  type SkeletonFormProps,
  SkeletonTable,
  type SkeletonTableProps,
  SkeletonTableRow,
  type SkeletonTableRowProps,
  SkeletonText,
  type SkeletonTextProps,
};
