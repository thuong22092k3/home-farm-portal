"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/query-keys.constant";
import { getFarmerJournalAPI } from "./farmer-journal.api";
import type { FarmerJournalREQ } from "./farmer-journal.req";

export function useFarmerJournalQuery(params: FarmerJournalREQ = {}) {
  return useQuery({
    queryKey: [...QUERY_KEYS.FARMER.JOURNAL, params],
    queryFn: ({ signal }) => getFarmerJournalAPI(params, signal),
  });
}
