import { ENDPOINTS } from "@/lib/constants/endpoints.constant";
import { apiClient, portalHeaders } from "../apiClient";
import type { AdminComplianceREQ } from "./admin-compliance.req";
import type { AdminComplianceRES } from "./admin-compliance.res";

export function getAdminComplianceAPI(params: AdminComplianceREQ = {}, signal?: AbortSignal) {
  return apiClient.get<AdminComplianceRES, AdminComplianceRES>(ENDPOINTS.ADMIN.COMPLIANCE, {
    headers: portalHeaders("admin"),
    params,
    signal,
  });
}
