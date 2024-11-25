import React from "react";
import Post, { ShownPost } from "../public/Post";
import { sessionZodType } from "@/backend/types/session";
import { userZodType } from "@/backend/types/user";

export interface PostsProps {
  posts: ShownPost[] | null;
  session: (sessionZodType & { user: userZodType }) | null;
}

function Posts({ posts, session }: PostsProps) {
  return (
    <div className="flex flex-col space-y-2">
      {posts?.map((post, index) => (
        <Post
          session={session}
          key={`${post}-${index}`}
          authorName={post?.authorName ?? ""}
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
      ))}
    </div>
  );
}

export default Posts;
