import { Input, Select } from "@chakra-ui/react";
import React from "react";
import { FieldErrors } from "react-hook-form";
import { CreateAccountInput, UserRole } from "../../../generated/graphql";
import Button from "../../Button";
import ErrorMessage from "../../ErrorMessage";
import * as yup from "yup";

interface IProps {
  handleSubmit: () => void;
  isSubmitting: boolean;
  // register: (options: RegisterOptions) => any;
  register: any;
  errors: FieldErrors<CreateAccountInput>;
}

export const signUpFormSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be Email-type")
    .required("Email is required."),
  password: yup.string().required("Password is required."),
  role: yup.string().required("Role is required."),
});

const SignUpForm: React.FC<IProps> = ({
  isSubmitting,
  handleSubmit,
  register,
  errors,
}) => {
  return (
    <form onSubmit={handleSubmit} className="grid gap-3 mt-5 px-5">
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
      {errors.password?.type === "minLength" && (
        <ErrorMessage errorMessage="Password must be more than 10chars." />
      )}

      <Select
        name="role"
        ref={register}
        placeholder="Select option"
        isInvalid={!!errors.role?.message}
      >
        {Object.keys(UserRole).map((role, index) => (
          <option key={index}>{role}</option>
        ))}
      </Select>
      {errors.role?.message && (
        <ErrorMessage errorMessage={errors.role.message} />
      )}

      <Button type="submit" isLoading={isSubmitting} size="lg">
        Log in
      </Button>
    </form>
  );
};

export default SignUpForm;
