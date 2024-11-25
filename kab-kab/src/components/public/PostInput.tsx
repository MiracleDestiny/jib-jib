import PostApi from "@/backend/service/post";
import { postPostZodType } from "@/backend/types/post";
import { sessionZodType } from "@/backend/types/session";
import { userZodType } from "@/backend/types/user";
import React, { useState } from "react";
import { FaCalendarAlt, FaImage, FaMapMarkerAlt, FaRegGrinAlt } from "react-icons/fa";
import Button from "./Button";
import Image from "next/image";
interface PostInputProps {
  session: (sessionZodType & userZodType) | null;
  parentPostID?: number;
}
export default function PostInput({ session, parentPostID }: PostInputProps) {
  const [formData, setFormData] = useState({
    content: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    console.log(formData);
  };
  const handlePost = () => {
    if (session?.userId) {
      const body = {
        authorID: session.userId,
        content: formData.content,
        ...(parentPostID && { parentPostID }),
      } as postPostZodType;
      console.log("handlePost");
      console.log("body : ", body);
      PostApi.createPost(body);
    }
  };

  return (
    <form
      className="bg-white p-6 rounded-lg shadow-lg w-full relative text-md"
      onSubmit={handlePost}
    >
      {/* Profile Picture and Text Input */}
      <div className="flex items-start space-x-4 mb-4">
        <Image
          src={session?.imageURL ?? ""} // replace with the actual profile image URL
          alt="Profile"
          className="w-12 h-12 rounded-full"
          width={15}
          height={12}
        />
        <textarea
          className="w-full border-none outline-none resize-none placeholder-gray-500  text-primary-black"
          rows={3}
          placeholder="What's happening?"
          name="content"
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="flex flex-row justify-between items-center">
        {/* Icon Row */}
        <div className="flex items-center space-x-4 text-yellow-500 mb-4">
          <FaImage className="cursor-pointer text-xl" />
          <span className="cursor-pointer text-xl">GIF</span>
          <FaRegGrinAlt className="cursor-pointer text-xl" />
          <FaCalendarAlt className="cursor-pointer text-xl" />
          <FaMapMarkerAlt className="cursor-pointer text-xl" />
        </div>

        {/* Post Button */}
        <div className="flex justify-end text-md">
          <Button type="submit" className="text-sm">
            Post
          </Button>
        </div>
      </div>
    </form>
  );
}
