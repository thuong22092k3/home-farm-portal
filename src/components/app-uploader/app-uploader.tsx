"use client";

import { AppIconButton } from "@/components/app-icon-button/app-icon-button";
import { cn } from "@/lib/utils";
import { Eye, Upload, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FilePreviewModal } from "./file-preview-modal";
import { FileTypeIcon, getFileTypeInfo, isPreviewable } from "./file-type-icon";

export interface UploadedFile extends File {
  id: string;
  preview?: string;
}

export interface AppUploaderProps {
  onFilesSelected: (files: UploadedFile[]) => void;
  value?: UploadedFile[];
  accept?: string;
  acceptErrorMessage?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  className?: string;
  disabled?: boolean;
  showPreview?: boolean;
  label?: string;
  description?: string;
  onChange?: (files: UploadedFile[]) => void;
  "aria-invalid"?: boolean | "true" | "false";
}

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD
 *
 *    0ms   drop zone visible, dashed border idle
 *  drag    zone scales 1.02, border goes primary, icon floats up
 *  drop    icon bounces back, file rows slide in staggered
 * remove   file row slides out right + fades
 * layout   remaining files reorder with layout animation
 * ───────────────────────────────────────────────────────── */

const SPRING = {
  type: "spring" as const,
  duration: 0.25,
  bounce: 0.1,
};

const SPRING_BOUNCY = {
  type: "spring" as const,
  duration: 0.3,
  bounce: 0.2,
};

function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "-";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isRemotePreloadedFile(file: UploadedFile): boolean {
  return (
    !(file instanceof File) &&
    "url" in (file as unknown as Record<string, unknown>)
  );
}

function generateFileId(file: File): string {
  return `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 9)}`;
}

function matchesAcceptedFile(file: File, accept?: string): boolean {
  if (!accept) return true;

  const fileName = file.name.toLowerCase();
  const fileType = file.type.toLowerCase();

  return accept.split(",").some((rule) => {
    const normalizedRule = rule.trim().toLowerCase();
    if (!normalizedRule) return false;
    if (normalizedRule.startsWith("."))
      return fileName.endsWith(normalizedRule);
    if (normalizedRule.endsWith("/*"))
      return fileType.startsWith(normalizedRule.slice(0, -1));
    return fileType === normalizedRule;
  });
}

function UploadIcon({
  isDragOver,
  hasError,
}: {
  isDragOver: boolean;
  hasError: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={
        shouldReduceMotion
          ? undefined
          : isDragOver
            ? { scale: 1.15, y: -4 }
            : { scale: 1, y: 0 }
      }
      transition={shouldReduceMotion ? { duration: 0 } : SPRING_BOUNCY}
    >
      <div
        className={cn(
          "mb-3 h-12 w-12 rounded-xl flex items-center justify-center transition-colors duration-200",
          isDragOver
            ? "bg-primary/20"
            : hasError
              ? "bg-destructive/10"
              : "bg-muted",
        )}
      >
        <Upload
          className={cn(
            "h-6 w-6 transition-colors duration-200",
            isDragOver
              ? "text-primary"
              : hasError
                ? "text-destructive"
                : "text-muted-foreground",
          )}
        />
      </div>
    </motion.div>
  );
}

