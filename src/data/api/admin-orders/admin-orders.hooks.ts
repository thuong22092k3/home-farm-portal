"use client";

import type { BasePaginationRequest } from "../types/base.type";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/query-keys.constant";
import { getAdminOrdersAPI } from "./admin-orders.api";
import type { AdminOrdersREQ } from "./admin-orders.req";

export function useAdminOrdersQuery(params: Partial<BasePaginationRequest<AdminOrdersREQ>> = {}) {
  const request = { ...params, page: params.page ?? 1, size: params.size ?? 20 };
  return useQuery({
    queryKey: [...QUERY_KEYS.ADMIN.ORDERS, request],
    queryFn: ({ signal }) => getAdminOrdersAPI(request, signal),
  });
}
