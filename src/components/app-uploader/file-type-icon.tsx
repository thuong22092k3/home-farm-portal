import { cn } from "@/lib/utils";
import {
  FileText,
  Image,
  FileVideo,
  Music,
  FileArchive,
  FileCode,
  FileSpreadsheet,
  File,
  FileType,
  Presentation,
} from "lucide-react";

type FileTypeInfo = {
  icon: typeof File;
  color: string;
  bgColor: string;
  label: string;
};

const FILE_TYPE_CONFIG: Record<string, FileTypeInfo> = {
  // Images
  "image/jpeg": {
    icon: Image,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    label: "JPEG Image",
  },
  "image/png": {
    icon: Image,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    label: "PNG Image",
  },
  "image/gif": {
    icon: Image,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    label: "GIF Image",
  },
  "image/webp": {
    icon: Image,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    label: "WebP Image",
  },
  "image/svg+xml": {
    icon: Image,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    label: "SVG Image",
  },

  // PDF
  "application/pdf": {
    icon: FileText,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    label: "PDF Document",
  },

  // Documents
  "application/msword": {
    icon: FileType,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    label: "Word Document",
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    icon: FileType,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    label: "Word Document",
  },

  // Spreadsheets
  "application/vnd.ms-excel": {
    icon: FileSpreadsheet,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    label: "Excel Spreadsheet",
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
    icon: FileSpreadsheet,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    label: "Excel Spreadsheet",
  },

  // Presentations
  "application/vnd.ms-powerpoint": {
    icon: Presentation,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    label: "PowerPoint",
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
    icon: Presentation,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    label: "PowerPoint",
  },

  // Video
  "video/mp4": {
    icon: FileVideo,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    label: "MP4 Video",
  },
  "video/webm": {
    icon: FileVideo,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    label: "WebM Video",
  },
  "video/quicktime": {
    icon: FileVideo,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    label: "QuickTime Video",
  },

  // Audio
  "audio/mpeg": {
    icon: Music,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    label: "MP3 Audio",
  },
  "audio/wav": {
    icon: Music,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    label: "WAV Audio",
  },
  "audio/ogg": {
    icon: Music,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    label: "OGG Audio",
  },

  // Archives
  "application/zip": {
    icon: FileArchive,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    label: "ZIP Archive",
  },
  "application/x-rar-compressed": {
    icon: FileArchive,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    label: "RAR Archive",
  },
  "application/x-7z-compressed": {
    icon: FileArchive,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    label: "7Z Archive",
  },

  // Code
  "application/json": {
    icon: FileCode,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    label: "JSON File",
  },
  "application/javascript": {
    icon: FileCode,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    label: "JavaScript File",
  },
  "text/javascript": {
    icon: FileCode,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    label: "JavaScript File",
  },
  "text/html": {
    icon: FileCode,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    label: "HTML File",
  },
  "text/css": {
    icon: FileCode,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    label: "CSS File",
  },
  "text/typescript": {
    icon: FileCode,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    label: "TypeScript File",
  },
};

function getFileTypeFromExtension(fileName: string): FileTypeInfo | null {
  const ext = fileName?.split(".").pop()?.toLowerCase();

  const extensionMap: Record<string, FileTypeInfo> = {
    // Images
    jpg: FILE_TYPE_CONFIG["image/jpeg"],
    jpeg: FILE_TYPE_CONFIG["image/jpeg"],
    png: FILE_TYPE_CONFIG["image/png"],
    gif: FILE_TYPE_CONFIG["image/gif"],
    webp: FILE_TYPE_CONFIG["image/webp"],
    svg: FILE_TYPE_CONFIG["image/svg+xml"],

    // Documents
    pdf: FILE_TYPE_CONFIG["application/pdf"],
    doc: FILE_TYPE_CONFIG["application/msword"],
    docx: FILE_TYPE_CONFIG[
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ],
    xls: FILE_TYPE_CONFIG["application/vnd.ms-excel"],
    xlsx: FILE_TYPE_CONFIG[
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ],
    ppt: FILE_TYPE_CONFIG["application/vnd.ms-powerpoint"],
    pptx: FILE_TYPE_CONFIG[
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    ],

    // Video
    mp4: FILE_TYPE_CONFIG["video/mp4"],
    webm: FILE_TYPE_CONFIG["video/webm"],
    mov: FILE_TYPE_CONFIG["video/quicktime"],

    // Audio
    mp3: FILE_TYPE_CONFIG["audio/mpeg"],
    wav: FILE_TYPE_CONFIG["audio/wav"],
    ogg: FILE_TYPE_CONFIG["audio/ogg"],

    // Archives
    zip: FILE_TYPE_CONFIG["application/zip"],
    rar: FILE_TYPE_CONFIG["application/x-rar-compressed"],
    "7z": FILE_TYPE_CONFIG["application/x-7z-compressed"],

    // Code
    json: FILE_TYPE_CONFIG["application/json"],
    js: FILE_TYPE_CONFIG["application/javascript"],
    ts: FILE_TYPE_CONFIG["text/typescript"],
    tsx: FILE_TYPE_CONFIG["text/typescript"],
    jsx: FILE_TYPE_CONFIG["application/javascript"],
    html: FILE_TYPE_CONFIG["text/html"],
    css: FILE_TYPE_CONFIG["text/css"],
  };

  return ext ? extensionMap[ext] || null : null;
}

export type FileLike = {
  name: string;
  type: string;
};

export function getFileTypeInfo(file: FileLike): FileTypeInfo {
  // First try MIME type
  if (FILE_TYPE_CONFIG[file.type]) {
    return FILE_TYPE_CONFIG[file.type];
  }

  // Fallback to extension
  const fromExt = getFileTypeFromExtension(file.name);
  if (fromExt) {
    return fromExt;
  }

  // Default
  return {
    icon: File,
    color: "text-muted-foreground",
    bgColor: "bg-muted",
    label: "File",
  };
}

type FileTypeIconProps = {
  file: FileLike;
  className?: string;
  size?: "sm" | "md" | "lg";
  showBackground?: boolean;
};

const sizeMap = {
  sm: { icon: "h-4 w-4", container: "h-8 w-8" },
  md: { icon: "h-5 w-5", container: "h-10 w-10" },
  lg: { icon: "h-6 w-6", container: "h-12 w-12" },
} as const;

export function FileTypeIcon({
  file,
  className,
  size = "md",
  showBackground = true,
}: FileTypeIconProps) {
  const config = getFileTypeInfo(file);
  const Icon = config.icon;
  const sizes = sizeMap[size];

  if (showBackground) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-lg",
          sizes.container,
          config.bgColor,
          className,
        )}
      >
        <Icon className={cn(sizes.icon, config.color)} />
      </div>
    );
  }

  return <Icon className={cn(sizes.icon, config.color, className)} />;
}

export function isPreviewable(file: FileLike): boolean {
  const previewableTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
    "application/pdf",
  ];

  if (previewableTypes.includes(file.type)) {
    return true;
  }

  // Check extension for PDFs that might have wrong MIME type
  const ext = file?.name?.split(".")?.pop()?.toLowerCase();
  return (
    ext === "pdf" ||
    file?.type?.startsWith("image/")
  );
}

export function isImage(file: FileLike): boolean {
  return file.type.startsWith("image/");
}

export function isPdf(file: FileLike): boolean {
  return (
    file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")
  );
}

export { FILE_TYPE_CONFIG, type FileTypeInfo };
