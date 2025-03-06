'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { trpc } from '../utils/trpc';
import { CartProvider } from '../utils/cart-context';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        retry: 1,
        staleTime: 5000, // Data becomes stale after 5 seconds
        cacheTime: 1000 * 60 * 10, // Cache for 10 minutes
      },
    },
  }));
  
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: '/api/trpc',
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <CartProvider>{children}</CartProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}