"use client";
import React, { useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { TbCake } from "react-icons/tb";
import { FaRegCalendar } from "react-icons/fa";
import { Session } from "@/backend/types/session";
import Button from "../public/Button";
import UserApi from "@/backend/service/user";

export interface ProfileHeaderProps {
  name: string;
  username: string;
  bio: string;
  location: string;
  dateOfBirth: Date | undefined;
  joinedAt: Date | undefined;
  isUser: boolean;
  initialFollowing?: boolean;
  session: Session;
  userID: number;
}
function ProfileHeader({
  name,
  username,
  bio,
  location,
  dateOfBirth,
  joinedAt,
  isUser,
  initialFollowing,
  session,
  userID,
}: ProfileHeaderProps) {
  const formattedBirthDate = dateOfBirth?.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formattedJoinedAt = joinedAt?.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const handleFollow = async () => {
    if (session?.userId) {
      const body = {
        followedID: userID,
        followerID: session?.userId,
      };
      await UserApi.followUser(session.userId, body).then(() => setIsFollowing(!isFollowing));
    }
  };

  const handleEdit = async () => {};

  const [isFollowing, setIsFollowing] = useState<boolean>(initialFollowing ?? false);

  return (
    <div className="rounded-xl border-2 border-primary-yellow p-8">
      <div className="flex flex-row justify-between">
        <div className="text-primary-black">
          <h1 className="text-xl font-bold">{name}</h1>
          <p className="text-gray-500">{`@${username}`}</p>
        </div>
        {isUser ? (
          <Button className="text-sm w-fit h-auto" onClick={handleEdit}>
            Edit
          </Button>
        ) : (
          <Button
            className={`text-sm w-fit h-auto ${
              isFollowing ? " text-black bg-primary-gray" : "bg-primary-yellow text-white"
            }`}
            onClick={handleFollow}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
        )}
      </div>
      <div className="p-4 px-0 text-black">
        <p>{bio}</p>
        <div className="flex items-center space-x-4 text-primary-gray mt-2">
          <div className="flex flex-row items-center space-x-2">
            <HiOutlineLocationMarker />
            {location && <div>{location}</div>}
          </div>
          <a href="https://instagram.com/tenttent" target="_blank" className="hover:underline">
            instagram.com/tenttent
          </a>
        </div>
        <div className="flex items-center space-x-4 text-primary-gray mt-2">
          <div className="flex flex-row items-center space-x-2">
            <TbCake />
            {formattedBirthDate && <div>Born {formattedBirthDate}</div>}
          </div>
          <div className="flex flex-row items-center space-x-2">
            <FaRegCalendar />
            {formattedJoinedAt && <div>Joined {formattedJoinedAt}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
