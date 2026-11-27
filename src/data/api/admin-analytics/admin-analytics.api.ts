import { ENDPOINTS } from '@/lib/constants/endpoints.constant';
import { apiClient, portalHeaders } from '../apiClient';
import { type AdminAnalyticsRES } from './admin-analytics.res';

export const getAdminAnalyticsAPI = (signal?: AbortSignal): Promise<AdminAnalyticsRES> =>
  apiClient.get(ENDPOINTS.ADMIN.ANALYTICS, {
    headers: portalHeaders('admin'),
    signal,
  });
