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
      // Import and use the proper toast notification from @repo/ui
      // This is an interim solution until we implement the Toast component
      const errorDiv = document.createElement('div');
      errorDiv.className = 'fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md shadow-md z-50 animate-slide-in';
      errorDiv.innerHTML = `
        <div class="flex items-center">
          <svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
          </svg>
          <span>Failed to create product. Please try again.</span>
        </div>
      `;
      document.body.appendChild(errorDiv);
      
      // Add slide-out animation before removing
      setTimeout(() => {
        errorDiv.classList.add('animate-fade-out');
        setTimeout(() => {
          if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
          }
        }, 300); // animation duration
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