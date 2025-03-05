'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProductSelect } from 'service';

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

type FormFields = {
  name: string;
  category: string;
  quantity: number;
  price: number;
};

interface ProductFormProps {
  initialData?: ProductSelect | null;
  onSubmit: (data: FormFields) => Promise<void>;
  isSubmitting: boolean;
}

export default function ProductForm({
  initialData,
  onSubmit,
  isSubmitting,
}: ProductFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<FormFields>({
    name: '',
    category: '',
    quantity: 0,
    price: 0,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormFields, string>>>({});
  const [customCategory, setCustomCategory] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        category: initialData.category,
        quantity: initialData.quantity,
        price: initialData.price,
      });
      // Check if category is in predefined list
      setCustomCategory(!CATEGORIES.includes(initialData.category));
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'quantity' ? Number(value) : value,
    }));
    
    // Clear error when field is edited
    if (errors[name as keyof FormFields]) {
      setErrors(prev => ({...prev, [name]: undefined}));
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "custom") {
      setCustomCategory(true);
      setFormData(prev => ({...prev, category: ''}));
    } else {
      setCustomCategory(false);
      setFormData(prev => ({...prev, category: value}));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormFields, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    
    if (formData.quantity < 0) {
      newErrors.quantity = 'Quantity cannot be negative';
    }
    
    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than zero';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      await onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 max-w-xl mx-auto">
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
      
      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Product Name <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`block w-full pr-10 py-3 px-4 border ${
                errors.name ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
              } rounded-md focus:outline-none focus:ring-1 sm:text-sm`}
              placeholder="e.g. Wireless Headphones"
              required
            />
            {errors.name && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            {!customCategory ? (
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleCategoryChange}
                className={`block w-full py-3 px-4 border ${
                  errors.category ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm`}
                required
              >
                <option value="">Select a category</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
                <option value="custom">Custom category...</option>
              </select>
            ) : (
              <div className="flex">
                <input
                  type="text"
                  id="customCategory"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`block w-full py-3 px-4 border ${
                    errors.category ? 'border-red-300' : 'border-gray-300'
                  } rounded-l-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm`}
                  placeholder="Enter custom category"
                  required
                />
                <button
                  type="button"
                  onClick={() => setCustomCategory(false)}
                  className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 text-gray-500 rounded-r-md hover:bg-gray-100"
                >
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
          </div>
          {errors.category && <p className="mt-2 text-sm text-red-600">{errors.category}</p>}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              Quantity <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="0"
                value={formData.quantity}
                onChange={handleChange}
                className={`block w-full py-3 px-4 border ${
                  errors.quantity ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm`}
                required
              />
              {errors.quantity && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            {errors.quantity && <p className="mt-2 text-sm text-red-600">{errors.quantity}</p>}
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price ($) <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                id="price"
                name="price"
                min="0.01"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className={`block w-full pl-7 py-3 px-4 border ${
                  errors.price ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm`}
                required
              />
              {errors.price && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            {errors.price && <p className="mt-2 text-sm text-red-600">{errors.price}</p>}
          </div>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-gray-200 flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.back()}
          className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors flex items-center"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : initialData ? 'Update Product' : 'Create Product'}
        </button>
      </div>
    </form>
  );
}