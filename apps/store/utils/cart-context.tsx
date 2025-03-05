'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { ProductSelect } from 'service';

// Define the structure of a cart item
export interface CartItem {
  product: ProductSelect;
  quantity: number;
}

// Define the context type
interface CartContextType {
  items: CartItem[];
  addItem: (product: ProductSelect) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  lastAddedItem: ProductSelect | null;
}

// Create the context with a default value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<ProductSelect | null>(null);
  const [autoCloseTimer, setAutoCloseTimer] = useState<NodeJS.Timeout | null>(null);

  // Open cart sidebar
  const openCart = () => {
    setIsCartOpen(true);
  };

  // Close cart sidebar
  const closeCart = () => {
    setIsCartOpen(false);
    setLastAddedItem(null);
  };

  // Toggle cart sidebar
  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
    if (!isCartOpen) {
      setLastAddedItem(null);
    }
  };

  // Add an item to the cart
  const addItem = (product: ProductSelect) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
      if (existingItem) {
        // If the item already exists, update its quantity
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Otherwise, add a new item
        return [...prevItems, { product, quantity: 1 }];
      }
    });

    // Set as last added item to highlight in cart
    setLastAddedItem(product);
    
    // Automatically open the cart when an item is added
    openCart();
    
    // Clear any existing auto-close timer
    if (autoCloseTimer) {
      clearTimeout(autoCloseTimer);
    }
    
    // No longer auto-close the cart
    // We'll keep it open until user manually closes it
    setAutoCloseTimer(null);
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (autoCloseTimer) {
        clearTimeout(autoCloseTimer);
      }
    };
  }, [autoCloseTimer]);

  // Remove an item from the cart
  const removeItem = (productId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  // Update the quantity of an item
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear the cart
  const clearCart = () => {
    setItems([]);
  };

  // Calculate total number of items
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  // Calculate total price
  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        lastAddedItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}