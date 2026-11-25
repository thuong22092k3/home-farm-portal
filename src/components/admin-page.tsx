"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, ChevronRight, Clock3, Filter, Search } from "lucide-react";
import { ApiStatus } from "@/components/api-status";
import type { UseQueryResult } from "@tanstack/react-query";
import { apiEntities, apiNumber, formatMoney, text } from "@/data/api/api.utils";
import type { ApiEntity } from "@/data/api/types/base.type";

export type AdminMetric = { label: string; value: string; change: string; tone?: "green" | "amber" | "red" | "blue" };
export type AdminRecord = { id: string; title: string; detail: string; status: string; meta: string; tone?: "green" | "amber" | "red" | "blue" };
const toneClasses = { green:"bg-[#e3efd9] text-[#347355]", amber:"bg-[#f7ebd3] text-[#99651f]", red:"bg-[#f8dfda] text-[#a44e40]", blue:"bg-[#dceff1] text-[#37727c]" };

function liveMetricValues(endpoint: string, data: unknown): string[] {
  const object = (data && typeof data === "object" ? data : {}) as Record<string, unknown>;
  const items = Array.isArray(data) ? data as ApiEntity[] : [];
  const metrics = (object.metrics ?? object) as Record<string, unknown>;
  const maps: Record<string,string[]> = {
    "admin/dashboard":[text(metrics.totalUsers,"0"),text(metrics.activeUsers,"0"),formatMoney(metrics.gmv),text(metrics.pendingApprovals,"0")],
    "admin/users":[text(items.length),text(items.filter(i=>i.status==="ACTIVE").length),text(items.filter(i=>i.role==="CUSTOMER").length),text(items.filter(i=>i.status!=="ACTIVE").length)],
    "admin/partners":[text(items.filter(i=>i.status==="ACTIVE").length),text(items.length),text(items.filter(i=>Array.isArray(i.certifications)&&i.certifications.length).length),text(items.filter(i=>i.status!=="ACTIVE").length)],
    "admin/approvals":[text(items.length),text(items.filter(i=>i.type==="PARTNER"||i.type==="FARMER_REGISTRATION").length),text(items.filter(i=>i.type==="PLOT").length),text(items.filter(i=>i.type==="LIVESTREAM").length)],
    "admin/orders":[text(items.length),text(items.filter(i=>!["COMPLETED","CANCELLED","REFUNDED"].includes(text(i.status))).length),text(items.filter(i=>i.status==="COMPLETED").length),text(items.filter(i=>i.interventionReason).length)],
    "admin/subscriptions":[text(items.length),text(items.reduce((sum,i)=>sum+apiNumber(i.durationMonths),0))+" tháng",text(items.filter(i=>i.status!=="INACTIVE").length),text(items.filter(i=>i.status==="DRAFT").length)],
    "admin/compliance":[text(apiEntities(object.qualityChecks).length),text(apiEntities(object.qualityChecks).filter(i=>i.result==="PASSED").length),text(apiEntities(object.certifications).length),text(apiEntities(object.heldHarvests).length)],
    "admin/finance":[formatMoney(object.gmv),formatMoney(object.platformRevenue),formatMoney(object.pendingPayoutAmount),text(apiEntities(object.payments).filter(i=>i.status==="FAILED").length)],
    "admin/revenue":[text(apiEntities(object.campaigns).length),text(apiEntities(object.plans).length),text(apiEntities(object.marketListings).length),text(apiEntities(object.campaigns).filter(i=>i.status==="ACTIVE").length)],
    "admin/support":[text(items.filter(i=>!["RESOLVED","CLOSED"].includes(text(i.status))).length),text(items.filter(i=>i.status==="RESOLVED").length),text(items.filter(i=>i.priority==="HIGH").length),text(items.length)],
    "admin/analytics":[text(object.subscriptions,"0"),`${Math.round(apiNumber(object.completionRate)*100)}%`,text(object.nps,"0"),text(object.averageRating,"0")],
    "admin/settings":[text(object.platformFeePercent,"0")+"%",text(object.payoutCycle),text(object.diaryUpdatesPerWeek,"0")+"/tuần",text(object.iotTemperatureMax,"0")+"°C"]
  };
  return maps[endpoint] ?? [];
}

function liveRecords(data: unknown): AdminRecord[] {
  return apiEntities(data).slice(0,12).map((item,index)=>({
    id:text(item.id,`API-${index+1}`).toUpperCase(),
    title:text(item.name ?? item.title ?? item.subject ?? item.cropType,"Bản ghi API"),
    detail:[item.email,item.region,item.type,item.role].filter(Boolean).map(String).join(" · ") || "Dữ liệu từ home-farm-api",
    meta:item.updatedAt ? new Intl.DateTimeFormat("vi-VN").format(new Date(String(item.updatedAt))) : "Vừa cập nhật",
    status:text(item.status,"Đã tải"),
    tone:item.status==="ACTIVE"||item.status==="COMPLETED" ? "green" : item.status==="REJECTED"||item.status==="FAILED" ? "red" : "blue"
  }));
}

