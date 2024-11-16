import React, { FormEventHandler } from "react";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: FormEventHandler<HTMLButtonElement>;
  type?: "submit" | "reset" | "button";
}

function Button({ children, onClick, type }: ButtonProps) {
  return (
    <button
      className="flex w-full bg-primary-yellow rounded-[32px] p-4 justify-center  text-xl"
      onClick={onClick}
      type={type ?? "button"}
    >
      {children}
    </button>
  );
}

export default Button;
