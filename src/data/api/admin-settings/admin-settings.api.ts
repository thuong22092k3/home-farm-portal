import { ENDPOINTS } from '@/lib/constants/endpoints.constant';
import { apiClient, portalHeaders } from '../apiClient';
import { type AdminSettingsRES } from './admin-settings.res';

export const getAdminSettingsAPI = (signal?: AbortSignal): Promise<AdminSettingsRES> =>
  apiClient.get(ENDPOINTS.ADMIN.SETTINGS, {
    headers: portalHeaders('admin'),
    signal,
  });
