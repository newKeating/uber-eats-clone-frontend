import { useRouter } from "next/router";
import React from "react";
import { useMeQuery, UserRole } from "../generated/graphql";

interface IProps {}

// interface IState {}

export interface OuterFunctionOptions {
  role?: UserRole;
}

interface InnerFunction {
  (WrappedComponent: React.FC<IProps>): React.FC<IProps>;
}

export interface OuterFunction {
  (options?: OuterFunctionOptions): InnerFunction;
}

const withAuth: OuterFunction = (options) => (WrappedComponent) => {
  const WithAuth: React.FC<IProps> = (props) => {
    const router = useRouter();
    const { data, loading } = useMeQuery();

    if (!loading && !data) {
      alert("You need to login");
      router.replace("/login");
    } else if (data) {
      if (options?.role) {
        const { role } = data.me;
        if (role !== options.role) {
          alert("You are not allowed!");
          router.replace("/");
        }
      }

      return <WrappedComponent {...props} />;
    }

    return <div>loading</div>;
  };

  return WithAuth;
};

export default withAuth;
