"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import * as React from "react";
import { useTranslation } from "react-i18next";

type Data = {
  value: string;
  label: string;
};

type AppInfiniteScrollSelectProps = {
  data: Data[];
  value?: string;
  onChange?: (value: string) => void;
  loading?: boolean;
  onBottomReached?: () => void;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  error?: boolean | string;
  className?: string;
  searchable?: boolean;
  /** Controlled keyword. When provided, filtering is delegated to the parent (server side) */
  searchValue?: string;
  onSearchChange?: (value: string) => void;
};

export function AppInfiniteScrollSelect({
  data = [],
  value,
  onChange,
  loading = false,
  onBottomReached,
  placeholder = "Select item...",
  searchPlaceholder = "Search...",
  disabled = false,
  error,
  className,
  searchable = true,
  searchValue,
  onSearchChange,
}: AppInfiniteScrollSelectProps) {
  const { t: tCommon } = useTranslation("common");
  const [open, setOpen] = React.useState(false);

  // A controlled keyword means the parent (API) already returns the filtered data
  const isSearchControlled = searchValue !== undefined;

  const handleListScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!onBottomReached || loading) return;
    const el = e.currentTarget;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 32) {
      onBottomReached();
    }
  };

  const selectedLabel = React.useMemo(
    () => data.find((item) => item.value === value)?.label,
    [data, value],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "w-full justify-between font-normal h-10 p-2",
            !value && "text-muted-foreground",
            error && "border-destructive",
            className,
          )}
        >
          <div className="flex w-full items-center justify-between gap-2">
            <span className="min-w-0 flex-1 truncate text-left">
              {selectedLabel || placeholder}
            </span>
            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-[--radix-popover-trigger-width] p-0"
        align="start"
      >
        <Command shouldFilter={searchable && !isSearchControlled}>
          {searchable && (
            <CommandInput
              placeholder={searchPlaceholder}
              {...(isSearchControlled
                ? { value: searchValue, onValueChange: onSearchChange }
                : {})}
            />
          )}

          <CommandList
            className="max-h-50 overflow-y-auto overflow-x-hidden"
            onScroll={handleListScroll}
          >
            <CommandEmpty>
              {loading ? (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              ) : (
                tCommon("label.no_data")
              )}
            </CommandEmpty>

            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  keywords={[item.label]}
                  onSelect={() => {
                    onChange?.(item.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>

            <div className="h-8 flex items-center justify-center">
              {loading && data.length > 0 && (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              )}
            </div>
          </CommandList>
        </Command>
      </PopoverContent>
      {typeof error === "string" && (
        <p className="text-[0.8rem] font-medium text-destructive mt-1">
          {error}
        </p>
      )}
    </Popover>
  );
}
