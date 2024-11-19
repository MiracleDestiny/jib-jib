import React, { FormEventHandler } from "react";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: FormEventHandler<HTMLButtonElement>;
  type?: "submit" | "reset" | "button";
  className?: string;
}

function Button({ children, onClick, type, className }: ButtonProps) {
  return (
    <button
      className={`flex w-full bg-primary-yellow rounded-[32px] p-4 justify-center  text-xl ${
        className ?? ""
      }`}
      onClick={onClick}
      type={type ?? "button"}
    >
      {children}
    </button>
  );
}

export default Button;
