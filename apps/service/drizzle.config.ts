import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema/schema.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: 'localhost',
    port: 5433,
    user: 'postgres',
    password: 'postgres',
    database: 'sellhub',
    ssl: false,
  },
} satisfies Config;