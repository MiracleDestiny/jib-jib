"use client";
import { NAV_LEFT_OPTIONS } from "@/utils/constants";
import Link from "next/link";
import React, { useState } from "react";
import Button from "./Button";
import PostInputDialog from "./PostInputDialog";
import { sessionZodType } from "@/backend/types/session";
import { userZodType } from "@/backend/types/user";
import PostApi from "@/backend/service/post";
import { postPostZodType } from "@/backend/types/post";
import Profile from "./Profile";

interface SideNavLeftProps {
  session: (sessionZodType & { user: userZodType }) | null;
}

export default function SideNavLeft({ session }: SideNavLeftProps) {
  const [posting, setPosting] = useState(false);
  const handlePostClick = () => {
    setPosting(true);
  };

  const handleClose = () => {
    setPosting(false);
  };

  return (
    <div className="bg-white min-w-[350px] h-full flex flex-col items-center fixed  border border-gray-300">
      <div className="px-8 pt-16">
        {session && (
          <Profile
            username={session?.user.username ?? ""}
            name={session?.user.name ?? ""}
            imageURL={session?.user.imageURL ?? ""}
          />
        )}
        <div className="text-primary-black text-3xl w-full flex-col justify-center">
          {NAV_LEFT_OPTIONS.map((nav) => (
            <Link
              key={`link-${nav.name}`}
              href={nav.href}
              className="flex flex-row space-x-2 items-center p-4"
            >
              <nav.icon />
              <span>{nav.name}</span>
            </Link>
          ))}
        </div>
        <Button className="text-primary-black" onClick={handlePostClick}>
          Post
        </Button>
        {posting && <PostInputDialog onClose={handleClose} session={session} />}
      </div>
    </div>
  );
}
