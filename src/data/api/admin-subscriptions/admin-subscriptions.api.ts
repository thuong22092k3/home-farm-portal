import { ENDPOINTS } from "@/lib/constants/endpoints.constant";
import { apiClient, portalHeaders } from "../apiClient";
import type { AdminSubscriptionsRES } from "./admin-subscriptions.res";
import type { CreateSubscriptionREQ } from "./admin-subscriptions.req";
import type { ApiEntity } from "../types/base.type";

export function getAdminSubscriptionsAPI(signal?: AbortSignal) {
  return apiClient.get<AdminSubscriptionsRES, AdminSubscriptionsRES>(ENDPOINTS.ADMIN.SUBSCRIPTIONS, {
    headers: portalHeaders("admin"),
    signal,
  });
}

export function createSubscriptionAPI(payload: CreateSubscriptionREQ) {
  return apiClient.post<ApiEntity, ApiEntity>(ENDPOINTS.ADMIN.SUBSCRIPTIONS, payload, {
    headers: portalHeaders("admin"),
  });
}
