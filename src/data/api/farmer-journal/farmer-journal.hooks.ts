"use client";

import type { BasePaginationRequest } from "../types/base.type";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/query-keys.constant";
import { getFarmerJournalAPI } from "./farmer-journal.api";
import type { FarmerJournalREQ } from "./farmer-journal.req";

export function useFarmerJournalQuery(params: Partial<BasePaginationRequest<FarmerJournalREQ>> = {}) {
  const request = { ...params, page: params.page ?? 1, size: params.size ?? 20 };
  return useQuery({
    queryKey: [...QUERY_KEYS.FARMER.JOURNAL, request],
    queryFn: ({ signal }) => getFarmerJournalAPI(request, signal),
  });
}
