'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Container, Badge, HomeIcon, Icons, UserIcon } from "@repo/ui";

export default function Navbar() {
  const pathname = usePathname();
  
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <Container>
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="font-bold text-xl text-indigo-600 flex items-center">
                <HomeIcon size={20} className="mr-2" />
                Sellhub
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                href="/products" 
                className={`${
                  pathname?.startsWith('/products') 
                  ? 'border-indigo-500 text-gray-900' 
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                <Icons.Package size={18} className="mr-1.5" />
                Products
              </Link>
              <Link 
                href="/orders" 
                className={`${
                  pathname?.startsWith('/orders') 
                  ? 'border-indigo-500 text-gray-900' 
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                <Icons.ShoppingBag size={18} className="mr-1.5" />
                Orders
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Badge variant="success" rounded="full" size="md" className="flex items-center space-x-1">
              <UserIcon size={16} />
              <span>Admin</span>
            </Badge>
          </div>
        </div>
      </Container>
    </nav>
  );
}