import { ENDPOINTS } from "@/lib/constants/endpoints.constant";
import { apiClient, portalHeaders } from "../apiClient";
import type { AdminOrdersREQ } from "./admin-orders.req";
import type { AdminOrdersRES } from "./admin-orders.res";

export function getAdminOrdersAPI(params: AdminOrdersREQ = {}, signal?: AbortSignal) {
  return apiClient.get<AdminOrdersRES, AdminOrdersRES>(ENDPOINTS.ADMIN.ORDERS, {
    headers: portalHeaders("admin"),
    params,
    signal,
  });
}
