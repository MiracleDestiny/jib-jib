import React from "react";
import Input from "../public/Input";
import Button from "../public/Button";
import { SignUpFormData } from "../types/form";
import { UploadFile } from "../public/UploadFile";

interface SignUpProfileProps {
  formData: SignUpFormData;
  handleChange: React.FormEventHandler<HTMLInputElement | HTMLSelectElement>;
}

function SignUpProfile({ formData, handleChange }: SignUpProfileProps) {
  const handleComplete = (imageURL: string) => {
    formData.imageURL = imageURL;
    console.log(formData);
  };
  return (
    <div className="flex flex-col space-y-2">
      <UploadFile onComplete={handleComplete} />
      <Input placeholder="Name" name="name" value={formData.name} onChange={handleChange} />
      <Input placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
      <Input placeholder="Bio" name="bio" value={formData.bio} onChange={handleChange} />
      <Input
        placeholder="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
      />
      <Button type="submit">Create Account</Button>
    </div>
  );
}

export default SignUpProfile;
