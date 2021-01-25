import React from "react";

interface IProps {}

const Loading: React.FC<IProps> = ({}) => {
  return (
    <div className="h-screen flex justify-center items-center">
      <span className="font-medium text-xl">Loading...</span>
    </div>
  );
};

export default Loading;
