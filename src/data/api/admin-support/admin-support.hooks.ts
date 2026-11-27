"use client";

import type { BasePaginationRequest } from "../types/base.type";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/query-keys.constant";
import { getAdminSupportAPI } from "./admin-support.api";
import type { AdminSupportREQ } from "./admin-support.req";

export function useAdminSupportQuery(params: Partial<BasePaginationRequest<AdminSupportREQ>> = {}) {
  const request = { ...params, page: params.page ?? 1, size: params.size ?? 20 };
  return useQuery({
    queryKey: [...QUERY_KEYS.ADMIN.SUPPORT, request],
    queryFn: ({ signal }) => getAdminSupportAPI(request, signal),
  });
}
