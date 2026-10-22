import { ArrowUpRight, CloudSun, Droplets, Plus, Sprout, Wind } from "lucide-react";
import { getMessages } from "@/i18n/resources";

export default function DashboardPage() {
  const { common } = getMessages("vi");
  const stats = [["Tổng số cây", "24", "18 đang cho trái", "+03"], ["Cây đã thuê", "16", "8 cây còn sẵn sàng", "67%"], ["Sản lượng dự kiến", "1,2 tấn", "Ước tính vụ hiện tại", "+8%"], ["Doanh thu dự kiến", "48,5 tr", "Trước chi phí vận hành", "+12%"]];
  const tasks = [["Tưới khu A", "07:30", "Đã xong"], ["Kiểm tra sâu bệnh SR-07", "09:00", "Đang làm"], ["Cập nhật ảnh cây thuê", "14:00", "Sắp tới"]];

  return (
    <div className="mx-auto max-w-[1380px]">
      <div className="portal-rise flex flex-col gap-6 border-b border-[#173c2f]/20 pb-7 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-5 flex items-center gap-3 text-[10px] font-black uppercase tracking-[.24em] text-[#347858]"><span className="live-dot" /> Trạm vườn đang hoạt động <span className="text-[#173c2f]/35">/ 22.10.2026</span></div>
          <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#347858]">{common.harvestSeason}</p>
          <h1 className="mt-2 max-w-3xl text-5xl font-black leading-[.9] tracking-[-.07em] sm:text-7xl">Vườn khỏe.<br/><span className="text-[#6e904d]">Việc đúng nhịp.</span></h1>
          <p className="mt-5 max-w-xl text-sm leading-6 text-[#617269]">{common.subtitle} Mọi tín hiệu quan trọng của khu vườn được gom về một nơi.</p>
        </div>
        <button type="button" className="group inline-flex h-12 items-center justify-center gap-3 bg-[#143f30] px-6 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#205740] hover:shadow-[6px_6px_0_#cde49f]">
          <Plus className="size-4 transition-transform group-hover:rotate-90" /> {common.addTree}
        </button>
      </div>

      <div className="portal-rise portal-rise-delay mt-8 grid border-y border-[#173c2f]/20 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([label, value, note, change], index) => (
          <section key={label} className="stat-line group relative py-6 sm:px-6 first:pl-0">
            <div className="flex justify-between text-[11px] font-bold uppercase tracking-[.12em] text-[#718078]"><span>{String(index + 1).padStart(2, "0")} / {label}</span><span className="text-[#347858]">{change}</span></div>
            <p className="mt-7 text-4xl font-black tracking-[-.05em] transition-transform group-hover:-translate-y-1">{value}</p>
            <p className="mt-2 text-xs text-[#859188]">{note}</p>
          </section>
        ))}
      </div>

      <section className="field-panel mt-8 grid overflow-hidden bg-[#ddebba] md:grid-cols-[1fr_380px]">
        <div className="relative p-7 sm:p-10">
          <Sprout className="absolute -bottom-7 right-8 size-36 rotate-[-8deg] text-[#143f30]/8" strokeWidth={1} />
          <p className="text-[10px] font-black tracking-[.2em] text-[#347858]">DỰ BÁO THU HOẠCH / 06 TUẦN</p>
          <h2 className="mt-5 max-w-lg text-3xl font-black tracking-[-.04em] sm:text-4xl">{common.comingHarvest}</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#52665c]">Cập nhật nhật ký chăm sóc hôm nay để khách thuê theo dõi đúng nhịp phát triển của cây.</p>
          <button className="mt-8 inline-flex items-center gap-2 border-b border-[#143f30] pb-1 text-xs font-black uppercase tracking-[.12em]">Mở nhật ký <ArrowUpRight className="size-4" /></button>
        </div>
        <div className="flex flex-col justify-between bg-[#143f30] p-7 text-white sm:p-10">
          <div className="flex items-start justify-between"><p className="text-7xl font-black tracking-[-.08em]">63<span className="text-2xl text-[#cde49f]">%</span></p><span className="rounded-full border border-white/20 px-3 py-1 text-[10px] font-bold tracking-wider">ĐÚNG TIẾN ĐỘ</span></div>
          <div><p className="text-sm text-white/55">{common.progress}</p><div className="mt-4 h-1 bg-white/15"><div className="progress-grow h-full w-[63%] bg-[#cde49f]" /></div><p className="mt-3 text-xs text-white/55">{common.tasksDone}</p></div>
        </div>
      </section>

      <section className="mt-8 grid gap-7 lg:grid-cols-[1.15fr_.85fr]">
        <div>
          <div className="flex items-center justify-between border-b border-[#dfe2d4] pb-4">
            <h2 className="text-xl font-black">Công việc hôm nay</h2>
            <span className="text-xs font-bold text-[#347858]">3 việc</span>
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
        <div className="relative overflow-hidden border border-[#173c2f]/20 bg-[#fffefa] p-7">
          <div className="absolute right-5 top-5 flex gap-1"><span className="size-1.5 rounded-full bg-[#143f30]"/><span className="size-1.5 rounded-full bg-[#143f30]/25"/><span className="size-1.5 rounded-full bg-[#143f30]/25"/></div>
          <p className="text-[10px] font-black tracking-[.2em] text-[#347858]">VI KHÍ HẬU / TRỰC TIẾP</p>
          <div className="mt-6 flex items-center gap-5"><CloudSun className="size-14 text-[#d3a24c]" strokeWidth={1.5}/><div><p className="text-6xl font-black tracking-[-.07em]">29°</p><p className="text-xs text-[#718078]">Nắng nhẹ · khu A</p></div></div>
          <div className="mt-8 grid grid-cols-2 border-t border-[#173c2f]/15 pt-5 text-sm">
            <div className="flex items-center gap-3 border-r border-[#173c2f]/15"><Droplets className="size-4 text-[#347858]"/><div><p className="text-[10px] text-[#718078]">Độ ẩm</p><p className="font-black">78%</p></div></div>
            <div className="flex items-center gap-3 pl-5"><Wind className="size-4 text-[#347858]"/><div><p className="text-[10px] text-[#718078]">Gió</p><p className="font-black">8 km/h</p></div></div>
          </div>
        </div>
      </section>
    </div>
  );
}
