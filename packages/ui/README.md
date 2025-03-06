# Sellhub UI Library

This package contains reusable UI components for the Sellhub application. These components are designed to be shared across the dashboard and store applications.

## Components

### Button

A versatile button component with various styles and states.

```tsx
import { Button } from 'ui';

<Button variant="primary" size="md" isLoading={false}>Click Me</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'danger' | 'success'
- `size`: 'sm' | 'md' | 'lg'
- `isLoading`: boolean
- `leftIcon`: ReactNode
- `rightIcon`: ReactNode
- `fullWidth`: boolean
- Plus all standard HTML button attributes

### Form Components

#### FormField

A wrapper component for form inputs with labels, error messages, and help text.

```tsx
import { FormField } from '@repo/ui';

<FormField id="email" label="Email Address" error={errors.email} required>
  <input id="email" type="email" />
</FormField>
```

#### InputField

A text input field with validation styling.

```tsx
import { InputField } from '@repo/ui';

<InputField
  id="name"
  label="Full Name"
  name="name"
  value={name}
  onChange={handleChange}
  required
  error={errors.name}
/>
```

#### SelectField

A dropdown select field.

```tsx
import { SelectField } from '@repo/ui';

<SelectField
  id="category"
  label="Category"
  name="category"
  value={category}
  onChange={handleChange}
  required
  options={[
    { value: "electronics", label: "Electronics" },
    { value: "clothing", label: "Clothing" }
  ]}
/>
```

#### NumberField

A number input field.

```tsx
import { NumberField } from '@repo/ui';

<NumberField
  id="quantity"
  label="Quantity"
  name="quantity"
  min={0}
  value={quantity}
  onChange={handleChange}
  required
/>
```

### Badge

A component for displaying short labels or statuses.

```tsx
import { Badge } from '@repo/ui';

<Badge variant="warning" rounded="full">Low Stock</Badge>
```

There are also specialized badge components:

```tsx
import { StockBadge, CategoryBadge } from '@repo/ui';

<StockBadge quantity={5} />
<CategoryBadge category="Electronics" />
```

### ProductDisplay

A reusable product card component that can be customized with actions.

```tsx
import { ProductDisplay } from '@repo/ui';

<ProductDisplay
  product={product}
  renderActions={(product) => (
    <button>Add to Cart</button>
  )}
/>
```

### Toast Notifications

A context-based toast notification system.

```tsx
import { ToastProvider, useToast } from '@repo/ui';

// Wrap your app with the provider
<ToastProvider>
  <App />
</ToastProvider>

// Use the toast in any component
function MyComponent() {
  const { addToast } = useToast();
  
  const handleClick = () => {
    addToast({
      type: 'success',
      title: 'Success',
      message: 'Item added to cart'
    });
  };
  
  return <button onClick={handleClick}>Add to Cart</button>;
}
```

### TRPC Provider

A wrapper component for setting up TRPC with React Query.

```tsx
import { TRPCProvider } from '@repo/ui';
import { trpc } from '../utils/trpc';

<TRPCProvider trpcClient={trpc} apiUrl="/api/trpc">
  <App />
</TRPCProvider>
```

## Usage

Import components directly from the UI package:

```tsx
import { Button, InputField, Badge } from '@repo/ui';
```

## Styling

All components use Tailwind CSS for styling and are designed to be consistent with the Sellhub design system.