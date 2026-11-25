"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/query-keys.constant";
import { getAdminComplianceAPI } from "./admin-compliance.api";
import type { AdminComplianceREQ } from "./admin-compliance.req";

export function useAdminComplianceQuery(params: AdminComplianceREQ = {}) {
  return useQuery({
    queryKey: [...QUERY_KEYS.ADMIN.COMPLIANCE, params],
    queryFn: ({ signal }) => getAdminComplianceAPI(params, signal),
  });
}
