const ALLOWED_RICH_TEXT_TAGS = new Set([
  "A",
  "B",
  "BLOCKQUOTE",
  "BR",
  "DIV",
  "EM",
  "H2",
  "H3",
  "H4",
  "I",
  "IMG",
  "LI",
  "MARK",
  "OL",
  "P",
  "S",
  "SPAN",
  "STRONG",
  "TABLE",
  "TBODY",
  "TD",
  "TFOOT",
  "TH",
  "THEAD",
  "TR",
  "U",
  "UL",
]);

const ALLOWED_TEXT_ALIGNMENTS = new Set(["left", "center", "right", "justify"]);

export function sanitizeRichTextHtml(html: string): string {
  if (typeof window === "undefined") return html;

  const template = document.createElement("template");
  template.innerHTML = html;

  template.content.querySelectorAll("*").forEach((element) => {
    if (!ALLOWED_RICH_TEXT_TAGS.has(element.tagName)) {
      element.replaceWith(...Array.from(element.childNodes));
      return;
    }

    Array.from(element.attributes).forEach((attribute) => {
      const name = attribute.name.toLowerCase();
      if (
        name.startsWith("on") ||
        name === "class" ||
        (name === "style" &&
          element.tagName !== "P" &&
          element.tagName !== "H2" &&
          element.tagName !== "H3" &&
          element.tagName !== "H4")
      ) {
        element.removeAttribute(attribute.name);
      }
    });

    if (element.hasAttribute("style")) {
      const textAlign = (element as HTMLElement).style.textAlign;
      element.removeAttribute("style");
      if (
        (element.tagName === "P" ||
          element.tagName === "H2" ||
          element.tagName === "H3" ||
          element.tagName === "H4") &&
        ALLOWED_TEXT_ALIGNMENTS.has(textAlign)
      ) {
        element.setAttribute("style", `text-align: ${textAlign};`);
      }
    }

    if (element.tagName === "A") {
      const href = element.getAttribute("href") || "";
      if (!/^https?:\/\//i.test(href) && !/^mailto:/i.test(href)) {
        element.removeAttribute("href");
      } else {
        element.setAttribute("target", "_blank");
        element.setAttribute("rel", "noopener noreferrer");
      }
    }

    if (element.tagName === "IMG") {
      const src = element.getAttribute("src") || "";
      if (
        !/^https?:\/\//i.test(src) &&
        !src.startsWith("/") &&
        !src.startsWith("blob:")
      ) {
        element.removeAttribute("src");
      }

      const alt = element.getAttribute("alt") || "";
      element.setAttribute("alt", alt);
      element.setAttribute("loading", "lazy");

      Array.from(element.attributes).forEach((attribute) => {
        if (
          !["src", "alt", "title", "loading"].includes(
            attribute.name.toLowerCase(),
          )
        ) {
          element.removeAttribute(attribute.name);
        }
      });
    }
  });

  return template.innerHTML;
}

export function hasRichTextHtmlMarkup(html: string): boolean {
  if (typeof window === "undefined") return false;

  const template = document.createElement("template");
  template.innerHTML = html;

  return Array.from(template.content.querySelectorAll("*")).some((element) =>
    ALLOWED_RICH_TEXT_TAGS.has(element.tagName),
  );
}

export function isEmptyRichTextHtml(html: string): boolean {
  if (typeof window === "undefined") return !html.trim();
  const template = document.createElement("template");
  template.innerHTML = html;
  return (
    !template.content.textContent?.trim() &&
    template.content.querySelectorAll("img, video, iframe").length === 0
  );
}
