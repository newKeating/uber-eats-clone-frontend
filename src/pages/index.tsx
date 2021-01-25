import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo/globalState";
import withApollo from "../apollo/withApollo";
import Layout from "../components/Layout";
import { useMeQuery } from "../generated/graphql";
import withAuth from "../hocs/withAuth";
import compose from "../utils/compose";

const Index = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const onClickLogin = () => {
    isLoggedInVar(true);
  };
  const { data: meQueryData, loading } = useMeQuery();
  console.log("Index loading", loading);
  console.log("Index meQuery", meQueryData);
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>

      {loading ? <div>Loading...</div> : <div>{meQueryData?.me.email}</div>}
    </Layout>
  );
};

// export default compose(withApollo(), withAuth({ role: "Client" }))(Index);
// export default withApollo()(withAuth({ role: "Admin" })(Index));
export default withApollo()(Index);

// export async function getStaticProps() {
//   const apolloClient = initializeApollo();

//   await apolloClient.query({
//     query: gql`
//       query me {
//         me {
//           id
//           email
//           role
//           verified
//         }
//       }
//     `,
//   });

//   return {
//     props: apolloClient.cache.extract(),
//   };
// }
