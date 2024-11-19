import { z } from "zod";

export const sessionZod = z
  .object({
    sessionToken: z.string(),
    userId: z.number(),
    expires: z.date(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .partial();

export type sessionZodType = z.infer<typeof sessionZod>;
