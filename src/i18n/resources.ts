import viCommon from "./locales/vi/common.json";
import viEnum from "./locales/vi/enum.json";

export const resources = {
  vi: { common: viCommon, enum: viEnum, form: viCommon.form }
} as const;

export type Locale = keyof typeof resources;
export type CommonMessages = (typeof resources)[Locale]["common"];
export const locales: Locale[] = ["vi"];

export function getMessages(locale: Locale) {
  return resources[locale];
}
