"use client";

import React, { useState } from "react";
import { GoComment } from "react-icons/go";
import PostInput from "../PostInput";
import PostApi from "@/backend/service/post";
import { sessionZodType } from "@/backend/types/session";
import { userZodType } from "@/backend/types/user";

interface ReplyButtonProps {
  postID: number; // ID of the post to reply to
  initialReplies?: number; // Initial number of replies
  session: (sessionZodType & userZodType) | null;
}

export default function ReplyButton({ postID, initialReplies = 0, session }: ReplyButtonProps) {
  const [replies, setReplies] = useState(initialReplies);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReplyClick = () => {
    setIsModalOpen(true);
  };

  const handleReplySubmit = async (replyContent: string) => {
    // Update replies count
    const newReplies = replies + 1;
    setReplies(newReplies);

    // Simulate API call for reply submission
    // Close the modal after submission
    setIsModalOpen(false);
  };

  return (
    <>
      <span
        className="flex flex-row space-x-2 items-center cursor-pointer"
        onClick={handleReplyClick}
      >
        <GoComment />
        <span>{replies}</span>
      </span>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-4 w-1/2">
            <PostInput
              session={session}
              parentPostID={postID}
              //   onSubmit={(content: string) => handleReplySubmit(content)}
              //   onCancel={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
