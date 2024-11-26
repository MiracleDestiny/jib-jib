import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { BAD_REQUEST } from "@/backend/config/response-code";
import { postPostZodType } from "@/backend/types/post";
import { extractHashtags } from "@/utils/api";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({});
    return NextResponse.json({ data: posts });
  } catch (error) {
    console.error(error);
    return NextResponse.json(BAD_REQUEST, { status: BAD_REQUEST.status });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as postPostZodType;
    const hashtags = extractHashtags(body.content);
    // const hashtagIds = await prisma.hashtag.findMany({
    //   where : {
    //     hashtag :
    //   }
    // })
    const user = await prisma.user.update({
      where: {
        id: body.authorID,
      },
      data: {
        posts: {
          create: {
            content: body.content,
            parentPostID: body.parentPostID ?? null,
            Post_Analytic: {
              create: {},
            },
          },
        },
      },
    });
    // const user = await prisma.user.create({
    //   data: {
    //     username: body.username,
    //     password: hashedPassword,
    //     email: body.email,
    //     verified: false,
    //     userRole: UserRoleEnum.USER,
    //     name: body.name,
    //     profile: {
    //       create: {
    //         location: body.profile.location ?? null,
    //         bio: body.profile.bio ?? null,
    //         dateOfBirth: body.profile.dateOfBirth,
    //       },
    //     },
    //   },
    // });

    return NextResponse.json({ data: user });
  } catch (error) {
    console.error(error);
    return NextResponse.json(BAD_REQUEST, { status: BAD_REQUEST.status });
  }
}
