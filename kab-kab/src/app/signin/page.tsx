"use client";
import AuthApi from "@/backend/service/auth";
import { postAuthSignInZodType } from "@/backend/types/auth";
import Button from "@/components/public/Button";
import Input from "@/components/public/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignInPage() {
  
  const router = useRouter();
  const handleSubmit = async () => {
    const body = {
      usernameemail: formData.usernameemail,
      password: formData.password,
    } as postAuthSignInZodType;
    const result = await AuthApi.signIn(body);
    if (result) router.push("/home");
    // const authenticated = await authenticateLogin(formData.usernameemail, formData.password);
    // if (!authenticated) alert("Incorrect password or no user!");
    // else router.push("/home");
  };
  const [formData, setFormData] = useState({
    usernameemail: "",
    password: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    console.log(formData);
  };
  return (
    <div className="bg-white h-screen w-screen pt-8 px-48">
      <div className="text-black flex flex-row justify-center text-[48px] my-8">
        <div className="mr-4">Sign in to</div>
        <div className="text-primary-yellow">Kab Kab</div>
      </div>
      <div className="flex flex-col space-y-4">
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Email address or username"
            name="usernameemail"
            onChange={handleChange}
          />
          <Input placeholder="Password" name="password" onChange={handleChange} />
          <Button type="submit">Sign In</Button>
        </form>
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
