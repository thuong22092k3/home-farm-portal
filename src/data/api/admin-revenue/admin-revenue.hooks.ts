"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/query-keys.constant";
import { getAdminRevenueAPI } from "./admin-revenue.api";

export function useAdminRevenueQuery() {
  return useQuery({
    queryKey: [...QUERY_KEYS.ADMIN.REVENUE],
    queryFn: ({ signal }) => getAdminRevenueAPI(signal),
  });
}
