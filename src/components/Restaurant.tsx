import React from "react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

interface IProps {
  name: string;
  categoryName?: string;
  restaurantId: number;
}

const Restaurant: React.FC<IProps> = ({ name, categoryName, restaurantId }) => {
  return (
    <NextLink href="/restaurant/[id]" as={`/restaurant/${restaurantId}`}>
      <Link>
        <div>
          <div
            // style={{backgroundImage: `url(${restaurant.coverImg})`}}
            className="bg-red-500 py-28 mb-3 bg-cover bg-center"
          ></div>
          <h3 className="text-xl mb-2">{name}</h3>
          <span className="border-t mt-3 py-1 text-xs opacity-50 border-gray-400">
            {categoryName}
          </span>
        </div>
      </Link>
    </NextLink>
  );
};

export default Restaurant;
