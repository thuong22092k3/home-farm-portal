import { ENDPOINTS } from "@/lib/constants/endpoints.constant";
import { apiClient, portalHeaders } from "../apiClient";
import type { AdminFinanceRES } from "./admin-finance.res";

export function getAdminFinanceAPI(signal?: AbortSignal) {
  return apiClient.get<AdminFinanceRES, AdminFinanceRES>(ENDPOINTS.ADMIN.FINANCE, {
    headers: portalHeaders("admin"),
    signal,
  });
}
