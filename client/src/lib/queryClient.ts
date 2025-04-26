import { QueryClient } from "@tanstack/react-query";

/**
 * This is a simplified frontend-only implementation.
 * No actual API requests are made in this portfolio site.
 * All data is sourced from mockData.ts
 */

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
