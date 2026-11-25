"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/query-keys.constant";
import { getFarmerLivestreamsAPI } from "./farmer-livestreams.api";
import type { FarmerLivestreamsREQ } from "./farmer-livestreams.req";

export function useFarmerLivestreamsQuery(params: FarmerLivestreamsREQ = {}) {
  return useQuery({
    queryKey: [...QUERY_KEYS.FARMER.LIVESTREAMS, params],
    queryFn: ({ signal }) => getFarmerLivestreamsAPI(params, signal),
  });
}
