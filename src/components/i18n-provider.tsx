"use client";

import { createInstance } from "i18next";
import { useEffect, useState, type ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { resources, type Locale } from "@/i18n/resources";

function makeInstance(locale: Locale) {
  const instance = createInstance();
  void instance.init({
    lng: locale,
    fallbackLng: "vi",
    resources,
    defaultNS: "common",
    interpolation: { escapeValue: false },
  });
  return instance;
}

export function AppI18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const [instance] = useState(() => makeInstance(locale));
  useEffect(() => {
    void instance.changeLanguage(locale);
  }, [instance, locale]);
  return <I18nextProvider i18n={instance}>{children}</I18nextProvider>;
}
