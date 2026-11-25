"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/query-keys.constant";
import { getAdminPartnersAPI } from "./admin-partners.api";
import type { AdminPartnersREQ } from "./admin-partners.req";

export function useAdminPartnersQuery(params: AdminPartnersREQ = {}) {
  return useQuery({
    queryKey: [...QUERY_KEYS.ADMIN.PARTNERS, params],
    queryFn: ({ signal }) => getAdminPartnersAPI(params, signal),
  });
}
