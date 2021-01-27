import { useRouter } from "next/router";
import React from "react";
import Layout from "../components/Layout";

interface IProps {}

const search: React.FC<IProps> = ({}) => {
  const router = useRouter();
  console.log("search?query:", router.query);
  console.log("search?query=searchTerm:", router.query.searchTerm);

  return <Layout title="Search | Nuber Eats">Search</Layout>;
};

export default search;
