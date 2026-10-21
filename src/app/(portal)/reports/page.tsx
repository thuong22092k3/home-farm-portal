import { BarChart3 } from "lucide-react";
import { SectionPage } from "@/components/section-page";
import { getMessages } from "@/i18n/resources";

export default function ReportsPage() {
  const { common } = getMessages("vi");
  return <SectionPage title={common.reports} description="Tổng hợp sản lượng, doanh thu và hiệu quả vận hành." icon={BarChart3} messages={common} />;
}
