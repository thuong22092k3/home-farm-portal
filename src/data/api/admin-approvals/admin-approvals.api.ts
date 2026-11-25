import { ENDPOINTS } from "@/lib/constants/endpoints.constant";
import { apiClient, portalHeaders } from "../apiClient";
import type { AdminApprovalsREQ } from "./admin-approvals.req";
import type { AdminApprovalsRES } from "./admin-approvals.res";

export function getAdminApprovalsAPI(params: AdminApprovalsREQ = {}, signal?: AbortSignal) {
  return apiClient.get<AdminApprovalsRES, AdminApprovalsRES>(ENDPOINTS.ADMIN.APPROVALS, {
    headers: portalHeaders("admin"),
    params,
    signal,
  });
}
