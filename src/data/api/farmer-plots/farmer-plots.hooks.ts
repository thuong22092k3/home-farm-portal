"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/query-keys.constant";
import { getFarmerPlotsAPI } from "./farmer-plots.api";
import type { FarmerPlotsREQ } from "./farmer-plots.req";

export function useFarmerPlotsQuery(params: FarmerPlotsREQ = {}) {
  return useQuery({
    queryKey: [...QUERY_KEYS.FARMER.PLOTS, params],
    queryFn: ({ signal }) => getFarmerPlotsAPI(params, signal),
  });
}
