import { Info } from "lucide-react";
import { type ReactNode } from "react";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type AppFormLabelProps = {
  name?: string;
  label?: ReactNode;
  required?: boolean;
  className?: string;
  tooltip?: string;
  description?: string;
};

function AppFormLabel({
  name,
  label,
  required = false,
  className,
  tooltip,
  description,
}: AppFormLabelProps) {
  if (!label) return null;
  const tooltipText = tooltip ?? description;

  return (
    <TooltipProvider>
      <Label
        htmlFor={name}
        className={cn(
          "inline-flex items-center gap-1 text-sm font-medium",
          className,
        )}
      >
        <span>{label}</span>
        {tooltipText && (
          <Tooltip>
            <TooltipTrigger>
              <button
                type="button"
                className="inline-flex items-center text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                aria-label={tooltipText}
              >
                <Info className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-72 text-left">
              <p>{tooltipText}</p>
            </TooltipContent>
          </Tooltip>
        )}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </Label>
    </TooltipProvider>
  );
}

export { AppFormLabel, type AppFormLabelProps };
