"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import type { Transition } from "motion/react";

const SPRING: Transition = { type: "spring", duration: 0.25, bounce: 0.1 };

type AppFormMessageProps = {
  message?: string;
  variant?: "error" | "success" | "info";
  className?: string;
};

function AppFormMessage({
  message,
  variant = "error",
  className,
}: AppFormMessageProps) {
  const shouldReduceMotion = useReducedMotion();

  const variantStyles = {
    error: "text-destructive",
    success: "text-status-success",
    info: "text-muted-foreground",
  };

  return (
    <AnimatePresence mode="wait">
      {message && (
        <motion.p
          role="alert"
          aria-live="polite"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={shouldReduceMotion ? { duration: 0 } : SPRING}
          className={cn("text-xs", variantStyles[variant], className)}
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export { AppFormMessage, type AppFormMessageProps };
