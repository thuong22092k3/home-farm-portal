"use client";

import { RadioTower } from "lucide-react";
import { useFarmerIotQuery } from "@/data/api/farmer-iot/farmer-iot.hooks";
import { ENDPOINTS } from "@/lib/constants/endpoints.constant";
import { FarmerOperationPage } from "@/components/farmer-operation-page";
export default function IotPage(){const query = useFarmerIotQuery(); return <FarmerOperationPage endpoint={ENDPOINTS.FARMER.IOT} query={query} icon={RadioTower} eyebrow="Cảm biến thời gian thực" title="Trạm IoT" description="Theo dõi nhiệt độ, độ ẩm đất, pH và tình trạng kết nối của các trạm trong vườn." mode="iot" metrics={[{label:"Nhiệt độ đất",value:"26,4°C",note:"Trong ngưỡng tốt"},{label:"Độ ẩm đất",value:"68%",note:"+4% sau tưới",tone:"blue"},{label:"pH đất",value:"6,2",note:"Phù hợp xoài"},{label:"Trạm online",value:"5/6",note:"A-03 mất tín hiệu",tone:"amber"}]} items={[{title:"Độ ẩm thấp · Lô SR-B1",meta:"Trạm B-02 · 31 phút trước",status:"Cần tưới"},{title:"Trạm A-03 mất tín hiệu",meta:"Pin 12% · Đồng bộ cuối 06:42",status:"Kiểm tra"},{title:"Nhiệt độ tăng nhanh · Nhà màng",meta:"31,8°C · Cao hơn ngưỡng 2,8°C",status:"Cảnh báo"}]} featureTitle="26,4°C · 68% độ ẩm" featureCopy="Dữ liệu MQTT cập nhật mỗi 5 phút, tự động bổ sung vào nhật ký và cung cấp đầu vào cho dự báo sản lượng."/>}
