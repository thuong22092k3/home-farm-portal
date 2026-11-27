import { ENDPOINTS } from '@/lib/constants/endpoints.constant';
import { apiClient, portalHeaders } from '../apiClient';
import { type FarmerIotREQ } from './farmer-iot.req';
import { type FarmerIotRES } from './farmer-iot.res';

export const getFarmerIotAPI = (params: FarmerIotREQ = {}, signal?: AbortSignal): Promise<FarmerIotRES> =>
  apiClient.get(ENDPOINTS.FARMER.IOT, {
    headers: portalHeaders('farmer'),
    params: params,
    signal,
  });
