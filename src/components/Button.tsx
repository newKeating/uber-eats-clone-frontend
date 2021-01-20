import React from "react";
import { Button as _Button, ButtonProps } from "@chakra-ui/react";

interface IProps extends ButtonProps {}

const Button: React.FC<IProps> = (props) => {
  return (
    <_Button
      bgColor="gray.700"
      textColor="white"
      _hover={{ opacity: "90%" }}
      _active={{ bg: "gray.600" }}
      {...props}
    ></_Button>
  );
};

export default Button;
