import { ApolloClient } from "@apollo/client";
import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useEffect } from "react";
import withApollo from "../../apollo/withApollo";
import Layout from "../../components/Layout";
import Restaurant from "../../components/Restaurant";
import {
  MyRestaurantsDocument,
  MyRestaurantsQuery,
  useMyRestaurantsQuery,
} from "../../generated/graphql";

interface IProps {
  // client: ApolloClient<any>;
}

const MyRestaurants: React.FC<IProps> = ({}) => {
  const { data, loading } = useMyRestaurantsQuery();
  console.log("loading", loading);
  console.log("data", data);

  return (
    <Layout title="My Restaurants | Nuber Eats">
      <div className="max-w-screen-2xl mx-auto mt-32">
        <h2 className="text-4xl font-medium mb-10">My Restaurants</h2>
        <div>
          <NextLink href="/owner/add-restaurant">
            <Link>Add Restaurant &rarr;</Link>
          </NextLink>
        </div>
        {data?.myRestaurants.ok && data.myRestaurants.restaurants.length > 0 && (
          <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
            {data?.myRestaurants.restaurants.map((restaurant) => (
              <Restaurant
                key={restaurant.id}
                restaurantId={restaurant.id}
                coverImg={restaurant.coverImg}
                name={restaurant.name}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default withApollo()(MyRestaurants);
