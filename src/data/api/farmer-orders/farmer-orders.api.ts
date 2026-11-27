import { type BasePaginationRequest, type BasePaginationResponse } from '../types/base.type';
import { ENDPOINTS } from '@/lib/constants/endpoints.constant';
import { apiClient, portalHeaders } from '../apiClient';
import { type FarmerOrdersREQ } from './farmer-orders.req';
import { type FarmerOrdersRES } from './farmer-orders.res';

export const getFarmerOrdersAPI = (params: BasePaginationRequest<FarmerOrdersREQ>, signal?: AbortSignal): Promise<BasePaginationResponse<FarmerOrdersRES>> =>
  apiClient.get(ENDPOINTS.FARMER.ORDERS, {
    headers: portalHeaders('farmer'),
    params: params,
    signal,
  });
