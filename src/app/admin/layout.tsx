import type { ReactNode } from "react";
import { AdminBottomTabs } from "@/components/admin-bottom-tabs";
import { AdminNavigation } from "@/components/admin-navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="admin-shell min-h-screen"><AdminNavigation /><main className="admin-main min-h-screen px-4 pb-28 pt-20 sm:px-8 lg:px-10 lg:pb-12 lg:pt-24">{children}</main><AdminBottomTabs /></div>;
}
