import { gitHubEmojis, shortcodeToEmoji } from '@tiptap/extension-emoji';

const EMOJI_SHORTCODE_PATTERN = /:([a-zA-Z0-9_+-]+):/g;
const emojiCache = new Map<string, string>();

function resolveEmoji(shortcode: string): string | undefined {
  const normalized = shortcode.trim().toLowerCase();
  const cached = emojiCache.get(normalized);
  if (cached !== undefined) return cached || undefined;

  const emojiItem = shortcodeToEmoji(normalized, gitHubEmojis);
  const resolved = emojiItem?.emoji;
  emojiCache.set(normalized, resolved ?? '');
  return resolved;
}

export function renderEmojiShortcodes(value: string): string {
  if (!value) return value;

  return value.replace(EMOJI_SHORTCODE_PATTERN, (fullMatch, shortcode: string) => resolveEmoji(shortcode) ?? fullMatch);
}
