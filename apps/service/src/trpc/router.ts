import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { db, ProductInsert } from '../db';
import { products, orders, orderProducts } from '../db/schema/schema';
import { eq, desc, isNull } from 'drizzle-orm';

// Create a new tRPC instance
const t = initTRPC.create();

// Create a router
export const router = t.router;
export const publicProcedure = t.procedure;

// Product router
export const productRouter = router({
  // Create a new product
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        category: z.string().min(1),
        quantity: z.number().int().min(0),
        price: z.number().positive(),
      })
    )
    .mutation(async ({ input }) => {
      const product: ProductInsert = {
        name: input.name,
        category: input.category,
        quantity: input.quantity,
        price: input.price,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await db.insert(products).values(product).returning();
      return result[0];
    }),

  // Get all products
  getAll: publicProcedure.query(async () => {
    return await db
      .select()
      .from(products)
      .where(isNull(products.deletedAt))
      .orderBy(desc(products.createdAt));
  }),

  // Get a product by ID
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const result = await db
        .select()
        .from(products)
        .where(eq(products.id, input.id))
        .limit(1);
      
      return result.length > 0 ? result[0] : null;
    }),

  // Update a product
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1).optional(),
        category: z.string().min(1).optional(),
        quantity: z.number().int().min(0).optional(),
        price: z.number().positive().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...updateData } = input;

      const result = await db
        .update(products)
        .set({
          ...updateData,
          updatedAt: new Date(),
        })
        .where(eq(products.id, id))
        .returning();

      return result[0];
    }),

  // Delete a product (soft delete)
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const result = await db
        .update(products)
        .set({
          deletedAt: new Date(),
        })
        .where(eq(products.id, input.id))
        .returning();

      return result[0];
    }),
});

// Order router
export const orderRouter = router({
  // Create a new order
  create: publicProcedure
    .input(
      z.object({
        items: z.array(
          z.object({
            productId: z.number(),
            quantity: z.number().int().positive(),
            price: z.number().positive(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      // Insert new order
      const orderResult = await db
        .insert(orders)
        .values({
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      const newOrder = orderResult[0];

      // Insert order items
      for (const item of input.items) {
        await db.insert(orderProducts).values({
          orderId: newOrder.id,
          productId: item.productId,
          quantity: item.quantity,
          priceAtOrder: item.price,
        });

        // Update product quantity (decrement)
        const product = await db
          .select()
          .from(products)
          .where(eq(products.id, item.productId))
          .limit(1);

        if (product.length > 0) {
          const currentQuantity = product[0].quantity;
          await db
            .update(products)
            .set({
              quantity: Math.max(0, currentQuantity - item.quantity),
              updatedAt: new Date(),
            })
            .where(eq(products.id, item.productId));
        }
      }

      return newOrder;
    }),
    
  // Get all orders with order items
  getAll: publicProcedure.query(async () => {
    // First fetch all orders
    const allOrders = await db
      .select()
      .from(orders)
      .where(isNull(orders.deletedAt))
      .orderBy(desc(orders.createdAt));
    
    // For each order, fetch its items
    const ordersWithItems = await Promise.all(
      allOrders.map(async (order) => {
        // Get order items
        const items = await db
          .select({
            id: orderProducts.id,
            quantity: orderProducts.quantity,
            priceAtOrder: orderProducts.priceAtOrder,
            productId: orderProducts.productId,
          })
          .from(orderProducts)
          .where(eq(orderProducts.orderId, order.id));
          
        // Get product details for each item
        const itemsWithProducts = await Promise.all(
          items.map(async (item) => {
            const productResult = await db
              .select()
              .from(products)
              .where(eq(products.id, item.productId))
              .limit(1);
              
            const product = productResult.length > 0 ? productResult[0] : null;
            
            return {
              ...item,
              product,
            };
          })
        );
          
        // Calculate total amount for the order
        const totalAmount = itemsWithProducts.reduce(
          (sum, item) => sum + (item.priceAtOrder * item.quantity),
          0
        );
          
        return {
          ...order,
          items: itemsWithProducts,
          totalAmount,
          totalItems: itemsWithProducts.reduce((sum, item) => sum + item.quantity, 0),
        };
      })
    );
      
    return ordersWithItems;
  }),
  
  // Get order details by ID
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      // Get the order
      const orderResult = await db
        .select()
        .from(orders)
        .where(eq(orders.id, input.id))
        .limit(1);
        
      if (orderResult.length === 0) return null;
      const order = orderResult[0];
      
      // Get order items
      const items = await db
        .select({
          id: orderProducts.id,
          quantity: orderProducts.quantity,
          priceAtOrder: orderProducts.priceAtOrder,
          productId: orderProducts.productId,
        })
        .from(orderProducts)
        .where(eq(orderProducts.orderId, order.id));
        
      // Get product details for each item
      const itemsWithProducts = await Promise.all(
        items.map(async (item) => {
          const productResult = await db
            .select()
            .from(products)
            .where(eq(products.id, item.productId))
            .limit(1);
            
          const product = productResult.length > 0 ? productResult[0] : null;
          
          return {
            ...item,
            product,
          };
        })
      );
        
      // Calculate total amount
      const totalAmount = itemsWithProducts.reduce(
        (sum, item) => sum + (item.priceAtOrder * item.quantity),
        0
      );
        
      return {
        ...order,
        items: itemsWithProducts,
        totalAmount,
        totalItems: itemsWithProducts.reduce((sum, item) => sum + item.quantity, 0),
      };
    }),
});

// Combine routers
export const appRouter = router({
  product: productRouter,
  order: orderRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;