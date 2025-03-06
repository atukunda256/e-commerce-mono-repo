'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../utils/schemas';
import { Form, FormSubmitButton } from '@repo/ui';

type LoginFormValues = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@sellhub.io',
      password: '••••••••',
      rememberMe: true,
    },
  });
  

  const onSubmit = (data: LoginFormValues) => {
    setIsLoading(true);
    // This would normally authenticate the user
    // For now, just redirect to products page with slight delay to show loading state
    setTimeout(() => {
      router.push('/products');
    }, 800);
  };

  return (
    <main className="flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-primary-600 tracking-tight mb-1">Sellhub</h1>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Seller Dashboard</h2>
          <p className="mt-3 text-base text-gray-600 dark:text-gray-300 max-w-xs mx-auto">
            Welcome back! Log in to manage your products, track orders, and grow your business.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 py-8 px-6 shadow rounded-lg sm:px-10 border border-gray-100 dark:border-gray-700">
          <Form form={form} onSubmit={onSubmit} className="space-y-6">
            <div>
              <FormSubmitButton
                isSubmitting={isLoading}
                text="Sign in"
                loadingText="Logging in..."
                className="w-full"
              />
            </div>
          </Form>
          
          <div className="mt-6 text-center text-xs">
            <p className="text-gray-500 dark:text-gray-400">
              This is a demo application. Click "Sign in" to access the dashboard.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
