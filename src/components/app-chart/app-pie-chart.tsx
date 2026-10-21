'use client';

import { AppChartContainer } from './app-chart-container';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

type PieChartItem = {
  name: string;
  value: number;
  color?: string;
};

type AppPieChartProps = {
  data: PieChartItem[];
  title?: string;
  description?: string;
  height?: number;
  showLabels?: boolean;
  innerRadius?: number;
  outerRadius?: number;
  className?: string;
  action?: React.ReactNode;
  formatValue?: (value: number) => string;
};

// Chart colors using CSS variables from globals.css
const DEFAULT_COLORS = [
  'var(--chart-1)', // Blue
  'var(--chart-2)', // Teal
  'var(--chart-3)', // Orange
  'var(--status-error)', // Red (for contrast)
  'var(--chart-4)', // Purple
  'var(--status-info)', // Cyan
  'var(--chart-5)', // Pink
  'var(--status-success)', // Green
];

export function AppPieChart({
  data,
  title,
  description,
  height = 280,
  showLabels = false,
  innerRadius = 0,
  outerRadius = 80,
  className,
  action,
  formatValue,
}: AppPieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <AppChartContainer title={title} description={description} className={className} action={action}>
      <div className='flex items-center gap-6'>
        <ResponsiveContainer width='100%' height={height}>
          <PieChart>
            <Pie
              data={data}
              cx='50%'
              cy='50%'
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={2}
              dataKey='value'
              label={
                showLabels
                  ? ({ name, percent }: { name?: string; percent?: number }) => `${name || ''} (${((percent ?? 0) * 100).toFixed(0)}%)`
                  : false
              }
              labelLine={showLabels}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
                  className='stroke-background'
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--popover)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '8px 12px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                opacity: 1,
              }}
              labelStyle={{ color: 'var(--foreground)', fontWeight: 600, marginBottom: '4px', fontSize: '12px' }}
              itemStyle={{ color: 'var(--muted-foreground)', fontSize: '12px' }}
              formatter={(value, name, props) => {
                const item = props.payload as PieChartItem;
                const numValue = typeof value === 'number' ? value : 0;
                const percent = ((item.value / total) * 100).toFixed(1);
                return [`${formatValue ? formatValue(numValue) : numValue} (${percent}%)`, item.name];
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className='flex flex-col gap-2 min-w-[140px]'>
          {data.map((item, index) => (
            <div key={item.name} className='flex items-center gap-2'>
              <div
                className='h-2.5 w-2.5 rounded-full shrink-0'
                style={{ backgroundColor: item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length] }}
              />
              <span className='text-xs text-muted-foreground truncate'>{item.name}</span>
              <span className='text-xs font-medium text-foreground ml-auto tabular-nums'>{((item.value / total) * 100).toFixed(0)}%</span>
            </div>
          ))}
        </div>
      </div>
    </AppChartContainer>
  );
}
