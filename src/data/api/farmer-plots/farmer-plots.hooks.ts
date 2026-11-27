"use client";

import type { BasePaginationRequest } from "../types/base.type";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/query-keys.constant";
import { getFarmerPlotsAPI } from "./farmer-plots.api";
import type { FarmerPlotsREQ } from "./farmer-plots.req";

export function useFarmerPlotsQuery(params: Partial<BasePaginationRequest<FarmerPlotsREQ>> = {}) {
  const request = { ...params, page: params.page ?? 1, size: params.size ?? 20 };
  return useQuery({
    queryKey: [...QUERY_KEYS.FARMER.PLOTS, request],
    queryFn: ({ signal }) => getFarmerPlotsAPI(request, signal),
  });
}
