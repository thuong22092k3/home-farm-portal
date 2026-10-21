import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { FarmerNavigation } from "@/components/farmer-navigation";
import { getMessages, locales, type Locale } from "@/i18n/resources";

export default async function PortalLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!locales.includes(lang as Locale)) notFound();
  const locale = lang as Locale;
  const { common } = getMessages(locale);

  return (
    <div className="portal-shell min-h-screen">
      <FarmerNavigation locale={locale} messages={common} />
      <main className="portal-main min-h-screen px-5 pb-12 pt-24 sm:px-8 lg:px-10">
        {children}
      </main>
    </div>
  );
}
