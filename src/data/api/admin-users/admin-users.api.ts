import { type BasePaginationRequest, type BasePaginationResponse } from '../types/base.type';
import { ENDPOINTS } from '@/lib/constants/endpoints.constant';
import { apiClient, portalHeaders } from '../apiClient';
import { type AdminUsersREQ } from './admin-users.req';
import { type AdminUsersRES } from './admin-users.res';

export const getAdminUsersAPI = (params: BasePaginationRequest<AdminUsersREQ>, signal?: AbortSignal): Promise<BasePaginationResponse<AdminUsersRES>> =>
  apiClient.get(ENDPOINTS.ADMIN.USERS, {
    headers: portalHeaders('admin'),
    params: params,
    signal,
  });
