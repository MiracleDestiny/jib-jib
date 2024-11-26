import React from "react";
import { ShownPost } from "../public/Post";
import { sessionZodType } from "@/backend/types/session";
import { userZodType } from "@/backend/types/user";
import Posts from "./Posts";
import HomeTab from "./HomeTab";

interface HomeProps {
  session: (sessionZodType & { user: userZodType }) | null;
  posts: ShownPost[] | null;
  following:
    | {
        createdAt: Date;
        followedID: number;
        followerID: number;
      }[]
    | null;
}

export default function Home({ session, posts, following }: HomeProps) {
  const followedPosts =
    posts?.filter((post) => following?.map((value) => value.followedID).includes(post.authorId)) ??
    null;
  return (
    <div className="flex flex-col items-center px-4 pt-2 h-full">
      <HomeTab posts={posts} session={session} followedPosts={followedPosts} />
    </div>
  );
}
