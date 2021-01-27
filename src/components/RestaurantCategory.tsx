import React from "react";

interface IProps {
  name: string;
}

const RestaurantCategory: React.FC<IProps> = ({ name }) => {
  return (
    <div className="group flex flex-col items-center cursor-pointer">
      <div
        className="w-16 h-16 rounded-full border border-gray-400 group-hover:bg-gray-100"
        // style={{ backgroundImage: `url(${category.coverImg})` }}
      ></div>
      <span className="mt-1">{name}</span>
    </div>
  );
};

export default RestaurantCategory;
