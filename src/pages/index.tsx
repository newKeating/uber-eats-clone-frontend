import { Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import withApollo from "../apollo/withApollo";
import Layout from "../components/Layout";
import Restaurant from "../components/Restaurant";
import RestaurantCategory from "../components/RestaurantCategory";
import { useRestaurantsPageQuery } from "../generated/graphql";
import NextLink from "next/link";

interface IProps {}

interface ISearchFormProps {
  searchTerm: string;
}

const Index: React.FC<IProps> = () => {
  // const isLoggedIn = useReactiveVar(isLoggedInVar);
  // const onClickLogin = () => {
  //   isLoggedInVar(true);
  // };
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { data, loading } = useRestaurantsPageQuery({
    variables: {
      input: {
        page,
      },
    },
  });
  console.log("Restaurants-data", data);
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);

  const { register, handleSubmit, getValues } = useForm<ISearchFormProps>();
  const onSearchSubmit = () => {
    const { searchTerm } = getValues();

    router.push(
      {
        pathname: "/search",
        query: {
          searchTerm,
        },
      }
      // "search"
    );
  };

  return (
    <Layout title="Home | Nuber Eats">
      <div>
        <form
          onSubmit={handleSubmit(onSearchSubmit)}
          className="bg-gray-800 w-full py-40 flex justify-center items-center"
        >
          <div className="w-1/2 md:w-1/3">
            <Input
              ref={register({ required: true, min: 3 })}
              style={{ backgroundColor: "white" }}
              name="searchTerm"
              type="search"
              placeholder="Search restaurants..."
              colorScheme="green"
            />
          </div>
        </form>
      </div>
      <div className="max-w-screen-2xl mx-auto mt-8">
        <div className="flex justify-around max-w-sm mx-auto">
          {data?.allCategories.categories?.map((category) => {
            return (
              <NextLink key={category.id} href={`category/${category.slug}`}>
                <div>
                  <RestaurantCategory name={category.name} />
                </div>
              </NextLink>
            );
          })}
        </div>
        <div className="mt-10 mb-20 grid md:grid-cols-3 gap-x-5 gap-y-10">
          {data?.restaurants.results?.map((restaurant) => (
            <Restaurant
              key={restaurant.id}
              name={restaurant.name}
              categoryName={restaurant.category?.name}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 text-center max-w-md mx-auto items-center mt-10">
          {page > 1 && (
            <button
              onClick={onPrevPageClick}
              className="focus:outline-none font-medium text-2xl"
            >
              &larr;
            </button>
          )}
          <span className="mx-5">
            Page {page} of {data?.restaurants.totalPages}
          </span>
          {page !== data?.restaurants.totalPages && (
            <button
              onClick={onNextPageClick}
              className="focus:outline-none font-medium text-2xl"
            >
              &rarr;
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default withApollo()(Index);
