import React from "react";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<IProps> = (props) => {
  return (
    <button className="btn " {...props}>
      {props.children}
    </button>
  );
};

export default Button;
