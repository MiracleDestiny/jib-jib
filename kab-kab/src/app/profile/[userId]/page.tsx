import Profile from "@/components/profile/Profile";
import React from "react";
import { getAllPostsByUser, getProfile, isFollowing } from "../../action";
import { redirect } from "next/navigation";
import { getServerSession } from "@/utils/auth";

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
  return (
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
          isUser={false}
          initialFollowing={following}
          userID={userID}
        />
      }
    </div>
  );
}
