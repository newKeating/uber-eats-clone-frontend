import { ApolloClient } from "@apollo/client";
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
import { useRouter } from "next/router";
import {
  CreateRestaurantMutation,
  MyRestaurantsDocument,
  MyRestaurantsQuery,
  useCreateRestaurantMutation,
} from "../../generated/graphql";

interface IProps {
  client: ApolloClient<any>;
}

const AddRestaurants: React.FC<IProps> = ({ client }) => {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
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

  const onCompleted = (data: CreateRestaurantMutation) => {
    const {
      createRestaurant: { ok, error, restaurantId },
    } = data;
    if (ok) {
      setUploading(false);

      const { name, address, categoryName } = getValues();

      const queryResult = client.readQuery({
        query: MyRestaurantsDocument,
      }) as MyRestaurantsQuery;

      client.writeQuery({
        query: MyRestaurantsDocument,
        data: {
          myRestaurants: {
            ...queryResult.myRestaurants,
            restaurants: [
              {
                id: restaurantId,
                name,
                address,
                coverImg: imgUrl,
                isPromoted: false,
                category: {
                  name: categoryName,
                  __typename: "Category",
                },
                __typename: "Restaurant",
              },
              ...queryResult.myRestaurants.restaurants,
            ],
          },
        },
      });

      router.push("/owner/my-restaurants");
    }
  };

  const [createRestaurant, { loading, data }] = useCreateRestaurantMutation({
    onCompleted,
    // refetchQueries: [{ query: MyRestaurantsDocument }],
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

      setImgUrl(url);

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
