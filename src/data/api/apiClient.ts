import axios, { type AxiosError, type AxiosRequestConfig } from "axios";
import { PORTAL_ROLE_HEADER, PROTOTYPE_USER_ID_HEADER, PROTOTYPE_USER_IDS } from "@/lib/constants/auth.constant";
import type { PortalRole } from "@/data/api/types/base.type";

const API_BASE_URL = process.env.NEXT_PUBLIC_HOME_FARM_API_URL ?? "https://home-farm-api.vercel.app/api/v1";

export type ApiErrorResponse = { status: number; message: string; detail?: string };

const client = axios.create({ baseURL: API_BASE_URL, timeout: 8000 });

client.interceptors.request.use((config) => {
  const role = config.headers[PORTAL_ROLE_HEADER] as PortalRole | undefined;
  if (role) {
    config.headers[PROTOTYPE_USER_ID_HEADER] = PROTOTYPE_USER_IDS[role];
    delete config.headers[PORTAL_ROLE_HEADER];
  }
  config.headers["Content-Type"] ??= "application/json";
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; detail?: string }>) => Promise.reject({
    status: error.response?.status ?? 500,
    message: error.response?.data?.message ?? error.message ?? "Không thể kết nối Home Farm API",
    detail: error.response?.data?.detail
  } satisfies ApiErrorResponse)
);

export const apiClient = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    client.get<T>(url, config).then((response) => response.data),
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    client.post<T>(url, data, config).then((response) => response.data),
  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    client.patch<T>(url, data, config).then((response) => response.data),
};

export const portalHeaders = (role: PortalRole) => ({ [PORTAL_ROLE_HEADER]: role });
