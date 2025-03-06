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
    primary: 'bg-indigo-100 text-indigo-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
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
    return <Badge variant="danger" rounded="full" size="md">Out of Stock</Badge>;
  }
  
  if (quantity < 5) {
    return <Badge variant="warning" rounded="full" size="md">Low Stock</Badge>;
  }
  
  return null;
};

export const CategoryBadge = ({ category }: { category: string }) => {
  return <Badge variant="primary" rounded="full" className="px-3">{category}</Badge>;
};