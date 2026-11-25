"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/query-keys.constant";
import { getAdminApprovalsAPI } from "./admin-approvals.api";
import type { AdminApprovalsREQ } from "./admin-approvals.req";

export function useAdminApprovalsQuery(params: AdminApprovalsREQ = {}) {
  return useQuery({
    queryKey: [...QUERY_KEYS.ADMIN.APPROVALS, params],
    queryFn: ({ signal }) => getAdminApprovalsAPI(params, signal),
  });
}
