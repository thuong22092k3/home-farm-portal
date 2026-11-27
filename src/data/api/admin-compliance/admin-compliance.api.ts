import { ENDPOINTS } from '@/lib/constants/endpoints.constant';
import { apiClient, portalHeaders } from '../apiClient';
import { type AdminComplianceREQ } from './admin-compliance.req';
import { type AdminComplianceRES } from './admin-compliance.res';

export const getAdminComplianceAPI = (params: AdminComplianceREQ = {}, signal?: AbortSignal): Promise<AdminComplianceRES> =>
  apiClient.get(ENDPOINTS.ADMIN.COMPLIANCE, {
    headers: portalHeaders('admin'),
    params: params,
    signal,
  });
