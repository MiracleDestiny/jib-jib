"use client";
import { NAV_LEFT } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function SideNavLeft() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="bg-white w-[400px] h-full">
      <div className="text-black text-3xl w-full flex-col justify-center p-4 h-full">
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
    </div>
  );
}
