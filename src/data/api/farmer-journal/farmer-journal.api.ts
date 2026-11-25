import { ENDPOINTS } from "@/lib/constants/endpoints.constant";
import { apiClient, portalHeaders } from "../apiClient";
import type { FarmerJournalREQ } from "./farmer-journal.req";
import type { FarmerJournalRES } from "./farmer-journal.res";

export function getFarmerJournalAPI(params: FarmerJournalREQ = {}, signal?: AbortSignal) {
  return apiClient.get<FarmerJournalRES, FarmerJournalRES>(ENDPOINTS.FARMER.JOURNAL, {
    headers: portalHeaders("farmer"),
    params,
    signal,
  });
}
