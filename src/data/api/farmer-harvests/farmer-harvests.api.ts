import { ENDPOINTS } from "@/lib/constants/endpoints.constant";
import { apiClient, portalHeaders } from "../apiClient";
import type { FarmerHarvestsRES } from "./farmer-harvests.res";

export function getFarmerHarvestsAPI(signal?: AbortSignal) {
  return apiClient.get<FarmerHarvestsRES, FarmerHarvestsRES>(ENDPOINTS.FARMER.HARVESTS, {
    headers: portalHeaders("farmer"),
    signal,
  });
}
