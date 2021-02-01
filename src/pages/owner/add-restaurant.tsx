import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import withApollo from "../../apollo/withApollo";
import ErrorMessage from "../../components/ErrorMessage";
import CreateRestaurantForm, {
  createRestaruantFormSchema,
  ICreateRestaurantFormProps,
} from "../../components/forms/CreateRestaurantForm";
import Layout from "../../components/Layout";
import {
  CreateRestaurantMutation,
  MyRestaurantsDocument,
  useCreateRestaurantMutation,
} from "../../generated/graphql";

interface IProps {}

const AddRestaurants: React.FC<IProps> = ({}) => {
  const [uploading, setUploading] = useState(false);

  const onCompleted = (data: CreateRestaurantMutation) => {
    const {
      createRestaurant: { ok, error },
    } = data;
    if (ok) {
      setUploading(false);
    }
  };

  const [createRestaurant, { loading, data }] = useCreateRestaurantMutation({
    onCompleted,
    refetchQueries: [{ query: MyRestaurantsDocument }],
  });

  const {
    register,
    getValues,
    handleSubmit,
    errors,
  } = useForm<ICreateRestaurantFormProps>({
    mode: "onChange",
    resolver: yupResolver(
      createRestaruantFormSchema
    ) as Resolver<ICreateRestaurantFormProps>,
  });

  const onSubmit = async () => {
    console.log("onSubmit", getValues());
    try {
      setUploading(true);
      const { name, address, categoryName, file } = getValues();
      const actualFile = file[0];
      const formBody = new FormData();
      formBody.append("file", actualFile);
      const { url } = await (
        await fetch(process.env.UPLOAD_URL as string, {
          method: "POST",
          body: formBody,
        })
      ).json();
      createRestaurant({
        variables: {
          input: {
            name,
            address,
            categoryName,
            coverImg: url,
          },
        },
      });
      setUploading(false);
    } catch (e) {}
  };

  return (
    <Layout title="Add Restaurant | Nuber Eats">
      <div className="container">
        <h1>Add Restaurant</h1>
        <CreateRestaurantForm
          register={register}
          handleSubmit={handleSubmit(onSubmit)}
          isSubmitting={uploading}
          errors={errors}
          submitBtString="Add Restaurant"
        />
        {data?.createRestaurant?.error && (
          <ErrorMessage errorMessage={data.createRestaurant.error} />
        )}
      </div>
    </Layout>
  );
};

export default withApollo()(AddRestaurants);
