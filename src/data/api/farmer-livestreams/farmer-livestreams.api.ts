import { type BasePaginationRequest, type BasePaginationResponse } from '../types/base.type';
import { ENDPOINTS } from '@/lib/constants/endpoints.constant';
import { apiClient, portalHeaders } from '../apiClient';
import { type FarmerLivestreamsREQ } from './farmer-livestreams.req';
import { type FarmerLivestreamsRES } from './farmer-livestreams.res';

export const getFarmerLivestreamsAPI = (params: BasePaginationRequest<FarmerLivestreamsREQ>, signal?: AbortSignal): Promise<BasePaginationResponse<FarmerLivestreamsRES>> =>
  apiClient.get(ENDPOINTS.FARMER.LIVESTREAMS, {
    headers: portalHeaders('farmer'),
    params: params,
    signal,
  });
