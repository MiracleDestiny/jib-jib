import Home from "@/components/home/Home";
import { getServerSession } from "@/utils/auth";
import React from "react";
import { cookies } from "next/headers";

export default async function HomePage() {
  const session = await getServerSession();
  console.log(session);
  const cookieStore = await cookies();
  const theme = cookieStore.getAll();
  console.log(theme);
  return (
    <div className="w-full px-4 bg-white">
      <Home />
    </div>
  );
}
