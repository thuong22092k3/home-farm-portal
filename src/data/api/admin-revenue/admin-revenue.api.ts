import { ENDPOINTS } from "@/lib/constants/endpoints.constant";
import { apiClient, portalHeaders } from "../apiClient";
import type { AdminRevenueRES } from "./admin-revenue.res";

export function getAdminRevenueAPI(signal?: AbortSignal) {
  return apiClient.get<AdminRevenueRES, AdminRevenueRES>(ENDPOINTS.ADMIN.REVENUE, {
    headers: portalHeaders("admin"),
    signal,
  });
}
