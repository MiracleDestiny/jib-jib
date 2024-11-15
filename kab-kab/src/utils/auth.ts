import bcrypt from "bcrypt";
import prisma from "@/lib/db";
import { SALT_ROUNDS } from "@/backend/config/auth";
export async function authenticateLogin({
  userId,
  inputPassword,
}: {
  userId: number;
  inputPassword: string;
}) {
  const hashedInput = await bcrypt.hash(inputPassword, SALT_ROUNDS);
  // Load hash from your password DB.
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      password: true,
    },
  });
  return !user ? false : bcrypt.compare(user.password, hashedInput); // true
}

export async function hashPassword(inputPassword: string) {
  return bcrypt.hash(inputPassword, SALT_ROUNDS);
}
