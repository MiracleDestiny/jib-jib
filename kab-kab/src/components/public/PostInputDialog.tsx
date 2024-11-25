import React, { MouseEventHandler } from "react";
// import { FaImage, FaSmile, FaCalendarAlt, FaMapMarkerAlt, FaRegGrinAlt } from "react-icons/fa"; // You can import any icons you like
import PostInput from "./PostInput";
import { sessionZodType } from "@/backend/types/session";
import { userZodType } from "@/backend/types/user";

interface PostInputDialogProps {
  onClose: MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
  session: (sessionZodType & { user: userZodType }) | null;
}

function PostInputDialog({ onClose, session }: PostInputDialogProps) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <PostInput session={session} />
      </div>
    </div>
  );
}

export default PostInputDialog;