function FileListItem({
  file,
  index,
  onRemove,
  onPreview,
  showPreview,
}: {
  file: UploadedFile;
  index: number;
  onRemove: (index: number) => void;
  onPreview: (file: UploadedFile) => void;
  showPreview: boolean;
}) {
  const { t } = useTranslation("common");
  const shouldReduceMotion = useReducedMotion();
  const safeFile = {
    ...file,
    name: file.name || t("app_uploader.file"),
    type: file.type || "",
  };
  const fileInfo = getFileTypeInfo(safeFile);
  const canPreview = isPreviewable(file);
  const fileSize = Number(file.size);
  const fileSizeLabel =
    isRemotePreloadedFile(file) &&
    (!Number.isFinite(fileSize) || fileSize === 0)
      ? "-"
      : formatFileSize(fileSize);

  return (
    <motion.li
      animate={
        shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0, scale: 1 }
      }
      className="group flex items-center gap-3 rounded-lg border bg-card px-3 py-2.5 hover:border-muted-foreground/20 transition-colors"
      exit={
        shouldReduceMotion
          ? { opacity: 0, transition: { duration: 0 } }
          : {
              opacity: 0,
              x: 24,
              scale: 0.95,
              transition: { duration: 0.15 },
            }
      }
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, x: -16, scale: 0.95 }
      }
      layout={!shouldReduceMotion}
      transition={shouldReduceMotion ? { duration: 0 } : SPRING}
    >
      {/* File type icon */}
      <FileTypeIcon file={file} size="md" showBackground />

      {/* File info */}
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-sm">{safeFile.name}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-muted-foreground">{fileSizeLabel}</span>
          <span className={cn("text-xs", fileInfo.color)}>
            {fileInfo.label}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {showPreview && canPreview && (
          <AppIconButton
            icon={<Eye className="h-4 w-4" />}
            tooltip={t("app_uploader.preview")}
            size="sm"
            variant="ghost"
            onClick={() => onPreview(file)}
          />
        )}
        <AppIconButton
          icon={<X className="h-4 w-4" />}
          tooltip={t("app_uploader.remove")}
          size="sm"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(index);
          }}
        />
      </div>
    </motion.li>
  );
}

