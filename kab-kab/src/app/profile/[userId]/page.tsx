import Profile from "@/components/profile/Profile";
import React from "react";
import {
  getAllFollower,
  getAllFollowing,
  getAllPostsByUser,
  getProfile,
  isFollowing,
} from "../../action";
import { redirect } from "next/navigation";
import { getServerSession } from "@/utils/auth";
import SideNavLeft from "@/components/public/SideNavLeft";
import SideNavRight from "@/components/public/SideNavRight";

export default async function ProfilePage({ params }: { params: { userId: number } }) {
  const session = await getServerSession();
  if (!session) redirect("/signin");
  const userID = +params.userId;
  console.log(userID);
  const profile = await getProfile(userID);
  if (!profile) redirect("/home");
  if (session.userId == userID) redirect("/profile");
  const userPosts = await getAllPostsByUser(userID);
  const following = await isFollowing(session.userId, userID, session);
  const followings = await getAllFollowing(userID, session);
  const followers = await getAllFollower(userID, session);
  return (
    <>
      <SideNavLeft session={session} route={""} />
      <div className="w-full px-4 bg-white  h-full ">
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
            isUser={false}
            initialFollowing={following}
            userID={userID}
            followerCount={followers?.length ?? 0}
            followingCount={followings?.length ?? 0}
            imageURL={""}
            bannerImageURL=""
          />
        }
      </div>
      <SideNavRight />
    </>
  );
}
