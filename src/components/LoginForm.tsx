import React from "react";
import { useForm } from "react-hook-form";

interface LoginFormProps {}

interface IForm {
  email: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = ({}) => {
  const { register, watch, handleSubmit, errors } = useForm<IForm>();

  const onSubmit = () => {
    console.log("onSubmit", watch());
  };
  const onInValid = () => {
    console.log("can't create an account");
  };
  console.log("errors", errors);

  return (
    <div>
      <div>LoginForm</div>
      <form onSubmit={handleSubmit(onSubmit, onInValid)}>
        <div>
          <input
            ref={register({
              required: "This is required",
              pattern: /^[A-Za-z0-9.%+-]+@gmail.com$/,
            })}
            type="email"
            name="email"
            placeholder="email"
          />
        </div>
        {errors.email?.message && (
          <span className="font-bold text-red-600">{errors.email.message}</span>
        )}
        {errors.email?.type === "pattern" && (
          <span className="font-bold text-red-600">Only gmail allowed</span>
        )}
        <div>
          <input
            ref={register({
              required: "required",
            })}
            type="password"
            name="password"
            placeholder="password"
          />
        </div>
        <button className="bg-yellow-300 text-white">Submit</button>
      </form>
    </div>
  );
};

export default LoginForm;