export function AdminPage({ endpoint, query, icon:Icon, eyebrow, title, description, metrics, records, sectionTitle, action="Tạo mới", actionHref, children }:{ endpoint:string; query:UseQueryResult<unknown>; icon:LucideIcon; eyebrow:string; title:string; description:string; metrics:AdminMetric[]; records:AdminRecord[]; sectionTitle:string; action?:string; actionHref?:string; children?:React.ReactNode }) {

  const values = query.isSuccess ? liveMetricValues(endpoint,query.data) : [];
  const visibleMetrics = metrics.map((metric,index)=>values[index]===undefined ? metric : {...metric,value:values[index]});
  const visibleRecords = query.isSuccess ? liveRecords(query.data) : records;
  return <div className="mx-auto max-w-[1440px]">
    <header className="portal-rise flex flex-col gap-5 border-b border-[#183f31]/15 pb-6 sm:flex-row sm:items-end sm:justify-between"><div className="max-w-3xl"><div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.2em] text-[#4a7a5e]"><Icon className="size-4" />{eyebrow}</div><h1 className="mt-3 text-4xl font-black leading-[.95] tracking-[-.055em] sm:text-5xl">{title}</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-[#65766d]">{description}</p><ApiStatus connected={query.isSuccess} error={query.error instanceof Error?query.error.message:query.error?"Không thể kết nối API":undefined}/></div>{actionHref&&<Link href={actionHref} className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#153f30] px-5 text-sm font-bold text-white shadow-[0_6px_20px_rgba(20,63,48,.14)] transition hover:-translate-y-0.5 hover:bg-[#245b43]">{action}<ArrowRight className="size-4"/></Link>}</header>
    <section className="portal-rise portal-rise-delay mt-6 grid overflow-hidden rounded-xl border border-[#183f31]/12 bg-white/70 sm:grid-cols-2 xl:grid-cols-4">{visibleMetrics.map(metric=><div key={metric.label} className="metric-cell p-5"><p className="text-[10px] font-black uppercase tracking-[.14em] text-[#748279]">{metric.label}</p><div className="mt-3 flex items-end justify-between gap-3"><p className="text-3xl font-black tracking-[-.05em] text-[#174b37]">{metric.value}</p><span className={`mb-1 rounded-full px-2 py-1 text-[9px] font-black ${toneClasses[metric.tone??"green"]}`}>{metric.change}</span></div></div>)}</section>
    {children}
    <section className="mt-6 overflow-hidden rounded-xl border border-[#183f31]/12 bg-[#fffefa]"><div className="flex flex-col gap-3 border-b border-[#183f31]/10 p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-lg font-black tracking-[-.03em]">{sectionTitle}</h2><p className="mt-1 text-xs text-[#7b8981]">Dữ liệu trực tiếp từ home-farm-api</p></div><div className="flex gap-2"><button className="grid size-9 place-items-center rounded-lg border border-[#d9dfd8] text-[#68786f] hover:bg-[#edf2ea]" aria-label="Tìm kiếm"><Search className="size-4"/></button><button className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#d9dfd8] px-3 text-xs font-bold text-[#52665c] hover:bg-[#edf2ea]"><Filter className="size-4"/>Lọc</button></div></div>
      <div className="divide-y divide-[#183f31]/9">{visibleRecords.length ? visibleRecords.map(record=><Link key={record.id} href={`${endpoint.replace(/^admin/,"/admin")}/${record.id.toLowerCase()}`} className="grid gap-3 px-5 py-4 transition hover:bg-[#f5f7f1] sm:grid-cols-[100px_1fr_150px_120px_20px] sm:items-center"><span className="truncate text-[11px] font-black tracking-[.06em] text-[#718078]">{record.id}</span><div className="min-w-0"><p className="truncate text-sm font-bold text-[#183f31]">{record.title}</p><p className="mt-1 truncate text-xs text-[#7b8981]">{record.detail}</p></div><span className="flex items-center gap-1.5 text-xs text-[#748279]"><Clock3 className="size-3.5"/>{record.meta}</span><span className={`w-fit rounded-full px-2.5 py-1 text-[10px] font-black ${toneClasses[record.tone??"green"]}`}>{record.status}</span><ChevronRight className="hidden size-4 text-[#93a099] sm:block"/></Link>) : <div className="px-5 py-14 text-center text-sm text-[#7b8981]">Chưa có dữ liệu trên API cho mục này.</div>}</div>
    </section>
  </div>;
}
