"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type FormEvent, type ReactNode, useEffect } from "react";
import {
  type FieldValues,
  FormProvider,
  type SubmitErrorHandler,
  type SubmitHandler,
  useForm,
  type UseFormProps,
} from "react-hook-form";
import { type z } from "zod";

type AppFormProps<T extends FieldValues> = {
  schema: z.ZodType<T>;
  onSubmit: SubmitHandler<T>;
  onInvalid?: SubmitErrorHandler<T>;
  onSubmitStart?: () => void;
  defaultValues?: UseFormProps<T>["defaultValues"];
  resetOnDefaultValuesChange?: boolean;
  children: ReactNode;
  className?: string;
  id?: string;
};

function AppForm<T extends FieldValues>({
  schema,
  onSubmit,
  onInvalid,
  onSubmitStart,
  defaultValues,
  resetOnDefaultValuesChange = false,
  children,
  className,
  id,
}: AppFormProps<T>) {
  const methods = useForm<T>({
    resolver: zodResolver(
      schema as unknown as Parameters<typeof zodResolver>[0],
    ) as unknown as UseFormProps<T>["resolver"],
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (!resetOnDefaultValuesChange) return;
    if (!defaultValues) return;
    if (typeof defaultValues === "function") return;
    methods.reset(defaultValues);
  }, [defaultValues, methods, resetOnDefaultValuesChange]);

  return (
    <FormProvider {...methods}>
      <form
        id={id}
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          onSubmitStart?.();
          void methods.handleSubmit(onSubmit, onInvalid)(event);
        }}
        className={className}
      >
        {children}
      </form>
    </FormProvider>
  );
}

export { AppForm, type AppFormProps };
