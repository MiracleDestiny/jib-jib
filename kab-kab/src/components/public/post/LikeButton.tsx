"use client";

import PostApi from "@/backend/service/post";
import { postPostLikeZodType } from "@/backend/types/post";
import React, { MouseEvent,useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

interface LikeButtonProps {
  postID: number; // ID of the post to like
  userID: number;
  initialLiked?: boolean; // Initial liked state
  initialLikes?: number; // Initial number of likes
}

export default function LikeButton({
  postID,
  userID,
  initialLiked = false,
  initialLikes = 0,
}: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = async (e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    const newLikedState = !liked;
    setLiked(newLikedState);
    setLikes((prev) => (newLikedState ? prev + 1 : prev - 1));

    // Trigger API call to update like status
    const body = {
      like: newLikedState,
      userID: userID,
    } as postPostLikeZodType;

    await PostApi.likePost(postID, body);
  };

  return (
    <span
      className="flex flex-row space-x-2 items-center cursor-pointer hover:bg-primary-lightgray rounded-xl p-1 px-2"
      onClick={handleLike}
    >
      {liked ? <IoHeart className="text-red-500" /> : <IoHeartOutline />}
      <span>{likes}</span>
    </span>
  );
}
