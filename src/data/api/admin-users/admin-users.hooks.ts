"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/query-keys.constant";
import { getAdminUsersAPI } from "./admin-users.api";
import type { AdminUsersREQ } from "./admin-users.req";

export function useAdminUsersQuery(params: AdminUsersREQ = {}) {
  return useQuery({
    queryKey: [...QUERY_KEYS.ADMIN.USERS, params],
    queryFn: ({ signal }) => getAdminUsersAPI(params, signal),
  });
}
