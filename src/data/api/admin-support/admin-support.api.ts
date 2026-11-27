import { type BasePaginationRequest, type BasePaginationResponse } from '../types/base.type';
import { ENDPOINTS } from '@/lib/constants/endpoints.constant';
import { apiClient, portalHeaders } from '../apiClient';
import { type AdminSupportREQ } from './admin-support.req';
import { type AdminSupportRES } from './admin-support.res';

export const getAdminSupportAPI = (params: BasePaginationRequest<AdminSupportREQ>, signal?: AbortSignal): Promise<BasePaginationResponse<AdminSupportRES>> =>
  apiClient.get(ENDPOINTS.ADMIN.SUPPORT, {
    headers: portalHeaders('admin'),
    params: params,
    signal,
  });
