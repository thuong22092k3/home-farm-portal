"use client";

import type { BasePaginationRequest } from "../types/base.type";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/query-keys.constant";
import { getAdminApprovalsAPI } from "./admin-approvals.api";
import type { AdminApprovalsREQ } from "./admin-approvals.req";

export function useAdminApprovalsQuery(params: Partial<BasePaginationRequest<AdminApprovalsREQ>> = {}) {
  const request = { ...params, page: params.page ?? 1, size: params.size ?? 20 };
  return useQuery({
    queryKey: [...QUERY_KEYS.ADMIN.APPROVALS, request],
    queryFn: ({ signal }) => getAdminApprovalsAPI(request, signal),
  });
}
