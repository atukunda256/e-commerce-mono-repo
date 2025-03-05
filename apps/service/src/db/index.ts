import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema/schema';

// Database connection string
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5433/sellhub';

// Create a postgres client
const client = postgres(connectionString);

// Create a drizzle instance
export const db = drizzle(client, { schema });

export type ProductInsert = typeof schema.products.$inferInsert;
export type ProductSelect = typeof schema.products.$inferSelect;

export type OrderInsert = typeof schema.orders.$inferInsert;
export type OrderSelect = typeof schema.orders.$inferSelect;

export type OrderProductInsert = typeof schema.orderProducts.$inferInsert;
export type OrderProductSelect = typeof schema.orderProducts.$inferSelect;