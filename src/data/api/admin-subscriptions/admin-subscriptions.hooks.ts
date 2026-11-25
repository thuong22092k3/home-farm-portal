"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/query-keys.constant";
import { createSubscriptionAPI, getAdminSubscriptionsAPI } from "./admin-subscriptions.api";

export function useAdminSubscriptionsQuery() {
  return useQuery({
    queryKey: [...QUERY_KEYS.ADMIN.SUBSCRIPTIONS],
    queryFn: ({ signal }) => getAdminSubscriptionsAPI(signal),
  });
}

export function useCreateSubscriptionMutation() {
  return useMutation({
    mutationFn: createSubscriptionAPI,
    retry: false,
    meta: {
      invalidatesQueries: [QUERY_KEYS.ADMIN.SUBSCRIPTIONS, QUERY_KEYS.ADMIN.REVENUE],
    },
  });
}
