import { useQuery, useReactiveVar } from "@apollo/client";
import Link from "next/link";
import Layout from "../components/Layout";
import { isLoggedInVar } from "../apollo/apolloClient";
import LoginForm from "../components/LoginForm";

const IndexPage = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const onClickLogin = () => {
    isLoggedInVar(true);
  };
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>
      <button onClick={onClickLogin}>change loggedin value</button>

      <LoginForm></LoginForm>
    </Layout>
  );
};

export default IndexPage;
