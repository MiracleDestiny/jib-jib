"use client";
import React from "react";
import Post, { ShownPost } from "../public/Post";
import { sessionZodType } from "@/backend/types/session";
import { userZodType } from "@/backend/types/user";
// import type { postZodType } from "@/backend/types/post";
import { bookmarkPost, likePost, unBookmarkPost, unLikePost } from "@/app/action";
import Posts from "../home/Posts";
import Button from "../public/Button";
import { PostDialog } from "../public/PostDialog";

interface PostThreadProps {
  session: (sessionZodType & { user: userZodType }) | null;
  posts: ShownPost[] | null;
  post: ShownPost;
}

export default function PostThread({ session, posts, post }: PostThreadProps) {
  return (
    <div className="flex flex-col items-center   w-[500px] h-full space-y-4">
      <Post
        session={session}
        authorName={post.authorName ?? ""}
        authorUsername={post.authorUsername}
        imageURL={post.imageURL}
        content={post?.content}
        bookmarked={post?.bookmarked ?? false}
        replies={post?.replies ?? 0}
        reposts={post?.reposts ?? 0}
        likes={post.likes ?? 0}
        replied={post.replied ?? false}
        liked={post.liked ?? false}
        reposted={post.reposted ?? false}
        postId={post.postId}
        authorId={post.authorId}
        postDate={post.postDate}
      />
      <PostDialog session={session} textButton={"Reply"} parentPostID={post.postId} />
      <Posts posts={posts} session={session} />
    </div>
  );
}
