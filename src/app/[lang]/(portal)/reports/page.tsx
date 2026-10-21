import { BarChart3 } from "lucide-react";
import { notFound } from "next/navigation";
import { SectionPage } from "@/components/section-page";
import { getMessages, locales, type Locale } from "@/i18n/resources";

export default async function ReportsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!locales.includes(lang as Locale)) notFound();
  const locale = lang as Locale;
  const { common } = getMessages(locale);
  return <SectionPage title={common.reports} description={locale === "vi" ? "Tổng hợp sản lượng, doanh thu và hiệu quả vận hành." : "Review yield, revenue, and operating performance."} icon={BarChart3} locale={locale} messages={common} />;
}
