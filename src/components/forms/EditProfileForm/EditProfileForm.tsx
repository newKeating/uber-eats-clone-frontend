import { Input } from "@chakra-ui/react";
import React from "react";
import { FieldErrors } from "react-hook-form";
import * as yup from "yup";
import { CreateAccountInput } from "../../../generated/graphql";
import Button from "../../Button";
import ErrorMessage from "../../ErrorMessage";

interface IFormProps {
  handleSubmit: () => void;
  isSubmitting?: boolean;
  // register: (options: RegisterOptions) => any;
  register: any;
  errors: FieldErrors<CreateAccountInput>;
}

export const editProfileFormSchema = yup.object().shape({
  email: yup.string().email("Must be Email-type"),
  password: yup.string(),
});

const EditProfileForm: React.FC<IFormProps> = ({
  isSubmitting,
  handleSubmit,
  register,
  errors,
}) => {
  return (
    <form onSubmit={handleSubmit} className="grid gap-3 max-w-screen-sm w-full">
      <Input
        ref={register}
        isInvalid={!!errors.email?.message}
        type="email"
        name="email"
        placeholder="Email"
        size="lg"
        boxShadow="inner"
      />
      {errors.email?.message && (
        <ErrorMessage errorMessage={errors.email.message} />
      )}
      <Input
        ref={register}
        isInvalid={!!errors.password?.message}
        type="password"
        name="password"
        size="lg"
        placeholder="Password"
      />

      {errors.password?.message && (
        <ErrorMessage errorMessage={errors.password.message} />
      )}

      <Button type="submit" isLoading={isSubmitting} size="lg">
        Save Profile
      </Button>
    </form>
  );
};

export default EditProfileForm;
