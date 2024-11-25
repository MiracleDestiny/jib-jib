"use client";
import React from "react";
import ProfileHeader, { ProfileHeaderProps } from "./ProfileHeader";
import Post, { ShownPost } from "../public/Post";
import { Session } from "@/backend/types/session";
interface ProfileProps extends ProfileHeaderProps {
  session: Session;
  posts: ShownPost[];
}
function Profile({
  name,
  username,
  bio,
  location,
  dateOfBirth,
  joinedAt,
  posts,
  session,
  isUser,
  initialFollowing,
  userID,
}: ProfileProps) {
  return (
    <div className=" flex flex-col justify-center px-4 pt-2 h-full w-[700px]">
      <ProfileHeader
        name={name}
        username={username}
        bio={bio}
        location={location}
        dateOfBirth={dateOfBirth}
        joinedAt={joinedAt}
        isUser={isUser}
        initialFollowing={initialFollowing}
        session={session}
        userID={userID}
      />

      {/* Tabs */}
      <div className="flex justify-around mt-4 border-b">
        <button className="flex-1 text-center py-2 text-yellow-500 font-bold border-b-4 border-yellow-500">
          Post
        </button>
        <button className="flex-1 text-center py-2 text-gray-500 hover:text-yellow-500">
          Media
        </button>
        <button className="flex-1 text-center py-2 text-gray-500 hover:text-yellow-500">
          Replies
        </button>
      </div>

      {/* Posts */}
      <div className="p-4 flex w-full items-center flex-col space-y-4">
        {posts.map((post, index) => (
          <Post
            key={`post-${index}`}
            session={session}
            authorName={post.authorName}
            authorUsername={post.authorUsername}
            authorId={post.authorId}
            imageURL={post.imageURL}
            content={post.content}
            bookmarked={post.bookmarked}
            replied={post.replied}
            reposted={post.reposted}
            liked={post.liked}
            replies={post.replies}
            reposts={post.reposts}
            likes={post.likes}
            postId={post.postId}
            postDate={post.postDate}
          />
        ))}
      </div>
    </div>
  );
}

export default Profile;
