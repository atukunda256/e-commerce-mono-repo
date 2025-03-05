'use client';

import { ProductSelect } from 'service';
import { useCart } from '../utils/cart-context';
import { useState } from 'react';

interface ProductCardProps {
  product: ProductSelect;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, items } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  
  // Check if this product is already in the cart
  const inCart = items.some(item => item.product.id === product.id);
  const cartItem = items.find(item => item.product.id === product.id);
  
  // Generate a random background color for the product image placeholder
  // This gives a unique visual identity to each product
  const colorClasses = [
    'bg-blue-100', 'bg-green-100', 'bg-yellow-100', 
    'bg-pink-100', 'bg-purple-100', 'bg-indigo-100',
    'bg-red-100', 'bg-orange-100', 'bg-teal-100'
  ];
  const randomColorClass = colorClasses[product.id % colorClasses.length];
  
  const handleAddToCart = () => {
    setIsAdding(true);
    addItem(product);
    
    // Reset the button state after a short delay
    setTimeout(() => {
      setIsAdding(false);
    }, 800);
  };

  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Stock badge */}
      {product.quantity <= 0 ? (
        <span className="absolute top-2 right-2 z-10 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          Out of Stock
        </span>
      ) : product.quantity < 5 ? (
        <span className="absolute top-2 right-2 z-10 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          Low Stock
        </span>
      ) : null}
      
      {/* Product image placeholder */}
      <div className={`aspect-w-1 aspect-h-1 w-full ${randomColorClass} flex items-center justify-center`}>
        <div className="h-48 w-full flex items-center justify-center">
          <span className="text-3xl font-bold text-gray-700 opacity-40">
            {product.name.substring(0, 2).toUpperCase()}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        {/* Category */}
        <div className="mb-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            {product.category}
          </span>
        </div>
        
        {/* Product name */}
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2">
          {product.name}
        </h3>
        
        {/* Price and stock info */}
        <div className="mt-auto">
          <div className="flex justify-between items-end mb-4">
            <div className="flex items-baseline">
              <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            </div>
            {product.quantity > 0 && (
              <span className="text-sm text-gray-500">
                {product.quantity} available
              </span>
            )}
          </div>
          
          {/* Add to cart button */}
          <div className="flex space-x-2">
            <button
              onClick={handleAddToCart}
              disabled={product.quantity <= 0 || isAdding}
              className={`flex-grow py-2 px-4 rounded-md flex items-center justify-center text-sm font-medium transition-colors ${
                isAdding 
                  ? 'bg-green-600 text-white' 
                  : product.quantity <= 0 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {isAdding ? (
                <>
                  <svg className="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Added!
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {inCart ? `Add Another (${cartItem?.quantity} in cart)` : 'Add to Cart'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}