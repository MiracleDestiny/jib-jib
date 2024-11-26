import SideNavLeft from "@/components/public/SideNavLeft";
import SideNavRight from "@/components/public/SideNavRight";
import { getServerSession } from "@/utils/auth";
import { redirect } from "next/navigation";
import React from "react";
import { getSessionUserBookmarkedPosts } from "../action";
import Posts from "@/components/home/Posts";

export default async function BookmarkPage() {
  const session = await getServerSession();
  console.log("session : ", session);
  if (!session) redirect("/signin");
  const posts = await getSessionUserBookmarkedPosts(session);
  return (
    <>
      <SideNavLeft session={session} route={"bookmark"} />
      <div className="flex  px-4 bg-white min-h-screen h-full justify-center">
        <Posts posts={posts} session={session} />
      </div>
      <SideNavRight />
    </>
  );
}
