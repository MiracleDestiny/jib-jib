"use client";

import React, { ChangeEventHandler, FormEventHandler, useState } from "react";

interface InputProps {
  placeholder?: string;
  name?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  type?: string;
}

function Input({ placeholder = "", name = "", type, onChange, value }: InputProps) {
  return (
    <div className="border-primary-lightgray border-2 rounded-xl p-4">
      <input
        type={type ?? "text"}
        className="text-primary-gray w-full focus:outline-none placeholder:opacity-50"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
