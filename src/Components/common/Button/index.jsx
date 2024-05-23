import React from "react";
import Spinner from "../Spinner";
import { ButtonWrapper } from "./ButtonStyles";

const Button = ({ children, onClick, disabled, isLoading, style }) => {
  return (
    <ButtonWrapper
      onClick={onClick}
      disabled={disabled || isLoading}
      style={style}
      role="button"
    >
      {isLoading ? <Spinner /> : children}
    </ButtonWrapper>
  );
};

export default Button;
