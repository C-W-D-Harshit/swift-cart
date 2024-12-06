/**
 * Product routes handler
 * Handles all API endpoints related to product operations
 */

import { prisma } from "@/lib/prisma";
import { Hono } from "hono";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const CACHE_KEY_PREFIX = "swift-cart:";
const PRODUCTS_CACHE_KEY = `${CACHE_KEY_PREFIX}products`;
const PRODUCT_CACHE_KEY = (id: string) => `${CACHE_KEY_PREFIX}product:${id}`;

const productRouter = new Hono();

// GET /api/products
productRouter.get("/", async (c) => {
  // Try to get from cache first
  const cachedProducts = await redis.get(PRODUCTS_CACHE_KEY);

  if (cachedProducts) {
    return c.json({
      success: true,
      data: cachedProducts,
      source: "cache",
    });
  }

  // Cache miss - get from database
  const products = await prisma.product.findMany();

  // Store in cache for 1 hour
  await redis.set(PRODUCTS_CACHE_KEY, products, { ex: 3600 });

  return c.json({
    success: true,
    data: products,
    source: "database",
  });
});

// GET /api/products/:id
productRouter.get("/:id", async (c) => {
  const id = c.req.param("id");

  // Try to get from cache first
  const cachedProduct = await redis.get(PRODUCT_CACHE_KEY(id));

  if (cachedProduct) {
    return c.json({
      success: true,
      data: cachedProduct,
      source: "cache",
    });
  }

  // Cache miss - get from database
  const product = await prisma.product.findUnique({
    where: { id: id },
  });

  if (!product) {
    return c.json({ success: false, message: "Product not found" }, 404);
  }

  // Store in cache for 1 hour
  await redis.set(PRODUCT_CACHE_KEY(id), product, { ex: 3600 });

  return c.json({
    success: true,
    data: product,
    source: "database",
  });
});

// POST /api/products/create
productRouter.post("/create", async (c) => {
  try {
    const { name, description, categoryId } = await c.req.json();

    if (!name || !description || !categoryId) {
      return c.json(
        { success: false, message: "Missing required fields" },
        400
      );
    }

    // Generate initial slug
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    let uniqueSlug = slug;
    let counter = 1;

    // Check for unique slug and append counter if necessary
    const existingSlugs = await prisma.product.findMany({
      where: {
        slug: {
          startsWith: slug,
        },
      },
      select: {
        slug: true,
      },
    });

    const slugSet = new Set(existingSlugs.map((p) => p.slug));
    while (slugSet.has(uniqueSlug)) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        category: {
          connect: { id: categoryId },
        },
        slug: uniqueSlug,
      },
    });

    // Invalidate cache
    await redis.del(PRODUCTS_CACHE_KEY);

    return c.json({ success: true, data: product });
  } catch (error) {
    return c.json(
      { success: false, message: "Internal server error", error },
      500
    );
  }
});

export default productRouter;
