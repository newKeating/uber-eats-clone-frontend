import React from "react";

interface IProps {
  errorMessage: string;
  textAlign?: "center" | "left" | "right";
}

const ErrorMessage: React.FC<IProps> = ({
  errorMessage,
  textAlign = "left",
}) => {
  return (
    <span className={`font-medium px-1 text-${textAlign} text-red-500`}>
      {errorMessage}
    </span>
  );
};

export default ErrorMessage;
