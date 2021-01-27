import React from "react";
import {
  useVerifyEmailMutation,
  VerifyEmailMutation,
} from "../generated/graphql";
import withApollo from "../apollo/withApollo";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ApolloClient, gql } from "@apollo/client";
import { useMeQuery } from "../generated/graphql";
import compose from "../utils/compose";
import withAuth from "../hocs/withAuth";

interface IProps {
  client: ApolloClient<any>;
}

const ConfirmEmail: React.FC<IProps> = ({ client }) => {
  const router = useRouter();
  const { data: userData } = useMeQuery();

  const onCompleted = (data: VerifyEmailMutation) => {
    const {
      verifyEmail: { ok, error },
    } = data;
    if (!ok && error) {
      alert(error);
      router.push("/");
    }
    if (ok && userData?.me) {
      client.writeFragment({
        id: `User:${userData?.me.id}`,
        fragment: gql`
          fragment VerifiedUser on User {
            verified
          }
        `,
        data: {
          verified: true,
        },
      });
      router.push("/");
    }
  };

  const [verifyEmail] = useVerifyEmailMutation({
    onCompleted,
    // update:
  });

  useEffect(() => {
    if (!router.query.code) {
      router.push("/");
    } else {
      verifyEmail({
        variables: {
          input: {
            code: router.query.code as string,
          },
        },
      });
    }
  }, []);

  return (
    <Layout title="Confirm Email | Nuber Eats">
      <div className="mt-52 flex flex-col items-center justify-center">
        <h1 className="text-lg mb-1 font-medium">Confirming email...</h1>
        <h4 className="text-gray-700 text-sm">
          Please wait, don't close this page
        </h4>
      </div>
    </Layout>
  );
};

export default compose(withApollo(), withAuth())(ConfirmEmail);
