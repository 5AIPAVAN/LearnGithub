import React from "react";
import Spinner from "../Spinner";
import { ErrorButtonWrapper } from "./ButtonStyles";

const ErrorButton = ({ children, onClick, disabled, isLoading }) => {
  return (
    <ErrorButtonWrapper onClick={onClick} disabled={disabled}>
      {isLoading ? <Spinner /> : children}
    </ErrorButtonWrapper>
  );
};

export default ErrorButton;
