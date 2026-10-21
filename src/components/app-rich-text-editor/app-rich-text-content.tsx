"use client";

import { sanitizeRichTextHtml } from "@/lib/helpers/html.helper";
import { cn } from "@/lib/utils";

type AppRichTextContentProps = {
  html?: string;
  fallback?: string;
  className?: string;
};

export function AppRichTextContent({
  html,
  fallback,
  className,
}: AppRichTextContentProps) {
  if (!html?.trim()) {
    return (
      <p className={cn("italic text-sm text-muted-foreground", className)}>
        {fallback}
      </p>
    );
  }

  const normalizedHtml = html.replace(/\\"/g, '"').replace(/\\\\/g, "\\");

  return (
    <div
      className={cn(
        `
        text-sm leading-relaxed text-foreground/80

        [&_a]:text-primary
        [&_a]:underline

        [&_blockquote]:border-l-4
        [&_blockquote]:pl-4
        [&_blockquote]:italic
        [&_blockquote]:text-muted-foreground

        [&_h2]:text-xl
        [&_h2]:font-bold

        [&_h3]:text-lg
        [&_h3]:font-semibold

        [&_h4]:text-base
        [&_h4]:font-semibold

        [&_ol]:list-decimal
        [&_ol]:pl-5

        [&_ul]:list-disc
        [&_ul]:pl-5

        [&_table]:my-3
        [&_table]:w-full
        [&_table]:border-collapse

        [&_th]:border
        [&_th]:bg-muted/50
        [&_th]:px-3
        [&_th]:py-2
        [&_th]:text-left
        [&_th]:font-semibold

        [&_td]:border
        [&_td]:px-3
        [&_td]:py-2
        [&_td]:align-top
        [&_td:first-child]:bg-muted/25
        [&_td:first-child]:font-medium

        [&_img]:block
        [&_img]:w-full
        [&_img]:max-w-full
        [&_img]:h-auto
        [&_img]:rounded-md
        [&_img]:border
        [&_img]:my-3
        `,
        className,
      )}
      dangerouslySetInnerHTML={{
        __html: sanitizeRichTextHtml(normalizedHtml),
      }}
    />
  );
}
