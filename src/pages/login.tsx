import { Link } from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { authTokenVar, isLoggedInVar } from "../apollo/globalState";
import withApollo from "../apollo/withApollo";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { LoginMutation, useLoginMutation } from "../generated/graphql";

interface IProps {}
interface ILoginForm {
  email: string;
  password: string;
}

const Login: React.FC<IProps> = ({}) => {
  const onLoginCompleted = (data: LoginMutation) => {
    const {
      login: { ok, token },
    } = data;
    if (ok && token) {
      console.log("token", token);
      localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      authTokenVar(token);
      isLoggedInVar(true);
    }
  };
  // Make a modal to show every network error
  const onLoginError = () => {};
  const [
    loginMutation,
    { data: loginMutationResult, loading },
  ] = useLoginMutation({
    onCompleted: onLoginCompleted,
    onError: onLoginError,
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

export default withApollo()(Login);
