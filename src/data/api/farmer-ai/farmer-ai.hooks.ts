"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/query-keys.constant";
import { getFarmerAiAPI } from "./farmer-ai.api";

export function useFarmerAiQuery() {
  return useQuery({
    queryKey: [...QUERY_KEYS.FARMER.AI],
    queryFn: ({ signal }) => getFarmerAiAPI(signal),
  });
}
