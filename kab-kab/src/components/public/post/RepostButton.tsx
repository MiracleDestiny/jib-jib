"use client";

import PostApi from "@/backend/service/post";
import { postPostRepostZodType } from "@/backend/types/post";
import React, { MouseEvent, useState } from "react";
import { AiOutlineRedo } from "react-icons/ai";

interface RepostButtonProps {
  postID: number; // ID of the post to repost
  userID: number;
  initialReposts?: number; // Initial number of reposts
  initialReposted?: boolean;
}

export default function RepostButton({
  postID,
  userID,
  initialReposts = 0,
  initialReposted = false,
}: RepostButtonProps) {
  const [reposted, setReposted] = useState(initialReposted);
  const [reposts, setReposts] = useState(initialReposts);

  const handleRepost = async (e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    const newRepostedState = !reposted;
    setReposts((prev) => (newRepostedState ? prev + 1 : prev - 1));
    setReposted(newRepostedState);

    // Trigger API call to handle repost
    const body = {
      userID: userID,
      repost: newRepostedState,
    } as postPostRepostZodType;

    await PostApi.repostPost(postID, body);
  };

  return (
    <span
      className="flex flex-row space-x-2 items-center cursor-pointer hover:bg-primary-lightgray rounded-xl p-1 px-2"
      onClick={handleRepost}
    >
      <AiOutlineRedo className={`${reposted ? "text-primary-yellow" : "text-primary-black"}`} />
      <span>{reposts}</span>
    </span>
  );
}
