'use client';

import { useState, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';

// Type definitions for props
interface TRPCProviderProps<T> {
  children: ReactNode;
  trpcClient: {
    createClient: (options: { links: any[] }) => any;
    Provider: React.ComponentType<{
      client: any;
      queryClient: QueryClient;
      children: ReactNode;
    }>;
  };
  apiUrl?: string;
  queryOptions?: any;
}

export function TRPCProvider<T>({
  children,
  trpcClient,
  apiUrl = '/api/trpc',
  queryOptions = {},
}: TRPCProviderProps<T>) {
  // Use a stable reference to queryClient instead of recreating it on every render
  const [queryClient] = useState(() => 
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: 1,
          staleTime: 5 * 1000, // 5 seconds
          ...queryOptions,
        },
      },
    })
  );
  
  // Create the TRPC client
  const [trpcClientInstance] = useState(() =>
    trpcClient.createClient({
      links: [
        httpBatchLink({
          url: apiUrl,
        }),
      ],
    })
  );

  return (
    <trpcClient.Provider client={trpcClientInstance} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpcClient.Provider>
  );
}