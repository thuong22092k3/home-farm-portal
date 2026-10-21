"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Leaf,
  LogOut,
  Menu,
  Settings,
  UserRound,
  X
} from "lucide-react";
import { farmerNavigation } from "@/data/navigation";
import type { CommonMessages } from "@/i18n/resources";

type FarmerNavigationProps = {
  messages: CommonMessages;
};

export function FarmerNavigation({ messages }: FarmerNavigationProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigation = (
    <aside
      data-collapsed={collapsed}
      className={`flex h-full flex-col bg-[#143f30] text-white transition-[width] duration-300 ${collapsed ? "w-[84px]" : "w-[272px]"}`}
    >
      <div className="flex h-20 items-center border-b border-white/10 px-5">
        <Link href="/dashboard" className="flex min-w-0 items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#cde49f] text-[#143f30]">
            <Leaf className="size-5 fill-current" />
          </span>
          {!collapsed && <span className="truncate text-xl font-black tracking-[-.04em]">{messages.brand}</span>}
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="ml-auto grid size-9 place-items-center rounded-lg text-white/65 hover:bg-white/10 lg:hidden"
          aria-label="Close menu"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="flex-1 px-3 py-6">
        {!collapsed && (
          <p className="mb-3 px-3 text-[10px] font-bold tracking-[.16em] text-white/45">
            {messages.management.toUpperCase()}
          </p>
        )}
        <nav className="space-y-1.5">
          {farmerNavigation.map(({ labelKey, href, icon: Icon }) => {
            const fullHref = href;
            const active = pathname === fullHref;
            return (
              <Link
                key={href}
                href={fullHref}
                onClick={() => setMobileOpen(false)}
                title={collapsed ? messages[labelKey] : undefined}
                className={`flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition ${active ? "bg-white/13 text-white" : "text-white/68 hover:bg-white/8 hover:text-white"}`}
              >
                <Icon className="size-5 shrink-0 text-[#cde49f]" />
                {!collapsed && <span>{messages[labelKey]}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-white/10 p-3">
        <div className="flex items-center gap-3 rounded-xl bg-white/6 p-2">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#eadfc7] text-xs font-black text-[#745f38]">UH</span>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{messages.farmerName}</p>
              <p className="truncate text-[11px] text-white/48">{messages.farmerRole}</p>
            </div>
          )}
        </div>
        {!collapsed && (
          <div className="mt-2 grid grid-cols-3 gap-1">
            {[
              [UserRound, messages.profile],
              [Settings, messages.settings],
              [LogOut, messages.logout]
            ].map(([Icon, label]) => (
              <button key={label as string} type="button" className="grid h-9 place-items-center rounded-lg text-white/50 hover:bg-white/10 hover:text-white" title={label as string}>
                <Icon className="size-4" />
              </button>
            ))}
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={() => setCollapsed((value) => !value)}
        className="absolute -right-3 top-24 hidden size-7 place-items-center rounded-full border border-[#315a49] bg-[#143f30] text-white shadow-md lg:grid"
        aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
      >
        {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
      </button>
    </aside>
  );

  return (
    <>
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">{navigation}</div>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" className="absolute inset-0 bg-[#0b241b]/55 backdrop-blur-sm" onClick={() => setMobileOpen(false)} aria-label="Close navigation" />
          <div className="relative h-full w-[272px]">{navigation}</div>
        </div>
      )}
      <div className="portal-header fixed left-0 right-0 top-0 z-30 flex h-16 items-center border-b border-[#dfe2d4] bg-[#fffefa]/94 px-4 backdrop-blur">
        <button type="button" onClick={() => setMobileOpen(true)} className="grid size-10 place-items-center rounded-xl text-[#143f30] hover:bg-[#edf1e5] lg:hidden" aria-label="Open navigation">
          <Menu className="size-5" />
        </button>
        <p className="ml-2 text-sm font-semibold text-[#52665c] lg:ml-5">{messages.workspace}</p>
        <button type="button" className="ml-auto grid size-10 place-items-center rounded-xl text-[#718078] hover:bg-[#edf1e5]" aria-label="Notifications">
          <Bell className="size-5" />
        </button>
      </div>
    </>
  );
}
