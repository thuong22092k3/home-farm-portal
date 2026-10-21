"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { CalendarIcon, X } from "lucide-react";
import * as React from "react";
import { useTranslation } from "react-i18next";

dayjs.extend(customParseFormat);

type DateFormat =
  | "YYYY-MM-DD"
  | "YYYY.MM.DD"
  | "YY-MM-DD"
  | "YYYY-MM-DD HH:mm"
  | "YYYY-MM-DD HH:mm:ss";

type AppDatePickerProps = {
  value?: Date | null;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  format?: DateFormat;
  disabled?: boolean;
  className?: string;
  showClear?: boolean;
};

function AppDatePicker({
  value,
  onChange,
  placeholder,
  format: formatType = "YYYY-MM-DD",
  disabled,
  className,
  showClear = true,
}: AppDatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const { t: tCommon } = useTranslation("common");

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      onChange?.(date);
    }
    setOpen(false);
  };

  const handleClear = (
    e: React.MouseEvent<HTMLElement> | React.PointerEvent<HTMLElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    onChange?.(undefined);
  };

  const displayValue = value
    ? dayjs(value).format(formatType)
    : (placeholder ?? tCommon("action.select"));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          variant="outline"
          data-slot="date-picker-trigger"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="flex-1">{displayValue}</span>
          {showClear && value && (
            <span
              role="button"
              tabIndex={0}
              aria-label="Clear date"
              className="ml-auto inline-flex h-5 w-5 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground pointer-events-auto"
              onPointerDown={handleClear}
              onClick={handleClear}
            >
              <X className="h-4 w-4 pointer-events-none" />
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value ?? undefined}
          onSelect={handleSelect}
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
}

export { AppDatePicker, type AppDatePickerProps, type DateFormat };
