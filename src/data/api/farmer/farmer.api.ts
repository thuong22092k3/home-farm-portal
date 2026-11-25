import { apiClient, portalHeaders } from "@/data/api/apiClient";
import type { FarmerMutationREQ, FarmerQueryREQ } from "./farmer.req";
import type { FarmerPortalRES } from "./farmer.res";

export const getFarmerPortalAPI = (
  endpoint: string,
  params?: FarmerQueryREQ,
): Promise<FarmerPortalRES> =>
  apiClient.get(endpoint, { params, headers: portalHeaders("farmer") });

export const postFarmerPortalAPI = <T = FarmerPortalRES>(
  endpoint: string,
  payload: FarmerMutationREQ,
): Promise<T> =>
  apiClient
    .post(endpoint, payload, { headers: portalHeaders("farmer") })
    .then((response) => response as unknown as T);

export const patchFarmerPortalAPI = <T = FarmerPortalRES>(
  endpoint: string,
  payload: FarmerMutationREQ,
): Promise<T> =>
  apiClient
    .patch(endpoint, payload, { headers: portalHeaders("farmer") })
    .then((response) => response as unknown as T);
