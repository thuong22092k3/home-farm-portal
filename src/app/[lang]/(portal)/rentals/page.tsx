import { Trees } from "lucide-react";
import { notFound } from "next/navigation";
import { SectionPage } from "@/components/section-page";
import { getMessages, locales, type Locale } from "@/i18n/resources";

export default async function RentalsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!locales.includes(lang as Locale)) notFound();
  const locale = lang as Locale;
  const { common } = getMessages(locale);
  return <SectionPage title={common.rentals} description={locale === "vi" ? "Theo dõi hợp đồng, khách thuê và lịch giao trái." : "Track contracts, renters, and delivery schedules."} icon={Trees} locale={locale} messages={common} />;
}
