import { ENDPOINTS } from "@/lib/constants/endpoints.constant";
import { apiClient, portalHeaders } from "../apiClient";
import type { AdminPartnersREQ } from "./admin-partners.req";
import type { AdminPartnersRES } from "./admin-partners.res";

export function getAdminPartnersAPI(params: AdminPartnersREQ = {}, signal?: AbortSignal) {
  return apiClient.get<AdminPartnersRES, AdminPartnersRES>(ENDPOINTS.ADMIN.PARTNERS, {
    headers: portalHeaders("admin"),
    params,
    signal,
  });
}
