"use client";

import PostApi from "@/backend/service/post";
import { postPostBookmarkZodType } from "@/backend/types/post";
import React, { MouseEvent, useState } from "react";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";

interface BookmarkButtonProps {
  postID: number; // ID of the post to be bookmarked
  userID: number;
  initialBookmarked?: boolean; // Initial bookmarked state
}

export default function BookmarkButton({
  postID,
  userID,
  initialBookmarked = false,
}: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);

  const handleBookmark = async (e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    const newBookmarkedState = !bookmarked;
    setBookmarked(newBookmarkedState);

    // Trigger callback if provided
    const body = {
      bookmark: newBookmarkedState,
      userID: userID,
    } as postPostBookmarkZodType;
    await PostApi.bookmarkPost(postID, body);
  };

  return (
    <span
      onClick={handleBookmark}
      className="cursor-pointer hover:bg-primary-lightgray rounded-2xl p-2"
    >
      {bookmarked ? <IoBookmark className="text-primary-yellow" /> : <IoBookmarkOutline />}
    </span>
  );
}
