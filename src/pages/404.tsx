import React from "react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

interface IProps {}

const Custom404: React.FC<IProps> = ({}) => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <h1 className="font-semibold text-xl mb-3">Page Not Found</h1>
        <h4 className="font-medium text-base mb-5">
          The page you are looking for does not exist or has moved.
        </h4>
        <NextLink href="/">
          <Link fontWeight="bold" color="green.600">
            Go back home &rarr;
          </Link>
        </NextLink>
      </div>
    </div>
  );
};

export default Custom404;
