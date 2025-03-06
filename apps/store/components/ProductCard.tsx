'use client';

import { ProductSelect } from 'service';
import { useCart } from '../utils/cart-context';
import { useState } from 'react';
import { Button, ProductDisplay, Badge } from '@repo/ui';

interface ProductCardProps {
  product: ProductSelect;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, items } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  
  // Check if this product is already in the cart
  const inCart = items.some(item => item.product.id === product.id);
  const cartItem = items.find(item => item.product.id === product.id);
  
  const handleAddToCart = () => {
    setIsAdding(true);
    addItem(product);
    
    // Reset the button state after a short delay
    setTimeout(() => {
      setIsAdding(false);
    }, 800);
  };
  
  // Render the add to cart button
  const renderActions = (product: ProductSelect) => {
    const cartIcon = (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    );
    
    const checkIcon = (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    );
    
    return (
      <Button
        onClick={handleAddToCart}
        disabled={product.quantity <= 0 || isAdding}
        variant={isAdding ? "success" : "primary"}
        fullWidth
        size="md"
        leftIcon={isAdding ? checkIcon : cartIcon}
      >
        {isAdding 
          ? 'Added!' 
          : inCart 
            ? `Add Another${cartItem?.quantity > 0 ? ` (${cartItem?.quantity})` : ''}` 
            : 'Add to Cart'
        }
      </Button>
    );
  };

  return (
    <ProductDisplay 
      product={product} 
      renderActions={renderActions}
      className="w-full h-full"
    />
  );
}