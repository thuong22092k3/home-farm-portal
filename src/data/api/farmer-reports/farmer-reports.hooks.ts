"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/query-keys.constant";
import { getFarmerReportsAPI } from "./farmer-reports.api";

export function useFarmerReportsQuery() {
  return useQuery({
    queryKey: [...QUERY_KEYS.FARMER.REPORTS],
    queryFn: ({ signal }) => getFarmerReportsAPI(signal),
  });
}
