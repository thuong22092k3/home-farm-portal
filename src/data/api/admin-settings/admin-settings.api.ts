import { ENDPOINTS } from "@/lib/constants/endpoints.constant";
import { apiClient, portalHeaders } from "../apiClient";
import type { AdminSettingsRES } from "./admin-settings.res";

export function getAdminSettingsAPI(signal?: AbortSignal) {
  return apiClient.get<AdminSettingsRES, AdminSettingsRES>(ENDPOINTS.ADMIN.SETTINGS, {
    headers: portalHeaders("admin"),
    signal,
  });
}
