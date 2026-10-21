"use client";

import { AppIconButton } from "@/components/app-icon-button/app-icon-button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Download, Loader2, RotateCw, ZoomIn, ZoomOut } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getFileTypeInfo,
  isImage,
  isPdf,
  type FileLike,
} from "./file-type-icon";

export type PreviewFileSource =
  | (FileLike & { url?: string; preview?: string })
  | File;

type FilePreviewModalProps = {
  file: PreviewFileSource | null;
  open: boolean;
  onClose: () => void;
};

const getPreviewFileName = (file: PreviewFileSource) => file.name;

const getPreviewFileUrl = (file: PreviewFileSource) => {
  if (file instanceof File) return URL.createObjectURL(file);
  return file.url ?? file.preview ?? "";
};

const revokePreviewFileUrl = (file: PreviewFileSource, url: string) => {
  if (file instanceof File) {
    URL.revokeObjectURL(url);
  }
};

function FilePreviewHeader({ file }: { file: PreviewFileSource }) {
  const fileInfo = getFileTypeInfo(file);

  return (
    <div className="flex items-center gap-3">
      <div className={cn("rounded-lg p-2", fileInfo.bgColor)}>
        <fileInfo.icon className={cn("h-5 w-5", fileInfo.color)} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-sm">
          {getPreviewFileName(file)}
        </p>
        <p className="text-xs text-muted-foreground">{fileInfo.label}</p>
      </div>
    </div>
  );
}

