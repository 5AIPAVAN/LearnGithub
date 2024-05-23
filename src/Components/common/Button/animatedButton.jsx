import React from "react";
import Spinner from "../Spinner";
import { AnimatedButtonWrapper } from "./ButtonStyles";

const AnimatedButton = ({
  children,
  onClick,
  disabled,
  isLoading,
  onkeyDown,
  style,
}) => {
  return (
    <AnimatedButtonWrapper
      onClick={onClick}
      onKeyDown={onkeyDown}
      disabled={isLoading}
      style={style}
      role="button"
    >
      {isLoading ? <Spinner /> : children}
    </AnimatedButtonWrapper>
  );
};

export default AnimatedButton;
