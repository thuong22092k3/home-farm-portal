"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminBottomNavigation } from "@/data/navigation";

export function AdminBottomTabs() {
  const pathname = usePathname();
  return <nav aria-label="Điều hướng quản trị nhanh" className="glass-tabs fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-24px)] max-w-md -translate-x-1/2 items-center justify-around rounded-[24px] p-1.5 lg:hidden">{adminBottomNavigation.map(({ href, label, icon: Icon }) => { const active = href === "/admin" ? pathname === href : pathname.startsWith(href); return <Link key={href} href={href} aria-current={active ? "page" : undefined} className={`flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-[18px] py-2 text-[9px] font-bold transition ${active ? "bg-white/85 text-[#133f30] shadow-sm" : "text-[#5d6e65]"}`}><Icon className={`size-5 ${active ? "stroke-[2.6]" : "stroke-[1.8]"}`} /><span className="max-w-full truncate px-1">{label.replace("Nhà vườn & HTX","Đối tác").replace("Hàng chờ phê duyệt","Phê duyệt")}</span></Link>; })}</nav>;
}
