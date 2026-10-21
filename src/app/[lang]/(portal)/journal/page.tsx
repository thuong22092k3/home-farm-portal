import { CalendarDays } from "lucide-react";
import { notFound } from "next/navigation";
import { SectionPage } from "@/components/section-page";
import { getMessages, locales, type Locale } from "@/i18n/resources";

export default async function JournalPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!locales.includes(lang as Locale)) notFound();
  const locale = lang as Locale;
  const { common } = getMessages(locale);
  return <SectionPage title={common.journal} description={locale === "vi" ? "Ghi lại công việc chăm sóc, hình ảnh và tiến độ mùa vụ." : "Record care work, photos, and seasonal progress."} icon={CalendarDays} locale={locale} messages={common} />;
}
