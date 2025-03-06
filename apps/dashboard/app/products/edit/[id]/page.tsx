'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { trpc } from '../../../../utils/trpc';
import ProductForm from '../../../../components/ProductForm';
import { useToast } from '@repo/ui';

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const id = parseInt(unwrappedParams.id, 10);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();
  
  const { data: product, isLoading } = trpc.product.getById.useQuery({ id });
  const updateProduct = trpc.product.update.useMutation();

  const handleSubmit = async (data: {
    name: string;
    category: string;
    quantity: number;
    price: number;
  }) => {
    try {
      setIsSubmitting(true);
      await updateProduct.mutateAsync({
        id,
        ...data,
      });
      router.push('/products');
    } catch (error) {
      addToast({
        type: 'error',
        message: 'Failed to update product. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-lg text-gray-700 dark:text-gray-300">Loading product data...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Edit Product</h1>
      <ProductForm 
        initialData={product} 
        onSubmit={handleSubmit} 
        isSubmitting={isSubmitting} 
      />
    </div>
  );
}