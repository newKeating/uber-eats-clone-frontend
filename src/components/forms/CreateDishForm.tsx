import { Input } from "@chakra-ui/react";
import React, { Dispatch, useState } from "react";
import { FieldErrors, SetFieldValue } from "react-hook-form";
import * as yup from "yup";
import { CreateDishInput } from "../../generated/graphql";
import Button from "../Button";
import ErrorMessage from "../ErrorMessage";

export interface ICreateDishFormProps {
  name: string;
  price: string;
  description: string;
  [key: string]: string;
}

interface IProps {
  handleSubmit: () => void;
  isSubmitting?: boolean;
  register: any;
  submitBtString?: string;
  errors: FieldErrors<ICreateDishFormProps>;
  // setValue?: SetFieldValue<ICreateDishFormProps>;
  setValue?: any;
  options?: any[];
  setOptions?: any;
  // onAddOptionClick: () => void;
}

export const CreateDishFormSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  price: yup.string().required("Price is required"),
  description: yup.string().required("Description is required"),
});

const CreateDishForm: React.FC<IProps> = ({
  isSubmitting,
  handleSubmit,
  register,
  submitBtString,
  errors,
  setValue,
  options,
  setOptions,
  // onAddOptionClick,
}) => {
  const onAddOptionClick = () => {
    setOptions((current: any) => [Date.now(), ...current]);
  };

  const onDeleteClick = (idToDelete: number) => {
    setOptions((current: any) =>
      current.filter((id: any) => id !== idToDelete)
    );
    setValue(`optionName-${idToDelete}`, "");
    setValue(`optionExtra-${idToDelete}`, "");
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 max-w-screen-sm w-full">
      <Input
        ref={register}
        isInvalid={!!errors.name?.message}
        type="text"
        name="name"
        placeholder="Name"
        size="md"
        boxShadow="inner"
      />
      {errors.name?.message && (
        <ErrorMessage errorMessage={errors.name.message} />
      )}
      <Input
        ref={register}
        isInvalid={!!errors.price?.message}
        type="number"
        min={0}
        name="price"
        size="md"
        placeholder="price"
      />

      {errors.price?.message && (
        <ErrorMessage errorMessage={errors.price.message} />
      )}

      <Input
        ref={register}
        isInvalid={!!errors.description?.message}
        type="text"
        name="description"
        size="md"
        placeholder="description"
      />

      {errors.description?.message && (
        <ErrorMessage errorMessage={errors.description.message} />
      )}

      <div className="my-10">
        <h4 className="font-medium mb-3 text-lg">Dish Options</h4>
        <span
          className="cursor-pointer text-white bg-gray-900 py-1 px-2 mt-5"
          onClick={onAddOptionClick}
        >
          Add Dish Option
        </span>
        {options.length !== 0 &&
          options.map((id) => {
            return (
              <div key={id} className="mt-5 grid grid-cols-3 gap-3">
                <Input
                  ref={register}
                  name={`optionName-${id}`}
                  // isInvalid={!!errors.description?.message}
                  type="text"
                  size="md"
                  placeholder="Option Name"
                />
                <Input
                  ref={register}
                  name={`optionExtra-${id}`}
                  // isInvalid={!!errors.description?.message}
                  type="number"
                  size="md"
                  min={0}
                  defaultValue={0}
                  placeholder="Option Extra"
                />
                <span
                  className="cursor-pointer bg-red-500 text-white py-2 px-3 text-center font-bold"
                  onClick={() => onDeleteClick(id)}
                >
                  Delete Option
                </span>
              </div>
            );
          })}
      </div>

      <Button type="submit" isLoading={isSubmitting} size="lg">
        {submitBtString ? submitBtString : "Submit"}
      </Button>
    </form>
  );
};

export default CreateDishForm;
