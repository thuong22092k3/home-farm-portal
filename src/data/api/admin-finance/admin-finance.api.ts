import { ENDPOINTS } from '@/lib/constants/endpoints.constant';
import { apiClient, portalHeaders } from '../apiClient';
import { type AdminFinanceRES } from './admin-finance.res';

export const getAdminFinanceAPI = (signal?: AbortSignal): Promise<AdminFinanceRES> =>
  apiClient.get(ENDPOINTS.ADMIN.FINANCE, {
    headers: portalHeaders('admin'),
    signal,
  });
