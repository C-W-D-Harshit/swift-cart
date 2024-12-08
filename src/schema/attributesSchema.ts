import { z } from "zod";

export const attributesSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  isRequired: z.boolean().default(false),
  displayOrder: z.number().int().nonnegative(),
});

export type Attributes = z.infer<typeof attributesSchema>;
