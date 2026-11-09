import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, CheckCircle2, ChevronRight, Clock3, MoreHorizontal } from "lucide-react";

export type Metric = { label: string; value: string; note: string; tone?: "green" | "amber" | "blue" };
export type WorkItem = { title: string; meta: string; status: string; href?: string };

export function FarmerPageHeader({ eyebrow, title, description, action, actionHref, icon: Icon }: { eyebrow: string; title: string; description: string; action?: string; actionHref?: string; icon?: LucideIcon }) {
  return (
    <header className="portal-rise flex flex-col gap-5 border-b border-[#183f31]/15 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.2em] text-[#4a7a5e]">{Icon && <Icon className="size-4" />} {eyebrow}</div>
        <h1 className="mt-3 text-4xl font-black leading-[.95] tracking-[-.055em] sm:text-5xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#65766d]">{description}</p>
      </div>
      {action && actionHref && <Link href={actionHref} className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#153f30] px-5 text-sm font-bold text-white shadow-[0_6px_20px_rgba(20,63,48,.16)] transition hover:-translate-y-0.5 hover:bg-[#245b43]">{action}<ArrowRight className="size-4" /></Link>}
    </header>
  );
}

export function MetricStrip({ items }: { items: Metric[] }) {
  return <div className="portal-rise portal-rise-delay mt-6 grid overflow-hidden rounded-2xl border border-[#183f31]/12 bg-white/70 sm:grid-cols-2 xl:grid-cols-4">{items.map((item) => <div key={item.label} className="metric-cell p-5"><p className="text-[10px] font-black uppercase tracking-[.14em] text-[#748279]">{item.label}</p><p className={`mt-3 text-3xl font-black tracking-[-.05em] ${item.tone === "amber" ? "text-[#a96e20]" : item.tone === "blue" ? "text-[#317d8b]" : "text-[#174b37]"}`}>{item.value}</p><p className="mt-1 text-xs text-[#7b8981]">{item.note}</p></div>)}</div>;
}

export function WorkList({ title, items, empty }: { title: string; items: WorkItem[]; empty?: string }) {
  return <section className="rounded-2xl border border-[#183f31]/12 bg-[#fffefa] p-5 sm:p-6"><div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-black tracking-[-.03em]">{title}</h2><MoreHorizontal className="size-5 text-[#8b978f]" /></div>{items.length ? <div className="divide-y divide-[#183f31]/10">{items.map((item, index) => { const content = <><span className={`grid size-9 shrink-0 place-items-center rounded-lg ${index === 0 ? "bg-[#e2efd4] text-[#347858]" : "bg-[#f4eee0] text-[#a4712b]"}`}>{index === 0 ? <CheckCircle2 className="size-4" /> : <Clock3 className="size-4" />}</span><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{item.title}</p><p className="mt-0.5 truncate text-xs text-[#7a8880]">{item.meta}</p></div><span className="rounded-full bg-[#eff3ec] px-2.5 py-1 text-[10px] font-bold text-[#52705f]">{item.status}</span>{item.href && <ChevronRight className="size-4 text-[#91a097]" />}</>; return item.href ? <Link key={item.title} href={item.href} className="flex items-center gap-3 py-3.5 transition hover:translate-x-1">{content}</Link> : <div key={item.title} className="flex items-center gap-3 py-3.5">{content}</div>; })}</div> : <p className="py-10 text-center text-sm text-[#7a8880]">{empty}</p>}</section>;
}

export function StatusPill({ children, tone = "green" }: { children: React.ReactNode; tone?: "green" | "amber" | "red" | "blue" }) {
  const colors = { green: "bg-[#e3efd9] text-[#347355]", amber: "bg-[#f7ebd3] text-[#99651f]", red: "bg-[#f8dfda] text-[#a44e40]", blue: "bg-[#dceff1] text-[#37727c]" };
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-black ${colors[tone]}`}>{children}</span>;
}
