import { type BasePaginationRequest, type BasePaginationResponse } from '../types/base.type';
import { ENDPOINTS } from '@/lib/constants/endpoints.constant';
import { apiClient, portalHeaders } from '../apiClient';
import { type AdminOrdersREQ } from './admin-orders.req';
import { type AdminOrdersRES } from './admin-orders.res';

export const getAdminOrdersAPI = (params: BasePaginationRequest<AdminOrdersREQ>, signal?: AbortSignal): Promise<BasePaginationResponse<AdminOrdersRES>> =>
  apiClient.get(ENDPOINTS.ADMIN.ORDERS, {
    headers: portalHeaders('admin'),
    params: params,
    signal,
  });
