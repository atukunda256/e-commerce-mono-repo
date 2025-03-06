"use client";

import {trpc} from "../utils/trpc";
import ProductCard from "../components/ProductCard";
import HeroBanner from "../components/HeroBanner";
import {useState, useEffect} from "react";

export default function Home() {
  const {
    data: products,
    isLoading,
    refetch,
  } = trpc.product.getAll.useQuery(
    {},
    {
      refetchInterval: 10000,
    }
  );
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  useEffect(() => {
    refetch();
    const intervalId = setInterval(() => {
      refetch();
    }, 5000); 
    return () => clearInterval(intervalId);
  }, [refetch]);

  const categories = products
    ? [...new Set(products.map((p) => p.category))]
    : [];

  // Filter products by category if a filter is selected
  const filteredProducts = categoryFilter
    ? products?.filter((p) => p.category === categoryFilter)
    : products;

  return (
    <div>
      <HeroBanner />

      {/* Main Content */}
      <main
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        id="products"
      >
        <div className="grid grid-cols-1 gap-8">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            <span className="text-sm text-gray-700 dark:text-gray-300 my-auto mr-2">
              Filter by category:
            </span>
            <button
              onClick={() => setCategoryFilter(null)}
              className={`px-3 py-1 rounded-full text-sm ${
                categoryFilter === null
                  ? "bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 font-medium"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              All Products
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={`px-3 py-1 rounded-full text-sm ${
                  categoryFilter === category
                    ? "bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 font-medium"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Main Product Area */}
          <div>
            <div className="flex flex-wrap items-baseline justify-between mb-6 border-b border-gray-200 pb-6">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                {categoryFilter ? `${categoryFilter} Products` : "All Products"}
              </h1>

              {/* Desktop category filters */}
              <div className="hidden lg:flex flex-wrap gap-2 items-center">
                <span className="text-sm text-gray-700 dark:text-gray-300 mr-2">Filter:</span>
                <button
                  onClick={() => setCategoryFilter(null)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    categoryFilter === null
                      ? "bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setCategoryFilter(category)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      categoryFilter === category
                        ? "bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {isLoading ? (
              <div className="py-32 flex flex-col items-center justify-center">
                <svg
                  className="animate-spin h-12 w-12 text-primary-600 mb-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <p className="text-lg text-gray-600 dark:text-gray-400">Loading products...</p>
              </div>
            ) : filteredProducts && filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="h-full">
                    <ProductCard product={product} />
                  </div>
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
                <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-white">
                  No products found
                </h3>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                  {categoryFilter
                    ? `There are no ${categoryFilter} products available at the moment.`
                    : "No products are available at the moment."}
                </p>
                {categoryFilter && (
                  <button
                    onClick={() => setCategoryFilter(null)}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                  >
                    View all products
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
