"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Session } from "@/backend/types/session";
import UserApi from "@/backend/service/user";
export interface PeopleProfileProps {
  imageURL: string;
  username: string;
  name: string;
  bio?: string;
  session: Session;
  userID: number;
  initialIsFollowing: boolean;
}

export type PeopleProfileItem = {
  imageURL: string;
  username: string;
  name: string;
  bio?: string;
  userID: number;
  initialIsFollowing: boolean;
};
export default function PeopleProfile({
  imageURL,
  username,
  name,
  bio,
  session,
  userID,
  initialIsFollowing,
}: PeopleProfileProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  const handleFollow = async () => {
    console.log("session");
    console.log(session);
    if (session?.userId) {
      const body = {
        followedID: userID,
        followerID: session.userId,
      };
      await UserApi.followUser(userID, body).then(() => setIsFollowing(!isFollowing));
    }
  };
  return (
    <div className="flex flex-row space-x-2 mb-2 text-primary-black">
      <div className="rounded-full  border-primary-yellow border-2 flex justify-center items-center min-w-16 min-h-16 overflow-hidden">
        <Image
          alt="profile"
          src={imageURL}
          width={30}
          height={30}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-row w-full -space-y-1 justify-between">
        <div className="flex flex-col justify-center ">
          <span className="text-md font-bold">{name}</span>
          <Link className="text-sm text-primary-gray" href="">{`@${username}`}</Link>
          <span className="text-sm">{bio}</span>
        </div>
        <div className="rounded-3xl bg-primary-yellow text-primary-black p-2 px-4                self-center">
          <button onClick={handleFollow}>{isFollowing ? "Following" : "Follow"}</button>
        </div>
      </div>
    </div>
  );
}
