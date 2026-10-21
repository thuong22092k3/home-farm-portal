"use client";

import { cn } from "@/lib/utils";
import * as Progress from "@radix-ui/react-progress";
import { Check } from "lucide-react";

type StepperProps = {
  steps: string[];
  currentStep: number;
};

export function AppStepper({ steps, currentStep }: StepperProps) {
  const progressValue =
    steps.length > 1 ? (currentStep / (steps.length - 1)) * 100 : 0;

  return (
    <div className="relative w-full py-8">
      <div className="absolute top-[3.25rem] left-[20px] right-[20px] h-[2px] bg-muted">
        <Progress.Root
          className="relative h-full w-full overflow-hidden"
          value={progressValue}
        >
          <Progress.Indicator
            className="h-full w-full bg-primary transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${100 - progressValue}%)` }}
          />
        </Progress.Root>
      </div>

      {/* Steps Nodes */}
      <div className="relative flex justify-between w-full">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <div
              key={index}
              className="flex flex-col items-center group relative"
            >
              <div
                className={cn(
                  "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 shadow-sm",
                  isCompleted
                    ? "bg-primary border-primary text-primary-foreground"
                    : isActive
                      ? "bg-background border-primary text-primary ring-4 ring-primary/10"
                      : "bg-background border-muted text-muted-foreground",
                )}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5 stroke-[3px]" />
                ) : (
                  <span className="text-sm font-bold">{index + 1}</span>
                )}
              </div>

              <div className="absolute top-12 w-max flex flex-col items-center">
                <span
                  className={cn(
                    "mt-2 text-[11px] font-bold tracking-tight text-center transition-colors duration-300 max-w-[80px] line-clamp-2",
                    isActive || isCompleted
                      ? "text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {step}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="h-10" />
    </div>
  );
}
