import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "@chakra-ui/react";
import ErrorMessage from "../components/ErrorMessage";
import { LoginMutation, useLoginMutation } from "../generated/graphql";
import Button from "../components/Button";
import NextLink from "next/link";
import Head from "next/head";

interface IProps {}
interface ILoginForm {
  email: string;
  password: string;
}

const Login: React.FC<IProps> = ({}) => {
  const onCompleted = (data: LoginMutation) => {
    console.log("onCompleted-data", data);
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      console.log("token", token);
    }
  };
  // Make a modal to show every network error
  const onError = () => {};
  const [
    loginMutation,
    { data: loginMutationResult, loading },
  ] = useLoginMutation({
    onCompleted,
    onError,
  });
  const {
    register,
    getValues,
    errors,
    handleSubmit,
    formState,
  } = useForm<ILoginForm>({
    mode: "onChange",
  });
  console.log("errors", errors);

  const onSubmit = async () => {
    console.log("LoginForm", getValues());
    if (!loading) {
      await loginMutation({
        variables: {
          input: {
            ...getValues(),
          },
        },
      });
    }
  };
  return (
    <div className="h-screen flex justify-center items-center bg-gray-800">
      <Head>
        <title>Login | Nuber Eats</title>
        <meta property="og:title" content="Login title" />
      </Head>
      <div className="bg-white w-full max-w-lg pt-10 pb-7 rounded-lg text-center">
        <h3 className="text-3xl text-gray-800">Log In</h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 px-5"
        >
          <input
            className="input"
            ref={register({
              required: "Email is required",
            })}
            // required
            type="email"
            name="email"
            placeholder="Email"
          />
          {errors.email?.message && (
            <ErrorMessage errorMessage={errors.email.message} />
          )}
          <input
            className="input"
            ref={register({ required: "Password is required" })}
            // ref={register({ required: "Password is required", minLength: 10 })}
            // required
            type="password"
            name="password"
            placeholder="Password"
          />

          {errors.password?.message && (
            <ErrorMessage errorMessage={errors.password.message} />
          )}
          {errors.password?.type === "minLength" && (
            <ErrorMessage errorMessage="Password must be more than 10chars." />
          )}
          <Button
            type="submit"
            // isDisabled={!formState.isValid}
            isLoading={loading}
            size="lg"
          >
            Log in
          </Button>
          {loginMutationResult?.login.error && (
            <ErrorMessage
              textAlign="center"
              errorMessage={loginMutationResult.login.error}
            />
          )}
        </form>

        <div className="mt-3">
          New to Nuber?
          <NextLink href="/signup">
            <Link>
              {" "}
              <span className="text-lime-600 font-bold hover:underline">
                Create an Account
              </span>
            </Link>
          </NextLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
