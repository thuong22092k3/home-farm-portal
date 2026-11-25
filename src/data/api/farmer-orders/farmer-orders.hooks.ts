"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/query-keys.constant";
import { getFarmerOrdersAPI } from "./farmer-orders.api";
import type { FarmerOrdersREQ } from "./farmer-orders.req";

export function useFarmerOrdersQuery(params: FarmerOrdersREQ = {}) {
  return useQuery({
    queryKey: [...QUERY_KEYS.FARMER.ORDERS, params],
    queryFn: ({ signal }) => getFarmerOrdersAPI(params, signal),
  });
}
