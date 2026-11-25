"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/query-keys.constant";
import { getFarmerDashboardAPI } from "./farmer-dashboard.api";

export function useFarmerDashboardQuery() {
  return useQuery({
    queryKey: [...QUERY_KEYS.FARMER.DASHBOARD],
    queryFn: ({ signal }) => getFarmerDashboardAPI(signal),
  });
}