export function AppUploader({
  onFilesSelected,
  value,
  accept,
  multiple = true,
  maxSize,
  maxFiles,
  className,
  disabled = false,
  showPreview = true,
  label,
  description,
  onChange,
  acceptErrorMessage,
  "aria-invalid": ariaInvalid,
}: AppUploaderProps) {
  const { t } = useTranslation("common");
  const shouldReduceMotion = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<UploadedFile | null>(null);
  const dragCounter = useRef(0);

  // Use controlled value or internal state
  const files = useMemo(() => (Array.isArray(value) ? value : []), [value]);

  const validateFiles = useCallback(
    (newFiles: File[]): UploadedFile[] => {
      setError(null);
      const unsupportedFiles = newFiles.filter(
        (file) => !matchesAcceptedFile(file, accept),
      );
      if (unsupportedFiles.length > 0) {
        if (acceptErrorMessage) setError(acceptErrorMessage);
        return [];
      }

      if (multiple && maxFiles && files.length + newFiles.length > maxFiles) {
        setError(t("app_uploader.max_files_error", { count: maxFiles }));
        return [];
      }

      // Check file size
      if (maxSize) {
        const oversized = newFiles.filter((f) => f.size > maxSize);
        if (oversized.length > 0) {
          setError(
            t("app_uploader.oversized_error", {
              count: oversized.length,
              size: formatFileSize(maxSize),
            }),
          );
          return newFiles
            .filter((f) => f.size <= maxSize)
            .map((f) =>
              Object.assign(f, { id: generateFileId(f) }),
            ) as UploadedFile[];
        }
      }

      return newFiles.map((f) =>
        Object.assign(f, { id: generateFileId(f) }),
      ) as UploadedFile[];
    },
    [accept, acceptErrorMessage, files, maxFiles, maxSize, multiple, t],
  );

  const handleFiles = useCallback(
    (newFiles: File[]) => {
      const validFiles = validateFiles(newFiles);
      if (validFiles.length === 0) return;

      // Create preview URLs for images
      const filesWithPreview = validFiles.map((f) => {
        if (f.type.startsWith("image/")) {
          return Object.assign(f, {
            preview: URL.createObjectURL(f),
          }) as UploadedFile;
        }
        return f;
      });

      const updated = multiple
        ? [...files, ...filesWithPreview]
        : filesWithPreview.slice(0, 1);
      onFilesSelected(updated);
      onChange?.(updated);
    },
    [files, multiple, onFilesSelected, validateFiles, onChange],
  );

  const removeFile = useCallback(
    (index: number) => {
      const fileToRemove = files[index];
      // Revoke preview URL if exists
      if (fileToRemove.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      const updated = files.filter((_, i) => i !== index);
      onFilesSelected(updated);
      onChange?.(updated);
    },
    [files, onFilesSelected, onChange],
  );

  const handleDragEnter = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (disabled) return;
      dragCounter.current += 1;
      setIsDragOver(true);
    },
    [disabled],
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) {
      setIsDragOver(false);
    }
  }, []);

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (disabled) return;
    },
    [disabled],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      dragCounter.current = 0;
      setIsDragOver(false);
      if (disabled) return;
      const droppedFiles = Array.from(e.dataTransfer.files);
      handleFiles(droppedFiles);
    },
    [disabled, handleFiles],
  );

  const handleClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === "Enter" || e.key === " ") && !disabled) {
      e.preventDefault();
      inputRef.current?.click();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files ? Array.from(e.target.files) : [];
    handleFiles(selected);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className={cn("w-full space-y-3", className)}>
      {/* Drop zone */}
      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : isDragOver
              ? { scale: 1.01 }
              : { scale: 1 }
        }
        aria-label={t("app_uploader.upload_area_label")}
        className={cn(
          "relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-8",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "transition-colors duration-200",
          ariaInvalid
            ? "border-destructive bg-destructive/5"
            : isDragOver
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-muted-foreground/40 hover:bg-muted/30",
          disabled && "pointer-events-none opacity-50",
        )}
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={disabled ? -1 : 0}
        transition={shouldReduceMotion ? { duration: 0 } : SPRING}
      >
        <input
          ref={inputRef}
          type="file"
          className="sr-only"
          disabled={disabled}
          multiple={multiple}
          accept={accept}
          onChange={handleInputChange}
        />

        <UploadIcon
          isDragOver={isDragOver}
          hasError={Boolean(ariaInvalid || error)}
        />

        <AnimatePresence initial={false} mode="wait">
          <motion.p
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            className="font-medium text-foreground text-sm"
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 4 }}
            key={isDragOver ? "drop" : "idle"}
            transition={
              shouldReduceMotion ? { duration: 0 } : { duration: 0.15 }
            }
          >
            {isDragOver
              ? t("app_uploader.drop_files_here")
              : (label ?? t("app_uploader.drag_drop_or_click"))}
          </motion.p>
        </AnimatePresence>
        <p className="mt-1.5 text-muted-foreground text-xs text-center">
          {description ?? (
            <>
              {accept
                ? accept.replace(/,/g, ", ")
                : t("app_uploader.any_file_type")}
              {maxSize &&
                ` • ${t("app_uploader.max_size", { size: formatFileSize(maxSize) })}`}
              {maxFiles &&
                ` • ${t("app_uploader.up_to_files", { count: maxFiles })}`}
            </>
          )}
        </p>
      </motion.div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            className="text-destructive text-sm"
            exit={
              shouldReduceMotion
                ? { opacity: 0, transition: { duration: 0 } }
                : { opacity: 0, y: -4 }
            }
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 4 }}
            role="alert"
            transition={shouldReduceMotion ? { duration: 0 } : SPRING}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* File list */}
      {files.length > 0 && (
        <ul aria-label={t("app_uploader.selected_files")} className="space-y-2">
          <AnimatePresence initial={false}>
            {files.map((file, index) => (
              <FileListItem
                key={file.id}
                file={file}
                index={index}
                onRemove={removeFile}
                onPreview={setPreviewFile}
                showPreview={showPreview}
              />
            ))}
          </AnimatePresence>
        </ul>
      )}

      {/* Preview modal */}
      <FilePreviewModal
        file={previewFile}
        open={!!previewFile}
        onClose={() => setPreviewFile(null)}
      />
    </div>
  );
}

export default AppUploader;
