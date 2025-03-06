'use client';

import Link from "next/link";
import { useCart } from "../utils/cart-context";
import { Container, Badge, HomeIcon, Icons } from "@repo/ui";

export default function Navbar() {
  const { toggleCart, totalItems } = useCart();
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <Container>
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="font-bold text-xl text-primary-600 flex items-center">
                <HomeIcon size={20} className="mr-2" />
                Sellhub
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                href="/" 
                className="border-primary-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button 
              onClick={toggleCart}
              className="p-1.5 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 relative"
              aria-label="View cart"
            >
              <Icons.ShoppingCart size={22} />
              {totalItems > 0 && (
                <Badge
                  variant="danger"
                  size="sm"
                  rounded="full"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
                >
                  {totalItems > 99 ? '99+' : totalItems}
                </Badge>
              )}
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}