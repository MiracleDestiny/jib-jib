import React, { ChangeEventHandler, FormEventHandler } from "react";
interface TextAreaProps {
  placeholder?: string;
  name?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  value?: string;
}

function TextArea({ placeholder, name, onChange, value }: TextAreaProps) {
  return (
    <div className="border-primary-lightgray border-2 rounded-xl p-4">
      <textarea
        className="text-primary-gray w-full focus:outline-none placeholder:opacity-50"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default TextArea;
