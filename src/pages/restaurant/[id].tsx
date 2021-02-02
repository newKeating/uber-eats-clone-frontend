import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import withApollo from "../../apollo/withApollo";
import Dish from "../../components/Dish";
import Layout from "../../components/Layout";
import {
  useRestaurantQuery,
  CreateOrderItemInput,
  useCreateOrderMutation,
} from "../../generated/graphql";
import Button from "../../components/Button";
import DishOption from "../../components/DishOption";
import { CreateOrderMutation } from "../../generated/graphql";

interface IProps {
  id: number;
}

const Restaurant: NextPage<IProps> = ({}) => {
  // console.log("id", id);
  const router = useRouter();
  const restaurantId = parseInt(router.query.id as string);
  const [orderStarted, setOrderStarted] = useState(false);
  const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([]);

  const { data, loading } = useRestaurantQuery({
    variables: {
      input: {
        restaurantId,
      },
    },
  });

  const onCompleted = (data: CreateOrderMutation) => {
    const {
      createOrder: { ok, orderId },
    } = data;
    if (ok) {
      alert("order created");
      router.push(`/orders/${orderId}`);
    }
  };

  const [
    createOrder,
    { data: createOrderData, loading: createOrderLoading },
  ] = useCreateOrderMutation({
    onCompleted,
  });

  const onClickStartOrder = () => {
    setOrderStarted(true);
  };

  const getItem = (dishId: number) => {
    return orderItems.find((order) => order.dishId === dishId);
  };

  const isSelected = (dishId: number) => {
    return Boolean(getItem(dishId));
  };

  const addItemToOrder = (dishId: number) => {
    if (isSelected(dishId)) {
      return;
    }
    setOrderItems((current) => [{ dishId, options: [] }, ...current]);
  };

  const removeFromOrder = (dishId: number) => {
    setOrderItems((current) =>
      current.filter((dish) => dish.dishId !== dishId)
    );
  };

  const addOptionToItem = (dishId: number, optionName: string) => {
    if (!isSelected(dishId)) {
      return;
    }
    const oldItem = getItem(dishId);
    if (oldItem) {
      const hasOption = Boolean(
        oldItem.options?.find((aOption) => aOption.name === optionName)
      );
      if (!hasOption) {
        removeFromOrder(dishId);
        setOrderItems((current) => [
          { dishId, options: [{ name: optionName }, ...oldItem.options!] },
          ...current,
        ]);
      }
    }
  };

  const removeOptionFromItem = (dishId: number, optionName: string) => {
    if (!isSelected(dishId)) {
      return;
    }

    const oldItem = getItem(dishId);
    if (oldItem) {
      removeFromOrder(dishId);
      setOrderItems((current) => [
        {
          dishId,
          options: oldItem.options?.filter(
            (option) => option.name !== optionName
          ),
        },
        ...current,
      ]);
    }
  };

  const getOptionFromItem = (
    item: CreateOrderItemInput,
    optionName: string
  ) => {
    return item.options?.find((option) => option.name === optionName);
  };

  const isOptionSelected = (dishId: number, optionName: string) => {
    const item = getItem(dishId);
    if (item) {
      return Boolean(getOptionFromItem(item, optionName));
    }
    return false;
  };

  const onClickCancelOrder = () => {
    setOrderStarted(false);
    setOrderItems([]);
  };

  const onClickConfirmOrder = () => {
    if (orderItems.length === 0) {
      alert("Can't place empty order");
      return;
    }
    const ok = confirm("You are about to place an order");
    if (ok) {
      console.log("should trigger mutation");
      createOrder({
        variables: {
          input: {
            restaurantId,
            items: orderItems,
          },
        },
      });
    }
  };

  console.log("loading", loading);
  console.log("data", data);

  console.log("orderItems", orderItems);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title={"Restaurant | Nuber Eats"}>
      <div
        className="bg-gray-700 py-48 bg-center bg-cover"
        // style={{backgroundImage: `url(${data?.restaurant.result?.coverImg})`}}
      >
        <div className="bg-white w-4/12 py-8 pl-20">
          <h4 className="text-4xl mb-3">{data?.restaurant.result?.name}</h4>
          <h5 className="text-sm font-light mb-2">
            {data?.restaurant.result?.category?.name}
          </h5>
          <h6 className="text-sm font-light">
            {data?.restaurant.result?.address}
          </h6>
        </div>
      </div>

      <div className="container flex flex-col items-end mt-20">
        {!orderStarted && (
          <Button onClick={onClickStartOrder}>Start Order</Button>
        )}
        {orderStarted && (
          <div className="flex items-center">
            <Button onClick={onClickConfirmOrder}>Confirm Order</Button>
            <div className="ml-2">
              <Button onClick={onClickCancelOrder}>Cancel Order</Button>
            </div>
          </div>
        )}
        <div className="w-full grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
          {data?.restaurant.result?.menu.map(
            ({ id, name, description, price, options }) => (
              <Dish
                key={id}
                id={id}
                isSelected={isSelected(id)}
                orderStarted={orderStarted}
                name={name}
                description={description}
                price={price}
                isCustomer={true}
                options={options}
                addItemToOrder={addItemToOrder}
                removeFromOrder={removeFromOrder}
                // addOptionToItem={addOptionToItem}
              >
                {options?.map((option, index) => (
                  <DishOption
                    key={index}
                    dishId={id}
                    isSelected={isOptionSelected(id, option.name)}
                    name={option.name}
                    extra={option.extra}
                    addOptionToItem={addOptionToItem}
                    removeOptionFromItem={removeOptionFromItem}
                  />
                ))}
              </Dish>
            )
          )}
        </div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Restaurant);

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   console.log("ctx", ctx);

//   const { id } = ctx.query;
//   if (!id) {
//     return {
//       props: {},
//     };
//   }

//   return {
//     props: { id: parseInt(id as string) },
//   };
// };
// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   console.log("ctx", ctx);

//   const { id } = ctx.query;
//   if (!id) {
//     return {
//       props: {},
//     };
//   }

//   return {
//     props: { id: parseInt(id as string) },
//   };
// };
