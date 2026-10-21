"use client";

import { cn } from "@/lib/utils";
import { type ReactElement, type ReactNode, cloneElement } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AppFormLabel } from "./app-form-label";
import { AppFormMessage } from "./app-form-message";

function normalizeFormMessage(message?: string) {
  if (!message) return "";

  const messageMap: Record<string, string> = {
    Required: "required.default",
    "Invalid email": "required.invalid_email",
    "Invalid email address": "required.invalid_email",
    "Array must contain at least 1 element(s)": "required.min_one_item",
    "String must contain at least 1 character(s)": "required.default",
  };

  return messageMap[message] ?? message;
}

type AppFormFieldProps = {
  name: string;
  label?: ReactNode;
  required?: boolean;
  helperText?: string;
  tooltip?: string;
  description?: string;
  children: ReactElement;
  className?: string;
  hideLabel?: boolean;
};

function AppFormField({
  name,
  label,
  required,
  helperText,
  tooltip,
  description,
  children,
  className,
  hideLabel = false,
}: AppFormFieldProps) {
  const { control } = useFormContext();
  const { t: tForm } = useTranslation("form");

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const messageKey = normalizeFormMessage(error?.message);
        const translatedMessage = messageKey
          ? String(tForm(messageKey as unknown as Parameters<typeof tForm>[0]))
          : "";

        return (
          <div className={cn("space-y-1.5", className)}>
            {!hideLabel && (
              <AppFormLabel
                name={name}
                label={label}
                required={required}
                tooltip={tooltip}
                description={description}
              />
            )}
            {cloneElement(children as ReactElement<Record<string, unknown>>, {
              ...field,
              value: field.value ?? "",
              id: name,
              "aria-invalid": error ? "true" : undefined,
            })}
            <AppFormMessage
              message={translatedMessage || helperText}
              variant={error ? "error" : "info"}
            />
          </div>
        );
      }}
    />
  );
}

export { AppFormField, type AppFormFieldProps };
