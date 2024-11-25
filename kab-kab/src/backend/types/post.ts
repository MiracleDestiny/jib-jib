import { z } from "zod";

export type postPostZodType = z.infer<typeof postPostZod>;
export type postPostLikeZodType = z.infer<typeof postLikeZod>;
export type postPostBookmarkZodType = z.infer<typeof postBookmarkZod>;
export type postZodType = z.infer<typeof postZod>;

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

export const postZod = z
  .object({
    authorID: z.number(),
    content: z.string().nullable(),
    parentPostID: z.number().nullable(),
    postImages: z
      .object({
        imageURL: z.string(),
        orderID: z.number(),
      })
      .optional()
      .array(),
  })
  .partial();
export const postLikeZod = z.object({
  userID: z.number(),
  like: z.boolean(),
});

export const postBookmarkZod = z.object({
  userID: z.number(),
  bookmark: z.boolean(),
});