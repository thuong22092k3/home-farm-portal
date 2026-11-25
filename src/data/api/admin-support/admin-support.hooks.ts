"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/query-keys.constant";
import { getAdminSupportAPI } from "./admin-support.api";
import type { AdminSupportREQ } from "./admin-support.req";

export function useAdminSupportQuery(params: AdminSupportREQ = {}) {
  return useQuery({
    queryKey: [...QUERY_KEYS.ADMIN.SUPPORT, params],
    queryFn: ({ signal }) => getAdminSupportAPI(params, signal),
  });
}
