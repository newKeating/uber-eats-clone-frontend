import React from "react";
import { useRouter } from "next/router";
import withApollo from "../../apollo/withApollo";
import { GetServerSideProps } from "next";
import {
  OrderStatus,
  useGetOrderQuery,
  useMeQuery,
  UserRole,
} from "../../generated/graphql";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import {
  // useOrderUpdatesSubscription,
  OrderUpdatesDocument,
  OrderUpdatesSubscription,
} from "../../generated/graphql";
import { useEffect } from "react";

interface IProps {}

const Order: React.FC<IProps> = ({}) => {
  const router = useRouter();
  const { data: meData } = useMeQuery();
  const orderId = parseInt(router.query.id as string);

  console.log("orderId", orderId);

  const { data, loading: getOrderLoading, subscribeToMore } = useGetOrderQuery({
    variables: {
      input: {
        id: orderId,
      },
    },
  });

  // const { data: subscriptionData } = useOrderUpdatesSubscription({
  //   variables: {
  //     input: {
  //       id: orderId,
  //     },
  //   },
  // });

  useEffect(() => {
    if (data?.getOrder.ok) {
      subscribeToMore({
        document: OrderUpdatesDocument,
        variables: {
          input: {
            id: orderId,
          },
        },
        updateQuery: (
          prev,
          {
            subscriptionData: { data },
          }: { subscriptionData: { data: OrderUpdatesSubscription } }
        ) => {
          if (!data) return prev;
          return {
            getOrder: {
              ...prev.getOrder,
              order: {
                ...data.orderUpdates,
              },
            },
          };
        },
      });
    }
  }, [data]);

  console.log("getOrderLoading", getOrderLoading);
  console.log("getOrderData", data);

  // console.log("subscriptionData", subscriptionData);

  if (getOrderLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Layout title="Order | Nuber Eats">
      <div className="border border-gray-800 w-full max-w-screen-sm flex flex-col justify-center">
        <h4 className="bg-gray-800 w-full py-5 text-white text-center text-xl">
          Order #{orderId}
        </h4>
        <h5 className="p-5 pt-10 text-3xl text-center ">
          ${data?.getOrder.order?.total}
        </h5>
        <div className="p-5 text-xl grid gap-6">
          <div className="border-t pt-5 border-gray-700">
            Prepared By:{" "}
            <span className="font-medium">
              {data?.getOrder.order?.restaurant?.name}
            </span>
          </div>
          <div className="border-t pt-5 border-gray-700 ">
            Deliver To:{" "}
            <span className="font-medium">
              {data?.getOrder.order?.customer?.email}
            </span>
          </div>
          <div className="border-t border-b py-5 border-gray-700">
            Driver:{" "}
            <span className="font-medium">
              {data?.getOrder.order?.driver?.email || "Not yet."}
            </span>
          </div>
          {meData?.me.role === "Client" && (
            <span className=" text-center mt-5 mb-3  text-2xl text-lime-600">
              Status: {data?.getOrder.order?.status}
            </span>
          )}
          {meData?.me.role === UserRole.Owner && (
            <>
              {data?.getOrder.order?.status === OrderStatus.Pending && (
                <Button
                // onClick={() => onButtonClick(OrderStatus.Cooking)}
                >
                  Accept Order
                </Button>
              )}
              {data?.getOrder.order?.status === OrderStatus.Cooking && (
                <Button
                // onClick={() => onButtonClick(OrderStatus.Cooked)}
                >
                  Order Cooked
                </Button>
              )}
              {data?.getOrder.order?.status !== OrderStatus.Cooking &&
                data?.getOrder.order?.status !== OrderStatus.Pending && (
                  <span className=" text-center mt-5 mb-3  text-2xl text-lime-600">
                    Status: {data?.getOrder.order?.status}
                  </span>
                )}
            </>
          )}
          {meData?.me.role === UserRole.Delivery && (
            <>
              {data?.getOrder.order?.status === OrderStatus.Cooked && (
                <Button
                // onClick={() => onButtonClick(OrderStatus.PickedUp)}
                >
                  Picked Up
                </Button>
              )}
              {data?.getOrder.order?.status === OrderStatus.PickedUp && (
                <Button
                // onClick={() => onButtonClick(OrderStatus.Delivered)}
                >
                  Order Delivered
                </Button>
              )}
            </>
          )}
          {data?.getOrder.order?.status === OrderStatus.Delivered && (
            <span className=" text-center mt-5 mb-3  text-2xl text-lime-600">
              Thank you for using Nuber Eats
            </span>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default withApollo()(Order);

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {},
  };
};
