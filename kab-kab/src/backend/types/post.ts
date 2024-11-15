import { z } from "zod";

export type postPostZodType = z.infer<typeof postPostZod>;

export const postPostZod = z.object({
  authorID: z.number(),
  content: z.string(),
  parentPostID: z.number().optional(),
  postImages: z
    .object({
      imageURL: z.string(),
      orderID: z.number(),
    })
    .optional()
    .array(),
});
