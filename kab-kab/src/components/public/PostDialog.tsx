import PostApi from "@/backend/service/post";
import { postPostZodType } from "@/backend/types/post";
import { Session } from "@/backend/types/session";
import React, { useState } from "react";
import { FaCalendarAlt, FaImage, FaMapMarkerAlt, FaRegGrinAlt } from "react-icons/fa";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import Button from "./Button";
import PostInput, { PostInputProps } from "./PostInput";
import { DialogTitle } from "@radix-ui/react-dialog";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { UploadFile } from "./UploadFile";
interface PostDialogProps {
  parentPostID?: number;
  session: Session;
  textButton?: string;
}
export function PostDialog({ session, parentPostID, textButton }: PostDialogProps) {
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
    <Dialog>
      <DialogTrigger asChild>
        <Button>{textButton ?? "Post"}</Button>
      </DialogTrigger>
      <DialogContent className="w-[500px]">
        <DialogTitle></DialogTitle>
        <EdgeStoreProvider>
          <form className="relative" onSubmit={handlePost}>
            {/* Profile Picture and Text Input */}
            <div className="flex items-start space-x-4 mb-4">
              <Image
                src={session?.user.imageURL ?? ""} // replace with the actual profile image URL
                alt="Profile"
                className="w-12 h-12 rounded-full"
                width={15}
                height={12}
              />
              <textarea
                className="w-full border-none outline-none resize-none placeholder-gray-500  text-primary-black"
                rows={5}
                placeholder="What's happening?"
                name="content"
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="flex flex-row justify-between items-center">
              {/* Icon Row */}
              <div className=" flex flex-row justify-self-center items-center text-center space-x-4 text-yellow-500 mb-4 h-fit">
                <FaImage
                  className="cursor-pointer text-xl justify-self-center"
                  onClick={() => {}}
                />
              </div>

              {/* Post Button */}
              <div className="flex self-end text-md">
                <Button type="submit" className="text-sm py-2 px-4">
                  Post
                </Button>
              </div>
            </div>
          </form>
        </EdgeStoreProvider>
      </DialogContent>
    </Dialog>
  );
}
