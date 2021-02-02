import React, { useState } from "react";
import withApollo from "../../../../apollo/withApollo";
import CreateDishForm, {
  CreateDishFormSchema,
} from "../../../../components/forms/CreateDishForm";
import Layout from "../../../../components/Layout";
import {
  useCreateDishMutation,
  MyRestaurantDocument,
} from "../../../../generated/graphql";
import { useForm, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ICreateDishFormProps } from "../../../../components/forms/CreateDishForm";
import { useRouter } from "next/router";
import { CreateDishMutation } from "../../../../generated/graphql";
import ErrorMessage from "../../../../components/ErrorMessage";

interface IProps {}

const AddDish: React.FC<IProps> = ({}) => {
  const router = useRouter();
  const [options, setOptions] = useState<number[]>([]);
  const onCompleted = (data: CreateDishMutation) => {
    const {
      createDish: { ok },
    } = data;
    if (ok) {
      router.back();
    }
  };

  const [createDish, { loading, data, error }] = useCreateDishMutation({
    onCompleted,
    refetchQueries: [
      {
        query: MyRestaurantDocument,
        variables: {
          input: {
            id: parseInt(router.query.id as string),
          },
        },
      },
    ],
  });

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    errors,
  } = useForm<ICreateDishFormProps>({
    mode: "onChange",
    resolver: yupResolver(
      CreateDishFormSchema
    ) as Resolver<ICreateDishFormProps>,
  });

  const onSubmit = () => {
    const { id } = router.query;
    const restaurantId = parseInt(id as string);
    const { name, description, price, ...rest } = getValues();

    const optionsArr = options.map((theId) => {
      // const extra = parseInt(rest[`optionExtra-${theId}`])
      //   ?
      //   : 0;
      return {
        name: rest[`optionName-${theId}`],
        extra: +rest[`optionExtra-${theId}`],
      };
    });

    createDish({
      variables: {
        input: {
          name,
          price: parseInt(price),
          description,
          restaurantId,
          options: optionsArr,
        },
      },
    });
  };

  return (
    <Layout title="Add Dish | Nuber Eats">
      Add Dish
      <div>
        <CreateDishForm
          register={register}
          handleSubmit={handleSubmit(onSubmit)}
          isSubmitting={loading}
          errors={errors}
          submitBtString="Add Dish"
          setValue={setValue}
          options={options}
          setOptions={setOptions}
        />
        {data?.createDish?.error && (
          <ErrorMessage errorMessage={data.createDish.error} />
        )}
        {error && <ErrorMessage errorMessage={error.message} />}
      </div>
    </Layout>
  );
};

export default withApollo()(AddDish);
