import React from "react";
import Image from "next/image";
interface ProfileProps {
  imageURL: string;
  username: string;
  name: string;
}
function Profile({ imageURL, username, name }: ProfileProps) {
  return (
    <div className="flex flex-row space-x-2 mb-2 text-primary-black">
      <div className="rounded-full border border-black border-5 flex justify-center items-center min-w-16 min-h-16 overflow-hidden">
        <Image
          alt="profile"
          src={imageURL}
          width={30}
          height={30}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-row w-full ">
        <div className="flex flex-col justify-center ">
          <span className="text-2xl">{name}</span>
          <span className="text-md">{`${username}`}</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
