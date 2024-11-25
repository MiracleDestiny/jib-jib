import { getServerSession } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  if (session) redirect("/home");
  else redirect("/signin");
  return <div></div>;
}
