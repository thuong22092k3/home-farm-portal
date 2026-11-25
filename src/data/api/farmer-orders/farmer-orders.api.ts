import { ENDPOINTS } from "@/lib/constants/endpoints.constant";
import { apiClient, portalHeaders } from "../apiClient";
import type { FarmerOrdersREQ } from "./farmer-orders.req";
import type { FarmerOrdersRES } from "./farmer-orders.res";

export function getFarmerOrdersAPI(params: FarmerOrdersREQ = {}, signal?: AbortSignal) {
  return apiClient.get<FarmerOrdersRES, FarmerOrdersRES>(ENDPOINTS.FARMER.ORDERS, {
    headers: portalHeaders("farmer"),
    params,
    signal,
  });
}
