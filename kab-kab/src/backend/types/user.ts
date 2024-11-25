import { z } from "zod";

export type postUserZodType = z.infer<typeof postUserZod>;

export const postUserZod = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string(),
  name: z.string(),
  imageURL: z.string(),
  profile: z.object({
    bio: z.string().optional(),
    location: z.string().optional(),
    dateOfBirth: z.date(),
  }),
});

export const userZod = z
  .object({
    username: z.string(),
    password: z.string(),
    email: z.string(),
    name: z.string(),
    imageURL: z.string(),
  })
  .partial();

export const postFollowUserZod = z.object({
  followedID: z.number(),
  followerID: z.number(),
});

export type userZodType = z.infer<typeof userZod>;
export type postFollowUserZodType = z.infer<typeof postFollowUserZod>;
