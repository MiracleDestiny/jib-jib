import Profile from "@/components/profile/Profile";
import React from "react";
import { getAllFollower, getAllFollowing, getAllPostsByUser, getProfile } from "../action";
import { redirect } from "next/navigation";
import { getServerSession } from "@/utils/auth";
import SideNavLeft from "@/components/public/SideNavLeft";
import SideNavRight from "@/components/public/SideNavRight";

export default async function ProfilePage() {
  const session = await getServerSession();
  if (!session) redirect("/signin");
  console.log(session.userId);
  const profile = await getProfile(session.userId);
  if (!profile) redirect("/home");
  const userPosts = await getAllPostsByUser(session.userId);
  const followings = await getAllFollowing(session.userId, session);
  const followers = await getAllFollower(session.userId, session);
  return (
    <>
      <SideNavLeft session={session} route={"profile"} />
      <div className="w-full px-4 bg-white min-h-screen h-full flex justify-center">
        {
          <Profile
            name={profile.name}
            username={profile.username}
            bio={profile.bio ?? ""}
            location={profile.location ?? ""}
            dateOfBirth={profile.dateOfBirth}
            joinedAt={profile.createdAt}
            posts={userPosts ?? []}
            session={session}
            isUser={true}
            userID={session.userId}
            followerCount={followers?.length ?? 0}
            followingCount={followings?.length ?? 0}
            imageURL={session.user.imageURL}
            bannerImageURL=""
          />
        }
      </div>
      <SideNavRight />
    </>
  );
}
