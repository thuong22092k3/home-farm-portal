"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/query-keys.constant";
import { getFarmerHarvestsAPI } from "./farmer-harvests.api";

export function useFarmerHarvestsQuery() {
  return useQuery({
    queryKey: [...QUERY_KEYS.FARMER.HARVESTS],
    queryFn: ({ signal }) => getFarmerHarvestsAPI(signal),
  });
}
