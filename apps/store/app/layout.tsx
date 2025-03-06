'use client';

import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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
  const { isCartOpen, closeCart } = useCart();

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />

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
              <div className="h-full flex flex-col bg-white dark:bg-gray-800 shadow-xl">
                <CartSidebar />
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-grow">
        {children}
      </main>

      <Footer />
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
      <body className={`${geistSans.variable} ${geistMono.variable} h-full bg-white dark:bg-gray-900`}>
        <Providers>
          <StoreLayout>{children}</StoreLayout>
        </Providers>
      </body>
    </html>
  );
}
