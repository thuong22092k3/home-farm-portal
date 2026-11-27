import { ENDPOINTS } from '@/lib/constants/endpoints.constant';
import { apiClient, portalHeaders } from '../apiClient';
import { type FarmerReportsRES } from './farmer-reports.res';

export const getFarmerReportsAPI = (signal?: AbortSignal): Promise<FarmerReportsRES> =>
  apiClient.get(ENDPOINTS.FARMER.REPORTS, {
    headers: portalHeaders('farmer'),
    signal,
  });
