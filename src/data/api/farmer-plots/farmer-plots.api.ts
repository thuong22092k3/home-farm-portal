import { ENDPOINTS } from "@/lib/constants/endpoints.constant";
import { apiClient, portalHeaders } from "../apiClient";
import type { FarmerPlotsREQ } from "./farmer-plots.req";
import type { FarmerPlotsRES } from "./farmer-plots.res";

export function getFarmerPlotsAPI(params: FarmerPlotsREQ = {}, signal?: AbortSignal) {
  return apiClient.get<FarmerPlotsRES, FarmerPlotsRES>(ENDPOINTS.FARMER.PLOTS, {
    headers: portalHeaders("farmer"),
    params,
    signal,
  });
}
