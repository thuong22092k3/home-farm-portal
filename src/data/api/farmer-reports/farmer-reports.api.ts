import { ENDPOINTS } from "@/lib/constants/endpoints.constant";
import { apiClient, portalHeaders } from "../apiClient";
import type { FarmerReportsRES } from "./farmer-reports.res";

export function getFarmerReportsAPI(signal?: AbortSignal) {
  return apiClient.get<FarmerReportsRES, FarmerReportsRES>(ENDPOINTS.FARMER.REPORTS, {
    headers: portalHeaders("farmer"),
    signal,
  });
}
