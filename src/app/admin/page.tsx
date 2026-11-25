"use client";

import { Activity, LayoutDashboard, ShieldAlert, UsersRound } from "lucide-react";
import { useAdminDashboardQuery } from "@/data/api/admin-dashboard/admin-dashboard.hooks";
import { ENDPOINTS } from "@/lib/constants/endpoints.constant";
import { AdminPage } from "@/components/admin-page";
import { RevenueBreakdown } from "@/components/revenue-breakdown";

export default function AdminDashboardPage() {
  const query = useAdminDashboardQuery(); return <AdminPage endpoint={ENDPOINTS.ADMIN.DASHBOARD} query={query} icon={LayoutDashboard} eyebrow="Toàn hệ thống" title="Tổng quan điều hành" description="Theo dõi tăng trưởng, chất lượng vận hành và các hàng chờ cần quản trị viên xử lý." metrics={[{label:"Người dùng hoạt động",value:"2.846",change:"+12,4%"},{label:"Nhà vườn & HTX",value:"48",change:"+5 mới"},{label:"GMV tháng 11",value:"1,42 tỷ",change:"+18,2%",tone:"blue"},{label:"Cảnh báo cần xử lý",value:"17",change:"5 nghiêm trọng",tone:"red"}]} sectionTitle="Ưu tiên hôm nay" records={[{id:"APR-0482",title:"Hồ sơ HTX Nông nghiệp Mỹ Xương",detail:"Đăng ký đối tác · 12 giấy tờ đã tải lên",meta:"18 phút",status:"Chờ duyệt",tone:"amber"},{id:"QA-0198",title:"Kết quả kiểm định lô BC-C4",detail:"Dư lượng nằm trong ngưỡng · cần xác nhận phát hành",meta:"42 phút",status:"QA/QC",tone:"blue"},{id:"PAY-8821",title:"Đợt giải ngân nhà vườn tuần 47",detail:"32 đối tác · tổng giá trị 486,2 triệu",meta:"2 giờ",status:"Đối soát",tone:"amber"},{id:"SUP-2104",title:"Khiếu nại giao trễ đơn #HF-9812",detail:"Khách hàng ưu tiên · trễ chuỗi lạnh 6 giờ",meta:"3 giờ",status:"Khẩn",tone:"red"}]} action="Xem hàng chờ" actionHref="/admin/approvals">
    <RevenueBreakdown />
    <section className="mt-4 grid gap-4 lg:grid-cols-3"><div className="rounded-xl bg-[#153f30] p-5 text-white"><Activity className="size-5 text-[#cde49f]" /><p className="mt-8 text-3xl font-black tracking-[-.04em]">99,94%</p><p className="mt-1 text-xs text-white/55">Uptime nền tảng · 30 ngày</p></div><div className="rounded-xl border border-[#183f31]/12 bg-white/70 p-5"><UsersRound className="size-5 text-[#347858]" /><p className="mt-8 text-3xl font-black tracking-[-.04em]">86%</p><p className="mt-1 text-xs text-[#718078]">Nông dân cập nhật đúng tần suất</p></div><div className="rounded-xl border border-[#183f31]/12 bg-white/70 p-5"><ShieldAlert className="size-5 text-[#b36e25]" /><p className="mt-8 text-3xl font-black tracking-[-.04em]">03</p><p className="mt-1 text-xs text-[#718078]">Lô hàng đang tạm giữ QA</p></div></section>
  </AdminPage>;
}
