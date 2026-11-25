"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/query-keys.constant";
import { getAdminSettingsAPI } from "./admin-settings.api";

export function useAdminSettingsQuery() {
  return useQuery({
    queryKey: [...QUERY_KEYS.ADMIN.SETTINGS],
    queryFn: ({ signal }) => getAdminSettingsAPI(signal),
  });
}
