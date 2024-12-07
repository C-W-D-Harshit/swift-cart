import { prisma } from "@/lib/prisma";
import redis, { CACHE_KEY_PREFIX } from "@/lib/redis";
import { Hono } from "hono";
import { Category } from "@prisma/client";
import { zValidator } from "@hono/zod-validator";
import { createCategorySchema } from "../schema/categorySchema";
import { fileToDataUri } from "@/lib/utils";
import { handleUpload } from "@/lib/cloudinary";

/**
 * Type for the API response structure
 */
type ApiResponse<T> = {
  success: boolean;
  data: T | null;
  error?: string;
};

const categoryRouter = new Hono();

// Redis cache keys and TTL
const REDIS_KEYS = {
  ALL_CATEGORIES: CACHE_KEY_PREFIX + "categories:all",
  CATEGORY_BY_ID: (id: string) => CACHE_KEY_PREFIX + `categories:${id}`,
};
const CACHE_TTL = 3600; // 1 hour in seconds

// GET /api/categories
categoryRouter.get("/", async (c) => {
  try {
    // Try to get categories from Redis
    const cachedCategories = await redis.get(REDIS_KEYS.ALL_CATEGORIES);
    if (cachedCategories) {
      return c.json<ApiResponse<Category[]>>({
        success: true,
        data: JSON.parse(
          typeof cachedCategories === "string" ? cachedCategories : "[]"
        ),
      });
    }

    // If not in cache, get from database
    const categories = await prisma.category.findMany();

    // Store in Redis
    await redis.setex(
      REDIS_KEYS.ALL_CATEGORIES,
      CACHE_TTL,
      JSON.stringify(categories)
    );

    return c.json<ApiResponse<Category[]>>({
      success: true,
      data: categories,
    });
  } catch (error) {
    return c.json<ApiResponse<null>>(
      {
        success: false,
        data: null,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      500
    );
  }
});

// GET /api/categories/:id
categoryRouter.get("/:id", async (c) => {
  try {
    const { id } = c.req.param();

    // Try to get category from Redis
    const cachedCategory = await redis.get(REDIS_KEYS.CATEGORY_BY_ID(id));
    if (cachedCategory) {
      return c.json<ApiResponse<Category>>({
        success: true,
        data: JSON.parse(
          typeof cachedCategory === "string" ? cachedCategory : "{}"
        ),
      });
    }

    // If not in cache, get from database
    const category = await prisma.category.findUnique({ where: { id } });

    if (!category) {
      return c.json<ApiResponse<null>>(
        {
          success: false,
          data: null,
          error: "Category not found",
        },
        404
      );
    }

    // Store in Redis
    await redis.setex(
      REDIS_KEYS.CATEGORY_BY_ID(id),
      CACHE_TTL,
      JSON.stringify(category)
    );

    return c.json<ApiResponse<Category>>({
      success: true,
      data: category,
    });
  } catch (error) {
    return c.json<ApiResponse<null>>(
      {
        success: false,
        data: null,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      500
    );
  }
});

// POST /api/categories/create
categoryRouter.post(
  "/create",
  zValidator("json", createCategorySchema),
  async (c) => {
    try {
      const data = c.req.valid("json");
      const { name, image, isActive, description } = data;

      const imageDataURI = await fileToDataUri(image);
      const cldRes = await handleUpload(imageDataURI, "categories");

      const category = await prisma.category.create({
        data: {
          name,
          imageUrl: cldRes.secure_url,
          isActive,
          description,
          imagePublicId: cldRes.public_id,
        },
      });

      // Invalidate related cache entries
      await Promise.all([
        redis.del(REDIS_KEYS.ALL_CATEGORIES),
        redis.del(REDIS_KEYS.CATEGORY_BY_ID(category.id)),
      ]);

      return c.json<ApiResponse<Category>>({
        success: true,
        data: category,
      });
    } catch (error) {
      return c.json<ApiResponse<null>>(
        {
          success: false,
          data: null,
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
        },
        500
      );
    }
  }
);

export default categoryRouter;
