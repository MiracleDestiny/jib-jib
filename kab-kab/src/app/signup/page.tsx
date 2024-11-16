"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SignUpProfile from "@/components/signup/SignUpProfile";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SignUpUser from "@/components/signup/SignUpUser";
import UserApi from "@/backend/service/user";
import { postUserZodType } from "@/backend/types/user";

export default function SignUpPage() {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  let step = params.get("step");

  useEffect(() => {
    step = params.get("step");
    if (params.get("step") !== "user" && params.get("step") !== "profile") {
      router.replace("/signup?step=user");
      return;
    }
  }),
    [params];
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
    name: "",
    bio: "",
    location: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(`Name: ${formData.username}, Email: ${formData.email}, Password: ${formData.password}`);
    const body = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      name: formData.name,
      profile: {
        dateOfBirth: new Date(),
        bio: formData.bio,
        location: formData.location,
      },
    } as postUserZodType;
    const createUser = await UserApi.createUser(body);
  };

  const handleNext = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    router.replace("/signup?step=profile");
    alert(`Name: ${formData.username}, Email: ${formData.email}, Password: ${formData.password}`);
  };
  return (
    <div className="bg-white h-screen w-screen pt-8 px-48">
      {step === "user" ? (
        <div className="text-black flex flex-row justify-center text-[48px] my-8">
          <div>Create your account</div>
        </div>
      ) : (
        <div className="text-black flex flex-row justify-center text-[48px] my-8">
          <div>Fill in your personal details</div>
        </div>
      )}

      <div className="flex flex-col space-y-4">
        <form className="" onSubmit={handleSubmit}>
          {step === "user" ? (
            <SignUpUser formData={formData} handleChange={handleChange} handleClick={handleNext} />
          ) : (
            <SignUpProfile formData={formData} handleChange={handleChange} />
          )}
        </form>
      </div>
    </div>
  );
}
