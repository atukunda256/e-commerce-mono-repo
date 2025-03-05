'use client';

import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import Link from "next/link";
import { usePathname } from 'next/navigation';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <html lang="en" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} h-full bg-gray-50`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            {/* Top Navigation */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex">
                    <div className="flex-shrink-0 flex items-center">
                      <Link href="/" className="font-bold text-xl text-indigo-600">
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
                        Orders
                      </Link>
                    </div>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:items-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Admin
                    </span>
                  </div>
                </div>
              </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow">
              {children}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-auto">
              <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm text-gray-500">
                  © 2025 Sellhub. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
