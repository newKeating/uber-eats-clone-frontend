import React from "react";
import { GetServerSideProps } from "next";
import withApollo from "../../apollo/withApollo";
import { useCategoryQuery } from "../../generated/graphql";

interface IProps {
  slug: string;
}

const category: React.FC<IProps> = ({ slug }) => {
  console.log("slug", slug);
  const { data, loading } = useCategoryQuery({
    variables: {
      input: {
        page: 1,
        slug,
      },
    },
  });

  console.log("data", data);

  return <div>Category</div>;
};

export default withApollo()(category);

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug } = query;
  if (!slug) {
    return {
      props: {},
    };
  }

  return {
    props: { slug },
  };
};
