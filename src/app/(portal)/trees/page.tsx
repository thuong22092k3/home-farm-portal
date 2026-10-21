import { Map as MapIcon } from "lucide-react";
import { SectionPage } from "@/components/section-page";
import { getMessages } from "@/i18n/resources";

export default function TreesPage() {
  const { common } = getMessages("vi");
  return <SectionPage title={common.trees} description="Quản lý vị trí và trạng thái từng cây trong vườn." icon={MapIcon} messages={common} />;
}
