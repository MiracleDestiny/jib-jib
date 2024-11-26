import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { BAD_REQUEST, SUCCESS_OK } from "@/backend/config/response-code";
import { postPostRepostZodType } from "@/backend/types/post";

export async function POST(req: NextRequest, { params }: { params: { postID: string } }) {
  try {
    console.log(`Calling api/posts/${params.postID}/repost`);
    const postID = +params.postID;
    console.log(`repost posts`);
    const body = (await req.json()) as postPostRepostZodType;
    console.log("body : ");
    console.log(body);
    const findPostRepost = await prisma.post.findFirst({
      where: {
        id: postID,
      },
      select: {
        User_Repost_Post: {
          where: {
            userID: body.userID,
          },
        },
        Post_Analytic: true,
      },
    });
    if (body.repost && findPostRepost?.Post_Analytic) {
      console.log("reposting post!");
      console.log("creating post!");
      const repostPost = await prisma.user_Repost_Post.create({
        data: {
          userID: body.userID,
          postID: postID,
        },
      });
      const postAnalytics = await prisma.post_Analytic.update({
        where: {
          id: postID,
        },
        data: {
          reposts: (findPostRepost?.Post_Analytic?.reposts ?? 0) + 1,
        },
      });
      console.log(`user : ${body.userID} reposts post : ${postID}`);
      console.log(`postAnalytics reposts : ${postAnalytics.reposts}`);
      console.log(repostPost);
      return NextResponse.json({ data: repostPost }, { status: SUCCESS_OK.status });
    } else {
      const unRepostPost = await prisma.user_Repost_Post.delete({
        where: {
          userID_postID: {
            userID: body.userID,
            postID: postID,
          },
        },
      });
      const postAnalytics = await prisma.post_Analytic.update({
        where: {
          id: postID,
        },
        data: {
          reposts: (findPostRepost?.Post_Analytic?.reposts ?? 0) - 1,
        },
      });
      console.log(`user : ${body.userID} unreposts post : ${postID}`);
      console.log(`postAnalytics reposts : ${postAnalytics.reposts}`);
      console.log(unRepostPost);
      return NextResponse.json({ data: unRepostPost }, { status: SUCCESS_OK.status });
    }
    return NextResponse.json(BAD_REQUEST, { status: BAD_REQUEST.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json(BAD_REQUEST, { status: BAD_REQUEST.status });
  }
}
