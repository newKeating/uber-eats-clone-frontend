import React, { Component } from "react";
import { UserRole } from "../generated/graphql";

interface IProps {}

interface IState {}

export interface InnerHOCFunction {
  (WrapperComponent: React.Component): React.Component<IProps, IState>;
}

export interface OuterFunction {
  (options: OuterFunctionOptions): InnerHOCFunction;
}

export interface OuterFunctionOptions {
  role: UserRole;
}

const withAuth: OuterFunction = (options) => {
  return (WrappedComponent) => {
    class WithAuth extends Component<IProps, IState> {
      constructor(props) {
        super(props);
      }

      render() {
        // let variables;
        // if (getVariables) {
        //   variables = getVariables(this.props);
        // }

        // const {  } = options;

        return <WrappedComponent {...this.props} />;
      }
    }
    return WithAuth;
  };
};

export default withAuth;
