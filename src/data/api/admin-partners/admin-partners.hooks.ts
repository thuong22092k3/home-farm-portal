"use client";

import type { BasePaginationRequest } from "../types/base.type";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/query-keys.constant";
import { getAdminPartnersAPI } from "./admin-partners.api";
import type { AdminPartnersREQ } from "./admin-partners.req";

export function useAdminPartnersQuery(params: Partial<BasePaginationRequest<AdminPartnersREQ>> = {}) {
  const request = { ...params, page: params.page ?? 1, size: params.size ?? 20 };
  return useQuery({
    queryKey: [...QUERY_KEYS.ADMIN.PARTNERS, request],
    queryFn: ({ signal }) => getAdminPartnersAPI(request, signal),
  });
}
