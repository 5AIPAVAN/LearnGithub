import React from "react";
import { TernaryButtonWrapper } from "./ButtonStyles";

const TernaryButton = ({
  onClick,
  label,
  fontSize,
  fontWeight,
  textDecorationLine,
}) => {
  return (
    <TernaryButtonWrapper
      onClick={onClick}
      fontSize={fontSize}
      fontWeight={fontWeight}
      textDecorationLine={textDecorationLine}
    >
      {label}
    </TernaryButtonWrapper>
  );
};

export default TernaryButton;
