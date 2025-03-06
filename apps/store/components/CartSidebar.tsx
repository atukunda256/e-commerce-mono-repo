'use client';

import { useState, useEffect } from 'react';
import { useCart } from '../utils/cart-context';
import { trpc } from '../utils/trpc';
import { useToast } from '@repo/ui';

export default function CartSidebar() {
  const { items, updateQuantity, removeItem, totalItems, totalPrice, clearCart, lastAddedItem, closeCart } = useCart();
  const [highlightedItemId, setHighlightedItemId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const createOrder = trpc.order.create.useMutation();
  const { addToast } = useToast();
  
  // Highlight newly added item
  useEffect(() => {
    if (lastAddedItem) {
      setHighlightedItemId(lastAddedItem.id);
      
      // Remove highlight after animation
      const timer = setTimeout(() => {
        setHighlightedItemId(null);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [lastAddedItem]);

  const handleCreateOrder = async () => {
    if (items.length === 0) return;

    try {
      setIsSubmitting(true);
      await createOrder.mutateAsync({
        items: items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
        })),
      });

      clearCart();
      setOrderSuccess(true);
      
      // Reset success message after a few seconds
      setTimeout(() => {
        setOrderSuccess(false);
      }, 5000);
    } catch (error) {
      // Handle error with proper toast notification
      setOrderSuccess(false);
      setIsSubmitting(false);
      
      addToast({
        type: 'error',
        message: 'Failed to create order. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate subtotal and shipping (free shipping over $50)
  const subtotal = totalPrice;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const orderTotal = subtotal + shipping;

  if (orderSuccess) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Order Confirmed</h2>
          <button 
            onClick={closeCart} 
            className="p-2 text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
            aria-label="Close panel"
          >
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="text-center py-16 flex-grow flex flex-col items-center justify-center px-8">
          <div className="bg-green-50 dark:bg-green-900 rounded-lg p-8 w-full max-w-sm">
            <div className="rounded-full bg-green-100 p-4 mx-auto mb-6">
              <svg className="h-10 w-10 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-3">Order Successful!</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Thank you for your purchase. Your order has been placed successfully.
            </p>
            <button
              onClick={() => {
                setOrderSuccess(false);
                closeCart();
              }}
              className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Shopping Cart</h2>
        <button 
          onClick={closeCart} 
          className="p-2 text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
          aria-label="Close panel"
        >
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {items.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center text-gray-500 py-16 px-8">
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg w-full max-w-sm">
            <svg className="h-16 w-16 text-gray-400 mb-6 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-lg font-medium text-gray-800 dark:text-white mb-2 text-center">Your cart is empty</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Add items to your cart to continue shopping</p>
            <button 
              onClick={closeCart}
              className="mt-6 w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-grow overflow-y-auto p-6">
            <div className="space-y-4">
              {items.map((item) => {
                const isHighlighted = item.product.id === highlightedItemId;
                const colorClass = ['blue', 'green', 'yellow', 'purple', 'indigo', 'pink'][item.product.id % 6];
                
                return (
                  <div 
                    key={item.product.id} 
                    className={`rounded-lg border ${
                      isHighlighted 
                        ? 'animate-pulse bg-green-50 border-green-200 shadow-sm' 
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    } transition-all duration-300 overflow-hidden`}
                  >
                    <div className="p-3">
                      <div className="flex items-start">
                        {/* Product image placeholder */}
                        <div className={`flex-shrink-0 w-16 h-16 bg-${colorClass}-100 rounded flex items-center justify-center mr-3`}>
                          <span className="text-lg font-semibold text-gray-700 opacity-60">
                            {item.product.name.substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {item.product.name}
                              {isHighlighted && (
                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                  Just Added!
                                </span>
                              )}
                            </h3>
                            <button 
                              onClick={() => removeItem(item.product.id)}
                              className="text-gray-400 hover:text-red-500 p-1 ml-2"
                              aria-label="Remove item"
                            >
                              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                          
                          <p className="text-xs text-gray-500 mb-1">{item.product.category}</p>
                          
                          <div className="flex items-end justify-between mt-2">
                            <div className="flex items-center border border-gray-300 rounded-md">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                              </button>
                              <span className="px-2 py-1 text-xs w-7 text-center dark:text-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                disabled={item.quantity >= 10}
                                className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M18 12H6" />
                                </svg>
                              </button>
                            </div>
                            
                            <div className="text-right">
                              <div className="font-medium text-gray-900 dark:text-white">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                ${item.product.price.toFixed(2)} each
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Items ({totalItems})</span>
                <span className="text-sm text-gray-900 dark:text-white font-medium">${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Shipping</span>
                  {shipping === 0 && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Free
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-900 dark:text-white font-medium">
                  {shipping === 0 ? '$0.00' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              
              {shipping === 0 ? (
                <div className="text-xs text-green-600 flex items-center">
                  <svg className="h-4 w-4 mr-1 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free shipping applied (orders over $50)
                </div>
              ) : (
                <div className="text-xs text-gray-500 flex items-center">
                  <svg className="h-4 w-4 mr-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Add ${(50 - subtotal).toFixed(2)} more for free shipping
                </div>
              )}
              
              <div className="h-px bg-gray-200 my-2"></div>
              
              <div className="flex justify-between items-center text-base font-bold text-gray-900 dark:text-white">
                <span>Total</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mt-5 space-y-3">
              <button
                onClick={handleCreateOrder}
                disabled={isSubmitting || items.length === 0}
                className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-400 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Checkout
                  </>
                )}
              </button>
              
              <button
                onClick={clearCart}
                className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <svg className="mr-2 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}