import type { FilterDateRange } from "@/types/filter.type";

/** Sent when the user picks dates manually so UI can clear the active preset highlight */
export const FILTER_RESET_TOKEN = "__reset__";

export const DATE_RANGE_PRESET_VALUES = [
  "all",
  "today",
  "1_week",
  "1_month",
  "3_months",
  "6_months",
  "1_year",
] as const;
export type DateRangePresetValue = (typeof DATE_RANGE_PRESET_VALUES)[number];
export type DateRangePresetSelection =
  | DateRangePresetValue
  | typeof FILTER_RESET_TOKEN;

export function getDateRangePresetValue(value: unknown): DateRangePresetValue {
  if (
    typeof value === "string" &&
    DATE_RANGE_PRESET_VALUES.includes(value as DateRangePresetValue)
  ) {
    return value as DateRangePresetValue;
  }
  return "all";
}

export function buildPresetDateRange(
  preset: DateRangePresetValue,
): FilterDateRange | undefined {
  if (preset === "all") {
    return undefined;
  }

  const now = new Date();
  const from = new Date(now);

  if (preset === "today") {
    from.setHours(0, 0, 0, 0);
    return { from, to: now };
  }

  const dayMap: Record<
    Exclude<DateRangePresetValue, "all" | "today">,
    number
  > = {
    "1_week": 7,
    "1_month": 30,
    "3_months": 90,
    "6_months": 180,
    "1_year": 365,
  };

  from.setDate(now.getDate() - dayMap[preset]);
  return { from, to: now };
}
