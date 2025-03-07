"use client";

import { ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef, ReactNode, ElementType } from "react";

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonAsProps<T extends ElementType> = {
  as?: T;
};

export type ButtonProps<T extends ElementType = 'button'> = ButtonAsProps<T> & 
  Omit<T extends 'button' ? ButtonHTMLAttributes<HTMLButtonElement> : AnchorHTMLAttributes<HTMLAnchorElement>, 'as'> & {
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    fullWidth?: boolean;
    className?: string;
  };

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps<any>>(
  (
    {
      as: Component = 'button',
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = '',
      disabled,
      type = Component === 'button' ? 'button' : undefined,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const variantStyles = {
      primary: 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500 border border-transparent disabled:bg-primary-400',
      secondary: 'bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 focus:ring-primary-500 border border-gray-300 dark:border-gray-600 disabled:bg-gray-100 dark:disabled:bg-gray-800',
      outline: 'bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-primary-600 dark:text-primary-400 focus:ring-primary-500 border border-primary-600 dark:border-primary-500 disabled:text-gray-400 disabled:border-gray-300 dark:disabled:text-gray-500 dark:disabled:border-gray-700',
      danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 border border-transparent disabled:bg-red-400',
      success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500 border border-transparent disabled:bg-green-400',
    };
    
    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    };
    
    const widthStyles = fullWidth ? 'w-full' : '';
    const disabledStyles = disabled || isLoading ? 'cursor-not-allowed opacity-70' : '';
    
    const loadingIcon = isLoading && (
      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    );

    return (
      <Component
        ref={ref as any}
        type={type}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${disabledStyles} ${className}`}
        {...props}
      >
        {loadingIcon}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </Component>
    );
  }
);
