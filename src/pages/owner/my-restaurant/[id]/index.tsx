import { Link } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLine,
  VictoryPie,
  VictoryVoronoiContainer,
} from "victory";
import withApollo from "../../../../apollo/withApollo";
import Dish from "../../../../components/Dish";
import Layout from "../../../../components/Layout";
import {
  useMyRestaurantQuery,
  usePendingOrdersSubscription,
} from "../../../../generated/graphql";
import { useEffect } from "react";

interface IProps {}

const MyRestaurant: React.FC<IProps> = ({}) => {
  const router = useRouter();
  const restaurantId = router?.query?.id
    ? parseInt(router.query.id as string)
    : 0;
  const { data, loading } = useMyRestaurantQuery({
    variables: {
      input: {
        id: restaurantId,
      },
    },
  });
  console.log("params", router.query);
  console.log("loading", loading);
  console.log("data", data);

  const chartData = [
    { x: 1, y: 3000 },
    { x: 2, y: 1500 },
    { x: 3, y: 4250 },
    { x: 4, y: 2300 },
    { x: 5, y: 7150 },
    { x: 6, y: 6830 },
    { x: 7, y: 2560 },
  ];

  const { data: subscrptionData } = usePendingOrdersSubscription();
  useEffect(() => {
    if (subscrptionData?.pendingOrders.id) {
      router.push(`/order/${subscrptionData.pendingOrders.id}`);
    }
  }, [subscrptionData]);

  return (
    <Layout title="My Restaurant | Nuber Eats">
      <div className="checkout-container"></div>
      <div
        className="  bg-gray-700  py-28 bg-center bg-cover"
        style={
          {
            // backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImg})`,
          }
        }
      ></div>

      <div className="container mt-10">
        <h2 className="text-4xl font-medium mb-10">
          {data?.myRestaurant.restaurant?.name || "Loading..."}
        </h2>
        <NextLink href={`/owner/my-restaurant/${restaurantId}/add-dish`}>
          <Link>Add Dish &rarr;</Link>
        </NextLink>
        <span
          onClick={() => null}
          className=" cursor-pointer text-white bg-lime-700 py-3 px-10"
        >
          Buy Promotion &rarr;
        </span>

        <div className="mt-10 mb-10">
          {data?.myRestaurant.restaurant?.menu.length === 0 ? (
            <h4 className="text-xl mb-5">Please upload a dish</h4>
          ) : (
            <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
              {data?.myRestaurant.restaurant?.menu.map(
                ({ id, name, description, price }) => (
                  <Dish
                    key={id}
                    name={name}
                    description={description}
                    price={price}
                  />
                )
              )}
            </div>
          )}
        </div>
        <div className="mt-20">
          <h4 className="text-center text-2xl font-medium">Sales</h4>
          <div className="mt-10">
            <VictoryChart
              height={500}
              width={1000}
              domainPadding={50}
              containerComponent={<VictoryVoronoiContainer />}
            >
              <VictoryLine
                style={{
                  data: {
                    strokeWidth: 5,
                  },
                }}
                data={data?.myRestaurant.restaurant?.orders.map((order) => ({
                  x: order.createdAt,
                  y: order.total,
                }))}
              />
              <VictoryAxis
                tickFormat={(tick) => new Date(tick).toLocaleDateString("ko")}
              />
              <VictoryAxis
                style={{ tickLabels: { fontSize: 20 } }}
                dependentAxis
                tickFormat={(tick) => `$${tick}`}
              />
            </VictoryChart>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="max-w-lg w-full mx-auto">
              <VictoryChart domainPadding={20}>
                <VictoryAxis
                  dependentAxis
                  tickFormat={(step) => `$${step / 1000}K`}
                />
                <VictoryAxis
                  // label="Days"
                  tickFormat={(step) => `Day ${step}`}
                />
                <VictoryBar data={chartData} />
              </VictoryChart>
            </div>
            <div className="max-w-lg w-full mx-auto">
              <VictoryPie data={chartData} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withApollo()(MyRestaurant);

export const getServerSideProps: GetServerSideProps = async ({}) => {
  return {
    props: {},
  };
};
