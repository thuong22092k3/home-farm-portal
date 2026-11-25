import { ENDPOINTS } from "@/lib/constants/endpoints.constant";
import { apiClient, portalHeaders } from "../apiClient";
import type { FarmerDashboardRES } from "./farmer-dashboard.res";

export function getFarmerDashboardAPI(signal?: AbortSignal) {
  return apiClient.get<FarmerDashboardRES, FarmerDashboardRES>(ENDPOINTS.FARMER.DASHBOARD, {
    headers: portalHeaders("farmer"),
    signal,
  });
}
