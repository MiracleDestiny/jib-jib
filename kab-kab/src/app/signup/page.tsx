"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SignUpProfile from "@/components/signup/SignUpProfile";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SignUpUser from "@/components/signup/SignUpUser";

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(`Name: ${formData.username}, Email: ${formData.email}, Password: ${formData.password}`);
  };

  const handleNext = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    router.replace("/signup?step=profile");
    alert(`Name: ${formData.username}, Email: ${formData.email}, Password: ${formData.password}`);
  };
  return (
    <div className="bg-white h-full w-screen pt-8 px-48">
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
