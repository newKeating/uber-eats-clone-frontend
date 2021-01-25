import React from "react";
import withApollo from "../apollo/withApollo";
import { useIsAuth } from "../hooks/useIsAuth";
import { useRestaurantsQuery } from "../generated/graphql";

interface IProps {}

const Restaurants: React.FC<IProps> = ({}) => {
  const { data, loading } = useRestaurantsQuery({
    variables: {
      input: { page: 1 },
    },
  });
  console.log("Restaurants-data", data);
  console.log("Restaurants-loading", loading);

  return (
    <div>
      Restaurants
      {loading ? (
        <div>Loading...</div>
      ) : (
        data?.restaurants.results.map((restaurant) => (
          <div key={restaurant.id}>{restaurant.name}</div>
        ))
      )}
    </div>
  );
};

export default withApollo({ ssr: true })(Restaurants);
