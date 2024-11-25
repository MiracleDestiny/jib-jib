"use client";

import React, { useState } from "react";
import { AiOutlineRedo } from "react-icons/ai";

interface RepostButtonProps {
  postID: number; // ID of the post to repost
  userID: number;
  initialReposts?: number; // Initial number of reposts
}

export default function RepostButton({ postID, userID, initialReposts = 0 }: RepostButtonProps) {
  const [reposts, setReposts] = useState(initialReposts);

  const handleRepost = async () => {
    const newReposts = reposts + 1; // Increment repost count
    setReposts(newReposts);

    // Trigger API call to handle repost
    const body = {
      userID: userID,
    };

    await fetch(`/api/posts/${postID}/repost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };

  return (
    <span className="flex flex-row space-x-2 items-center cursor-pointer" onClick={handleRepost}>
      <AiOutlineRedo />
      <span>{reposts}</span>
    </span>
  );
}
