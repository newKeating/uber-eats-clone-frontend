import React from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<IProps> = ({ type, ...props }) => {
  return <input className={"input"} type={type ? type : "text"} {...props} />;
};

export default Input;
