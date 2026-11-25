"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/query-keys.constant";
import { getAdminFinanceAPI } from "./admin-finance.api";

export function useAdminFinanceQuery() {
  return useQuery({
    queryKey: [...QUERY_KEYS.ADMIN.FINANCE],
    queryFn: ({ signal }) => getAdminFinanceAPI(signal),
  });
}
