import { type BasePaginationRequest, type BasePaginationResponse } from '../types/base.type';
import { ENDPOINTS } from '@/lib/constants/endpoints.constant';
import { apiClient, portalHeaders } from '../apiClient';
import { type AdminApprovalsREQ } from './admin-approvals.req';
import { type AdminApprovalsRES } from './admin-approvals.res';

export const getAdminApprovalsAPI = (params: BasePaginationRequest<AdminApprovalsREQ>, signal?: AbortSignal): Promise<BasePaginationResponse<AdminApprovalsRES>> =>
  apiClient.get(ENDPOINTS.ADMIN.APPROVALS, {
    headers: portalHeaders('admin'),
    params: params,
    signal,
  });
