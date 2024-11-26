"use client";

import AuthApi from "@/backend/service/auth";
import { postAuthSignInZodType } from "@/backend/types/auth";
import Button from "@/components/public/Button";
import Input from "@/components/public/Input";
import Link from "next/link";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation"; // Correct hook for Next.js App Router

export default function SignInPage() {
  const router = useRouter(); // Call useRouter at the top level
  const [formData, setFormData] = useState({
    usernameemail: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Basic validation
    if (!formData.usernameemail || !formData.password) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    const body = {
      usernameemail: formData.usernameemail,
      password: formData.password,
    } as postAuthSignInZodType;

    try {
      const data = await AuthApi.signIn(body)
        .then((data) => {
          if (data === undefined) {
            setErrorMessage("Invalid username or password");
            return;
          }
          console.log("result", data);
          router.push("/home");
        })
        .catch((error) => {
          console.error("error", error);
        });
      // Check if session token is set
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    console.log(formData);
  };

  return (
    <main className="bg-white pt-8 flex justify-center">
      <div className="w-[550px]">
        <div className="text-black flex flex-row justify-center text-[48px] my-8">
          <div className="mr-4">Sign in to</div>
          <div className="text-primary-yellow">Kab Kab</div>
        </div>
        <div className="flex flex-col space-y-4 ">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Email address or username"
              name="usernameemail"
              onChange={handleChange}
            />
            <Input placeholder="Password" name="password" type="password" onChange={handleChange} />
            {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
            <Button type="submit">Sign In</Button>
          </form>
          <Link className="text-primary-yellow text-xl self-center" href="/forgot-password">
            Forgot Password?
          </Link>
        </div>
        <div className="text-primary-gray flex flex-row text-md my-8">
          <div className="mr-2">Don't have an account?</div>
          <Link href="/signup" className="text-primary-yellow">
            Sign up
          </Link>
        </div>
      </div>
    </main>
  );
}
