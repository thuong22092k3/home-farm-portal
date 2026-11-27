"use client";

import type { BasePaginationRequest } from "../types/base.type";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/query-keys.constant";
import { getFarmerAiAPI } from "./farmer-ai.api";

export function useFarmerAiQuery(params: Partial<BasePaginationRequest<object>> = {}) {
  const request = { ...params, page: params.page ?? 1, size: params.size ?? 20 };
  return useQuery({
    queryKey: [...QUERY_KEYS.FARMER.AI, request],
    queryFn: ({ signal }) => getFarmerAiAPI(request, signal),
  });
}
