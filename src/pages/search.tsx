import { useRouter } from "next/router";
import React from "react";
import Layout from "../components/Layout";
import { useEffect } from "react";
import { useSearchRestaurantLazyQuery } from "../generated/graphql";
import withApollo from "../apollo/withApollo";
import { GetServerSideProps, GetStaticProps } from "next";
import { getStaticProps } from "./restaurant/[id]";

interface IProps {
  searchTerm?: string;
}

const search: React.FC<IProps> = ({ searchTerm }) => {
  const router = useRouter();

  const [searchRestaurant, { loading, data }] = useSearchRestaurantLazyQuery();
  console.log("loading", loading);
  console.log("data", data);

  useEffect(() => {
    if (!searchTerm) {
      router.replace("/");
    } else {
      searchRestaurant({
        variables: {
          input: {
            page: 1,
            query: searchTerm as string,
          },
        },
      });
    }
  }, [router.query]);

  return <Layout title="Search | Nuber Eats">Search</Layout>;
};

export default withApollo()(search);

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { searchTerm } = query;
  if (!searchTerm) {
    return {
      props: {},
    };
  }

  return {
    props: { searchTerm },
  };
};
