import { type BasePaginationRequest, type BasePaginationResponse } from '../types/base.type';
import { ENDPOINTS } from '@/lib/constants/endpoints.constant';
import { apiClient, portalHeaders } from '../apiClient';
import { type FarmerAiRES } from './farmer-ai.res';

export const getFarmerAiAPI = (params: BasePaginationRequest<object>, signal?: AbortSignal): Promise<BasePaginationResponse<FarmerAiRES>> =>
  apiClient.get(ENDPOINTS.FARMER.AI, {
    headers: portalHeaders('farmer'),
    params: params,
    signal,
  });
