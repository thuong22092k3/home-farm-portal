import type { ReactNode } from "react";
import { FarmerNavigation } from "@/components/farmer-navigation";
import { FarmerBottomTabs } from "@/components/farmer-bottom-tabs";
import { getMessages } from "@/i18n/resources";

export default async function PortalLayout({
  children
}: {
  children: ReactNode;
}) {
  const { common } = getMessages("vi");

  return (
    <div className="portal-shell min-h-screen">
      <FarmerNavigation messages={common} />
      <main className="portal-main min-h-screen px-4 pb-28 pt-20 sm:px-8 lg:px-10 lg:pb-12 lg:pt-24">
        {children}
      </main>
      <FarmerBottomTabs />
    </div>
  );
}
