'use client';

import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import Link from "next/link";
import CartSidebar from "../components/CartSidebar";
import { useCart } from "../utils/cart-context";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});


function StoreLayout({ children }: { children: React.ReactNode }) {
  const { toggleCart, totalItems, isCartOpen, closeCart } = useCart();

  return (
    <div className="min-h-screen flex flex-col relative">
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="font-bold text-xl text-indigo-600">
                  Sellhub
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link href="/" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Home
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="flex items-center">
                <button 
                  onClick={toggleCart}
                  className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 relative"
                >
                  <span className="sr-only">View cart</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div 
        className={`fixed inset-0 z-30 overflow-hidden transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
            onClick={closeCart}
          ></div>
          
          <div className="absolute inset-y-0 right-0 pl-10 max-w-md w-full flex">
            <div className="w-screen max-w-xl">
              <div className="h-full flex flex-col bg-white shadow-xl">
                <CartSidebar />
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Sellhub</h3>
              <p className="text-gray-300 text-sm max-w-md">
                Your one-stop online shopping destination with the best products 
                at competitive prices. Browse our curated selection and enjoy 
                a seamless shopping experience.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-300 hover:text-white text-sm">Home</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-center text-sm text-gray-300">
              © 2025 Sellhub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} h-full`}>
        <Providers>
          <StoreLayout>{children}</StoreLayout>
        </Providers>
      </body>
    </html>
  );
}
