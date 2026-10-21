import {
  BarChart3,
  CalendarDays,
  LayoutDashboard,
  Map as MapIcon,
  Trees,
  type LucideIcon
} from "lucide-react";
import type { CommonMessages } from "@/i18n/resources";

export type NavigationItem = {
  labelKey: keyof CommonMessages;
  href: string;
  icon: LucideIcon;
};

export const farmerNavigation: NavigationItem[] = [
  { labelKey: "dashboard", href: "/dashboard", icon: LayoutDashboard },
  { labelKey: "trees", href: "/trees", icon: MapIcon },
  { labelKey: "rentals", href: "/rentals", icon: Trees },
  { labelKey: "journal", href: "/journal", icon: CalendarDays },
  { labelKey: "reports", href: "/reports", icon: BarChart3 }
];
