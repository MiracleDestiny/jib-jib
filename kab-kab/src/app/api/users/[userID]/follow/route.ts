import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { BAD_REQUEST, SUCCESS_OK } from "@/backend/config/response-code";
import { postFollowUserZod, postFollowUserZodType } from "@/backend/types/user";

export async function POST(req: NextRequest, { params }: { params: { userID: string } }) {
  try {
    console.log(`Calling api/users/${params.userID}/follow`);
    const userID = +params.userID;
    const body = postFollowUserZod.parse(await req.json());
    console.log("body : ");
    console.log(body);
    const following = await prisma.follow.findFirst({
      where: {
        followedID: body.followedID,
        followerID: body.followerID,
      },
    });
    if (!following) {
      const follow = await prisma.follow.create({
        data: {
          followedID: body.followedID,
          followerID: body.followerID,
        },
      });
      console.log("follow : ");
      console.log(follow);
      return NextResponse.json({ data: follow }, { status: SUCCESS_OK.status });
    } else {
      const unfollow = await prisma.follow.delete({
        where: {
          followedID_followerID: {
            followedID: body.followedID,
            followerID: body.followerID,
          },
        },
      });
      console.log("unfollow : ");
      console.log(unfollow);
      return NextResponse.json({ data: unfollow }, { status: SUCCESS_OK.status });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(BAD_REQUEST, { status: BAD_REQUEST.status });
  }
}
