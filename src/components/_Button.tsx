import React from "react";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<IProps> = (props) => {
  return (
    <button
      className="w-full py-3 px-5 bg-gray-800 text-white text-lg rounded-lg outline-none hover:opacity-90;"
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
