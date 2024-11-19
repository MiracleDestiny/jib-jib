import bcrypt from "bcrypt";
import prisma from "@/lib/db";
import { SALT_ROUNDS } from "@/backend/config/auth";
import { randomBytes } from "crypto";
import { cookies } from "next/headers";
export async function authenticateLogin(usernameemail: string, inputPassword: string) {
  const hashedInput = await bcrypt.hash(inputPassword, SALT_ROUNDS);
  // Load hash from your password DB.
  let user = await prisma.user.findFirst({
    where: {
      email: usernameemail,
    },
    select: {
      password: true,
      id: true,
    },
  });

  if (!user) {
    user = await prisma.user.findFirst({
      where: {
        username: usernameemail,
      },
      select: {
        password: true,
        id: true,
      },
    });
  }
  console.log("user : ", user);
  if (!user) return null;
  const correctPassword = await bcrypt.compare(inputPassword, user.password);
  console.log("correctPassword :", correctPassword);
  if (correctPassword) {
    console.log("correct!");
    const session = await createSession(user.id);
    console.log("created session!");
    const cookie = cookies();
    cookie.set("sessionToken", session.sessionToken, { path: "/" });
    console.log({ user, session });
    return { user, session };
  }
}

export async function hashPassword(inputPassword: string) {
  return bcrypt.hash(inputPassword, SALT_ROUNDS);
}

export async function signIn(usernameemail: string) {
  let user;
  if (usernameemail.includes("@")) {
    user = await getUserByEmail(usernameemail);
  }
  if (!user) {
    user = await getUserByUsername(usernameemail);
  }
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  return user;
}

export async function getUserByUsername(username: string) {
  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });
  return user;
}

export async function createSession(userId: number) {
  let session = await prisma.session.findFirst({
    where: {
      userId: userId,
    },
  });
  if (!session) {
    session = await prisma.session.create({
      data: {
        userId: userId,
        sessionToken: generateSessionToken(),
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });
  }
  return session;
}

export async function getServerSession() {
  const cookie = cookies();
  const sessionToken = cookie.get("sessionToken")?.value ?? "";
  console.log("sessionToken : ", sessionToken);
  const session = await prisma.session.findFirst({
    where: {
      sessionToken: sessionToken,
    },
    include: {
      user: {
        select: {
          userRole: true,
          username: true,
          email: true,
        },
      },
    },
  });
  if (!session) return null;
  console.log(session);
  return new Date(session.expires) < new Date() ? null : session;
}

export function generateSessionToken() {
  return randomBytes(32).toString("hex"); // Generates a 64-character hexadecimal string
}
