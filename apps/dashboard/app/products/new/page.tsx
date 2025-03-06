'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { trpc } from '../../../utils/trpc';
import ProductForm from '../../../components/ProductForm';
import { useToast } from '@repo/ui';

export default function NewProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createProduct = trpc.product.create.useMutation();
  const { addToast } = useToast();

  const handleSubmit = async (data: {
    name: string;
    category: string;
    quantity: number;
    price: number;
  }) => {
    try {
      setIsSubmitting(true);
      await createProduct.mutateAsync(data);
      router.push('/products');
    } catch (error) {
      addToast({
        type: 'error',
        message: 'Failed to create product. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Create New Product</h1>
      <ProductForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}