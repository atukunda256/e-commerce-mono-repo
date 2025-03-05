'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { trpc } from '../../../utils/trpc';
import ProductForm from '../../../components/ProductForm';

export default function NewProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createProduct = trpc.product.create.useMutation();

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
      // Show a more user-friendly error notification
      const errorDiv = document.createElement('div');
      errorDiv.className = 'fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50';
      errorDiv.innerHTML = `
        <div class="flex items-center">
          <svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
          </svg>
          <span>Failed to create product. Please try again.</span>
        </div>
      `;
      document.body.appendChild(errorDiv);
      
      // Remove error message after 5 seconds
      setTimeout(() => {
        if (errorDiv.parentNode) {
          errorDiv.parentNode.removeChild(errorDiv);
        }
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Create New Product</h1>
      <ProductForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}