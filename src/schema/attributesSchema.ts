import { z } from "zod";

export const attributesSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  isRequired: z.boolean(),
  displayOrder: z.number().int().min(0).max(50),
  values: z
    .array(
      z.object({
        id: z.string(),
        value: z.string().min(1, "Value is required"),
      })
    )
    .min(1, "At least one attribute value is required"),
});

export type Attributes = z.infer<typeof attributesSchema>;
