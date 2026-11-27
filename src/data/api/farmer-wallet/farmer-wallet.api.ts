import { ENDPOINTS } from '@/lib/constants/endpoints.constant';
import { apiClient, portalHeaders } from '../apiClient';
import { type FarmerWalletRES } from './farmer-wallet.res';

export const getFarmerWalletAPI = (signal?: AbortSignal): Promise<FarmerWalletRES> =>
  apiClient.get(ENDPOINTS.FARMER.WALLET, {
    headers: portalHeaders('farmer'),
    signal,
  });
