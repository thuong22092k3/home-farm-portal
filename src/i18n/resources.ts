import enCommon from "./locales/en/common.json";
import enEnum from "./locales/en/enum.json";
import viCommon from "./locales/vi/common.json";
import viEnum from "./locales/vi/enum.json";

export const resources = {
  vi: { common: viCommon, enum: viEnum },
  en: { common: enCommon, enum: enEnum }
} as const;

export type Locale = keyof typeof resources;
export type CommonMessages = (typeof resources)[Locale]["common"];
export const locales: Locale[] = ["vi", "en"];

export function getMessages(locale: Locale) {
  return resources[locale];
}
