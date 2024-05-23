import styled from "styled-components";
import { Flex, FlexCol } from "./CommonStyles";

export const DoctorPic = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  @media screen and (max-width: 471px) {
    width: 100px;
    min-width: 100px;
    height: 100px;
    max-height: 100px;
  }
`;

export const DoctorBriefDetails = styled(FlexCol)`
  font-size: 18px;
  gap: 5px;
  text-align: right;
  p {
    margin: 0;
  }
  h1 {
    font-size: 18px;
    margin: 0;
  }
  @media screen and (max-width: 471px) {
    font-size: 14px;
    h1 {
      font-size: 14px;
    }
    .icon {
      font-size: 14px;
    }
  }
`;

export const DoctorMission = styled.h1`
  font-size: 16px;
  font-weight: 400;
  color: #00000099;
  text-align: justify;
`;

export const DetailsCardWrapper = styled(Flex)`
  align-items: center;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.03) 3px 4px 4px 0px;
  border: 1px solid rgb(241, 241, 241);
  padding: 10px;
  gap: 20px;
  font-size: 14px;
  p,
  h3 {
    margin: 0;
    font-size: 14px;
  }
  .hospital {
    font-weight: 600;
  }
`;
