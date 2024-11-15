import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { BAD_REQUEST } from "@/backend/config/response-code";
import { hashPassword } from "@/utils/auth";
import { UserRoleEnum } from "@prisma/client";
import { postUserZodType } from "@/backend/types/user";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as postUserZodType;
    const hashedPassword = await hashPassword(body.password);
    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: hashedPassword,
        email: body.email,
        verified: false,
        userRole: UserRoleEnum.USER,
        name: body.name,
        profile: {
          create: {
            location: body.profile.location ?? null,
            bio: body.profile.bio ?? null,
            dateOfBirth: body.profile.dateOfBirth,
          },
        },
      },
    });

    return NextResponse.json({ data: user });
  } catch (error) {
    console.error(error);
    return NextResponse.json(BAD_REQUEST, { status: BAD_REQUEST.status });
  }
}
