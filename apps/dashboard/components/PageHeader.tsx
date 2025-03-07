'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';

interface PageHeaderProps {
  title: string;
  description?: string;
  actionHref?: string;
  actionText?: string;
  actionIcon?: ReactNode;
  children?: ReactNode;
}

export default function PageHeader({
  title,
  description,
  actionHref,
  actionText,
  actionIcon,
  children,
}: PageHeaderProps) {
  return (
    <div className="md:flex md:items-center md:justify-between mb-8">
      <div className="flex-1 min-w-0">
        <h1 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl sm:truncate">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
      <div className="mt-5 flex lg:mt-0 lg:ml-4">
        {actionHref && actionText && (
          <Link
            href={actionHref}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            {actionIcon && (
              <span className="-ml-1 mr-2 h-5 w-5">
                {actionIcon}
              </span>
            )}
            {actionText}
          </Link>
        )}
        {children}
      </div>
    </div>
  );
}