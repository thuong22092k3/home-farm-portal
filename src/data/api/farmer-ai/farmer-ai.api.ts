import { ENDPOINTS } from "@/lib/constants/endpoints.constant";
import { apiClient, portalHeaders } from "../apiClient";
import type { FarmerAiRES } from "./farmer-ai.res";

export function getFarmerAiAPI(signal?: AbortSignal) {
  return apiClient.get<FarmerAiRES, FarmerAiRES>(ENDPOINTS.FARMER.AI, {
    headers: portalHeaders("farmer"),
    signal,
  });
}
