import { Input } from "@chakra-ui/react";
import React from "react";
import { FieldErrors } from "react-hook-form";
import * as yup from "yup";
import { CreateRestaurantInput } from "../../generated/graphql";
import Button from "../Button";
import ErrorMessage from "../ErrorMessage";

export interface ICreateRestaurantFormProps {
  name: string;
  address: string;
  categoryName: string;
  file: FileList;
}

interface IProps {
  handleSubmit: () => void;
  isSubmitting?: boolean;
  register: any;
  submitBtString?: string;
  // errors: FieldErrors<CreateRestaurantInput>;
  errors: FieldErrors<ICreateRestaurantFormProps>;
}

export const createRestaruantFormSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  categoryName: yup.string().required("Category is required"),
  file: yup.mixed().required("File is required"),
  // must set up file size validation
});

const CreateRestaurantForm: React.FC<IProps> = ({
  isSubmitting,
  handleSubmit,
  register,
  submitBtString,
  errors,
}) => {
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
        isInvalid={!!errors.address?.message}
        type="text"
        name="address"
        size="md"
        placeholder="Address"
      />

      {errors.address?.message && (
        <ErrorMessage errorMessage={errors.address.message} />
      )}
      <Input
        ref={register}
        isInvalid={!!errors.categoryName?.message}
        type="text"
        name="categoryName"
        size="md"
        placeholder="CategoryName"
      />
      {errors.categoryName?.message && (
        <ErrorMessage errorMessage={errors.categoryName.message} />
      )}
      <Input
        ref={register}
        isInvalid={!!errors.file?.message}
        type="file"
        name="file"
        accept="image/*"
        size="md"
        placeholder="File"
      />
      {errors.file?.message && (
        <ErrorMessage errorMessage={errors.file.message} />
      )}

      <Button type="submit" isLoading={isSubmitting} size="md">
        {submitBtString ? submitBtString : "Submit"}
      </Button>
    </form>
  );
};

export default CreateRestaurantForm;
