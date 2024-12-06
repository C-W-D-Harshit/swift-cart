/**
 * Product routes handler
 * Handles all API endpoints related to product operations
 */

import { prisma } from "@/lib/prisma";
import { Hono } from "hono";

const productRouter = new Hono();

// GET /api/products
productRouter.get("/", async (c) => {
  const products = await prisma.product.findMany();
  return c.json({
    success: true,
    data: products,
  });
});

export default productRouter;
