"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/query-keys.constant";
import { getAdminAnalyticsAPI } from "./admin-analytics.api";

export function useAdminAnalyticsQuery() {
  return useQuery({
    queryKey: [...QUERY_KEYS.ADMIN.ANALYTICS],
    queryFn: ({ signal }) => getAdminAnalyticsAPI(signal),
  });
}
