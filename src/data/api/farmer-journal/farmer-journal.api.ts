import { type BasePaginationRequest, type BasePaginationResponse } from '../types/base.type';
import { ENDPOINTS } from '@/lib/constants/endpoints.constant';
import { apiClient, portalHeaders } from '../apiClient';
import { type FarmerJournalREQ } from './farmer-journal.req';
import { type FarmerJournalRES } from './farmer-journal.res';

export const getFarmerJournalAPI = (params: BasePaginationRequest<FarmerJournalREQ>, signal?: AbortSignal): Promise<BasePaginationResponse<FarmerJournalRES>> =>
  apiClient.get(ENDPOINTS.FARMER.JOURNAL, {
    headers: portalHeaders('farmer'),
    params: params,
    signal,
  });
