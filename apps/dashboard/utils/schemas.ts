import { z } from 'zod';

// Define the product schema using Zod
export const productSchema = z.object({
  name: z.string()
    .min(1, { message: 'Product name is required' })
    .max(100, { message: 'Product name cannot exceed 100 characters' }),
  
  category: z.string()
    .min(1, { message: 'Category is required' }),
  
  quantity: z.number()
    .int({ message: 'Quantity must be a whole number' })
    .min(0, { message: 'Quantity cannot be negative' }),
  
  price: z.number()
    .positive({ message: 'Price must be greater than zero' })
    .multipleOf(0.01, { message: 'Price can have at most 2 decimal places' }),
});

// Create a type from the schema
export type ProductFormValues = z.infer<typeof productSchema>;

// Login form schema
export const loginSchema = z.object({
  email: z.string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  
  password: z.string()
    .min(1, { message: 'Password is required' }),
  
  rememberMe: z.boolean().optional(),
});