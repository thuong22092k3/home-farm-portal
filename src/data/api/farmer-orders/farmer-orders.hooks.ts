"use client";

import type { BasePaginationRequest } from "../types/base.type";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/query-keys.constant";
import { getFarmerOrdersAPI } from "./farmer-orders.api";
import type { FarmerOrdersREQ } from "./farmer-orders.req";

export function useFarmerOrdersQuery(params: Partial<BasePaginationRequest<FarmerOrdersREQ>> = {}) {
  const request = { ...params, page: params.page ?? 1, size: params.size ?? 20 };
  return useQuery({
    queryKey: [...QUERY_KEYS.FARMER.ORDERS, request],
    queryFn: ({ signal }) => getFarmerOrdersAPI(request, signal),
  });
}
