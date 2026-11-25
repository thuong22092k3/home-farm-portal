import { ENDPOINTS } from "@/lib/constants/endpoints.constant";
import { apiClient, portalHeaders } from "../apiClient";
import type { AdminUsersREQ } from "./admin-users.req";
import type { AdminUsersRES } from "./admin-users.res";

export function getAdminUsersAPI(params: AdminUsersREQ = {}, signal?: AbortSignal) {
  return apiClient.get<AdminUsersRES, AdminUsersRES>(ENDPOINTS.ADMIN.USERS, {
    headers: portalHeaders("admin"),
    params,
    signal,
  });
}
