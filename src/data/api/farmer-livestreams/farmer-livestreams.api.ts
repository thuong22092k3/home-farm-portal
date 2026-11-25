import { ENDPOINTS } from "@/lib/constants/endpoints.constant";
import { apiClient, portalHeaders } from "../apiClient";
import type { FarmerLivestreamsREQ } from "./farmer-livestreams.req";
import type { FarmerLivestreamsRES } from "./farmer-livestreams.res";

export function getFarmerLivestreamsAPI(params: FarmerLivestreamsREQ = {}, signal?: AbortSignal) {
  return apiClient.get<FarmerLivestreamsRES, FarmerLivestreamsRES>(ENDPOINTS.FARMER.LIVESTREAMS, {
    headers: portalHeaders("farmer"),
    params,
    signal,
  });
}
