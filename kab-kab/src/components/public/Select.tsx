"use client";

import { FormEventHandler } from "react";
interface SelectProps {
  placeholder?: string;
  name?: string;
  onChange?: FormEventHandler<HTMLSelectElement>;
  options: SelectOption[];
  value?: string;
}

type SelectOption = {
  key: string;
  value: string;
};

export default function Select({ placeholder, onChange, options, name, value }: SelectProps) {
  return (
    <div className="border-primary-lightgray border-2 rounded-xl p-4">
      <select
        onChange={onChange}
        className="text-primary-gray w-full focus:outline-none placeholder:opacity-50"
        name={name ?? ""}
        value={value ?? ""}
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
