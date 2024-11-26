import React from "react";
import PeopleProfile, { PeopleProfileItem } from "./PeopleProfile";
import { Session } from "@/backend/types/session";
interface PeopleProps {
  people: PeopleProfileItem[] | undefined;
  session: Session;
}
export default function People({ people, session }: PeopleProps) {
  return (
    <div className="flex flex-col  self-start">
      <div className="flex flex-col">People to Follow</div>
      <div className="flex flex-col">
        {people?.map((person, index) => (
          <PeopleProfile
            key={`people-${index}`}
            imageURL={person.imageURL}
            username={person.username}
            name={person.name}
            bio={person.bio}
            session={session}
            userID={person.userID}
            initialIsFollowing={person.initialIsFollowing}
          />
        ))}
      </div>
    </div>
  );
}
