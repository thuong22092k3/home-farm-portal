import { Trees } from "lucide-react";
import { SectionPage } from "@/components/section-page";
import { getMessages } from "@/i18n/resources";

export default function RentalsPage() {
  const { common } = getMessages("vi");
  return <SectionPage title={common.rentals} description="Theo dõi hợp đồng, khách thuê và lịch giao trái." icon={Trees} messages={common} />;
}
