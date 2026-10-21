import type { DateFormat } from "@/components/app-date-picker";
import { type FILTER_PERIOD_OPTION_ENUM } from "@/lib/enum/filter.enum";

/**
 * Custom date range type (from is optional unlike react-day-picker's DateRange)
 */
export type FilterDateRange = {
  from?: Date;
  to?: Date;
};

/**
 * Custom date range type (from is optional unlike react-day-picker's DateRange)
 */
export type FilterDateRangeWithPreset = {
  from?: Date;
  to?: Date;
  periodPreset?: FILTER_PERIOD_OPTION_ENUM;
};

/**
 * Supported filter field types
 */
export type FilterFieldType =
  | "text"
  | "select"
  | "multiSelect"
  | "date"
  | "dateRange"
  | "number"
  | "boolean"
  | "search"
  | "dateRangeWithPreset";

/**
 * Option for select/multiSelect fields
 */
export type FilterOption = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

/**
 * Filter value types based on field type
 */
export type FilterValue<T extends FilterFieldType = FilterFieldType> =
  T extends "text" | "number"
    ? string
    : T extends "select"
      ? string
      : T extends "multiSelect"
        ? string[]
        : T extends "date"
          ? Date
          : T extends "dateRange"
            ? FilterDateRange
            : T extends "boolean"
              ? boolean
              : T extends "dateRangeWithPreset"
                ? FilterDateRangeWithPreset
                : unknown;

/**
 * Filter field configuration
 */
export type FilterField = {
  /** Unique identifier for the field */
  name: string;
  /** Display label */
  label: string;
  /** Field type */
  type: FilterFieldType;
  /** Placeholder text */
  placeholder?: string;
  /** Options for select/multiSelect types */
  options?: FilterOption[];
  /** Date format for date/dateRange types */
  dateFormat?: DateFormat;
  /** Default value */
  defaultValue?: FilterValue;
  /** Whether the field is required */
  required?: boolean;
  /** Include this field in active tags. Defaults to true */
  includeInActiveTags?: boolean;
  /** Include this field in URL sync. Defaults to true */
  includeInUrlSync?: boolean;
  /** Custom render function for complex fields */
  render?: (props: {
    value: FilterValue | undefined;
    onChange: (value: FilterValue | undefined) => void;
  }) => React.ReactNode;
};

/**
 * Active filter state
 */
export type ActiveFilter = {
  name: string;
  value: FilterValue;
};

/**
 * Filter component props
 */
export type AppFilterProps = {
  /** Available filter fields - all will be displayed */
  fields: FilterField[];
  /** Current filter values */
  values: Record<string, FilterValue | undefined>;
  /** Callback when filter values change */
  onChange: (values: Record<string, FilterValue | undefined>) => void;
  /** Apply / search action in the filter toolbar (outside the collapsible body) */
  onSearch?: (values: Record<string, FilterValue | undefined>) => void;

  /** Full reset callback in the filter toolbar; when set, hides the duplicate clear-all control in the tag row */
  onReset?: () => void;

  /** Show clear all button */
  showClearAll?: boolean;
  /** Show active filter tags */
  showActiveTags?: boolean;
  /** Filter shell title */
  title?: string;
  /** Optional helper copy under the title */
  description?: string;
  /** Collapse filter body behind a trigger */
  collapsible?: boolean;
  /** Initial collapsed state when collapsible */
  defaultCollapsed?: boolean;
  /** Sync included filter fields to URL search params */
  urlSync?: {
    enabled?: boolean;
    prefix?: string;
  };
  /** Disabled state */
  disabled?: boolean;
  /** Additional class name */
  className?: string;
  /** Optional layout class for the filter field grid */
  fieldsClassName?: string;
};

/**
 * Filter bar props - for displaying active filters
 */
export type AppFilterBarProps = {
  fields: FilterField[];
  values: Record<string, FilterValue | undefined>;
  onRemove: (name: string) => void;
  onClearAll: () => void;
  className?: string;
};
