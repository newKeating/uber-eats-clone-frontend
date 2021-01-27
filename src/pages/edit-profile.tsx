import { ApolloClient, gql } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { Resolver, useForm } from "react-hook-form";
import withApollo from "../apollo/withApollo";
import EditProfileForm, {
  editProfileFormSchema,
} from "../components/forms/EditProfileForm/EditProfileForm";
import Layout from "../components/Layout";
import {
  EditProfileInput,
  EditProfileMutation,
  useEditProfileMutation,
  useMeQuery,
} from "../generated/graphql";

interface IProps {
  client: ApolloClient<any>;
}

const EditProfile: React.FC<IProps> = ({ client }) => {
  const { data: userData } = useMeQuery();

  const onCompleted = (data: EditProfileMutation) => {
    const {
      editProfile: { ok, error },
    } = data;
    if (ok && userData) {
      const {
        me: { email: prevEmail, id },
      } = userData;
      const { email: newEmail } = getValues();
      if (prevEmail !== newEmail) {
        client.writeFragment({
          id: `User:${id}`,
          fragment: gql`
            fragment EditedUser on User {
              email
              verified
            }
          `,
          data: {
            email: newEmail,
            verified: false,
          },
        });
      }
      alert("Successfully updated profile");
    }
  };

  const [editProfile, { loading, error, data }] = useEditProfileMutation({
    onCompleted,
  });

  const {
    register,
    getValues,
    errors,
    handleSubmit,
    setValue,
  } = useForm<EditProfileInput>({
    // defaultValues: {
    //   email: userData?.me.email,
    // },
    mode: "onBlur",
    resolver: yupResolver(editProfileFormSchema) as Resolver<EditProfileInput>,
  });

  useEffect(() => {
    setValue("email", userData?.me.email);
  }, [userData]);

  const onSubmit = async () => {
    const { email, password } = getValues();
    if (!loading) {
      await editProfile({
        variables: {
          input: {
            email,
            ...(password !== "" && { password }),
          },
        },
      });
    }
  };
  return (
    <Layout title="Edit Profile | Nuber Eats">
      <div className="mt-52 flex flex-col justify-center items-center border border-red-500">
        editProfile
        <EditProfileForm
          register={register}
          errors={errors}
          handleSubmit={handleSubmit(onSubmit)}
          isSubmitting={loading}
        />
      </div>
    </Layout>
  );
};

export default withApollo()(EditProfile);
