'use client';

import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { AppChartContainer } from './app-chart-container';

type LineChartItem = Record<string, string | number | null>;

type LineConfig = {
  dataKey: string;
  color?: string;
  name?: string;
};

type AppLineChartProps = {
  data: LineChartItem[];
  title?: string;
  description?: string;
  lines: LineConfig[];
  xAxisKey?: string;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  className?: string;
  action?: React.ReactNode;
  formatValue?: (value: number) => string;
};

// Chart colors using CSS variables from globals.css
const CHART_COLORS = [
  'var(--chart-1)', // Blue
  'var(--chart-2)', // Teal
  'var(--chart-3)', // Orange
  'var(--status-error)', // Red (for contrast)
  'var(--chart-4)', // Purple
  'var(--status-info)', // Cyan
];

export function AppLineChart({
  data,
  title,
  description,
  lines,
  xAxisKey = 'name',
  height = 280,
  showGrid = true,
  showLegend = true,
  className,
  action,
  formatValue,
}: AppLineChartProps) {
  return (
    <AppChartContainer title={title} description={description} className={className} action={action}>
      <ResponsiveContainer width='100%' height={height}>
        <LineChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
          {showGrid && <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='var(--border)' strokeOpacity={0.5} />}
          <XAxis
            dataKey={xAxisKey}
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
            tickLine={false}
            axisLine={false}
            interval='preserveStartEnd'
          />
          <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} tickLine={false} axisLine={false} tickFormatter={formatValue} width={60} />
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
            itemStyle={{ fontSize: '12px' }}
            formatter={(value, name) => {
              if (typeof value !== 'number') return ['-', name];
              const numValue = value;
              return [formatValue ? formatValue(numValue) : numValue, name];
            }}
          />
          {showLegend && (
            <Legend
              verticalAlign='top'
              height={28}
              iconType='circle'
              iconSize={8}
              formatter={(value) => <span className='text-xs text-muted-foreground ml-1'>{value}</span>}
            />
          )}
          {lines.map((line, index) => (
            <Line
              key={line.dataKey}
              type='monotone'
              dataKey={line.dataKey}
              name={line.name || line.dataKey}
              stroke={line.color || CHART_COLORS[index % CHART_COLORS.length]}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </AppChartContainer>
  );
}
