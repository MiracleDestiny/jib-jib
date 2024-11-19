import React, { MouseEventHandler } from "react";
import Image from "next/image";
import PostContent from "./PostContent";
import { IoBookmark } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";

interface PostProps {
  name: string;
  username: string;
  imageURL: string;
  content: string;
  bookmarked: boolean;
  replied: boolean;
  reposted: boolean;
  liked: boolean;
  onBookmark: MouseEventHandler<HTMLButtonElement>; 
  onReply: MouseEventHandler<HTMLButtonElement>;
  onRepost: MouseEventHandler<HTMLButtonElement>;
  onLike: MouseEventHandler<HTMLButtonElement>;
  replies: number;
  reposts: number;
  likes: number;
}

export default function Post({
  name,
  username,
  imageURL,
  content,
  bookmarked,
  replied,
  reposted,
  liked,
  replies,
  reposts,
  likes,
}: PostProps) {
  return (
    <div className="flex flex-col bg-white text-primary-black rounded-md w-[500px] border border-1 border-primary-gray min-h-60  p-4">
      <div className="flex flex-row space-x-4 mb-2">
        <div className="rounded-full border border-black border-5 flex justify-center items-center min-w-16 min-h-16">
          <Image alt={"profile"} src={imageURL} width={30} height={30} className="w-8 h-8"></Image>
        </div>
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-col justify-center self-start">
            <span className="text-2xl">{name}</span>
            <span className="text-md">{`@${username}`}</span>
          </div>
          <div className="self-start justify-self-end ">{"4.30 hr ago"}</div>
        </div>
      </div>
      <div>
        <PostContent text={content}></PostContent>
      </div>
      <span className="mt-auto justify-between">
        {bookmarked ? <IoBookmark onClick = {() => }/> : <IoBookmarkOutline />}
      </span>
      <span className="flex flex-row"></span>
    </div>
  );
}
