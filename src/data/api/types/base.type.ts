export interface BaseResponse<T> {
  success: boolean;
  code: number;
  errorCode?: string;
  messageCode?: string;
  message: string;
  detail?: string;
  data: T;
  timestamp: number;
  extra?: string;
}

export interface PaginatedResponse<T> extends BaseResponse<T> {
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export type BasePaginationRequest<T> = T & {
  page: number;
  size: number;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
};

export type ApiEntity = Record<string, unknown> & { id?: string };
export type PortalRole = "farmer" | "admin";
