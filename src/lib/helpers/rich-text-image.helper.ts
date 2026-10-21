// TODO: Un-comment import này khi đã có API thực tế
// import { uploadMultipleFiles } from "@/data/api/common/upload-files.api";

const richTextImageFiles = new Map<string, File>();

export function registerRichTextImageFile(file: File): string {
  const objectUrl = URL.createObjectURL(file);
  richTextImageFiles.set(objectUrl, file);
  return objectUrl;
}

export async function uploadRichTextImagesInHtml(
  html: string,
): Promise<string> {
  if (!html || typeof window === "undefined") return html;

  const template = document.createElement("template");
  template.innerHTML = html;

  const localImages = Array.from(
    template.content.querySelectorAll<HTMLImageElement>('img[src^="blob:"]'),
  );
  if (localImages.length === 0) return html;

  const uniqueSources = Array.from(
    new Set(
      localImages.map((image) => image.getAttribute("src")).filter(Boolean),
    ),
  ) as string[];

  const uploadEntries = uniqueSources
    .map((src) => ({ src, file: richTextImageFiles.get(src) }))
    .filter(
      (entry): entry is { src: string; file: File } =>
        entry.file instanceof File,
    );

  if (uploadEntries.length !== uniqueSources.length) {
    throw new Error(
      "Some editor images are no longer available. Please reselect them.",
    );
  }

  /* 
  // ==================== [ORIGINAL API CALL - WAITING FOR BACKEND] ====================
  const response = await uploadMultipleFiles({
    files: uploadEntries.map((entry) => entry.file),
    accessType: "PUBLIC",
    resourceType: "PRODUCT_IMAGE",
  });

  const uploadedUrlsBySource = new Map<string, string>();
  uploadEntries.forEach((entry, index) => {
    const uploadedUrl = response[index]?.success
      ? response[index].file?.accessUrl
      : undefined;
    if (!uploadedUrl) {
      throw new Error(
        response[index]?.errorMessage || "Editor image upload failed",
      );
    }
    uploadedUrlsBySource.set(entry.src, uploadedUrl);
  });
  // ===================================================================================
  */

  // ==================== [MOCK UPLOAD FOR DEVELOPMENT] ====================

  const uploadedUrlsBySource = new Map<string, string>();
  uploadEntries.forEach((entry) => {
    uploadedUrlsBySource.set(entry.src, entry.src);
  });
  // =======================================================================

  localImages.forEach((image) => {
    const src = image.getAttribute("src");
    const uploadedUrl = src ? uploadedUrlsBySource.get(src) : undefined;
    if (uploadedUrl) image.setAttribute("src", uploadedUrl);
  });

  /* 
  uploadEntries.forEach((entry) => {
    URL.revokeObjectURL(entry.src);
    richTextImageFiles.delete(entry.src);
  });
  */

  return template.innerHTML;
}
