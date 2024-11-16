"use client";

import React, { FormEventHandler, useState } from "react";

interface InputProps {
  placeholder?: string;
  name?: string;
  onChange?: FormEventHandler<HTMLInputElement>;
  value?: string;
}

function Input({ placeholder = "", name = "", onChange, value }: InputProps) {
  return (
    <div className="border-primary-lightgray border-2 rounded-xl p-4">
      <input
        type="text"
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
