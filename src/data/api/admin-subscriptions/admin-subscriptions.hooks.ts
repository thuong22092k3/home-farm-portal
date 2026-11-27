"use client";

import type { BasePaginationRequest } from "../types/base.type";

import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/query-keys.constant";
import { createSubscriptionAPI, getAdminSubscriptionsAPI } from "./admin-subscriptions.api";

export function useAdminSubscriptionsQuery(params: Partial<BasePaginationRequest<object>> = {}) {
  const request = { ...params, page: params.page ?? 1, size: params.size ?? 20 };
  return useQuery({
    queryKey: [...QUERY_KEYS.ADMIN.SUBSCRIPTIONS, request],
    queryFn: ({ signal }) => getAdminSubscriptionsAPI(request, signal),
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
