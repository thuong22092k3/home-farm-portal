"use client";

import { AppButton } from "@/components/app-button";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  buildPresetDateRange,
  FILTER_RESET_TOKEN,
  type DateRangePresetValue,
} from "@/lib/helpers/date-range-preset.helper";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { ArrowRight, CalendarIcon, X } from "lucide-react";
import * as React from "react";
import { type DateRange } from "react-day-picker";
import { useTranslation } from "react-i18next";
import type { DateFormat } from "./app-date-picker";

type DateRangeValue = {
  from?: Date;
  to?: Date;
};

export type DateRangePresetOption = {
  label: string;
  value: DateRangePresetValue;
};

type AppDateRangePickerProps = {
  id?: string;
  value?: DateRangeValue;
  onChange?: (range: DateRangeValue | undefined) => void;
  placeholder?: { start?: string; end?: string };
  format?: DateFormat;
  disabled?: boolean;
  className?: string;
  showClear?: boolean;
  /** When non-empty, shows quick preset buttons above the range trigger */
  presetOptions?: DateRangePresetOption[];
  /** Current preset key; use `FILTER_RESET_TOKEN` from `@/lib/helpers/date-range-preset.helper` after manual calendar edits */
  selectedPreset?: string;
  onPresetChange?: (preset: string) => void;
  /** Class for the preset button row */
  presetClassName?: string;
};

function AppDateRangePicker({
  id,
  value,
  onChange,
  placeholder,
  format: formatType = "YYYY-MM-DD",
  disabled,
  className,
  showClear = true,
  presetOptions,
  selectedPreset = "all",
  onPresetChange,
  presetClassName,
}: AppDateRangePickerProps) {
  const [open, setOpen] = React.useState(false);
  const hasPresets = Boolean(presetOptions?.length && onPresetChange);
  const { t: tCommon } = useTranslation("common");

  const notifyManualRange = React.useCallback(() => {
    if (hasPresets) onPresetChange?.(FILTER_RESET_TOKEN);
  }, [hasPresets, onPresetChange]);

  const handleSelect = (range: DateRange | undefined) => {
    notifyManualRange();
    if (!range) {
      onChange?.(undefined);
    } else {
      onChange?.({
        from: range.from,
        to: range.to,
      });
    }
  };

  const handleClear = (
    e: React.MouseEvent<HTMLElement> | React.PointerEvent<HTMLElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
    if (hasPresets) onPresetChange?.("all");
    onChange?.(undefined);
  };

  const startDisplay = value?.from
    ? dayjs(value.from).format(formatType)
    : placeholder?.start && tCommon("label.start_date");
  const endDisplay = value?.to
    ? dayjs(value.to).format(formatType)
    : placeholder?.end && tCommon("label.start_date");
  const hasValue = value?.from || value?.to;

  const calendarValue: DateRange | undefined = React.useMemo(
    () => (value?.from ? { from: value.from, to: value.to } : undefined),
    [value],
  );

  const presetButtons = React.useMemo(() => {
    if (!hasPresets) return null;
    return (
      <div className={cn("flex flex-wrap gap-2 border-b p-3", presetClassName)}>
        {presetOptions!.map((option) => (
          <AppButton
            key={option.value}
            type="button"
            size="sm"
            variant={selectedPreset === option.value ? "primary" : "outline"}
            onClick={() => {
              setOpen(false);
              onPresetChange?.(option.value);
              const next = buildPresetDateRange(option.value);
              onChange?.(next?.from || next?.to ? next : undefined);
            }}
          >
            {option.label}
          </AppButton>
        ))}
      </div>
    );
  }, [
    hasPresets,
    presetOptions,
    presetClassName,
    selectedPreset,
    onPresetChange,
    onChange,
  ]);

  const picker = (
    <div className="relative w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <Button
            variant="outline"
            id={id}
            data-slot="date-range-picker-trigger"
            disabled={disabled}
            className={cn(
              "w-full min-w-0 justify-start overflow-hidden text-left font-normal",
              showClear && hasValue && "pr-8",
              !hasValue && "text-muted-foreground",
              className,
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
            <span
              className={cn(
                "min-w-0 truncate",
                !value?.from && "text-muted-foreground",
              )}
            >
              {startDisplay}
            </span>
            <ArrowRight className="mx-2 h-4 w-4 text-muted-foreground" />
            <span
              className={cn(
                "min-w-0 truncate",
                !value?.to && "text-muted-foreground",
              )}
            >
              {endDisplay}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {presetButtons}
          <Calendar
            mode="range"
            selected={calendarValue}
            onSelect={handleSelect}
            numberOfMonths={2}
            showOutsideDays={false}
          />
        </PopoverContent>
      </Popover>

      {showClear && hasValue && !disabled && (
        <button
          type="button"
          aria-label="Clear date range"
          className="absolute right-2 top-1/2 z-10 inline-flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground"
          onMouseDown={handleClear}
          onPointerDown={handleClear}
          onClick={handleClear}
        >
          <X className="h-4 w-4 pointer-events-none" />
        </button>
      )}
    </div>
  );

  return picker;
}

export {
  AppDateRangePicker,
  type AppDateRangePickerProps,
  type DateRangeValue,
};
