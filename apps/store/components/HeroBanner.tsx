'use client';

import { Container, Button, ArrowRightIcon } from "@repo/ui";

export default function HeroBanner() {
  return (
    <div className="relative bg-gray-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-gray-900 opacity-90"></div>
      </div>
      <Container className="relative py-24 sm:py-32">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Shop with confidence
        </h1>
        <p className="mt-6 max-w-3xl text-xl text-gray-300">
          Discover our curated collection of high-quality products at
          competitive prices. From electronics to fashion, we have everything
          you need.
        </p>
        <div className="mt-10">
          <Button 
            as="a"
            href="#products"
            variant="secondary"
            size="lg"
            rightIcon={<ArrowRightIcon size={18} />}
          >
            Shop Now
          </Button>
        </div>
      </Container>
    </div>
  );
}