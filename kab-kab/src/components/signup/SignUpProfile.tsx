import React from "react";
import Input from "../public/Input";
import Select from "../public/Select";
import Button from "../public/Button";
import { SignUpFormData } from "../types/form";
import { DAY_MAP, MONTH_MAP, YEAR_MAP } from "@/utils/constants";
import { useRouter } from "next/navigation";

interface SignUpProfileProps {
  formData: SignUpFormData;
  handleChange: React.FormEventHandler<HTMLInputElement | HTMLSelectElement>;
}

function SignUpProfile({ formData, handleChange }: SignUpProfileProps) {
  return (
    <div className="flex flex-col space-y-2">
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
