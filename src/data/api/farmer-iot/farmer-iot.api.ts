import { ENDPOINTS } from "@/lib/constants/endpoints.constant";
import { apiClient, portalHeaders } from "../apiClient";
import type { FarmerIotREQ } from "./farmer-iot.req";
import type { FarmerIotRES } from "./farmer-iot.res";

export function getFarmerIotAPI(params: FarmerIotREQ = {}, signal?: AbortSignal) {
  return apiClient.get<FarmerIotRES, FarmerIotRES>(ENDPOINTS.FARMER.IOT, {
    headers: portalHeaders("farmer"),
    params,
    signal,
  });
}
