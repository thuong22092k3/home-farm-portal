"use client";

import type { BasePaginationRequest } from "../types/base.type";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/query-keys.constant";
import { getFarmerLivestreamsAPI } from "./farmer-livestreams.api";
import type { FarmerLivestreamsREQ } from "./farmer-livestreams.req";

export function useFarmerLivestreamsQuery(params: Partial<BasePaginationRequest<FarmerLivestreamsREQ>> = {}) {
  const request = { ...params, page: params.page ?? 1, size: params.size ?? 20 };
  return useQuery({
    queryKey: [...QUERY_KEYS.FARMER.LIVESTREAMS, request],
    queryFn: ({ signal }) => getFarmerLivestreamsAPI(request, signal),
  });
}
