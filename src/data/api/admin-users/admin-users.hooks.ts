"use client";

import type { BasePaginationRequest } from "../types/base.type";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/query-keys.constant";
import { getAdminUsersAPI } from "./admin-users.api";
import type { AdminUsersREQ } from "./admin-users.req";

export function useAdminUsersQuery(params: Partial<BasePaginationRequest<AdminUsersREQ>> = {}) {
  const request = { ...params, page: params.page ?? 1, size: params.size ?? 20 };
  return useQuery({
    queryKey: [...QUERY_KEYS.ADMIN.USERS, request],
    queryFn: ({ signal }) => getAdminUsersAPI(request, signal),
  });
}
