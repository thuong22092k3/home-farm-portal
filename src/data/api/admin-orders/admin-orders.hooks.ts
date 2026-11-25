"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/query-keys.constant";
import { getAdminOrdersAPI } from "./admin-orders.api";
import type { AdminOrdersREQ } from "./admin-orders.req";

export function useAdminOrdersQuery(params: AdminOrdersREQ = {}) {
  return useQuery({
    queryKey: [...QUERY_KEYS.ADMIN.ORDERS, params],
    queryFn: ({ signal }) => getAdminOrdersAPI(params, signal),
  });
}
