import { type BasePaginationRequest, type BasePaginationResponse } from '../types/base.type';
import { ENDPOINTS } from '@/lib/constants/endpoints.constant';
import { apiClient, portalHeaders } from '../apiClient';
import { type AdminSubscriptionsRES, type SubscriptionPlanRES } from './admin-subscriptions.res';
import { type CreateSubscriptionREQ } from './admin-subscriptions.req';

export const getAdminSubscriptionsAPI = (params: BasePaginationRequest<object>, signal?: AbortSignal): Promise<BasePaginationResponse<AdminSubscriptionsRES>> =>
  apiClient.get(ENDPOINTS.ADMIN.SUBSCRIPTIONS, {
    headers: portalHeaders('admin'),
    params: params,
    signal,
  });

export const createSubscriptionAPI = (payload: CreateSubscriptionREQ): Promise<SubscriptionPlanRES> =>
  apiClient.post(ENDPOINTS.ADMIN.SUBSCRIPTIONS, payload, {
    headers: portalHeaders('admin'),
  });
