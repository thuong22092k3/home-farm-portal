import {
  Bot,
  BarChart3,
  CalendarDays,
  CircleDollarSign,
  ClipboardCheck,
  CloudSun,
  Radio,
  LayoutDashboard,
  Map as MapIcon,
  PackageCheck,
  type LucideIcon
} from "lucide-react";

export type NavigationLabelKey =
  | "dashboard"
  | "orders"
  | "trees"
  | "journal"
  | "iot"
  | "ai"
  | "livestream"
  | "harvest"
  | "wallet"
  | "reports";

export type NavigationItem = {
  labelKey: NavigationLabelKey;
  label: string;
  href: string;
  icon: LucideIcon;
  group: "today" | "operate" | "finance";
};

export const farmerNavigation: NavigationItem[] = [
  { labelKey: "dashboard", label: "Tổng quan", href: "/dashboard", icon: LayoutDashboard, group: "today" },
  { labelKey: "orders", label: "Đơn nhận nuôi", href: "/orders", icon: ClipboardCheck, group: "today" },
  { labelKey: "trees", label: "Cây & lô trồng", href: "/trees", icon: MapIcon, group: "operate" },
  { labelKey: "journal", label: "Nhật ký 1 chạm", href: "/journal", icon: CalendarDays, group: "operate" },
  { labelKey: "iot", label: "Cảm biến IoT", href: "/iot", icon: CloudSun, group: "operate" },
  { labelKey: "ai", label: "Phân tích AI", href: "/ai", icon: Bot, group: "operate" },
  { labelKey: "livestream", label: "Livestream", href: "/livestream", icon: Radio, group: "operate" },
  { labelKey: "harvest", label: "Thu hoạch & QA", href: "/harvest", icon: PackageCheck, group: "operate" },
  { labelKey: "wallet", label: "Ví & giải ngân", href: "/wallet", icon: CircleDollarSign, group: "finance" },
  { labelKey: "reports", label: "Báo cáo", href: "/reports", icon: BarChart3, group: "finance" }
];

export const bottomNavigation = farmerNavigation.filter((item) =>
  ["dashboard", "orders", "journal", "harvest", "wallet"].includes(item.labelKey)
);
