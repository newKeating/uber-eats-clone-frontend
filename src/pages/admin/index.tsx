import React from "react";
import withApollo from "../../apollo/withApollo";
import compose from "../../utils/compose";
import withAuth from "../../hocs/withAuth";

interface IProps {}

const Index: React.FC<IProps> = ({}) => {
  return <div>Admin</div>;
};

export default compose(withApollo(), withAuth({ role: "Admin" }))(Index);
