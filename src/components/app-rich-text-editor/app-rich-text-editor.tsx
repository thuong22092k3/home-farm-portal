"use client";

import { AppIconButton } from "@/components/app-icon-button/app-icon-button";
import { AppNotification } from "@/components/app-notification";

import { cn } from "@/lib/utils";
import TiptapEmoji, { gitHubEmojis } from "@tiptap/extension-emoji";
import TiptapHighlight from "@tiptap/extension-highlight";
import TiptapImage from "@tiptap/extension-image";
import TiptapLink from "@tiptap/extension-link";
import { TableKit } from "@tiptap/extension-table";
import TiptapTextAlign from "@tiptap/extension-text-align";
import TiptapUnderline from "@tiptap/extension-underline";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading2,
  Heading3,
  Highlighter,
  Image as ImageIcon,
  Italic,
  Link,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Strikethrough,
  Underline,
  Undo2,
} from "lucide-react";
import {
  type ChangeEvent,
  type FocusEventHandler,
  type MouseEvent,
  type PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { RawHtmlPasteExtension } from "./raw-html-paste.extension";
import {
  isEmptyRichTextHtml,
  sanitizeRichTextHtml,
} from "@/lib/helpers/html.helper";
import { renderEmojiShortcodes } from "@/lib/helpers/emoji.helper";
import { registerRichTextImageFile } from "@/lib/helpers/rich-text-image.helper";

type AppRichTextEditorProps = {
  id?: string;
  value?: string;
  onChange: (value: string) => void;
  onBlur?: FocusEventHandler<HTMLDivElement>;
  placeholder?: string;
  className?: string;
  "aria-invalid"?: boolean | "true" | "false";
  "aria-labelledby"?: string;
};

function normalizeRichTextHtml(html: string) {
  return html.replace(/\\"/g, '"').replace(/\\\\/g, "\\");
}
export function AppRichTextEditor({
  id,
  value = "",
  onChange,
  onBlur,
  placeholder,
  className,
  "aria-invalid": ariaInvalid,
  "aria-labelledby": ariaLabelledby,
}: AppRichTextEditorProps) {
  const { t: tCommon } = useTranslation("common");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [isSelectingImage, setIsSelectingImage] = useState(false);
  const normalizedValue = normalizeRichTextHtml(value);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        code: false,
        codeBlock: false,
        horizontalRule: false,
        link: false,
        underline: false,
      }),
      TiptapEmoji.configure({
        emojis: gitHubEmojis,
        enableEmoticons: true,
      }),
      TiptapHighlight,
      TiptapImage.configure({
        allowBase64: false,
        HTMLAttributes: {
          class: [
            "my-3",
            "max-h-96",
            "max-w-full",
            "rounded-md",
            "border",
            "object-contain",
          ].join(" "),
        },
      }),
      TableKit,
      TiptapUnderline,
      TiptapTextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TiptapLink.configure({
        autolink: true,
        defaultProtocol: "https",
        openOnClick: false,
        protocols: ["http", "https", "mailto"],
        HTMLAttributes: {
          class: "text-primary underline",
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      RawHtmlPasteExtension,
    ],
    content: sanitizeRichTextHtml(renderEmojiShortcodes(normalizedValue)),
    editorProps: {
      attributes: {
        class: cn(
          "min-h-32",
          "w-full",
          "px-3",
          "py-2",
          "text-sm",
          "leading-6",
          "outline-none",
          "[&_img]:block",
          "[&_img]:max-w-full",
          "[&_img]:h-auto",
          "[&_img]:rounded-md",
          "[&_img]:border",
          "[&_img]:my-3",
          "[&_h2]:text-xl",
          "[&_h2]:font-semibold",
          "[&_h2]:leading-8",
          "[&_h2]:my-2",
          "[&_h3]:text-lg",
          "[&_h3]:font-semibold",
          "[&_h3]:leading-7",
          "[&_h3]:my-2",
          "[&_ul]:list-disc",
          "[&_ul]:pl-6",
          "[&_ul]:my-2",
          "[&_ol]:list-decimal",
          "[&_ol]:pl-6",
          "[&_ol]:my-2",
          "[&_li]:my-1",
          "[&_blockquote]:border-l-2",
          "[&_blockquote]:pl-4",
          "[&_blockquote]:italic",
          "[&_blockquote]:text-muted-foreground",
          "[&_table]:my-3",
          "[&_table]:w-full",
          "[&_table]:border-collapse",
          "[&_th]:border",
          "[&_th]:bg-muted/50",
          "[&_th]:px-3",
          "[&_th]:py-2",
          "[&_th]:text-left",
          "[&_th]:font-semibold",
          "[&_td]:border",
          "[&_td]:px-3",
          "[&_td]:py-2",
          "[&_td]:align-top",
          "[&_td:first-child]:bg-muted/25",
          "[&_td:first-child]:font-medium",
        ),
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor: activeEditor }) => {
      const nextHtml = sanitizeRichTextHtml(
        renderEmojiShortcodes(activeEditor.getHTML()),
      );
      onChange(isEmptyRichTextHtml(nextHtml) ? "" : nextHtml);
    },
  });

  const editorState = useEditorState({
    editor,
    selector: ({ editor: activeEditor }) => ({
      isEmpty: activeEditor?.isEmpty ?? true,
    }),
  });

  const toolbarButtonProps = {
    type: "button" as const,
    onMouseDown: (event: MouseEvent<HTMLButtonElement>) =>
      event.preventDefault(),
    onPointerDown: (event: PointerEvent<HTMLButtonElement>) =>
      event.preventDefault(),
  };

  useEffect(() => {
    if (!editor) return;

    const sanitized = sanitizeRichTextHtml(
      renderEmojiShortcodes(normalizeRichTextHtml(value)),
    );
    const currentSanitizedHtml = sanitizeRichTextHtml(editor.getHTML());

    if (currentSanitizedHtml !== sanitized) {
      editor.commands.setContent(sanitized, { emitUpdate: false });
    }
  }, [editor, value]);

  const runCommand = (command: () => void) => {
    if (!editor) return;
    command();
  };

  const handleLink = () => {
    if (!editor) return;
    const url = window.prompt("URL");
    if (url === null) return;
    if (!url) {
      editor.chain().focus().unsetLink().run();
      return;
    }

    const normalizedUrl =
      /^https?:\/\//i.test(url) || /^mailto:/i.test(url)
        ? url
        : `https://${url}`;
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: normalizedUrl })
      .run();
  };

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!editor) return;
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    try {
      setIsSelectingImage(true);
      const previewUrl = registerRichTextImageFile(file);
      editor
        .chain()
        .focus()
        .setImage({ src: previewUrl, alt: file.name })
        .run();
    } catch (error) {
      console.error("Editor image selection failed:", error);
      AppNotification.error(tCommon("common.message.image_selection_failed"));
    } finally {
      setIsSelectingImage(false);
    }
  };

  return (
    <div
      className={cn(
        "rounded-lg border bg-background transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
        ariaInvalid && "border-destructive ring-3 ring-destructive/20",
        className,
      )}
    >
      <input
        ref={imageInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
        className="sr-only"
        onChange={handleImageChange}
      />
      <div className="flex flex-wrap items-center gap-1 border-b bg-muted/35 px-2 py-1.5">
        <AppIconButton
          {...toolbarButtonProps}
          icon={<Heading2 className="h-4 w-4" />}
          tooltip="Heading 2"
          size="sm"
          variant={
            editor?.isActive("heading", { level: 2 }) ? "outline" : "ghost"
          }
          onClick={() =>
            runCommand(() =>
              editor?.chain().focus().toggleHeading({ level: 2 }).run(),
            )
          }
        />
        <AppIconButton
          {...toolbarButtonProps}
          icon={<Heading3 className="h-4 w-4" />}
          tooltip="Heading 3"
          size="sm"
          variant={
            editor?.isActive("heading", { level: 3 }) ? "outline" : "ghost"
          }
          onClick={() =>
            runCommand(() =>
              editor?.chain().focus().toggleHeading({ level: 3 }).run(),
            )
          }
        />
        <div className="mx-1 h-5 w-px bg-border" />
        <AppIconButton
          {...toolbarButtonProps}
          icon={<Bold className="h-4 w-4" />}
          tooltip="Bold"
          size="sm"
          variant={editor?.isActive("bold") ? "outline" : "ghost"}
          onClick={() =>
            runCommand(() => editor?.chain().focus().toggleBold().run())
          }
        />
        <AppIconButton
          {...toolbarButtonProps}
          icon={<Italic className="h-4 w-4" />}
          tooltip="Italic"
          size="sm"
          variant={editor?.isActive("italic") ? "outline" : "ghost"}
          onClick={() =>
            runCommand(() => editor?.chain().focus().toggleItalic().run())
          }
        />
        <AppIconButton
          {...toolbarButtonProps}
          icon={<Underline className="h-4 w-4" />}
          tooltip="Underline"
          size="sm"
          variant={editor?.isActive("underline") ? "outline" : "ghost"}
          onClick={() =>
            runCommand(() => editor?.chain().focus().toggleUnderline().run())
          }
        />
        <AppIconButton
          {...toolbarButtonProps}
          icon={<Strikethrough className="h-4 w-4" />}
          tooltip="Strike"
          size="sm"
          variant={editor?.isActive("strike") ? "outline" : "ghost"}
          onClick={() =>
            runCommand(() => editor?.chain().focus().toggleStrike().run())
          }
        />
        <AppIconButton
          {...toolbarButtonProps}
          icon={<Highlighter className="h-4 w-4" />}
          tooltip="Highlight"
          size="sm"
          variant={editor?.isActive("highlight") ? "outline" : "ghost"}
          onClick={() =>
            runCommand(() => editor?.chain().focus().toggleHighlight().run())
          }
        />
        <div className="mx-1 h-5 w-px bg-border" />
        <AppIconButton
          {...toolbarButtonProps}
          icon={<List className="h-4 w-4" />}
          tooltip="Bullet list"
          size="sm"
          variant={editor?.isActive("bulletList") ? "outline" : "ghost"}
          onClick={() =>
            runCommand(() => editor?.chain().focus().toggleBulletList().run())
          }
        />
        <AppIconButton
          {...toolbarButtonProps}
          icon={<ListOrdered className="h-4 w-4" />}
          tooltip="Numbered list"
          size="sm"
          variant={editor?.isActive("orderedList") ? "outline" : "ghost"}
          onClick={() =>
            runCommand(() => editor?.chain().focus().toggleOrderedList().run())
          }
        />
        <AppIconButton
          {...toolbarButtonProps}
          icon={<Quote className="h-4 w-4" />}
          tooltip="Quote"
          size="sm"
          variant={editor?.isActive("blockquote") ? "outline" : "ghost"}
          onClick={() =>
            runCommand(() => editor?.chain().focus().toggleBlockquote().run())
          }
        />
        <AppIconButton
          {...toolbarButtonProps}
          icon={<Link className="h-4 w-4" />}
          tooltip="Link"
          size="sm"
          variant={editor?.isActive("link") ? "outline" : "ghost"}
          onClick={handleLink}
        />
        <AppIconButton
          {...toolbarButtonProps}
          icon={<ImageIcon className="h-4 w-4" />}
          tooltip="Upload image"
          size="sm"
          variant="ghost"
          disabled={isSelectingImage}
          onClick={() => imageInputRef.current?.click()}
        />
        <div className="mx-1 h-5 w-px bg-border" />
        <AppIconButton
          {...toolbarButtonProps}
          icon={<AlignLeft className="h-4 w-4" />}
          tooltip="Align left"
          size="sm"
          variant={
            editor?.isActive({ textAlign: "left" }) ? "outline" : "ghost"
          }
          onClick={() =>
            runCommand(() => editor?.chain().focus().setTextAlign("left").run())
          }
        />
        <AppIconButton
          {...toolbarButtonProps}
          icon={<AlignCenter className="h-4 w-4" />}
          tooltip="Align center"
          size="sm"
          variant={
            editor?.isActive({ textAlign: "center" }) ? "outline" : "ghost"
          }
          onClick={() =>
            runCommand(() =>
              editor?.chain().focus().setTextAlign("center").run(),
            )
          }
        />
        <AppIconButton
          {...toolbarButtonProps}
          icon={<AlignRight className="h-4 w-4" />}
          tooltip="Align right"
          size="sm"
          variant={
            editor?.isActive({ textAlign: "right" }) ? "outline" : "ghost"
          }
          onClick={() =>
            runCommand(() =>
              editor?.chain().focus().setTextAlign("right").run(),
            )
          }
        />
        <div className="mx-1 h-5 w-px bg-border" />
        <AppIconButton
          {...toolbarButtonProps}
          icon={<Undo2 className="h-4 w-4" />}
          tooltip="Undo"
          size="sm"
          variant="ghost"
          disabled={!editor?.can().undo()}
          onClick={() => runCommand(() => editor?.chain().focus().undo().run())}
        />
        <AppIconButton
          {...toolbarButtonProps}
          icon={<Redo2 className="h-4 w-4" />}
          tooltip="Redo"
          size="sm"
          variant="ghost"
          disabled={!editor?.can().redo()}
          onClick={() => runCommand(() => editor?.chain().focus().redo().run())}
        />
      </div>

      <div className="relative">
        {(editor?.isEmpty ?? editorState?.isEmpty ?? true) && placeholder && (
          <div className="pointer-events-none absolute left-3 top-2 text-sm leading-6 text-muted-foreground">
            {placeholder}
          </div>
        )}
        <EditorContent
          id={id}
          editor={editor}
          aria-invalid={ariaInvalid}
          aria-labelledby={ariaLabelledby}
          role="textbox"
          onBlur={onBlur}
        />
      </div>
    </div>
  );
}
