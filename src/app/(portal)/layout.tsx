import type { ReactNode } from "react";
import { FarmerNavigation } from "@/components/farmer-navigation";
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
      <main className="portal-main min-h-screen px-5 pb-12 pt-24 sm:px-8 lg:px-10">
        {children}
      </main>
    </div>
  );
}
