import styled from "styled-components";
import { Flex } from "./CommonStyles";

export const SpecificVideoWrapper = styled(Flex)`
  padding: 24px;
  gap: 20px;
  .videoDetails {
    width: 70%;
  }
  .leadFormWrapper {
    width: 30%;
    .leadForm {
      position: sticky !important;
      top: 20px;
      right: 0;
      width: 100%;
    }
  }
  @media screen and (max-width: 800px) {
    flex-direction: column;
    .videoDetails {
      width: 100%;
    }
    .leadFormWrapper {
      width: 100%;
      display: none;
    }
  }
`;

export const BookAppointmentFixedbar = styled(Flex)`
  position: fixed;
  bottom: 55px;
  padding: 15px;
  background: #000;
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  color: white;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 472px) {
    display: none;
  }
`;
