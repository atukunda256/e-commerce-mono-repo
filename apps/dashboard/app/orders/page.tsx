'use client';

import React from 'react';
import { trpc } from '../../utils/trpc';
import OrdersTable from '../../components/OrdersTable';
import PageHeader from '../../components/PageHeader';

export default function OrdersPage() {
  const { data: orders, isLoading } = trpc.order.getAll.useQuery();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <PageHeader
        title="Orders"
        description="View and manage customer orders from your store."
      />

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <OrdersTable orders={orders || []} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
