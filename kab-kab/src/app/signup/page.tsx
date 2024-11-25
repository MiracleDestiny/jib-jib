"use client";
import React, { useEffect, useState } from "react";
import SignUpProfile from "@/components/signup/SignUpProfile";
import { useRouter, useSearchParams } from "next/navigation";
import SignUpUser from "@/components/signup/SignUpUser";
import UserApi from "@/backend/service/user";
import { postUserZodType } from "@/backend/types/user";
import { EdgeStoreProvider } from "@/lib/edgestore";

export default function SignUpPage() {
  const params = useSearchParams();
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
    month: "1",
    day: "1",
    year: "2000",
    imageURL: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    console.log(formData);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(`Name: ${formData.username}, Email: ${formData.email}, Password: ${formData.password}`);
    const body = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      name: formData.name,
      imageURL: formData.imageURL,
      profile: {
        dateOfBirth: new Date(`${formData.year}-${formData.month}-${formData.day}`),
        bio: formData.bio,
        location: formData.location,
      },
    } as postUserZodType;

    console.log(`${formData.year}-${formData.month}-${formData.day}`);
    const createUser = await UserApi.createUser(body);
    if (createUser) {
      router.replace("/signin");
    } else {
      alert("An error has occurred!");
    }
  };

  const handleNext = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    router.replace("/signup?step=profile");
    // alert(`Name: ${formData.username}, Email: ${formData.email}, Password: ${formData.password}`);
  };

  return (
    <EdgeStoreProvider>
      <div className="bg-white h-screen w-screen pt-8 px-48 flex justify-center">
        <div className="w-[550px]">
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
                <SignUpUser
                  formData={formData}
                  handleChange={handleChange}
                  handleClick={handleNext}
                />
              ) : (
                <SignUpProfile formData={formData} handleChange={handleChange} />
              )}
            </form>
          </div>
        </div>
      </div>
    </EdgeStoreProvider>
  );
}
