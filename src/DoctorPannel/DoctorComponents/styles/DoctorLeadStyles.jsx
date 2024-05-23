import styled from "styled-components";
import { FlexCol } from "../../../styles/CommonStyles";

export const AnalyticsWrapper = styled(FlexCol)`
  align-items: center;
  background: linear-gradient(
      135deg,
      rgba(97, 243, 243, 0.2),
      rgba(0, 184, 217, 0.2)
    )
    rgb(255, 255, 255);
  padding-top: 40px;
  padding-bottom: 40px;
  border-radius: 16px;
  text-align: center;
  color: rgb(0, 75, 80);
  width: 300px;
  height: 213px;
  .stats {
    font-size: 1.625rem;
    font-weight: 700;
    line-height: 1.5;
  }
  .title {
    margin: 0px;
    font-weight: 600;
    line-height: 1.57143;
    font-size: 0.875rem;
    opacity: 0.64;
  }
  @media screen and (max-width: 471px) {
    width: 90%;
  }
`;
