import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { BAD_REQUEST } from "@/backend/config/response-code";
import { patchUserProfileZodType } from "@/backend/types/user";

export async function PATCH(req: NextRequest, { params }: { params: { userID: string } }) {
  try {
    const userID = +params.userID;
    const body = (await req.json()) as patchUserProfileZodType;
    console.log("Body");
    console.log(body);
    const profile = {
      ...(body.bio && { bio: body.bio }),
      ...(body.location && { location: body.location }),
    };

    const updateBody = {
      ...(body.name && { name: body.name }),
      ...((body.bio || body.location) && {
        profile: {
          data: {
            ...(body.bio && { bio: body.bio }),
            ...(body.location && { location: body.location }),
          },
        },
      }),
    };
    const user = await prisma.user.update({
      where: {
        id: userID,
      },
      data: {
        ...(body.name && { name: body.name }),
        profile: {
          update: {
            data: profile,
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
