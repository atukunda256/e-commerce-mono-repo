'use client';

import { ReactNode } from 'react';

export interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Container({
  children,
  className = '',
  size = 'lg',
  padding = 'md',
}: ContainerProps) {
  const maxWidth = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-screen-2xl',
    full: 'max-w-full',
  };

  const paddingX = {
    none: 'px-0',
    sm: 'px-2 sm:px-4',
    md: 'px-4 sm:px-6 lg:px-8',
    lg: 'px-6 sm:px-8 lg:px-12',
  };

  return (
    <div className={`mx-auto ${maxWidth[size]} ${paddingX[padding]} ${className}`}>
      {children}
    </div>
  );
}

export interface PageContainerProps {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
  contentClassName?: string;
  actions?: ReactNode;
}

export function PageContainer({
  children,
  title,
  description,
  className = '',
  contentClassName = '',
  actions,
}: PageContainerProps) {
  return (
    <Container>
      <div className={`py-6 md:py-8 ${className}`}>
        {(title || description || actions) && (
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              {title && <h1 className="text-2xl font-bold text-gray-900">{title}</h1>}
              {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
            </div>
            {actions && <div className="mt-4 sm:mt-0">{actions}</div>}
          </div>
        )}
        <div className={contentClassName}>{children}</div>
      </div>
    </Container>
  );
}