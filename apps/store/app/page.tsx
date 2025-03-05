'use client';

import { trpc } from '../utils/trpc';
import ProductCard from '../components/ProductCard';
import { useState } from 'react';

export default function Home() {
  const { data: products, isLoading } = trpc.product.getAll.useQuery();
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  
  // Get unique categories from products
  const categories = products ? [...new Set(products.map(p => p.category))] : [];
  
  // Filter products by category if a filter is selected
  const filteredProducts = categoryFilter 
    ? products?.filter(p => p.category === categoryFilter)
    : products;

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-gray-900 opacity-90"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">Shop with confidence</h1>
          <p className="mt-6 max-w-3xl text-xl text-gray-300">
            Discover our curated collection of high-quality products at competitive prices.
            From electronics to fashion, we have everything you need.
          </p>
          <div className="mt-10">
            <a
              href="#products"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-50 transition duration-150"
            >
              Shop Now
              <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="products">
        <div className="grid grid-cols-1 gap-8">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            <span className="text-sm text-gray-700 my-auto mr-2">Filter by category:</span>
            <button
              onClick={() => setCategoryFilter(null)}
              className={`px-3 py-1 rounded-full text-sm ${
                categoryFilter === null
                  ? 'bg-indigo-100 text-indigo-800 font-medium'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              All Products
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={`px-3 py-1 rounded-full text-sm ${
                  categoryFilter === category
                    ? 'bg-indigo-100 text-indigo-800 font-medium'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Main Product Area */}
          <div>
            <div className="flex flex-wrap items-baseline justify-between mb-6 border-b border-gray-200 pb-6">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {categoryFilter ? `${categoryFilter} Products` : 'All Products'}
              </h1>
              
              {/* Desktop category filters */}
              <div className="hidden lg:flex flex-wrap gap-2 items-center">
                <span className="text-sm text-gray-700 mr-2">Filter:</span>
                <button
                  onClick={() => setCategoryFilter(null)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    categoryFilter === null
                      ? 'bg-indigo-100 text-indigo-800'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setCategoryFilter(category)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      categoryFilter === category
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            {isLoading ? (
              <div className="py-32 flex flex-col items-center justify-center">
                <svg className="animate-spin h-12 w-12 text-indigo-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-lg text-gray-600">Loading products...</p>
              </div>
            ) : filteredProducts && filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <svg 
                  className="mx-auto h-16 w-16 text-gray-400" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
                  />
                </svg>
                <h3 className="mt-4 text-xl font-medium text-gray-900">No products found</h3>
                <p className="mt-2 text-lg text-gray-600">
                  {categoryFilter ? `There are no ${categoryFilter} products available at the moment.` : 'No products are available at the moment.'}
                </p>
                {categoryFilter && (
                  <button
                    onClick={() => setCategoryFilter(null)}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    View all products
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Why shop with us?</h2>
            <p className="mt-4 max-w-2xl text-lg text-gray-500 mx-auto">
              We provide an exceptional shopping experience with benefits you'll love.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 mx-auto bg-indigo-100 rounded-full mb-4">
                <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Quality Products</h3>
              <p className="mt-2 text-sm text-gray-500">
                We curate only the highest quality products for our store.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 mx-auto bg-indigo-100 rounded-full mb-4">
                <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Competitive Pricing</h3>
              <p className="mt-2 text-sm text-gray-500">
                Get the best value for your money with our fair pricing.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 mx-auto bg-indigo-100 rounded-full mb-4">
                <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Fast Delivery</h3>
              <p className="mt-2 text-sm text-gray-500">
                We process and ship orders quickly and efficiently.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 mx-auto bg-indigo-100 rounded-full mb-4">
                <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">24/7 Support</h3>
              <p className="mt-2 text-sm text-gray-500">
                Our customer support team is always ready to help you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
