import React, { FormEventHandler } from "react";
interface InputProps {
  placeholder?: string;
  name?: string;
  onChange?: FormEventHandler<HTMLInputElement>;
  value?: string;
  type?: string;
}

function TextArea() {
  return (
    <div className="border-primary-lightgray border-2 rounded-xl p-4">
      <textarea
      // type={type ?? "text"}
      // className="text-primary-gray w-full focus:outline-none placeholder:opacity-50"
      // placeholder={placeholder}
      // name={name}
      // value={value}
      // onChange={onChange}
      />
    </div>
  );
}

export default TextArea;
