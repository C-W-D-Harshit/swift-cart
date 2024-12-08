import { ApiResponse } from "@/lib/api";
import { Hono } from "hono";
import { prisma } from "@/lib/prisma";
import { zValidator } from "@hono/zod-validator";
import { attributesSchema } from "@/schema/attributesSchema";

const attributesRouter = new Hono();

// GET /api/attributes - Get all attributes
attributesRouter.get("/", async (c) => {
  try {
    const attributes = await prisma.attribute.findMany({
      orderBy: {
        displayOrder: "asc",
      },
    });

    return c.json<ApiResponse>({
      success: true,
      data: attributes,
    });
  } catch (error) {
    return c.json<ApiResponse>(
      {
        success: false,
        data: null,
        error:
          error instanceof Error ? error.message : "Failed to fetch attributes",
      },
      500
    );
  }
});

// POST /api/attributes - Create new attribute
attributesRouter.post("/", zValidator("json", attributesSchema), async (c) => {
  try {
    const data = c.req.valid("json");
    const attribute = await prisma.attribute.create({
      data,
    });

    return c.json<ApiResponse>({
      success: true,
      data: attribute,
    });
  } catch (error) {
    return c.json<ApiResponse>(
      {
        success: false,
        data: null,
        error:
          error instanceof Error ? error.message : "Failed to create attribute",
      },
      500
    );
  }
});

// PUT /api/attributes/:id - Update attribute
attributesRouter.put(
  "/:id",
  zValidator("json", attributesSchema),
  async (c) => {
    try {
      const id = c.req.param("id");
      const data = c.req.valid("json");

      const attribute = await prisma.attribute.update({
        where: { id },
        data,
      });

      return c.json<ApiResponse>({
        success: true,
        data: attribute,
      });
    } catch (error) {
      return c.json<ApiResponse>(
        {
          success: false,
          data: null,
          error:
            error instanceof Error
              ? error.message
              : "Failed to update attribute",
        },
        500
      );
    }
  }
);

// DELETE /api/attributes/:id - Delete attribute
attributesRouter.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");

    const attribute = await prisma.attribute.delete({
      where: { id },
    });

    return c.json<ApiResponse>({
      success: true,
      data: attribute,
    });
  } catch (error) {
    return c.json<ApiResponse>(
      {
        success: false,
        data: null,
        error:
          error instanceof Error ? error.message : "Failed to delete attribute",
      },
      500
    );
  }
});

export default attributesRouter;
