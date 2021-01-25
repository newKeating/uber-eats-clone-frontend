import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import { Resolver, useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import { CreateAccountInput } from "../generated/graphql";
import SignUpForm from "../components/forms/SignUpForm/SignUpForm";
import {
  CreateAccountMutation,
  useCreateAccountMutation,
  UserRole,
} from "../generated/graphql";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpFormSchema } from "../components/forms/SignUpForm/SignUpForm";
import withApollo from "../apollo/withApollo";

interface IProps {}

const SignUp: React.FC<IProps> = ({}) => {
  const router = useRouter();
  const onCompleted = (data: CreateAccountMutation) => {
    console.log("onCompleted-data", data);
    const {
      createAccount: { ok, error },
    } = data;
    if (ok) {
      // redirect to login page'
      router.replace("/login");
    }
  };
  // Make a modal to show every network error
  const onError = () => {};

  const [
    createAccountMutation,
    { data: createAccountMutationResult, loading },
  ] = useCreateAccountMutation({
    onCompleted,
    onError,
  });

  const {
    register,
    getValues,
    errors,
    handleSubmit,
    formState,
  } = useForm<CreateAccountInput>({
    mode: "onChange",
    defaultValues: {
      role: UserRole.Client,
    },
    resolver: yupResolver(signUpFormSchema) as Resolver<CreateAccountInput>,
  });

  const onSubmit = async () => {
    if (!loading) {
      await createAccountMutation({
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
        <title>SignUp | Nuber Eats</title>
        <meta property="og:title" content="SignUp title" />
      </Head>
      <div className="bg-white w-full max-w-lg pt-10 pb-7 rounded-lg text-center">
        <h3 className="text-3xl text-gray-800">Sign Up</h3>

        <SignUpForm
          handleSubmit={handleSubmit(onSubmit)}
          isSubmitting={loading}
          register={register}
          errors={errors}
        />

        {createAccountMutationResult?.createAccount.error && (
          <ErrorMessage
            textAlign="center"
            errorMessage={createAccountMutationResult.createAccount.error}
          />
        )}
      </div>
    </div>
  );
};

export default withApollo()(SignUp);
