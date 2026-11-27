import { ENDPOINTS } from '@/lib/constants/endpoints.constant';
import { apiClient, portalHeaders } from '../apiClient';
import { type FarmerHarvestsRES } from './farmer-harvests.res';

export const getFarmerHarvestsAPI = (signal?: AbortSignal): Promise<FarmerHarvestsRES> =>
  apiClient.get(ENDPOINTS.FARMER.HARVESTS, {
    headers: portalHeaders('farmer'),
    signal,
  });
