"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import React from "react";

export interface AppAccordionItem {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
}

export interface AppAccordionProps {
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  items: AppAccordionItem[];
  className?: string;
  itemClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
}

export function AppAccordion({
  type = "single",
  defaultValue,
  items,
  className,
  itemClassName,
  triggerClassName,
  contentClassName,
}: AppAccordionProps) {
  const accordionProps = {
    type,
    defaultValue,
    collapsible: type === "single" ? true : undefined,
    className: cn("w-full space-y-4", className),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;

  return (
    <Accordion {...accordionProps}>
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id} className={itemClassName}>
          <AccordionTrigger className={cn("cursor-pointer", triggerClassName)}>
            {item.title}
          </AccordionTrigger>
          <AccordionContent className={contentClassName}>
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
