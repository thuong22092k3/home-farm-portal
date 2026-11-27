import { ENDPOINTS } from '@/lib/constants/endpoints.constant';
import { apiClient, portalHeaders } from '../apiClient';
import { type AdminRevenueRES } from './admin-revenue.res';

export const getAdminRevenueAPI = (signal?: AbortSignal): Promise<AdminRevenueRES> =>
  apiClient.get(ENDPOINTS.ADMIN.REVENUE, {
    headers: portalHeaders('admin'),
    signal,
  });
