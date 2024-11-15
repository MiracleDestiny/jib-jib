import bcrypt from "bcrypt";
import prisma from "@/lib/db";
import { SALT_ROUNDS } from "@/backend/config/auth";
export async function authenticateLogin({
  userId,
  inputPassword,
}: {
  userId: string;
  inputPassword: string;
}) {
  const hashedInput = await bcrypt.hash(inputPassword, SALT_ROUNDS);
  // Load hash from your password DB.
  // const password = await prisma.user.findFirst({
  //   where: {
  //     id: userId,
  //   },
  // });
  return bcrypt.compare(inputPassword, hashedInput); // true
}

export async function hashPassword(inputPassword: string) {
  return bcrypt.hash(inputPassword, SALT_ROUNDS);
}
