import { type BasePaginationRequest, type BasePaginationResponse } from '../types/base.type';
import { ENDPOINTS } from '@/lib/constants/endpoints.constant';
import { apiClient, portalHeaders } from '../apiClient';
import { type FarmerPlotsREQ } from './farmer-plots.req';
import { type FarmerPlotsRES } from './farmer-plots.res';

export const getFarmerPlotsAPI = (params: BasePaginationRequest<FarmerPlotsREQ>, signal?: AbortSignal): Promise<BasePaginationResponse<FarmerPlotsRES>> =>
  apiClient.get(ENDPOINTS.FARMER.PLOTS, {
    headers: portalHeaders('farmer'),
    params: params,
    signal,
  });
