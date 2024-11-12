import Button from "@/components/public/Button";
import Input from "@/components/public/Input";
import Link from "next/link";
import React from "react";

export default function SignUpPage() {
  return (
    <div className="bg-white h-screen w-screen pt-8 px-48">
      <div className="text-black flex flex-row justify-center text-[48px] my-8">
        <div >Create your account</div>
      </div>
      <div className="flex flex-col space-y-4">
        <Input placeholder="Email address or username"></Input>
        <Input placeholder="Password"></Input>
        <Button></Button>
        <Link className="text-primary-yellow text-xl self-center" href={""}>
          Forgot Password?
        </Link>
      </div>
      <div className="text-primary-gray flex flex-row text-md my-8">
        <div className="mr-2">Don't have an account</div>
        <Link href={"/signup"} className="text-primary-yellow">
          Sign up
        </Link>
      </div>
    </div>
  );
}
