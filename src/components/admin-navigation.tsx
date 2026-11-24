"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  Repeat2,
  Settings,
  Shield,
  UserRound,
  X,
} from "lucide-react";
import { adminNavigation } from "@/data/navigation";

const groupLabels = {
  operate: "Vận hành",
  control: "Kiểm soát",
  system: "Hệ thống",
} as const;

export function AdminNavigation() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigation = (
    <aside
      data-admin-collapsed={collapsed}
      className={`flex h-full flex-col bg-[#102f2b] text-white transition-[width] duration-300 ${collapsed ? "w-[84px]" : "w-[272px]"}`}
    >
      <div className="flex h-20 items-center border-b border-white/10 px-5">
        <Link href="/admin" className="flex min-w-0 items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-lg bg-white">
            <Image
              src="/avt.png"
              width={40}
              height={40}
              alt="Trang Trại Tại Nhà"
              className="size-full object-cover"
            />
          </span>
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-base font-black tracking-[-.035em]">
                Trang Trại Tại Nhà
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#cde49f]">
                Admin Console
              </p>
            </div>
          )}
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="ml-auto grid size-9 place-items-center rounded-lg text-white/65 hover:bg-white/10 lg:hidden"
          aria-label="Đóng menu"
        >
          <X className="size-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-4">
        {(Object.keys(groupLabels) as Array<keyof typeof groupLabels>).map(
          (group) => (
            <div key={group} className="mb-5">
              {!collapsed && (
                <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[.16em] text-white/35">
                  {groupLabels[group]}
                </p>
              )}
              <nav className="space-y-1">
                {adminNavigation
                  .filter((item) => item.group === group)
                  .map(({ label, href, icon: Icon }) => {
                    const active =
                      href === "/admin"
                        ? pathname === href
                        : pathname === href || pathname.startsWith(`${href}/`);
                    return (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        title={collapsed ? label : undefined}
                        className={`flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-semibold transition ${active ? "bg-[#d8eea9] text-[#102f2b]" : "text-white/64 hover:bg-white/8 hover:text-white"}`}
                      >
                        <Icon
                          className={`size-[18px] shrink-0 ${active ? "text-[#275e43]" : "text-[#a9c987]"}`}
                        />
                        {!collapsed && <span>{label}</span>}
                      </Link>
                    );
                  })}
              </nav>
            </div>
          ),
        )}
      </div>
      <div className="border-t border-white/10 p-3">
        <Link
          href="/roles"
          className="mb-2 flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-semibold text-white/65 hover:bg-white/8 hover:text-white"
        >
          <Repeat2 className="size-[18px] text-[#a9c987]" />
          {!collapsed && "Chuyển vai trò"}
        </Link>
        <div className="flex items-center gap-3 rounded-lg bg-white/6 p-2">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#d8eea9] text-xs font-black text-[#1a503a]">
            AD
          </span>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">Minh Trí</p>
              <p className="truncate text-[11px] text-white/45">
                Quản trị hệ thống
              </p>
            </div>
          )}
        </div>
        {!collapsed && (
          <div className="mt-2 grid grid-cols-3 gap-1">
            {[
              [UserRound, "Hồ sơ"],
              [Settings, "Cài đặt"],
              [LogOut, "Đăng xuất"],
            ].map(([Icon, label]) => {
              const C = Icon as typeof UserRound;
              return (
                <button
                  key={label as string}
                  type="button"
                  title={label as string}
                  className="grid h-9 place-items-center rounded-lg text-white/45 hover:bg-white/10 hover:text-white"
                >
                  <C className="size-4" />
                </button>
              );
            })}
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={() => setCollapsed((value) => !value)}
        className="absolute -right-3 top-24 hidden size-7 place-items-center rounded-full border border-[#315a49] bg-[#102f2b] text-white shadow-md lg:grid"
        aria-label={collapsed ? "Mở rộng menu" : "Thu gọn menu"}
      >
        {collapsed ? (
          <ChevronRight className="size-4" />
        ) : (
          <ChevronLeft className="size-4" />
        )}
      </button>
    </aside>
  );

  return (
    <>
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">
        {navigation}
      </div>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-[#071f18]/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-label="Đóng điều hướng"
          />
          <div className="relative h-full w-[272px]">{navigation}</div>
        </div>
      )}
      <div className="admin-header fixed left-0 right-0 top-0 z-30 flex h-16 items-center border-b border-[#d8ded7] bg-[#fffefa]/92 px-4 backdrop-blur-xl">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="grid size-10 place-items-center rounded-lg text-[#143f30] hover:bg-[#edf1e5] lg:hidden"
          aria-label="Mở điều hướng"
        >
          <Menu className="size-5" />
        </button>
        <div className="ml-2 flex items-center gap-2 text-sm font-semibold text-[#52665c] lg:ml-5">
          <Shield className="size-4 text-[#347858]" /> Trung tâm điều hành
        </div>
        <button
          type="button"
          className="relative ml-auto grid size-10 place-items-center rounded-lg text-[#718078] hover:bg-[#edf1e5]"
          aria-label="Thông báo"
        >
          <Bell className="size-5" />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-[#ce684f] ring-2 ring-white" />
        </button>
      </div>
    </>
  );
}
