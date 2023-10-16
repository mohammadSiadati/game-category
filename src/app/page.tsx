'use client';
import CartItems from '@/components/cartItems/CartItems';
import React, { Fragment } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

export default function Home() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <CartItems />
    </QueryClientProvider>
  );
}
