"use client";

import { FormEventHandler } from "react";
interface InputProps {
  placeholder?: string;
  name?: string;
  handleInput?: FormEventHandler<HTMLInputElement>;
  options: SelectOption[];
}

type SelectOption = {
  key: string;
  value: string;
};

export default function Select({ placeholder, handleInput, options, name }: InputProps) {
  return (
    <div className="border-primary-lightgray border-2 rounded-xl p-4">
      <select
        onInput={() => {
          console.log("Handling");
        }}
        className="text-primary-gray w-full focus:outline-none placeholder:opacity-50"
        name={name ?? ""}
      >
        {options.map((option) => (
          <option key={option.key} value={option.value}>
            {option.key}
          </option>
        ))}
      </select>
    </div>
  );
}
