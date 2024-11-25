"use client";
import React from "react";
import Image from "next/image";
import PostContent from "./PostContent";
import Link from "next/link";
import { timeAgo } from "@/utils/date";
import BookmarkButton from "./post/BookmarkButton";
import { Session } from "@/backend/types/session";
import LikeButton from "./post/LikeButton";
import RepostButton from "./post/RepostButton";
import ReplyButton from "./post/ReplyButton";
import { useRouter } from "next/navigation";

interface PostProps extends ShownPost {
  session: Session;
}

export interface ShownPost {
  authorName: string;
  authorUsername: string;
  authorId: number;
  imageURL: string;
  content: string;
  bookmarked: boolean;
  replied: boolean;
  reposted: boolean;
  liked: boolean;
  replies: number;
  reposts: number;
  likes: number;
  postId: number;
  postDate: Date;
}

export default function Post({
  authorName,
  authorUsername,
  authorId,
  imageURL,
  content,
  bookmarked,
  replied,
  reposted,
  liked,
  postId,
  replies,
  reposts,
  likes,
  postDate,
  session,
}: PostProps) {
  const authorProfilePath = `/profile/${authorId}`;
  const postDateString = timeAgo(postDate);
  const router = useRouter();
  return (
    <div
      className="cursor-pointer flex flex-col bg-white text-primary-black rounded-3xl w-[500px] border border-1 border-primary-black min-h-60  p-4"
      onClick={(e) => {
        e.stopPropagation();
        router.push(`/posts/${postId}`);
      }}
    >
      <div className="flex flex-row space-x-4 mb-2">
        <div className="rounded-full border border-black border-5 flex justify-center items-center min-w-16 min-h-16">
          <Link href={authorProfilePath}>
            <div className="rounded-full border border-black border-5 flex justify-center items-center min-w-16 min-h-16 overflow-hidden">
              <Image
                alt="profile"
                src={imageURL}
                width={30}
                height={30}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        </div>
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-col justify-center self-start">
            <Link href={authorProfilePath} onClick={(e) => e.stopPropagation()}>
              <span className="text-2xl hover:underline">{authorName}</span>
            </Link>
            <Link href={authorProfilePath} onClick={(e) => e.stopPropagation()}>
              <span className="text-md hover:underline">{`@${authorUsername}`}</span>
            </Link>
          </div>
          <div className="self-start justify-self-end ">{postDateString}</div>
        </div>
      </div>
      <div>
        <PostContent text={content}></PostContent>
      </div>
      <span className="flex flex-row mt-auto justify-between">
        <BookmarkButton
          userID={session?.userId ?? -1}
          postID={postId}
          initialBookmarked={bookmarked}
        />
        <span className="flex flex-row space-x-2 text-sm items-center">
          {/* <span className="flex flex-row space-x-2 items-center cursor-pointer" onClick={onReply}>
            <GoComment />
            <span>{replies}</span>
          </span> */}
          <ReplyButton postID={postId} session={session} />
          <RepostButton postID={postId} userID={session?.userId ?? -1} initialReposts={reposts} />
          <LikeButton
            postID={postId}
            userID={session?.userId ?? -1}
            initialLiked={liked}
            initialLikes={likes}
          />
        </span>
      </span>
    </div>
  );
}
