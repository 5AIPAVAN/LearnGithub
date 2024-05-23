import styled from "styled-components";
import { FlexFullWidth } from "../../styles/CommonStyles";

export const MobileActionBar = styled(FlexFullWidth)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;

  .value.active {
    background-color: #133680;
    color: #ffff;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
  }
`;
