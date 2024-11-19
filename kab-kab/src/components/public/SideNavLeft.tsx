"use client";
import { NAV_LEFT } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Button from "./Button";
import PostInputDialog from "./PostInputDialog";

export default function SideNavLeft() {
  const [posting, setPosting] = useState(false);
  const handlePost = () => {
    setPosting(true);
  };

  const handleClose = () => {
    setPosting(false);
  };
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="bg-white w-[400px] h-full">
      <div className="px-4">
        <div className="text-primary-black text-3xl w-full flex-col justify-center p-4 h-full">
          {NAV_LEFT.map((nav) => (
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
        <Button className="text-primary-black" onClick={handlePost}>
          Post
        </Button>
        {posting && <PostInputDialog onClose={handleClose} />}
      </div>
    </div>
  );
}
