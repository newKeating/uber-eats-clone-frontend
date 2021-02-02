import React from "react";
import { DishOption } from "../generated/graphql";
import Button from "./Button";

interface IProps {
  id?: number;
  description: string;
  name: string;
  price: number;
  isCustomer?: boolean;
  options?: DishOption[] | null;
  orderStarted?: boolean;
  isSelected?: boolean;
  addItemToOrder?: (dishId: number) => void;
  removeFromOrder?: (dishId: number) => void;
  // addOptionToItem?: (dishId: number, option: any) => void;
}

const Dish: React.FC<IProps> = ({
  id = 0,
  description,
  name,
  price,
  isCustomer = false,
  options,
  orderStarted = false,
  isSelected = false,
  addItemToOrder,
  removeFromOrder,
  // addOptionToItem,
  children: dishOptions,
}) => {
  const onClickItem = () => {
    if (orderStarted) {
      if (!isSelected && addItemToOrder) {
        return addItemToOrder(id);
      }
      if (isSelected && removeFromOrder) {
        return removeFromOrder(id);
      }
    }
  };
  // const onClickOption = (id: number, name: string) => {
  //   if (addOptionToItem) {
  //     return addOptionToItem(id, { name });
  //   }
  // };
  return (
    <div
      className={`px-8 py-4 border  transition-all ${
        isSelected && "border-gray-800"
      }`}
    >
      <div className="mb-5">
        <h3 className="text-lg font-medium">
          {name}{" "}
          {orderStarted && (
            <Button onClick={onClickItem}>
              {isSelected ? "Remove" : "Add"}
            </Button>
          )}
        </h3>
        <h4 className="font-medium">{description}</h4>
      </div>
      <span>${price}</span>
      {isCustomer && options && options?.length !== 0 && (
        <div>
          <h5 className="my-3 font-medium">Dish Options:</h5>
          {/* {options?.map((option, index) => (
            <span
              onClick={() =>
                addOptionToItem ? addOptionToItem(id, { name }) : null
              }
              className="flex items-center cursor-pointer border hover:border-gray-700"
              key={index}
            >
              <h5 className="mr-2">{option.name}</h5>
              <h5 className="text-sm opacity-75">(${option.extra})</h5>
            </span>
          ))} */}
          {dishOptions}
        </div>
      )}
    </div>
  );
};

export default Dish;
