import {
  hasRichTextHtmlMarkup,
  sanitizeRichTextHtml,
} from "@/lib/helpers/html.helper";
import { Extension } from "@tiptap/react";
import { Plugin } from "@tiptap/pm/state";
import { renderEmojiShortcodes } from "@/lib/helpers/emoji.helper";

export const RawHtmlPasteExtension = Extension.create({
  name: "rawHtmlPaste",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          transformPastedHTML: (html) => sanitizeRichTextHtml(html),
          handlePaste: (_view, event) => {
            const clipboardData = event.clipboardData;
            if (!clipboardData) return false;

            // Code editors can provide highlighted clipboard HTML while the plain-text payload contains the actual markup.
            const plainText = clipboardData.getData("text/plain").trim();
            if (!hasRichTextHtmlMarkup(plainText)) return false;

            event.preventDefault();
            return this.editor.commands.insertContent(
              sanitizeRichTextHtml(renderEmojiShortcodes(plainText)),
              {
                parseOptions: { preserveWhitespace: false },
              },
            );
          },
        },
      }),
    ];
  },
});
