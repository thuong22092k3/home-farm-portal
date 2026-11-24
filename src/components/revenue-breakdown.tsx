import { ArrowUpRight, Megaphone, Repeat2, ShoppingBasket, Sparkles, Tractor } from "lucide-react";

const sources = [
  { label: "Gói subscription", value: "86,4 tr", percent: 61, change: "+16,8%", icon: Repeat2, color: "bg-[#347858]" },
  { label: "Quảng cáo & tài trợ", value: "21,8 tr", percent: 15, change: "+24,6%", icon: Megaphone, color: "bg-[#d2a24f]" },
  { label: "Phí giao dịch OCOP", value: "17,2 tr", percent: 12, change: "+9,2%", icon: ShoppingBasket, color: "bg-[#4f8b89]" },
  { label: "Trải nghiệm tại vườn", value: "10,6 tr", percent: 7, change: "+11,4%", icon: Tractor, color: "bg-[#789653]" },
  { label: "Dịch vụ khác", value: "6,0 tr", percent: 5, change: "+4,1%", icon: Sparkles, color: "bg-[#9a8270]" }
];

const months = [42, 48, 45, 58, 64, 61, 72, 76, 83, 91, 88, 100];

export function RevenueBreakdown() {
  return <section className="mt-6 grid gap-4 xl:grid-cols-[1.08fr_.92fr]">
    <div className="rounded-xl border border-[#183f31]/12 bg-[#fffefa] p-5 sm:p-6"><div className="flex items-start justify-between"><div><h2 className="text-lg font-black tracking-[-.03em]">Cơ cấu doanh thu tháng 11</h2><p className="mt-1 text-xs text-[#7b8981]">Doanh thu thuần theo từng nguồn</p></div><span className="rounded-full bg-[#e3efd9] px-2.5 py-1 text-[10px] font-black text-[#347355]">+18,2%</span></div><div className="mt-6 space-y-5">{sources.map(({ label,value,percent,change,icon:Icon,color }) => <div key={label}><div className="mb-2 flex items-center gap-3"><span className="grid size-8 place-items-center rounded-lg bg-[#edf3e9] text-[#347858]"><Icon className="size-4" /></span><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{label}</p><p className="text-[10px] text-[#7b8981]">{percent}% tổng doanh thu</p></div><p className="text-sm font-black">{value}</p><span className="w-14 text-right text-[10px] font-bold text-[#347355]">{change}</span></div><div className="ml-11 h-1.5 overflow-hidden rounded-full bg-[#edf0e9]"><div className={`h-full rounded-full ${color}`} style={{width:`${percent}%`}} /></div></div>)}</div></div>
    <div className="flex flex-col rounded-xl bg-[#153f30] p-5 text-white sm:p-6"><div className="flex items-start justify-between"><div><p className="text-[10px] font-black uppercase tracking-[.15em] text-[#cde49f]">Doanh thu 12 tháng</p><p className="mt-2 text-4xl font-black tracking-[-.055em]">1,38 tỷ</p><p className="mt-1 text-xs text-white/50">Doanh thu thuần · +32,4% YoY</p></div><ArrowUpRight className="size-5 text-[#cde49f]" /></div><div className="mt-auto flex h-48 items-end gap-2 pt-8">{months.map((height,index) => <div key={index} className="group flex h-full flex-1 items-end"><div className={`w-full rounded-t-sm transition group-hover:bg-[#d8eea9] ${index === months.length - 1 ? "bg-[#d8eea9]" : "bg-white/18"}`} style={{height:`${height}%`}} /></div>)}</div><div className="mt-3 flex justify-between text-[9px] font-bold uppercase tracking-wider text-white/35"><span>T12/25</span><span>T3</span><span>T6</span><span>T9</span><span>T11/26</span></div></div>
  </section>;
}
