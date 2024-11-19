import { Session, User } from "@prisma/client";
import { z } from "zod";
import { userZodType } from "./user";
import { sessionZodType } from "./session";

export type postAuthSignInZodType = z.infer<typeof postAuthSignInZod>;

export type postAuthSignInZodResult = {
  data: {
    user: userZodType;
    session: sessionZodType;
  };
};

export const postAuthSignInZod = z.object({
  usernameemail: z.string(),
  password: z.string(),
});
