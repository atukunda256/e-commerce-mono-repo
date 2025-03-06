'use client';

import Link from "next/link";

export default function Footer() {
  return (
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
            © {new Date().getFullYear()} Sellhub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}