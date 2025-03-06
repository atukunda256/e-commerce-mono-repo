'use client';

import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

export interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  helpText?: string;
}

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ id, label, error, required = false, children, helpText }, ref) => {
    return (
      <div ref={ref}>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="mt-1">{children}</div>
        {helpText && <p className="mt-1 text-sm text-gray-500">{helpText}</p>}
        {error && <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>}
      </div>
    );
  }
);

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  helpText?: string;
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
  containerClassName?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ 
    id, 
    label, 
    error, 
    required = false, 
    helpText, 
    leftAddon, 
    rightAddon,
    containerClassName = '',
    className = '', 
    ...props 
  }, ref) => {
    const hasError = !!error;
    const baseInputClasses = 'block w-full py-3 border rounded-md shadow-sm focus:outline-none focus:ring-1 sm:text-sm';
    const inputClasses = `${baseInputClasses} ${
      hasError
        ? 'border-red-400 text-gray-900 focus:border-red-500 focus:ring-red-500'
        : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
    } ${leftAddon ? 'pl-10' : 'pl-4'} ${rightAddon ? 'pr-10' : 'pr-4'} ${className}`;

    return (
      <FormField id={id} label={label} error={error} required={required} helpText={helpText}>
        <div className={`relative rounded-md shadow-sm ${containerClassName}`}>
          {leftAddon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {leftAddon}
            </div>
          )}
          
          <input
            ref={ref}
            id={id}
            className={inputClasses}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${id}-error` : undefined}
            {...props}
          />
          
          {rightAddon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {rightAddon}
            </div>
          )}
          
        </div>
      </FormField>
    );
  }
);

export interface SelectFieldProps extends InputHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  helpText?: string;
  options: Array<{ value: string; label: string }>;
  containerClassName?: string;
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ 
    id, 
    label, 
    error, 
    required = false, 
    helpText, 
    options,
    containerClassName = '',
    className = '', 
    ...props 
  }, ref) => {
    const hasError = !!error;
    const baseSelectClasses = 'block w-full py-3 px-4 border rounded-md shadow-sm focus:outline-none focus:ring-1 sm:text-sm';
    const selectClasses = `${baseSelectClasses} ${
      hasError
        ? 'border-red-400 text-gray-900 focus:border-red-500 focus:ring-red-500'
        : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
    } ${className}`;

    return (
      <FormField id={id} label={label} error={error} required={required} helpText={helpText}>
        <div className={`relative rounded-md shadow-sm ${containerClassName}`}>
          <select
            ref={ref}
            id={id}
            className={selectClasses}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${id}-error` : undefined}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
        </div>
      </FormField>
    );
  }
);

export interface NumberFieldProps extends Omit<InputFieldProps, 'type'> {
  min?: number;
  max?: number;
  step?: number;
}

export const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>(
  ({ id, label, error, required, helpText, leftAddon, rightAddon, min, max, step, ...props }, ref) => {
    return (
      <InputField
        ref={ref}
        id={id}
        label={label}
        error={error}
        required={required}
        helpText={helpText}
        leftAddon={leftAddon}
        rightAddon={rightAddon}
        type="number"
        min={min}
        max={max}
        step={step}
        {...props}
      />
    );
  }
);