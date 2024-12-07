import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  image: z.any(),
  imageDataURI: z.string(),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
