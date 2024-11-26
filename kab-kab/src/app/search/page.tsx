import People from "@/components/search/People";
import { getServerSession } from "@/utils/auth";
import React from "react";
import { getRecommendedUsers } from "../action";
import { PeopleProfileItem } from "@/components/search/PeopleProfile";
import SideNavLeft from "@/components/public/SideNavLeft";
import SideNavRight from "@/components/public/SideNavRight";

export default async function SearchPage() {
  const session = await getServerSession();
  const recommendedUsers = await getRecommendedUsers(session);
  console.log(recommendedUsers);

  const people = recommendedUsers?.map((user) => {
    return {
      name: user.name,
      username: user.username,
      imageURL: user.imageURL,
      bio: user?.profile?.bio ?? "",
      initialIsFollowing: false,
    };
  }) as PeopleProfileItem[];
  console.log(people);
  return (
    <>
      <SideNavLeft session={session} route={"search"} />
      <div className="w-full px-4 bg-white min-h-screen h-full flex justify-center">
        <div className="w-[700px]">
          <People people={people} session={session}></People>
        </div>
      </div>
      <SideNavRight />
    </>
  );
}
