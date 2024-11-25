import PostThread from "@/components/posts/PostThread";
import { getServerSession } from "@/utils/auth";
import React from "react";
import { getPost, getPostThread } from "../../action";
import { redirect } from "next/navigation";

export default async function PostPage({ params }: { params: { postID: number } }) {
  const session = await getServerSession();
  if (!session) redirect("/signin");
  const postID = +params.postID;
  const post = await getPost(postID, session);
  if (!post) redirect("/home");
  const postThreads = await getPostThread(postID, session);
  return (
    <div className="flex justify-center w-full bg-white h-full">
      <PostThread session={session} post={post} posts={postThreads} />
    </div>
  );
}
