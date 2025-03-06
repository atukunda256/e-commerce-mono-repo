'use client';

export default function HeroBanner() {
  return (
    <div className="relative bg-gray-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-gray-900 opacity-90"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Shop with confidence
        </h1>
        <p className="mt-6 max-w-3xl text-xl text-gray-300">
          Discover our curated collection of high-quality products at
          competitive prices. From electronics to fashion, we have everything
          you need.
        </p>
        <div className="mt-10">
          <a
            href="#products"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-50 transition duration-150"
          >
            Shop Now
            <svg
              className="ml-2 -mr-1 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}