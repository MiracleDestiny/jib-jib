import React from "react";

export default function SideNavRight() {
  const trends = [
    { category: "Trending", tag: "#TheIcon", posts: "77.2k posts" },
    { category: "Music · Trending", tag: "#LISA", posts: "224k posts" },
    { category: "Trending", tag: "#TheIconGroup", posts: "60.6k posts" },
    { category: "Popular in Thailand", tag: "#SocialCredit", posts: "1.2M posts" },
    { category: "Popular in K-pop", tag: "#NewJeans", posts: "849k posts" },
  ];

  return (
    <div className="bg-white w-[350px] p-4  border border-gray-300 fixed right-0 h-full">
      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* Title */}
      <h2 className="text-center text-xl font-semibold text-primary-black mb-6">Trends for you</h2>

      {/* Trend Items */}
      <div className="flex flex-wrap justify-center space-x-2 space-y-4">
        {trends.map((trend, index) => (
          <div
            key={index}
            className="bg-yellow-400 text-primary-black p-4 rounded-full text-center shadow-md"
            style={{
              fontSize: `${Math.random() * 0.5 + 1}rem`, // Vary font size slightly for cloud effect
            }}
          >
            <div className="text-sm font-semibold">{trend.category}</div>
            <div className="text-lg font-bold">{trend.tag}</div>
            <div className="text-sm">{trend.posts}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
