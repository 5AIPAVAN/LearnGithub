import React from "react";
import { SpinnerWrapper } from "./SpinnerStyles";

const Spinner = () => {
  return (
    <SpinnerWrapper role="status">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </SpinnerWrapper>
  );
};

export default Spinner;
