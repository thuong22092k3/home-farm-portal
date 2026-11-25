"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/query-keys.constant";
import { getAdminDashboardAPI } from "./admin-dashboard.api";

export function useAdminDashboardQuery() {
  return useQuery({
    queryKey: [...QUERY_KEYS.ADMIN.DASHBOARD],
    queryFn: ({ signal }) => getAdminDashboardAPI(signal),
  });
}
