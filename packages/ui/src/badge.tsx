'use client';

import { ReactNode } from 'react';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  rounded?: 'full' | 'md';
  className?: string;
}

export const Badge = ({
  children,
  variant = 'primary',
  size = 'sm',
  rounded = 'md',
  className = '',
}: BadgeProps) => {
  const baseClasses = 'inline-flex items-center font-medium leading-none';
  
  const variantClasses = {
    primary: 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200',
    secondary: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
    success: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    warning: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
    danger: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
    info: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
  };
  
  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };
  
  const roundedClasses = {
    full: 'rounded-full',
    md: 'rounded-md',
  };
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${roundedClasses[rounded]} ${className}`}>
      {children}
    </span>
  );
};

export const StockBadge = ({ quantity }: { quantity: number }) => {
  if (quantity <= 0) {
    return <Badge variant="danger" rounded="full" size="md" className="border border-red-300 dark:border-red-800">Out of Stock</Badge>;
  }
  
  if (quantity < 5) {
    return (
      <Badge 
        variant="warning" 
        rounded="full" 
        size="md" 
        className="border border-yellow-300 dark:border-yellow-800 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 font-medium"
      >
        Low Stock
      </Badge>
    );
  }
  
  return null;
};

export const CategoryBadge = ({ category }: { category: string }) => {
  return <Badge variant="primary" rounded="full" className="px-3">{category}</Badge>;
};

export const StatusBadge = ({ status, className = '', size = 'md', rounded = 'full' }: { 
  status: string, 
  className?: string, 
  size?: BadgeSize,
  rounded?: 'full' | 'md'
}) => {
  let variant: BadgeVariant = 'secondary';
  
  // Normalize status to lowercase for comparison
  const normalizedStatus = status.toLowerCase();
  
  if (['completed', 'delivered', 'active', 'published', 'approved', 'paid', 'success'].includes(normalizedStatus)) {
    variant = 'success';
  } else if (['pending', 'processing', 'in progress', 'waiting', 'draft'].includes(normalizedStatus)) {
    variant = 'warning';
  } else if (['cancelled', 'failed', 'rejected', 'error', 'inactive', 'unpublished'].includes(normalizedStatus)) {
    variant = 'danger';
  } else if (['new', 'info', 'note'].includes(normalizedStatus)) {
    variant = 'info';
  } else if (['featured', 'premium'].includes(normalizedStatus)) {
    variant = 'primary';
  }

  return (
    <Badge variant={variant} size={size} className={className} rounded={rounded}>
      {status}
    </Badge>
  );
};