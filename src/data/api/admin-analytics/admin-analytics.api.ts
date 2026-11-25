import { ENDPOINTS } from "@/lib/constants/endpoints.constant";
import { apiClient, portalHeaders } from "../apiClient";
import type { AdminAnalyticsRES } from "./admin-analytics.res";

export function getAdminAnalyticsAPI(signal?: AbortSignal) {
  return apiClient.get<AdminAnalyticsRES, AdminAnalyticsRES>(ENDPOINTS.ADMIN.ANALYTICS, {
    headers: portalHeaders("admin"),
    signal,
  });
}
