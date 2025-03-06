'use client';

import React from 'react';
import { 
  FieldValues, 
  UseFormReturn, 
  FieldErrors, 
  Path, 
  UseFormRegister, 
  FieldError, 
  RegisterOptions
} from 'react-hook-form';
import { ZodType, ZodTypeDef } from 'zod';
import { FormField, InputField, NumberField, SelectField } from './form-field';

// This type allows us to create a typed Form component that works with Zod schema
export type FormProps<TFormValues extends FieldValues, Schema extends ZodType<any, ZodTypeDef, any>> = {
  form: UseFormReturn<TFormValues>;
  children: React.ReactNode;
  onSubmit: (data: TFormValues) => void;
  className?: string;
};

// Generic Form component that can be used with react-hook-form and zod
export function Form<
  TFormValues extends FieldValues,
  Schema extends ZodType<any, ZodTypeDef, any>
>({ 
  form, 
  children, 
  onSubmit, 
  className = '' 
}: FormProps<TFormValues, Schema>) {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className={className} noValidate>
      {children}
    </form>
  );
}

// Utility function to get the error message from react-hook-form
export function getFormErrorMessage(error?: FieldError) {
  return error ? error.message : undefined;
}

// Typed form input components that work with react-hook-form
export interface FormInputFieldProps<TFormValues extends FieldValues> {
  name: Path<TFormValues>;
  label: string;
  register: UseFormRegister<TFormValues>;
  errors: FieldErrors<TFormValues>;
  rules?: RegisterOptions;
  required?: boolean;
  placeholder?: string;
  type?: string;
  className?: string;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
}

export function FormInputField<TFormValues extends FieldValues>({
  name,
  label,
  register,
  errors,
  rules,
  required = false,
  placeholder = '',
  type = 'text',
  className = '',
  leftAddon,
  rightAddon,
}: FormInputFieldProps<TFormValues>) {
  const error = errors[name]?.message as string | undefined;
  
  return (
    <InputField
      id={name}
      label={label}
      error={error}
      required={required}
      placeholder={placeholder}
      type={type}
      className={className}
      leftAddon={leftAddon}
      rightAddon={rightAddon}
      {...register(name, rules)}
    />
  );
}

export interface FormNumberFieldProps<TFormValues extends FieldValues> 
  extends Omit<FormInputFieldProps<TFormValues>, 'type'> {
  min?: number;
  max?: number;
  step?: number;
}

export function FormNumberField<TFormValues extends FieldValues>({
  name,
  label,
  register,
  errors,
  rules,
  required = false,
  placeholder = '',
  className = '',
  leftAddon,
  rightAddon,
  min,
  max,
  step,
}: FormNumberFieldProps<TFormValues>) {
  const error = errors[name]?.message as string | undefined;
  
  // Use HTML attribute 'noValidate' on the parent form to disable HTML5 validation
  // This is handled in register below with a dummy onInvalid handler
  return (
    <NumberField
      id={name}
      label={label}
      error={error}
      required={required}
      placeholder={placeholder}
      className={className}
      leftAddon={leftAddon}
      rightAddon={rightAddon}
      min={min}
      max={max}
      step={step}
      {...register(name, {
        ...rules,
        valueAsNumber: true,
        // This prevents HTML5 validation by handling the invalid event
        // while still allowing our Zod validation to run
        onInvalid: (e) => e.preventDefault(),
      })}
    />
  );
}

export interface FormSelectFieldProps<TFormValues extends FieldValues> 
  extends Omit<FormInputFieldProps<TFormValues>, 'type' | 'placeholder'> {
  options: Array<{ value: string; label: string }>;
}

export function FormSelectField<TFormValues extends FieldValues>({
  name,
  label,
  register,
  errors,
  rules,
  required = false,
  className = '',
  options,
}: FormSelectFieldProps<TFormValues>) {
  const error = errors[name]?.message as string | undefined;
  
  return (
    <SelectField
      id={name}
      label={label}
      error={error}
      required={required}
      className={className}
      options={options}
      {...register(name, rules)}
    />
  );
}

// Form submit button component
export interface FormSubmitButtonProps {
  isSubmitting?: boolean;
  text: string;
  loadingText?: string;
  className?: string;
}

export function FormSubmitButton({
  isSubmitting = false,
  text,
  loadingText = 'Submitting...',
  className = '',
}: FormSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`flex items-center justify-center py-2 px-4 rounded-md font-medium transition-colors bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 text-white disabled:bg-primary-400 disabled:cursor-not-allowed ${className}`}
    >
      {isSubmitting ? (
        <>
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
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
          {loadingText}
        </>
      ) : (
        text
      )}
    </button>
  );
}