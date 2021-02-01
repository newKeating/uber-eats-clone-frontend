import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import withApollo from "../../apollo/withApollo";
import Layout from "../../components/Layout";
import { useRestaurantQuery } from "../../generated/graphql";

interface IProps {
  id: number;
}

const Restaurant: NextPage<IProps> = ({}) => {
  // console.log("id", id);
  const router = useRouter();
  console.log("query", router.query);

  const { data, loading } = useRestaurantQuery({
    variables: {
      input: {
        restaurantId: parseInt(router.query.id as string),
      },
    },
  });

  console.log("loading", loading);
  console.log("data", data);
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
