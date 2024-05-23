import styled from "styled-components";
import { Flex, FlexCol } from "../../styles/CommonStyles";

export const H1 = styled.h1`
  font-size: 36px;
  line-height: 1.28;
  font-weight: 700;
  color: rgb(122, 9, 22);
  margin: 0;
`;

export const H2 = styled.h1`
  font-size: 36px;
  line-height: 1.28;
  font-weight: 700;
  color: rgb(0, 0, 0);
  margin: 0;
`;

export const TitleWrapper = styled(FlexCol)`
  padding: 48px;
  background-color: #ffebe3;
  gap: 36px;

  @media screen and (max-width: 471px) {
    padding: 48px 24px;
  }
`;

export const HR = styled.hr`
  width: 100%;
  margin: 0;
  color: inherit;
  border: 0;
  border-top: 1px solid #000;
`;

export const MaxWidthWrapper = styled(FlexCol)`
  max-width: 1280px;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

export const GridParent = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  .gridChild {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: rgb(255, 255, 255);
    padding: 24px;
    gap: 10px;
    cursor: pointer;
  }
  .treatmentName {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
  }

  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
    .treatmentName {
      font-size: 14px;
      font-weight: 600;
      text-align: center;
    }
    .gridChild {
      padding: 16px;
    }
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    .gridChild {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 16px;
    }
    .treatmentName {
      font-size: 14px;
      font-weight: 600;
      text-align: center;
    }
  }
`;

export const HospitalCardWrapper = styled(Flex)`
  cursor: pointer;
  img {
    width: 150px;
    height: 100%;
    border-radius: 12px 0px 0px 12px;
  }
  p,
  h6 {
    margin: 0;
  }

  .hospitalDetails {
    padding: 12px;
    justify-content: center;
  }
  hr {
    width: 100%;
    margin: 0;
    color: inherit;
    border: 0;
    border-top: 2px solid rgba(0, 0, 0, 0.1);
  }
  .clinicName {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    font-weight: 600;
  }
`;

export const HospitalGrid = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  .hospitalChildGrid {
    background-color: rgba(241, 236, 232, 0.3);
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
    .hospitalChildGrid {
      display: flex;
    }
  }
`;

export const DoctorCardWrapper = styled(Flex)`
  padding: 16px;
  img {
    width: 118px;
    height: 118px;
    min-width: 118px;
    min-height: 118px;
    object-fit: cover;
    border-radius: 50%;
  }
  p,
  h6 {
    margin: 0;
  }
  .doctorName {
    font-weight: 600;
  }
  .specialization {
    font-size: 14px;
  }
  .clinicName {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    font-weight: 600;
    font-size: 14px;
  }
`;

export const DoctorGrid = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  .doctorChildGrid {
    background-color: rgba(241, 236, 232, 0.3);
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    gap: 20px;
    align-items: center;
    cursor: pointer;
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
    .doctorChildGrid {
      display: flex;
    }
  }
`;

export const TreatmentWrapper = styled.div`
  padding: 16px;
  p,
  h6 {
    margin: 0;
  }
  .treatmentName {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    font-weight: 600;
  }
  .treatmentPrice {
    font-size: 18px;
    font-weight: 600;
  }
`;

export const TreatmentGrid = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  .treatmentChildGrid {
    background-color: rgba(241, 236, 232, 0.3);
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    gap: 20px;
    align-items: center;
    cursor: pointer;
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    .treatmentChildGrid {
      display: flex;
    }
  }
`;
