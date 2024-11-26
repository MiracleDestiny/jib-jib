import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { BAD_REQUEST, SUCCESS_OK } from "@/backend/config/response-code";
import { postPostBookmarkZodType } from "@/backend/types/post";

export async function POST(req: NextRequest, { params }: { params: { postID: string } }) {
  try {
    console.log(`api/posts/${params.postID}/bookmark`);
    const postID = +params.postID;
    console.log(`like posts`);
    const body = (await req.json()) as postPostBookmarkZodType;
    const findPostBookmark = await prisma.post.findFirst({
      where: {
        id: postID,
      },
      select: {
        User_BookmarK_Post: {
          where: {
            userID: body.userID,
          },
        },
      },
    });
    if (body.bookmark && findPostBookmark) {
      const bookmarkPost = await prisma.user_BookmarK_Post.create({
        data: {
          userID: body.userID,
          postID: postID,
        },
      });

      console.log(`user : ${body.userID} bookmark post : ${postID}`);
      console.log(bookmarkPost);
      return NextResponse.json({ data: bookmarkPost }, { status: SUCCESS_OK.status });
    } else {
      const unBookmarkPost = await prisma.user_BookmarK_Post.delete({
        where: {
          userID_postID: {
            userID: body.userID,
            postID: postID,
          },
        },
      });

      console.log(`user : ${body.userID} unbookmark post : ${postID}`);
      console.log(unBookmarkPost);
      return NextResponse.json({ data: unBookmarkPost }, { status: SUCCESS_OK.status });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(BAD_REQUEST, { status: BAD_REQUEST.status });
  }
}
