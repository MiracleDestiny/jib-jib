import React from "react";
import Input from "../public/Input";
import Select from "../public/Select";
import Button from "../public/Button";
import { SignUpFormData } from "../types/form";
import { DAY_MAP, MONTH_MAP, YEAR_MAP } from "@/utils/constants";

interface SignUpUserProps {
  formData: SignUpFormData;
  handleChange: React.FormEventHandler<HTMLInputElement | HTMLSelectElement>;
  handleClick: React.FormEventHandler<HTMLButtonElement>;
}

export default function SignUpUser({ formData, handleChange, handleClick }: SignUpUserProps) {
  return (
    <div className="flex flex-col space-y-2">
      <Input
        placeholder="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <Input placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
      <Input
        placeholder="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />
      <Input
        placeholder="Confirm Password"
        name="cpassword"
        type="password"
        value={formData.cpassword}
        onChange={handleChange}
      />
      <div className="text-black flex flex-col text-xl my-8">
        <div>Date of Birth</div>
        <div className="flex flex-row justify-between text-sm">
          <Select
            options={DAY_MAP}
            name="day"
            value={formData.day}
            onChange={handleChange}
          ></Select>
          <Select
            options={MONTH_MAP}
            name="month"
            value={formData.month}
            onChange={handleChange}
          ></Select>

          <Select
            options={YEAR_MAP}
            name="year"
            value={formData.year}
            onChange={handleChange}
          ></Select>
        </div>
      </div>
      <Button onClick={handleClick}>Next</Button>
    </div>
  );
}
