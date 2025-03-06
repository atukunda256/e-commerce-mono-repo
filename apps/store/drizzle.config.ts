import type { Config } from 'drizzle-kit';

export default {
  schema: './apps/service/src/db/schema/schema.ts',
  out: './apps/service/src/db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;