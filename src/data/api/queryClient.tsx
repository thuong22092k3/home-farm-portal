"use client";

import { MutationCache, QueryClient, QueryClientProvider, type QueryKey } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

declare module "@tanstack/react-query" {
  interface Register {
    mutationMeta: { invalidatesQuery?: QueryKey; invalidatesQueries?: QueryKey[] };
  }
}

function createQueryClient() {
  const client = new QueryClient({
    defaultOptions: {
      queries: { retry: 2, refetchOnWindowFocus: false, staleTime: 30_000 },
      mutations: { retry: 1 }
    },
    mutationCache: new MutationCache({
      async onSettled(_data, _error, _variables, _onMutateResult, mutation) {
        const queryKeys = [mutation.meta?.invalidatesQuery, ...(mutation.meta?.invalidatesQueries ?? [])].filter(Boolean) as QueryKey[];
        await Promise.all(queryKeys.map((queryKey) => client.invalidateQueries({ queryKey })));
      }
    })
  });
  return client;
}

export function AppQueryClientProvider({ children }: { children: ReactNode }) {
  const [client] = useState(createQueryClient);
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
