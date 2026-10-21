import { Map as MapIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { SectionPage } from "@/components/section-page";
import { getMessages, locales, type Locale } from "@/i18n/resources";

export default async function TreesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!locales.includes(lang as Locale)) notFound();
  const locale = lang as Locale;
  const { common } = getMessages(locale);
  return <SectionPage title={common.trees} description={locale === "vi" ? "Quản lý vị trí và trạng thái từng cây trong vườn." : "Manage the location and status of every tree."} icon={MapIcon} locale={locale} messages={common} />;
}
