import { ENDPOINTS } from '@/lib/constants/endpoints.constant';
import { apiClient, portalHeaders } from '../apiClient';
import { type FarmerDashboardRES } from './farmer-dashboard.res';

export const getFarmerDashboardAPI = (signal?: AbortSignal): Promise<FarmerDashboardRES> =>
  apiClient.get(ENDPOINTS.FARMER.DASHBOARD, {
    headers: portalHeaders('farmer'),
    signal,
  });
