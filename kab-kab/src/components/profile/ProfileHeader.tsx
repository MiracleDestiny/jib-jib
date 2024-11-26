"use client";
import React, { useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { TbCake } from "react-icons/tb";
import { FaRegCalendar } from "react-icons/fa";
import { Session } from "@/backend/types/session";
import Image from "next/image";
import Button from "../public/Button";
import UserApi from "@/backend/service/user";
import { EditProfileDialog } from "./EditProfileDialog";

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
  followingCount: number;
  followerCount: number;
  imageURL: string;
  bannerImageURL: string;
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
  followingCount,
  followerCount,
  imageURL,
  bannerImageURL,
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
    <div className="">
      <div className="relative w-full rounded-xl border-4 border-primary-yellow mb-2">
        <Image
          src={bannerImageURL}
          alt="Background"
          className="rounded-t-xl w-full h-48 object-cover "
          width={100}
          height={100}
        />
        <div className="absolute bottom-[-70px] left-1/2 transform -translate-x-1/2 rounded-full border-4 border-yellow-500 bg-white">
          <Image
            src={imageURL}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover"
            width={100}
            height={100}
          />
        </div>
      </div>
      <div className="rounded-xl border-4 border-primary-yellow p-4">
        <div className="flex flex-row justify-between">
          <div className="text-primary-black">
            <h1 className="text-2xl font-bold">{name}</h1>
            <p className="text-gray-500">{`@${username}`}</p>
          </div>
          {isUser ? (
            <EditProfileDialog
              session={session}
              initialName={name}
              initialLocation={location}
              initialBirthDate={dateOfBirth}
              initialBio={bio} 
            />
          ) : (
            <Button
              className={`text-sm max-w-fit h-auto ${
                isFollowing ? " text-black bg-primary-gray" : "bg-primary-yellow text-white"
              }`}
              onClick={handleFollow}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
          )}
        </div>
        <div className="p-2 px-0 text-black">
          <p>{bio}</p>
          <div className="flex items-center space-x-4 mt-2">
            <div className="flex flex-row items-center space-x-2">
              <HiOutlineLocationMarker />
              {location && <div>{location}</div>}
            </div>
            <a href="https://instagram.com/tenttent" target="_blank" className="hover:underline">
              instagram.com/tenttent
            </a>
          </div>
          <div className="flex items-center space-x-4  mt-2">
            <div className="flex flex-row items-center space-x-2">
              <TbCake />
              {formattedBirthDate && <div>Born {formattedBirthDate}</div>}
            </div>
            <div className="flex flex-row items-center space-x-2">
              <FaRegCalendar />
              {formattedJoinedAt && <div>Joined {formattedJoinedAt}</div>}
            </div>
          </div>
          <div className="flex flex-row items-center space-x-2 mt-2">
            <span className="text-primary-black">{`${followingCount}`}</span>
            <span className="">{`Following`}</span>
            <span className="text-primary-black">{`${followerCount}`}</span>
            <span className=""> {`Follower${followerCount > 1 ? "s" : ""}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
