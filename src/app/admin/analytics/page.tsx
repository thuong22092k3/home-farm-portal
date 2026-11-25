"use client";

import { BarChart3 } from "lucide-react";
import { useAdminAnalyticsQuery } from "@/data/api/admin-analytics/admin-analytics.hooks";
import { ENDPOINTS } from "@/lib/constants/endpoints.constant";
import { AdminPage } from "@/components/admin-page";
export default function Page(){const query = useAdminAnalyticsQuery(); return <AdminPage endpoint={ENDPOINTS.ADMIN.ANALYTICS} query={query} icon={BarChart3} eyebrow="Dữ liệu quản trị" title="Báo cáo hệ thống" description="Theo dõi tăng trưởng, hiệu quả thuê bao, chất lượng vận hành và sức khỏe mạng lưới đối tác." metrics={[{label:"Thuê bao hoạt động",value:"1.924",change:"+14,2%"},{label:"Tỷ lệ giữ chân",value:"87,6%",change:"+2,8%"},{label:"NPS",value:"48",change:"+6 điểm",tone:"blue"},{label:"Churn",value:"3,8%",change:"-0,7%",tone:"green"}]} sectionTitle="Bộ báo cáo" records={[{id:"RPT-011",title:"Tăng trưởng thuê bao và GMV",detail:"Theo tuần · phân tách theo gói dịch vụ",meta:"Hôm nay",status:"Tự động"},{id:"RPT-010",title:"Hiệu suất nhà vườn và HTX",detail:"Nhật ký, giao hàng, QA/QC và CSAT",meta:"Hôm nay",status:"Tự động",tone:"blue"},{id:"RPT-009",title:"Báo cáo tài chính tháng 11",detail:"GMV, phí nền tảng, hoàn tiền và giải ngân",meta:"1 ngày",status:"Bản nháp",tone:"amber"},{id:"RPT-008",title:"Rủi ro vận hành quý IV",detail:"Hàng chờ, SLA, khiếu nại và tuân thủ",meta:"3 ngày",status:"Đã xuất"}]} />}
