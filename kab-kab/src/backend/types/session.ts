import { z } from "zod";
import { userZodType } from "./user";

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

// export type Session = (sessionZodType && typeof {user: userZodType}) || null ;
export type Session = (sessionZodType & { user: userZodType }) | null;
