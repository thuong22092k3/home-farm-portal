"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppChartContainer } from "./app-chart-container";

type BarChartItem = {
  name: string;
  value: number;
  [key: string]: string | number;
};

type AppBarChartProps = {
  data: BarChartItem[];
  title?: string;
  description?: string;
  dataKey?: string;
  xAxisKey?: string;
  color?: string;
  height?: number;
  showGrid?: boolean;
  className?: string;
  action?: React.ReactNode;
  formatValue?: (value: number) => string;
  startAtZero?: boolean;
};

// Chart colors using CSS variables from globals.css
// Maps semantic names to CSS chart variables for consistency with design system
const CHART_COLORS: Record<string, string> = {
  primary: "var(--chart-1)", // Blue
  success: "var(--status-success)",
  warning: "var(--status-warning)",
  danger: "var(--status-error)",
  info: "var(--status-info)",
  violet: "var(--chart-4)", // Purple
  chart1: "var(--chart-1)", // Blue
  chart2: "var(--chart-2)", // Teal
  chart3: "var(--chart-3)", // Orange
  chart4: "var(--chart-4)", // Purple
  chart5: "var(--chart-5)", // Pink
};

export function AppBarChart({
  data,
  title,
  description,
  dataKey = "value",
  xAxisKey = "name",
  color = "primary",
  height = 280,
  showGrid = true,
  className,
  action,
  formatValue,
  startAtZero = false,
}: AppBarChartProps) {
  const chartColor =
    CHART_COLORS[color as keyof typeof CHART_COLORS] || CHART_COLORS.primary;

  return (
    <AppChartContainer
      title={title}
      description={description}
      className={className}
      action={action}
    >
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--border)"
              strokeOpacity={0.5}
            />
          )}
          <XAxis
            dataKey={xAxisKey}
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatValue}
            width={60}
            domain={startAtZero ? [0, "auto"] : undefined}
          />
          <Tooltip
            cursor={{ fill: "var(--muted)", fillOpacity: 0.3 }}
            contentStyle={{
              backgroundColor: "var(--popover)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              padding: "8px 12px",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              opacity: 1,
            }}
            labelStyle={{
              color: "var(--foreground)",
              fontWeight: 600,
              marginBottom: "4px",
              fontSize: "12px",
            }}
            itemStyle={{ color: "var(--muted-foreground)", fontSize: "12px" }}
            formatter={(value) => {
              const numValue = typeof value === "number" ? value : 0;
              return [formatValue ? formatValue(numValue) : numValue, ""];
            }}
          />
          <Bar
            dataKey={dataKey}
            fill={chartColor}
            radius={[4, 4, 0, 0]}
            maxBarSize={48}
          />
        </BarChart>
      </ResponsiveContainer>
    </AppChartContainer>
  );
}
