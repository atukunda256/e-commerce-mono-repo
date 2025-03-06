'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProductSelect } from 'service';
import { Button, FormField } from '@repo/ui';
import { Form, FormInputField, FormNumberField, FormSelectField, FormSubmitButton } from '@repo/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, ProductFormValues } from '../utils/schemas';

// Predefined category options
const CATEGORIES = [
  'Electronics',
  'Clothing',
  'Books',
  'Home & Kitchen',
  'Sports',
  'Toys',
  'Beauty',
  'Health',
  'Automotive',
  'Other'
];

interface ProductFormProps {
  initialData?: ProductSelect | null;
  onSubmit: (data: ProductFormValues) => Promise<void>;
  isSubmitting: boolean;
}

export default function ProductForm({
  initialData,
  onSubmit,
  isSubmitting,
}: ProductFormProps) {
  const router = useRouter();

  // Initialize react-hook-form with zod validation
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      category: '',
      quantity: 0,
      price: 0,
    },
  });

  const { 
    handleSubmit, 
    register, 
    formState: { errors }, 
    setValue, 
    watch,
    reset,
  } = form;

  // Set initial form data when available
  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        category: initialData.category,
        quantity: initialData.quantity,
        price: initialData.price,
      });
    }
  }, [initialData, reset]);

  // Watch the category field to determine if we need custom category input
  const selectedCategory = watch('category');
  const isCustomCategory = selectedCategory && !CATEGORIES.includes(selectedCategory) && selectedCategory !== 'custom';

  // Handle category selection including custom category option
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'custom') {
      setValue('category', '');
    } else {
      setValue('category', value);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 max-w-xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {initialData ? 'Update Product' : 'Create New Product'}
        </h2>
        <p className="text-sm text-gray-500">
          {initialData 
            ? 'Edit the product details below and save your changes.' 
            : 'Fill in the details below to add a new product to your inventory.'}
        </p>
      </div>
      
      <Form form={form} onSubmit={onSubmit} className="space-y-6">
        <FormInputField<ProductFormValues>
          name="name"
          label="Product Name"
          register={register}
          errors={errors}
          required
          placeholder="e.g. Wireless Headphones"
        />

        {!isCustomCategory ? (
          <FormSelectField<ProductFormValues>
            name="category"
            label="Category"
            register={register}
            errors={errors}
            required
            options={[
              { value: "", label: "Select a category" },
              ...CATEGORIES.map(cat => ({ value: cat, label: cat })),
              { value: "custom", label: "Custom category..." }
            ]}
            className={`${selectedCategory === 'custom' ? 'hidden' : ''}`}
          />
        ) : null}

        {(selectedCategory === 'custom' || isCustomCategory) && (
          <FormField
            id="customCategory"
            label="Custom Category"
            required
            error={errors.category?.message?.toString()}
          >
            <div className="flex">
              <input
                type="text"
                id="customCategory"
                placeholder="Enter custom category"
                className="block w-full py-3 px-4 border border-gray-300 rounded-l-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                {...register('category')}
              />
              <button
                type="button"
                onClick={() => setValue('category', '')}
                className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 text-gray-500 rounded-r-md hover:bg-gray-100"
              >
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </FormField>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormNumberField<ProductFormValues>
            name="quantity"
            label="Quantity"
            register={register}
            errors={errors}
            min={0}
          />

          <FormNumberField<ProductFormValues>
            name="price"
            label="Price ($)"
            register={register}
            errors={errors}
            min={0.01}
            step={0.01}
            leftAddon={<span className="text-gray-500 sm:text-sm">$</span>}
          />
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 flex items-center justify-between">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <FormSubmitButton
            isSubmitting={isSubmitting}
            text={initialData ? 'Update Product' : 'Create Product'}
            loadingText={initialData ? 'Updating...' : 'Creating...'}
          />
        </div>
      </Form>
    </div>
  );
}