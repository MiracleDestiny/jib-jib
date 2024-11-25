"use client";

import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import Posts, { PostsProps } from "./Posts";
import { ShownPost } from "../public/Post";
interface HomeTabProps extends PostsProps {
  followedPosts: ShownPost[] | null;
}
export default function TabComponent({ posts, session, followedPosts }: HomeTabProps) {
  const tabs = ["Your Page", "Following"];
  const [activeTab, setActiveTab] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => setActiveTab((prev) => Math.min(prev + 1, tabs.length - 1)),
    onSwipedRight: () => setActiveTab((prev) => Math.max(prev - 1, 0)),
  });

  return (
    <div className="w-full max-w-[500px] mx-auto">
      {/* Tab Navigation */}
      <div className="flex items-center border-b-2 border-gray-300">
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(index)}
            className={`w-1/2 text-center py-2 cursor-pointer ${
              activeTab === index
                ? "border-b-4 border-primary-yellow font-bold text-primary-black"
                : "text-primary-gray"
            }`}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Tab Content */}
      <div {...handlers} className="mt-4 overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${activeTab * 100}%)` }}
        >
          <Posts posts={posts} session={session} />

          {/* Tab 1 Content
          <div className="w-full flex-shrink-0">
            <p className="text-primary-black">Content for Your Page</p>
          </div> */}
          <Posts posts={followedPosts} session={session} />

          {/* Tab 2 Content */}
          {/* <div className="w-full flex-shrink-0">
            <p className="text-primary-black">Content for Following</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
