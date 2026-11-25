"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/query-keys.constant";
import { getFarmerWalletAPI } from "./farmer-wallet.api";

export function useFarmerWalletQuery() {
  return useQuery({
    queryKey: [...QUERY_KEYS.FARMER.WALLET],
    queryFn: ({ signal }) => getFarmerWalletAPI(signal),
  });
}
