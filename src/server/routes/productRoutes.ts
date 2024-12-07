/**
 * Product routes handler
 * Handles all API endpoints related to product operations
 */

import { prisma } from "@/lib/prisma";
import redis, { PRODUCT_CACHE_KEY, PRODUCTS_CACHE_KEY } from "@/lib/redis";
import { Hono } from "hono";

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

// DELETE /api/products/:id
productRouter.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");

    // Check if product exists first
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return c.json({ success: false, message: "Product not found" }, 404);
    }

    const product = await prisma.product.delete({
      where: { id },
    });

    // Invalidate both product-specific and list caches
    await Promise.all([
      redis.del(PRODUCTS_CACHE_KEY),
      redis.del(PRODUCT_CACHE_KEY(id)),
    ]);

    return c.json({
      success: true,
      data: product,
      message: "Product successfully deleted",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return c.json(
      {
        success: false,
        message: "Failed to delete product",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
});

// PATCH /api/products/:id
productRouter.patch("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return c.json({ success: false, message: "Product not found" }, 404);
    }

    // Build update data with only provided fields
    const updateData: {
      name?: string;
      description?: string;
      category?: { connect: { id: string } };
      slug?: string;
    } = {};

    if (body.name) {
      updateData.name = body.name;
      // Update slug if name changes
      const slug = body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      let uniqueSlug = slug;
      let counter = 1;

      const existingSlugs = await prisma.product.findMany({
        where: {
          slug: { startsWith: slug },
          id: { not: id }, // Exclude current product
        },
        select: { slug: true },
      });

      const slugSet = new Set(existingSlugs.map((p) => p.slug));
      while (slugSet.has(uniqueSlug)) {
        uniqueSlug = `${slug}-${counter}`;
        counter++;
      }

      updateData.slug = uniqueSlug;
    }

    if (body.description) {
      updateData.description = body.description;
    }

    if (body.categoryId) {
      updateData.category = { connect: { id: body.categoryId } };
    }

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    // Invalidate both product-specific and list caches
    await Promise.all([
      redis.del(PRODUCTS_CACHE_KEY),
      redis.del(PRODUCT_CACHE_KEY(id)),
    ]);

    return c.json({
      success: true,
      data: product,
      message: "Product successfully updated",
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return c.json(
      {
        success: false,
        message: "Failed to update product",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
});

export default productRouter;
