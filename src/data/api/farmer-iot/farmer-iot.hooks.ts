"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/query-keys.constant";
import { getFarmerIotAPI } from "./farmer-iot.api";
import type { FarmerIotREQ } from "./farmer-iot.req";

export function useFarmerIotQuery(params: FarmerIotREQ = {}) {
  return useQuery({
    queryKey: [...QUERY_KEYS.FARMER.IOT, params],
    queryFn: ({ signal }) => getFarmerIotAPI(params, signal),
  });
}
