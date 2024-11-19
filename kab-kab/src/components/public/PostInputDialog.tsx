import React, { MouseEventHandler } from "react";
import { FaImage, FaSmile, FaCalendarAlt, FaMapMarkerAlt, FaRegGrinAlt } from "react-icons/fa"; // You can import any icons you like

function PostInputDialog({ onClose }: { onClose?: MouseEventHandler<HTMLButtonElement> }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Profile Picture and Text Input */}
        <div className="flex items-start space-x-4 mb-4">
          <img
            src="https://example.com/profile.jpg" // replace with the actual profile image URL
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <textarea
            className="w-full border-none outline-none resize-none placeholder-gray-500 text-lg"
            rows={3}
            placeholder="What's happening?"
          ></textarea>
        </div>

        {/* Icon Row */}
        <div className="flex items-center space-x-4 text-yellow-500 mb-4">
          <FaImage className="cursor-pointer text-xl" />
          <span className="cursor-pointer text-xl">GIF</span>
          <FaRegGrinAlt className="cursor-pointer text-xl" />
          <FaCalendarAlt className="cursor-pointer text-xl" />
          <FaMapMarkerAlt className="cursor-pointer text-xl" />
        </div>

        {/* Post Button */}
        <div className="flex justify-end">
          <button className="bg-yellow-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-yellow-600">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostInputDialog;
