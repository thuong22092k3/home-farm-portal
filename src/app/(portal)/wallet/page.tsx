"use client";

import { WalletCards } from "lucide-react";
import { useFarmerWalletQuery } from "@/data/api/farmer-wallet/farmer-wallet.hooks";
import { ENDPOINTS } from "@/lib/constants/endpoints.constant";
import { FarmerOperationPage } from "@/components/farmer-operation-page";
export default function WalletPage(){const query = useFarmerWalletQuery(); return <FarmerOperationPage endpoint={ENDPOINTS.FARMER.WALLET} query={query} icon={WalletCards} eyebrow="Tài chính minh bạch" title="Ví và giải ngân" description="Theo dõi doanh thu theo gói, phí nền tảng và lịch chuyển tiền về tài khoản ngân hàng." action="Rút tiền" actionHref="/wallet/withdraw" metrics={[{label:"Số dư khả dụng",value:"48,5 tr",note:"Có thể rút",tone:"green"},{label:"Chờ đối soát",value:"12,8 tr",note:"18 giao dịch"},{label:"Giải ngân kế tiếp",value:"15/11",note:"32,4 triệu",tone:"blue"},{label:"Phí nền tảng",value:"4,2%",note:"Tháng 11"}]} items={[{title:"Thuê vụ · Đơn #HF-1028",meta:"Hôm nay, 08:12 · VNPay",status:"+4.800.000đ"},{title:"Gói tặng quà · #HF-1027",meta:"Hôm qua, 19:40 · MoMo",status:"+2.250.000đ"},{title:"Giải ngân kỳ 31/10",meta:"Vietcombank •• 2868",status:"-28.600.000đ"}]} featureTitle="Dòng tiền rõ từng cây, từng gói, từng kỳ" featureCopy="Mọi khoản thu, phí và giải ngân đều có đối soát; nhà vườn chủ động kế hoạch vật tư và mùa vụ tiếp theo." image="/images/honey-flowers.jpg"/>}
