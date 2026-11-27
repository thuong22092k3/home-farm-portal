import { type BasePaginationRequest, type BasePaginationResponse } from '../types/base.type';
import { ENDPOINTS } from '@/lib/constants/endpoints.constant';
import { apiClient, portalHeaders } from '../apiClient';
import { type AdminPartnersREQ } from './admin-partners.req';
import { type AdminPartnersRES } from './admin-partners.res';

export const getAdminPartnersAPI = (params: BasePaginationRequest<AdminPartnersREQ>, signal?: AbortSignal): Promise<BasePaginationResponse<AdminPartnersRES>> =>
  apiClient.get(ENDPOINTS.ADMIN.PARTNERS, {
    headers: portalHeaders('admin'),
    params: params,
    signal,
  });
