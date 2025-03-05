import { relations } from 'drizzle-orm';
import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  doublePrecision,
  integer,
  uuid,
} from 'drizzle-orm/pg-core';

// Product schema: id, Name, Category, quantity, price, create_at, updated_at, deleted_at
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  quantity: integer('quantity').notNull().default(0),
  price: doublePrecision('price').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
});

// Type for product selection
export type ProductSelect = {
  id: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

// Order schema: id, list of Products, created_at, updated_at, deleted_at
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
});

// Junction table for order-product relationship
export const orderProducts = pgTable('order_products', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').notNull().references(() => orders.id),
  productId: integer('product_id').notNull().references(() => products.id),
  quantity: integer('quantity').notNull(),
  priceAtOrder: doublePrecision('price_at_order').notNull(),
});

// Relations
export const productsRelations = relations(products, ({ many }) => ({
  orderProducts: many(orderProducts),
}));

export const ordersRelations = relations(orders, ({ many }) => ({
  orderProducts: many(orderProducts),
}));

export const orderProductsRelations = relations(orderProducts, ({ one }) => ({
  order: one(orders, {
    fields: [orderProducts.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderProducts.productId],
    references: [products.id],
  }),
}));