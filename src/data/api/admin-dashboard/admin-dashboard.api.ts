import { ENDPOINTS } from '@/lib/constants/endpoints.constant';
import { apiClient, portalHeaders } from '../apiClient';
import { type AdminDashboardRES } from './admin-dashboard.res';

export const getAdminDashboardAPI = (signal?: AbortSignal): Promise<AdminDashboardRES> =>
  apiClient.get(ENDPOINTS.ADMIN.DASHBOARD, {
    headers: portalHeaders('admin'),
    signal,
  });
