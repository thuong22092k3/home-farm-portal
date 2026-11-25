import { ENDPOINTS } from "@/lib/constants/endpoints.constant";
import { apiClient, portalHeaders } from "../apiClient";
import type { AdminSupportREQ } from "./admin-support.req";
import type { AdminSupportRES } from "./admin-support.res";

export function getAdminSupportAPI(params: AdminSupportREQ = {}, signal?: AbortSignal) {
  return apiClient.get<AdminSupportRES, AdminSupportRES>(ENDPOINTS.ADMIN.SUPPORT, {
    headers: portalHeaders("admin"),
    params,
    signal,
  });
}
