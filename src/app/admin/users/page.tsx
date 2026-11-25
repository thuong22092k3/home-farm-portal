"use client";

import { UsersRound } from "lucide-react";
import { useAdminUsersQuery } from "@/data/api/admin-users/admin-users.hooks";
import { ENDPOINTS } from "@/lib/constants/endpoints.constant";
import { AdminPage } from "@/components/admin-page";
export default function Page(){const query = useAdminUsersQuery(); return <AdminPage endpoint={ENDPOINTS.ADMIN.USERS} query={query} icon={UsersRound} eyebrow="Tài khoản & phân quyền" title="Quản lý người dùng" description="Theo dõi khách hàng, trạng thái xác thực, hoạt động thuê bao và các tài khoản có rủi ro." action="Thêm người dùng" actionHref="/admin/users/new" metrics={[{label:"Tổng tài khoản",value:"3.284",change:"+184 tháng này"},{label:"Đang hoạt động",value:"2.846",change:"86,7%"},{label:"Thuê bao trả phí",value:"1.924",change:"+14,2%",tone:"blue"},{label:"Bị giới hạn",value:"12",change:"Cần rà soát",tone:"red"}]} sectionTitle="Danh sách người dùng" records={[{id:"USR-2846",title:"Nguyễn Minh Anh",detail:"minhanh@email.com · 3 gói đang hoạt động",meta:"5 phút",status:"Hoạt động"},{id:"USR-2845",title:"Trần Gia Hân",detail:"Đã xác thực · Gói tặng quà",meta:"24 phút",status:"Mới",tone:"blue"},{id:"USR-1932",title:"Phạm Quốc Duy",detail:"2 giao dịch thanh toán thất bại",meta:"1 ngày",status:"Rủi ro",tone:"red"},{id:"USR-1148",title:"Lê Hoàng Nam",detail:"Khách hàng từ tháng 03/2026",meta:"2 ngày",status:"Hoạt động"}]} />}
