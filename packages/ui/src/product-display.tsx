'use client';

import { ReactNode } from 'react';
import { CategoryBadge, StockBadge } from './badge';

export interface BaseProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export interface ProductDisplayProps<T extends BaseProduct> {
  product: T;
  renderActions?: (product: T) => ReactNode;
  displayImage?: boolean;
  imageComponent?: ReactNode;
  showStock?: boolean;
  showCategory?: boolean;
  className?: string;
}

export function ProductDisplay<T extends BaseProduct>({
  product,
  renderActions,
  displayImage = true,
  imageComponent,
  showStock = true,
  showCategory = true,
  className = '',
}: ProductDisplayProps<T>) {
  // Generate a color for the product image placeholder based on product ID
  const colorClasses = [
    'bg-blue-100', 'bg-green-100', 'bg-yellow-100', 
    'bg-pink-100', 'bg-purple-100', 'bg-primary-100',
    'bg-red-100', 'bg-orange-100', 'bg-teal-100'
  ];
  const colorClass = colorClasses[(product.id || 0) % colorClasses.length];
  
  return (
    <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full ${className}`}>
      {/* Product image/placeholder */}
      {displayImage && (
        <div className="relative">
          {/* Stock indicator */}
          {showStock && (
            <div className="absolute top-2 right-2 z-10 shadow-sm">
              <StockBadge quantity={product.quantity} />
            </div>
          )}
          
          <div className={`w-full ${colorClass}`} style={{ aspectRatio: '1/1' }}>
            {imageComponent || (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <span className="text-5xl font-bold text-gray-700 opacity-40">
                    {product.name.substring(0, 2).toUpperCase()}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="p-4 flex-grow flex flex-col">
        {/* Category */}
        {showCategory && (
          <div className="mb-3">
            <CategoryBadge category={product.category} />
          </div>
        )}
        
        {/* Product name */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 min-h-[3.5rem]">
          {product.name}
        </h3>
        
        {/* Price and stock info */}
        <div className="mt-auto">
          <div className="flex justify-between items-end mb-3">
            <div className="flex items-baseline">
              <span className="text-xl font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</span>
            </div>
            {showStock && product.quantity > 0 && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {product.quantity} available
              </span>
            )}
          </div>
          
          {/* Render actions if provided */}
          <div className="mt-2">
            {renderActions && renderActions(product)}
          </div>
        </div>
      </div>
    </div>
  );
}