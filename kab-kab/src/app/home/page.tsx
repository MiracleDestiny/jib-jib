import Home from "@/components/home/Home";
import { getServerSession } from "@/utils/auth";
import React from "react";
import { getAllFollowing, getAllPosts } from "../action";
import { redirect } from "next/navigation";
import SideNavLeft from "@/components/public/SideNavLeft";
import SideNavRight from "@/components/public/SideNavRight";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const session = await getServerSession();
  console.log("session : ", session);
  if (!session) redirect("/signin");
  const posts = await getAllPosts(session);
  console.log("posts:", posts);
  const following = await getAllFollowing(session.userId, session);
  return (
    <>
      <SideNavLeft session={session} route={"home"}/>
      <div className=" w-full px-4 bg-white min-h-screen h-full">
        <Home session={session} posts={posts} following={following} />
      </div>
      <SideNavRight />
    </>
  );
}
