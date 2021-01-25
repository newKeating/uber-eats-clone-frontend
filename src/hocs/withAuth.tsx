import { useRouter } from "next/router";
import React, { Component } from "react";
import { useMeQuery, UserRole } from "../generated/graphql";

interface IProps {}

interface IState {}

// export interface InnerHOCFunction {
//   (WrapperComponent: React.Component): React.Component<IProps, IState>;
// }

export interface OuterFunctionOptions {
  role: UserRole;
}

// interface InnerFunction {
//   (WrappedComponent:React.Component<IProps, IState>): React.Component<IProps, IState>
// }

export interface OuterFunction {
  (options: OuterFunctionOptions): React.Component<IProps, IState>;
}

const withAuth: OuterFunction = (options) => (WrappedComponent) => {
  console.log("withAuth-options", options);

  const WithAuth = (props) => {
    const router = useRouter();
    const { data, loading } = useMeQuery();
    // if (loading) {
    //   return <div>Loading...</div>;
    // }
    if (!loading && !data) {
      alert("You need to login");
      router.replace("/login");
    }
    if (data && data.me) {
      const { role } = data.me;
      if (role !== options.role) {
        alert("You are not allowed!");
        router.replace("/");
      }
    }
    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default withAuth;
