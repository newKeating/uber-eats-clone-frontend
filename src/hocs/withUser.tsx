import React from "react";
import { useMeQuery, User } from "../generated/graphql";

interface IProps {
  user: User;
}

// interface IState {}

// export interface OuterFunctionOptions {
// }

interface InnerFunction {
  (WrappedComponent: React.FC<IProps>): React.FC<IProps>;
}

export interface OuterFunction {
  (): InnerFunction;
}

const withAuth: OuterFunction = () => (WrappedComponent) => {
  const WithAuth: React.FC<IProps> = (props) => {
    const { data } = useMeQuery();

    if (data && data.me) {
      return <WrappedComponent {...props} user={data.me as User} />;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default withAuth;
