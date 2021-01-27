import React from "react";
import Image from "next/image";
import { useMeQuery } from "../generated/graphql";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import withApollo from "../apollo/withApollo";

interface IProps {}

const Header: React.FC<IProps> = ({}) => {
  const { data, loading } = useMeQuery();
  return (
    <>
      {!data?.me.verified && (
        <div className="bg-red-500 p-3 text-center text-sm text-white font-bold">
          <span>Please verify your email</span>
        </div>
      )}
      <header className="py-4">
        <div className="w-full px-5 xl:px-0 max-w-screen-xl bg-yellow-500 mx-auto">
          <Image
            src="/pineapple.png"
            alt="pineapple-logo"
            width="64"
            height="64"
          />
          {data ? (
            <NextLink href="edit-profile">
              <Link>
                <span className="text-sm">
                  <FontAwesomeIcon className="text-xl" icon={faUser} />
                  {data?.me.email}
                </span>
              </Link>
            </NextLink>
          ) : (
            <div>Login</div>
          )}
        </div>
      </header>
    </>
  );
};

export default withApollo()(Header);