// Blob URL is initialized once via lazy useState so the effect only ever
// runs cleanup — no synchronous setState inside the effect body.
// The parent mounts a fresh instance via `key` when the file changes.
function ImagePreview({
  file,
  zoom,
  rotation,
}: {
  file: PreviewFileSource;
  zoom: number;
  rotation: number;
}) {
  const { t } = useTranslation("common");
  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [viewportSize, setViewportSize] = useState(() => ({
    width: typeof window === "undefined" ? 1280 : window.innerWidth,
    height: typeof window === "undefined" ? 720 : window.innerHeight,
  }));
  const dragStartRef = useRef<{
    x: number;
    y: number;
    panX: number;
    panY: number;
  } | null>(null);
  const [objectUrl] = useState<string>(() => getPreviewFileUrl(file));

  // Cleanup-only effect: revoke the URL when the component unmounts.
  useEffect(() => {
    return () => revokePreviewFileUrl(file, objectUrl);
  }, [file, objectUrl]);

  // Load image dimensions. setState is called only inside async callbacks,
  // never synchronously in the effect body.
  useEffect(() => {
    const img = new Image();
    let mounted = true;

    img.onload = () => {
      if (mounted) {
        setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
        setIsLoading(false);
      }
    };
    img.onerror = () => {
      if (mounted) {
        setHasError(true);
        setIsLoading(false);
      }
    };
    img.src = objectUrl;

    return () => {
      mounted = false;
    };
  }, [objectUrl]);

  useEffect(() => {
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxPreviewWidth = Math.max(viewportSize.width - 96, 320);
  const maxPreviewHeight = Math.max(viewportSize.height - 220, 240);

  const baseImageSize = (() => {
    if (!imageSize) return { width: 400, height: 300 };

    const widthScale = maxPreviewWidth / imageSize.width;
    const heightScale = maxPreviewHeight / imageSize.height;
    const fitScale = Math.min(widthScale, heightScale, 1);

    return {
      width: Math.round(imageSize.width * fitScale),
      height: Math.round(imageSize.height * fitScale),
    };
  })();

  const previewFrameSize = {
    width: Math.min(
      Math.max(baseImageSize.width + 32, 320),
      Math.max(viewportSize.width - 64, 320),
    ),
    height: Math.min(
      Math.max(baseImageSize.height + 32, 240),
      Math.max(viewportSize.height - 200, 240),
    ),
  };

  const normalizedRotation = ((rotation % 360) + 360) % 360;
  const scaledWidth = baseImageSize.width * zoom;
  const scaledHeight = baseImageSize.height * zoom;
  const rotatedWidth =
    normalizedRotation % 180 === 0 ? scaledWidth : scaledHeight;
  const rotatedHeight =
    normalizedRotation % 180 === 0 ? scaledHeight : scaledWidth;
  const maxPanX = Math.max(0, (rotatedWidth - previewFrameSize.width) / 2);
  const maxPanY = Math.max(0, (rotatedHeight - previewFrameSize.height) / 2);

  const clampPan = useCallback(
    (value: { x: number; y: number }) => ({
      x: Math.min(Math.max(value.x, -maxPanX), maxPanX),
      y: Math.min(Math.max(value.y, -maxPanY), maxPanY),
    }),
    [maxPanX, maxPanY],
  );

  const canDragToPan = zoom > 1;
  const effectivePan = canDragToPan ? clampPan(pan) : { x: 0, y: 0 };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!canDragToPan) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStartRef.current = {
      x: event.clientX,
      y: event.clientY,
      panX: effectivePan.x,
      panY: effectivePan.y,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current || !canDragToPan) return;
    const deltaX = event.clientX - dragStartRef.current.x;
    const deltaY = event.clientY - dragStartRef.current.y;
    setPan(
      clampPan({
        x: dragStartRef.current.panX + deltaX,
        y: dragStartRef.current.panY + deltaY,
      }),
    );
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current) return;
    dragStartRef.current = null;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  if (hasError) {
    return (
      <div className="flex h-[200px] w-[300px] items-center justify-center rounded-lg bg-muted/30">
        <p className="text-muted-foreground text-sm">
          {t("file_preview.failed_to_load_image")}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-[300px] w-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-lg bg-muted/30 p-4",
        canDragToPan
          ? isDragging
            ? "cursor-grabbing"
            : "cursor-grab"
          : "cursor-default",
      )}
      style={{
        width: previewFrameSize.width,
        height: previewFrameSize.height,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
    >
      <div
        className="relative touch-none select-none"
        style={{
          width: baseImageSize.width,
          height: baseImageSize.height,
          transform: `translate(${effectivePan.x}px, ${effectivePan.y}px)`,
          transformOrigin: "center center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={t("file_preview.image_alt")}
          className="pointer-events-none h-full w-full select-none transition-transform duration-200"
          src={objectUrl}
          draggable={false}
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg)`,
            transformOrigin: "center center",
          }}
        />
      </div>
    </div>
  );
}

function PdfPreview({ file }: { file: PreviewFileSource }) {
  const { t } = useTranslation("common");
  const [objectUrl] = useState<string>(() => getPreviewFileUrl(file));
  const [hasError, setHasError] = useState(false);

  // Cleanup-only effect: revoke the URL when the component unmounts.
  useEffect(() => {
    return () => revokePreviewFileUrl(file, objectUrl);
  }, [file, objectUrl]);

  if (hasError) {
    return (
      <div className="flex h-[400px] w-[600px] flex-col items-center justify-center gap-4 rounded-lg bg-muted/30 p-8">
        <div className="text-center">
          <p className="text-muted-foreground">
            {t("file_preview.pdf_unavailable")}
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            {t("file_preview.download_to_view")}
          </p>
        </div>
        <a
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          download={getPreviewFileName(file)}
          href={objectUrl}
        >
          <Download className="h-4 w-4" />
          {t("file_preview.download_pdf")}
        </a>
      </div>
    );
  }

  return (
    <div className="h-[min(80vh,600px)] w-[min(92vw,900px)] max-w-full overflow-hidden rounded-lg border bg-muted/30">
      <iframe
        className="h-full w-full"
        title={getPreviewFileName(file)}
        src={objectUrl}
        onError={() => setHasError(true)}
      />
    </div>
  );
}

function UnsupportedPreview({ file }: { file: PreviewFileSource }) {
  const { t } = useTranslation("common");
  const fileInfo = getFileTypeInfo(file);
  const [downloadUrl] = useState<string>(() => getPreviewFileUrl(file));

  // Cleanup-only effect: revoke the URL when the component unmounts.
  useEffect(() => {
    return () => revokePreviewFileUrl(file, downloadUrl);
  }, [downloadUrl, file]);

  return (
    <div className="flex h-[300px] w-[min(92vw,500px)] max-w-full flex-col items-center justify-center gap-4 rounded-lg bg-muted/30 p-8">
      <div className={cn("rounded-xl p-4", fileInfo.bgColor)}>
        <fileInfo.icon className={cn("h-12 w-12", fileInfo.color)} />
      </div>
      <div className="text-center">
        <p className="font-medium">{t("file_preview.preview_unavailable")}</p>
        <p className="text-muted-foreground text-sm mt-1">
          {t("file_preview.unsupported_file", { type: fileInfo.label })}
        </p>
      </div>
      <a
        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        download={getPreviewFileName(file)}
        href={downloadUrl}
      >
        <Download className="h-4 w-4" />
        {t("file_preview.download_file")}
      </a>
    </div>
  );
}

export function FilePreviewModal({
  file,
  open,
  onClose,
}: FilePreviewModalProps) {
  const { t } = useTranslation("common");
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [prevFileName, setPrevFileName] = useState<string | null>(null);

  // Reset zoom/rotation when a different file is selected (React derived-state pattern)
  if (file && getPreviewFileName(file) !== prevFileName) {
    setPrevFileName(getPreviewFileName(file));
    setZoom(1);
    setRotation(0);
  }

  const handleZoomIn = useCallback(
    () => setZoom((z) => Math.min(z + 0.25, 3)),
    [],
  );
  const handleZoomOut = useCallback(
    () => setZoom((z) => Math.max(z - 0.25, 0.5)),
    [],
  );
  const handleRotate = useCallback(
    () => setRotation((r) => (r + 90) % 360),
    [],
  );

  if (!file) return null;

  const canPreview = isImage(file) || isPdf(file);
  const showImageControls = isImage(file);

  // `key={file.name}` remounts the preview component when the file changes,
  // which triggers the useState lazy initializer to create a fresh blob URL.
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "w-auto max-w-[95vw] sm:max-w-[95vw] max-h-[95vh]",
          "overflow-hidden flex flex-col",
          "p-4",
        )}
      >
        <DialogHeader className="flex-shrink-0 pb-3">
          <div className="flex items-center justify-between gap-4">
            <DialogTitle className="sr-only">
              {t("file_preview.preview_title", {
                name: getPreviewFileName(file),
              })}
            </DialogTitle>
            <FilePreviewHeader file={file} />
            <div className="flex items-center gap-2">
              {canPreview && (
                <a
                  className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
                  download={getPreviewFileName(file)}
                  href={getPreviewFileUrl(file)}
                >
                  <Download className="h-3.5 w-3.5" />
                  {t("file_preview.download")}
                </a>
              )}
              <DialogClose
                className="inline-flex items-center gap-1.5 rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium hover:bg-accent hover:text-accent-foreground"
                onClick={onClose}
              >
                {t("file_preview.close")}
              </DialogClose>
            </div>
          </div>
        </DialogHeader>

        {/* Image controls */}
        {showImageControls && (
          <div className="flex items-center justify-center gap-2 flex-shrink-0 py-2 border-y -mx-4 px-4 mb-2">
            <AppIconButton
              icon={<ZoomOut className="h-4 w-4" />}
              tooltip={t("file_preview.zoom_out")}
              size="sm"
              variant="outline"
              onClick={handleZoomOut}
              disabled={zoom <= 0.5}
            />
            <span className="text-sm font-medium min-w-[60px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <AppIconButton
              icon={<ZoomIn className="h-4 w-4" />}
              tooltip={t("file_preview.zoom_in")}
              size="sm"
              variant="outline"
              onClick={handleZoomIn}
              disabled={zoom >= 3}
            />
            <div className="w-px h-4 bg-border mx-2" />
            <AppIconButton
              icon={<RotateCw className="h-4 w-4" />}
              tooltip={t("file_preview.rotate")}
              size="sm"
              variant="outline"
              onClick={handleRotate}
            />
            <AppIconButton
              icon={
                <span className="text-xs font-medium">
                  {t("file_preview.reset")}
                </span>
              }
              tooltip={t("file_preview.reset_view")}
              size="sm"
              variant="ghost"
              onClick={() => {
                setZoom(1);
                setRotation(0);
              }}
              disabled={zoom === 1 && rotation === 0}
            />
          </div>
        )}

        {/* Preview content */}
        <div className="flex flex-1 justify-center overflow-auto">
          {isImage(file) && (
            <ImagePreview
              key={getPreviewFileName(file)}
              file={file}
              zoom={zoom}
              rotation={rotation}
            />
          )}
          {isPdf(file) && (
            <PdfPreview key={getPreviewFileName(file)} file={file} />
          )}
          {!canPreview && (
            <UnsupportedPreview key={getPreviewFileName(file)} file={file} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
