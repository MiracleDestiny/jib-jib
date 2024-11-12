"use client";

import { FormEventHandler } from "react";
interface InputProps {
  placeholder?: string;
  handleInput?: FormEventHandler<HTMLInputElement>;
}
function Input({ placeholder, handleInput }: InputProps) {
  return (
    <div className="border-primary-lightgray border-2 rounded-xl p-4">
      <input
        onInput={() => {
          console.log("Handling");
        }}
        className="text-primary-gray w-full focus:outline-none placeholder:opacity-50"
        placeholder={placeholder ?? ""}
      ></input>
    </div>
  );
}

export default Input;
