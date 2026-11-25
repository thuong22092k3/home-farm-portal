import { ENDPOINTS } from "@/lib/constants/endpoints.constant";
import { apiClient, portalHeaders } from "../apiClient";
import type { AdminDashboardRES } from "./admin-dashboard.res";

export function getAdminDashboardAPI(signal?: AbortSignal) {
  return apiClient.get<AdminDashboardRES, AdminDashboardRES>(ENDPOINTS.ADMIN.DASHBOARD, {
    headers: portalHeaders("admin"),
    signal,
  });
}
