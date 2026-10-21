import { CalendarDays } from "lucide-react";
import { SectionPage } from "@/components/section-page";
import { getMessages } from "@/i18n/resources";

export default function JournalPage() {
  const { common } = getMessages("vi");
  return <SectionPage title={common.journal} description="Ghi lại công việc chăm sóc, hình ảnh và tiến độ mùa vụ." icon={CalendarDays} messages={common} />;
}
