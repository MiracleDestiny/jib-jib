import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { BAD_REQUEST } from "@/backend/config/response-code";

export async function GET({ params }: { params: { userID: string } }) {
  try {
    console.log(`api/users/${params.userID}/posts`);
    const userId = +params.userID;
    console.log(`querying posts`);

    const posts = await prisma.post.findMany({
      where: {
        authorID: userId,
      },
    });

    console.log("queried :", posts);

    return NextResponse.json({ data: posts });
  } catch (error) {
    console.error(error);
    return NextResponse.json(BAD_REQUEST, { status: BAD_REQUEST.status });
  }
}
