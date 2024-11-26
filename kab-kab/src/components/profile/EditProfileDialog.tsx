"use client";
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
import { DialogTitle } from "@radix-ui/react-dialog";
import { EdgeStoreProvider } from "@/lib/edgestore";
import Button from "../public/Button";
import Input from "../public/Input";
import TextArea from "../public/TextArea";
import { patchUserProfileZodType } from "@/backend/types/user";
import UserApi from "@/backend/service/user";
interface PostDialogProps {
  session: Session;
  initialName: string;
  initialLocation: string;
  initialBirthDate: Date | undefined;
  initialBio: string;
  textButton?: string;
}
export function EditProfileDialog({
  session,
  initialName,
  initialBio,
  initialBirthDate,
  initialLocation,
}: PostDialogProps) {
  const [formData, setFormData] = useState({
    name: initialName,
    bio: initialBio,
    location: initialLocation,
    birthDate: initialBirthDate,
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    console.log(formData);
  };
  const handleEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (session?.userId) {
      const body = {
        ...(formData.name != initialName && { name: formData.name }),
        ...(formData.bio != initialBio && { bio: formData.bio }),
        ...(formData.location != initialLocation && { location: formData.location }),
      } as patchUserProfileZodType;
      console.log("handleEdit");
      console.log("body : ", body);
      await UserApi.editProfile(session.userId, body).then(() => window.location.reload());
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-sm w-auto p-2">{"Edit"}</Button>
      </DialogTrigger>
      <DialogContent className="w-[500px]">
        <DialogTitle></DialogTitle>
        <EdgeStoreProvider>
          <form className="relative space-y-2" onSubmit={handleEdit}>
            {/* Profile Picture and Text Input */}
            <div className="flex flex-col">
              <label className="text-primary-black font-semibold">Name</label>
              <Input placeholder="Name" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="flex flex-col">
              <label className="text-primary-black font-semibold">Bio</label>
              <TextArea placeholder="Bio" name="bio" value={formData.bio} onChange={handleChange} />
            </div>
            <div className="flex flex-col">
              <label className="text-primary-black font-semibold">Location</label>
              <Input
                placeholder="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-row justify-between items-center">
              <div className="flex self-end text-md">
                <Button type="submit" className="text-sm py-2 px-4">
                  Back
                </Button>
              </div>
              {/* Post Button */}
              <div className="flex self-end text-md">
                <Button type="submit" className="text-sm py-2 px-4">
                  Save
                </Button>
              </div>
            </div>
          </form>
        </EdgeStoreProvider>
      </DialogContent>
    </Dialog>
  );
}
