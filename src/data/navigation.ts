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
  BadgeCheck,
  Building2,
  Headphones,
  ListChecks,
  Settings2,
  ShieldCheck,
  UsersRound,
  BadgeDollarSign,
  Layers3,
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

export type AdminNavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  group: "operate" | "control" | "system";
};

export const adminNavigation: AdminNavigationItem[] = [
  { label: "Tổng quan", href: "/admin", icon: LayoutDashboard, group: "operate" },
  { label: "Người dùng", href: "/admin/users", icon: UsersRound, group: "operate" },
  { label: "Nhà vườn & HTX", href: "/admin/partners", icon: Building2, group: "operate" },
  { label: "Hàng chờ phê duyệt", href: "/admin/approvals", icon: BadgeCheck, group: "control" },
  { label: "Đơn hàng", href: "/admin/orders", icon: ListChecks, group: "control" },
  { label: "Gói subscription", href: "/admin/subscriptions", icon: Layers3, group: "control" },
  { label: "QA/QC & tuân thủ", href: "/admin/compliance", icon: ShieldCheck, group: "control" },
  { label: "Tài chính", href: "/admin/finance", icon: CircleDollarSign, group: "control" },
  { label: "Doanh thu & quảng cáo", href: "/admin/revenue", icon: BadgeDollarSign, group: "control" },
  { label: "Hỗ trợ", href: "/admin/support", icon: Headphones, group: "system" },
  { label: "Báo cáo hệ thống", href: "/admin/analytics", icon: BarChart3, group: "system" },
  { label: "Cấu hình", href: "/admin/settings", icon: Settings2, group: "system" }
];

export const adminBottomNavigation = adminNavigation.filter((item) =>
  ["/admin", "/admin/partners", "/admin/approvals", "/admin/finance"].includes(item.href)
);
