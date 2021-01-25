import React from "react";
import withApollo from "../../apollo/withApollo";
import { useIsAuth } from "../../hooks/useIsAuth";

interface IProps {}

const Index: React.FC<IProps> = ({}) => {
  useIsAuth();

  return <div>Client Route</div>;
};

export default withApollo()(Index);
