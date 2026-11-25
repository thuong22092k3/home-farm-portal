import { ENDPOINTS } from "@/lib/constants/endpoints.constant";
import { apiClient, portalHeaders } from "../apiClient";
import type { FarmerWalletRES } from "./farmer-wallet.res";

export function getFarmerWalletAPI(signal?: AbortSignal) {
  return apiClient.get<FarmerWalletRES, FarmerWalletRES>(ENDPOINTS.FARMER.WALLET, {
    headers: portalHeaders("farmer"),
    signal,
  });
}
