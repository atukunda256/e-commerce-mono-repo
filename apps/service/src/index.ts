import { appRouter } from './trpc/router';

// Export the router and types
export { appRouter };
export type { AppRouter } from './trpc/router';

// Export the db instance for direct use if needed
export { db } from './db';
export * from './db/schema/schema';