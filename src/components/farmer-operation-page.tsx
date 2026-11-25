"use client";

import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { Camera, ChevronRight, MapPin, Mic, Wifi, WifiOff } from "lucide-react";
import { ApiStatus } from "@/components/api-status";
import { FarmerPageHeader, MetricStrip, StatusPill, WorkList, type Metric, type WorkItem } from "@/components/farmer-page";
import type { UseQueryResult } from "@tanstack/react-query";
import { apiEntities, apiNumber, formatDate, formatMoney, text } from "@/data/api/api.utils";
import type { ApiEntity } from "@/data/api/types/base.type";

function farmerMetrics(endpoint:string,data:unknown):string[]{
  const object=(data&&typeof data==="object"?data:{}) as Record<string,unknown>;
  const items=Array.isArray(data)?data as ApiEntity[]:[];
  const maps:Record<string,string[]>={
    "farmer/orders":[text(items.filter(i=>i.status==="PAID").length),text(items.filter(i=>!["COMPLETED","CANCELLED","REFUNDED"].includes(text(i.status))).length),text(items.filter(i=>i.status==="COMPLETED").length),formatMoney(items.reduce((sum,i)=>sum+apiNumber(i.total),0))],
    "farmer/plots":[text(items.length),text(items.filter(i=>i.status==="ADOPTED"||i.status==="GROWING").length),text(items.filter(i=>i.status==="AVAILABLE").length),text(items.filter(i=>i.status==="PENDING_APPROVAL").length)],
    "farmer/journal":[text(items.length),text(items.filter(i=>i.syncStatus==="SYNCED").length),text(items.filter(i=>i.syncStatus!=="SYNCED").length),text(items.filter(i=>i.aiAnalysisStatus==="COMPLETED").length)],
    "farmer/iot":[text(apiEntities(object.readings).at(0)?.temperature,"—")+"°C",text(apiEntities(object.readings).at(0)?.soilMoisture,"—")+"%",text(apiEntities(object.readings).at(0)?.ph,"—"),text(apiEntities(object.alerts).length)],
    "farmer/ai":[text(items.length),text(items.reduce((sum,i)=>sum+apiNumber(i.detectedFruitCount),0)),text(items.filter(i=>i.farmerValidation).length),text(items.filter(i=>i.diseaseRisk).length)],
    "farmer/livestreams":[text(items.length),text(items.reduce((sum,i)=>sum+apiNumber(i.viewerCount),0)),text(items.filter(i=>i.status==="LIVE").length),text(items.filter(i=>i.status==="PENDING_APPROVAL").length)],
    "farmer/harvests":[text(apiEntities(object.upcomingPlots).length),text(apiEntities(object.harvests).reduce((sum,i)=>sum+apiNumber(i.actualYieldKg),0))+" kg",text(apiEntities(object.qualityChecks).length),text(apiEntities(object.harvests).filter(i=>i.status==="QA_PASSED").length)],
    "farmer/wallet":[formatMoney(object.balance),text(apiEntities(object.entries).length),text(apiEntities(object.payouts).filter(i=>i.status==="REQUESTED").length),text(apiEntities(object.payouts).filter(i=>i.status==="APPROVED").length)],
    "farmer/reports":[formatMoney(object.totalRevenue),text(object.actualYieldKg,"0")+" kg",text(object.diaryUpdates,"0"),text(object.completedOrders,"0")]
  };
  return maps[endpoint]??[];
}

function farmerRecords(data:unknown):WorkItem[]{
  return apiEntities(data).slice(0,10).map((item)=>({
    title:text(item.title??item.name??item.cropType??item.activityType??item.type,"Bản ghi từ API"),
    meta:[item.season,item.region,item.email,item.expectedHarvestAt?`Thu hoạch ${formatDate(item.expectedHarvestAt)}`:null].filter(Boolean).map(String).join(" · ")||text(item.id),
    status:text(item.status??item.syncStatus,"Đã tải")
  }));
}

export function FarmerOperationPage({ endpoint, query, icon, eyebrow, title, description, metrics, items, featureTitle, featureCopy, image="/images/orchard-farmer.jpg", action, actionHref, mode="default" }:{ endpoint:string; query:UseQueryResult<unknown>; icon:LucideIcon; eyebrow:string; title:string; description:string; metrics:Metric[]; items:WorkItem[]; featureTitle:string; featureCopy:string; image?:string; action?:string; actionHref?:string; mode?:"default"|"journal"|"iot"|"ai" }){

  const values=query.isSuccess?farmerMetrics(endpoint,query.data):[];
  const visibleMetrics=metrics.map((metric,index)=>values[index]===undefined?metric:{...metric,value:values[index]});
  const visibleItems=query.isSuccess?farmerRecords(query.data):items;
  return <div className="mx-auto max-w-[1380px]"><FarmerPageHeader icon={icon} eyebrow={eyebrow} title={title} description={description} action={action} actionHref={actionHref}/><ApiStatus connected={query.isSuccess} error={query.error instanceof Error?query.error.message:query.error?"Không thể kết nối API":undefined}/><MetricStrip items={visibleMetrics}/><div className="mt-6 grid gap-6 xl:grid-cols-[1.08fr_.92fr]"><WorkList title="Dữ liệu mới nhất" items={visibleItems} empty="Chưa có dữ liệu trên API cho mục này."/><section className="relative min-h-[390px] overflow-hidden rounded-2xl bg-[#153f30] text-white"><Image src={image} fill sizes="(max-width:1280px) 100vw,45vw" alt="Vườn cây đang được chăm sóc" className="object-cover opacity-45"/><div className="absolute inset-0 bg-gradient-to-t from-[#102f25] via-[#153f30]/45 to-transparent"/><div className="relative flex h-full min-h-[390px] flex-col justify-between p-6 sm:p-8"><div className="flex items-center justify-between"><StatusPill tone={mode==="ai"?"blue":"green"}>{mode==="iot"?"● MQTT TRỰC TUYẾN":mode==="ai"?"AI · TANSTACK QUERY":"API · TANSTACK QUERY"}</StatusPill><div className="flex items-center gap-2 text-[10px] font-bold text-white/70"><Wifi className="size-4"/>{query.isSuccess?"Đã đồng bộ":query.isPending?"Đang tải":"Dữ liệu dự phòng"}</div></div><div><h2 className="max-w-lg text-3xl font-black leading-tight tracking-[-.04em]">{featureTitle}</h2><p className="mt-3 max-w-xl text-sm leading-6 text-white/70">{featureCopy}</p>{mode==="journal"&&<div className="mt-5 flex flex-wrap gap-2">{[[Camera,"Chụp ảnh"],[Mic,"Nói để ghi"],[WifiOff,"Lưu ngoại tuyến"]].map(([Icon,label])=>{const C=Icon as LucideIcon;return <button key={label as string} className="inline-flex items-center gap-2 rounded-lg bg-white/12 px-3.5 py-2 text-xs font-bold backdrop-blur"><C className="size-4"/>{label as string}</button>})}</div>}<div className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-[.12em] text-[#d6eda9]"><MapPin className="size-4"/> Vườn xanh Lâm Đồng <ChevronRight className="size-4"/></div></div></div></section></div></div>;
}
