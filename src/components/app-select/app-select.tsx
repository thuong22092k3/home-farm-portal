"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { SelectOption } from "@/types/common.type";
import * as React from "react";
import { useTranslation } from "react-i18next";

type AppSelectProps = {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  onClick?: (e: React.MouseEvent) => void;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  clearLabel?: string;
  className?: string;
};

const CLEAR_VALUE = "__app_select_clear__";

function AppSelect({
  options,
  value,
  onChange,
  onClick,
  placeholder,
  disabled,
  clearable = true,
  clearLabel,
  className,
}: AppSelectProps) {
  const { t: tCommon } = useTranslation("common");

  const handleValueChange = (val: string | null) => {
    if (!onChange) return;
    if (!val || val === CLEAR_VALUE) {
      onChange("");
      return;
    }
    onChange(val);
  };

  const controlledValue = value ?? "";

  return (
    <Select
      value={controlledValue}
      onValueChange={handleValueChange}
      disabled={disabled}
    >
      <SelectTrigger
        className={cn("w-full cursor-pointer", className)}
        onClick={onClick}
      >
        <SelectValue placeholder={placeholder ?? tCommon("action.select")} />
      </SelectTrigger>
      <SelectContent>
        {clearable && controlledValue && (
          <SelectItem value={CLEAR_VALUE}>
            {clearLabel ?? tCommon("label.clear_selection")}
          </SelectItem>
        )}
        {options.map((opt) => (
          <SelectItem
            key={opt.value}
            value={opt.value}
            className="cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              {opt.icon && <span className="flex-shrink-0">{opt.icon}</span>}
              <span>{opt.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export { AppSelect, type AppSelectProps };
