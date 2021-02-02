import React from "react";

interface IProps {
  dishId: number;
  isSelected: boolean;
  name: string;
  extra?: number | null;
  addOptionToItem: (dishId: number, optionName: string) => void;
  removeOptionFromItem: (dishId: number, optionName: string) => void;
}

const DishOption: React.FC<IProps> = ({
  dishId,
  isSelected = false,
  name,
  extra,
  addOptionToItem,
  removeOptionFromItem,
}) => {
  const onClick = () => {
    if (isSelected) {
      removeOptionFromItem(dishId, name);
    } else {
      addOptionToItem(dishId, name);
    }
  };
  return (
    <span
      onClick={onClick}
      className={`flex items-center cursor-pointer border hover:border-gray-700 ${
        isSelected ? "border-gray-800" : ""
      }`}
    >
      <h5 className="mr-2">{name}</h5>
      <h5 className="text-sm opacity-75">{extra ? `$${extra}` : "Free"}</h5>
    </span>
  );
};

export default DishOption;
