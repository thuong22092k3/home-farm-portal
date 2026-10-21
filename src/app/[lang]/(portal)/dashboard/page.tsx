import { Plus } from "lucide-react";
import { notFound } from "next/navigation";
import { getMessages, locales, type Locale } from "@/i18n/resources";

export default async function DashboardPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!locales.includes(lang as Locale)) notFound();
  const locale = lang as Locale;
  const { common } = getMessages(locale);
  const stats = locale === "vi"
    ? [["Tổng số cây", "24", "18 cây đang cho trái", "🌳"], ["Cây đã thuê", "16", "8 cây còn sẵn sàng", "🤝"], ["Sản lượng dự kiến", "~ 1,2 tấn", "Ước tính cho vụ này", "⚖️"], ["Doanh thu dự kiến", "48,5 tr", "Trước chi phí vận hành", "₫"]]
    : [["Total trees", "24", "18 fruiting now", "🌳"], ["Rented trees", "16", "8 still available", "🤝"], ["Expected yield", "~ 1.2 t", "This season estimate", "⚖️"], ["Expected revenue", "48.5m", "Before operating costs", "₫"]];
  const tasks = locale === "vi"
    ? [["Tưới khu A", "07:30", "Đã xong"], ["Kiểm tra sâu bệnh SR-07", "09:00", "Đang làm"], ["Cập nhật ảnh cây thuê", "14:00", "Sắp tới"]]
    : [["Water zone A", "07:30", "Done"], ["Inspect SR-07", "09:00", "In progress"], ["Update rented tree photos", "14:00", "Upcoming"]];

  return (
    <div className="mx-auto max-w-[1320px]">
      <div className="portal-rise flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-extrabold tracking-[.18em] text-[#347858]">{common.harvestSeason}</p>
          <h1 className="mt-2 text-4xl font-black tracking-[-.055em] sm:text-5xl">{common.greeting} <span aria-hidden>🌿</span></h1>
          <p className="mt-2 text-[#718078]">{common.subtitle}</p>
        </div>
        <button type="button" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#143f30] px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#205740]">
          <Plus className="size-4" /> {common.addTree}
        </button>
      </div>

      <div className="portal-rise portal-rise-delay mt-8 grid gap-px overflow-hidden rounded-2xl border border-[#dfe2d4] bg-[#dfe2d4] sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([label, value, note, icon]) => (
          <section key={label} className="bg-[#fffefa] p-6">
            <div className="flex justify-between text-sm text-[#718078]"><span>{label}</span><span>{icon}</span></div>
            <p className="mt-3 text-3xl font-black tracking-tight">{value}</p>
            <p className="mt-1 text-xs text-[#859188]">{note}</p>
          </section>
        ))}
      </div>

      <section className="mt-5 grid gap-7 rounded-3xl border border-[#dfe2d4] bg-gradient-to-r from-[#edf5dc] to-[#fbf7e9] p-7 md:grid-cols-[1fr_360px]">
        <div>
          <p className="text-xs font-bold tracking-[.14em] text-[#347858]">{locale === "vi" ? "MÙA TRÁI ĐANG ĐẾN" : "HARVEST APPROACHING"}</p>
          <h2 className="mt-3 text-2xl font-black">{common.comingHarvest}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#718078]">{locale === "vi" ? "Cập nhật nhật ký chăm sóc để khách thuê yên tâm theo dõi cây của mình." : "Keep care journals up to date so renters can follow their trees with confidence."}</p>
        </div>
        <div className="border-[#d9e2c7] md:border-l md:pl-8">
          <p className="text-4xl font-black">63%</p>
          <p className="text-sm text-[#718078]">{common.progress}</p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#dbe5d2]"><div className="h-full w-[63%] rounded-full bg-[#347858]" /></div>
          <p className="mt-2 text-xs text-[#718078]">{common.tasksDone}</p>
        </div>
      </section>

      <section className="mt-8 grid gap-7 lg:grid-cols-[1.15fr_.85fr]">
        <div>
          <div className="flex items-center justify-between border-b border-[#dfe2d4] pb-4">
            <h2 className="text-xl font-black">{locale === "vi" ? "Công việc hôm nay" : "Today’s work"}</h2>
            <span className="text-xs font-bold text-[#347858]">3 {locale === "vi" ? "việc" : "tasks"}</span>
          </div>
          <div className="divide-y divide-[#e2e4da]">
            {tasks.map(([task, time, status], index) => (
              <div key={task} className="flex items-center gap-4 py-4">
                <span className={`size-2.5 rounded-full ${index === 0 ? "bg-[#6fa166]" : index === 1 ? "bg-[#d3a24c]" : "bg-[#b8c0b9]"}`} />
                <p className="min-w-0 flex-1 truncate text-sm font-semibold">{task}</p>
                <span className="text-xs text-[#718078]">{time}</span>
                <span className="w-20 text-right text-xs font-bold text-[#52665c]">{status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl bg-[#143f30] p-7 text-white">
          <p className="text-xs font-bold tracking-[.14em] text-[#cde49f]">{locale === "vi" ? "VƯỜN HÔM NAY" : "FARM TODAY"}</p>
          <p className="mt-5 text-5xl font-black">29°C</p>
          <p className="mt-1 text-sm text-white/58">{locale === "vi" ? "Nắng nhẹ · Độ ẩm 78%" : "Light sun · Humidity 78%"}</p>
          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/12 pt-5 text-sm">
            <div><p className="text-white/45">{locale === "vi" ? "Khu cần tưới" : "Zones to water"}</p><p className="mt-1 text-2xl font-black">02</p></div>
            <div><p className="text-white/45">{locale === "vi" ? "Cảnh báo" : "Alerts"}</p><p className="mt-1 text-2xl font-black">01</p></div>
          </div>
        </div>
      </section>
    </div>
  );
}
