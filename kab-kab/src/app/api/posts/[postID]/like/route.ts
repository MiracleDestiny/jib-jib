import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { BAD_REQUEST, SUCCESS_OK } from "@/backend/config/response-code";
import { postPostLikeZodType } from "@/backend/types/post";

export async function POST(req: NextRequest, { params }: { params: { postID: string } }) {
  try {
    console.log(`Calling api/posts/${params.postID}/like`);
    const postID = +params.postID;
    console.log(`like posts`);
    const body = (await req.json()) as postPostLikeZodType;
    console.log("body : ");
    console.log(body);
    const findPostLike = await prisma.post.findFirst({
      where: {
        id: postID,
      },
      select: {
        User_Like_Post: {
          where: {
            userID: body.userID,
          },
        },
        Post_Analytic: true,
      },
    });
    if (body.like && findPostLike?.Post_Analytic) {
      console.log("liking post!");
      console.log("creating post!");
      const likePost = await prisma.user_Like_Post.create({
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
          likes: (findPostLike?.Post_Analytic?.likes ?? 0) + 1,
        },
      });
      console.log(`user : ${body.userID} liked post : ${postID}`);
      console.log(`postAnalytics likes : ${postAnalytics.likes}`);
      console.log(likePost);
      return NextResponse.json({ data: likePost }, { status: SUCCESS_OK.status });
    } else {
      const unlikePost = await prisma.user_Like_Post.delete({
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
          likes: (findPostLike?.Post_Analytic?.likes ?? 0) - 1,
        },
      });
      console.log(`user : ${body.userID} unlike post : ${postID}`);
      console.log(`postAnalytics likes : ${postAnalytics.likes}`);
      console.log(unlikePost);
      return NextResponse.json({ data: unlikePost }, { status: SUCCESS_OK.status });
    }
    return NextResponse.json(BAD_REQUEST, { status: BAD_REQUEST.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json(BAD_REQUEST, { status: BAD_REQUEST.status });
  }
}
