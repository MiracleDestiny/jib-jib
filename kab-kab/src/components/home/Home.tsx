import React from "react";
import Post from "../public/Post";
import { POSTS } from "@/utils/constants";

export default function Home() {
  const handleBookmark = () => {

  }

  const handleLike = () => {
    
  }

  const handleReply = () => {
    
  }

  const handleRepost = () => {
    
  }
  return (
    <div className="px-4 pt-2">
      <div></div>
      <div>
        {POSTS.map((post, index) => (
          <Post
            key={`${post}-${index}`}
            name={post.name}
            username={post.username}
            imageURL={post.imageURL}
            content={post.content}
            bookmarked={post.bookmarked}
            replies={post.replies}
            reposts={post.reposts}
            likes={post.likes}
            replied={post.replied}
            liked={post.liked}
            reposted={post.reposted}
            onBookmark={handleBookmark}
            onLike={handleLike}
            onReply={handleReply}
            onRepost={handleRepost}            
          />
        ))}
      </div>
    </div>
  );
}
