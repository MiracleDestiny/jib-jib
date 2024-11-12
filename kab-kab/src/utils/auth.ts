import bcrypt from "bcrypt";
import prisma from "@/lib/db";
const saltRounds = 10;

export async function authenticateLogin({ userId, inputPassword }: { userId: string; inputPassword: string }) {
  const hashedInput = await bcrypt.hash(inputPassword, saltRounds);
  // Load hash from your password DB.
  const password = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  return bcrypt.compare(inputPassword, hashedInput); // true
}

export async function hashPassword({ inputPassword }: { inputPassword: string }) {
  return bcrypt.hash(inputPassword, saltRounds);
}
