'use client';

import { trpc } from '../../utils/trpc';
import ProductsTable from '../../components/ProductsTable';
import PageHeader from '../../components/PageHeader';
import { PlusIcon } from '@repo/ui';

export default function ProductsPage() {
  const { data: products, isLoading, refetch } = trpc.product.getAll.useQuery();
  const deleteProduct = trpc.product.delete.useMutation({
    onSuccess: () => refetch(),
  });

  const handleDelete = async (id: number) => {
    await deleteProduct.mutateAsync({ id });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <PageHeader
        title="Products"
        description="Manage your product inventory, add new items, or update existing ones."
        actionHref="/products/new"
        actionText="Add New Product"
        actionIcon={<PlusIcon />}
      />

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <ProductsTable 
            products={products || []} 
            isLoading={isLoading} 
            onDelete={handleDelete} 
          />
        </div>
      </div>
    </div>
  );
}