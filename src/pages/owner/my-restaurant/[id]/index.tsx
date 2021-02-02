import React from "react";
import Layout from "../../../../components/Layout";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import withApollo from "../../../../apollo/withApollo";
import { useMyRestaurantQuery } from "../../../../generated/graphql";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import Dish from "../../../../components/Dish";

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

        <div className="mt-10">
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
