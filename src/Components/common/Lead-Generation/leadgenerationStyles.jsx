import styled, { keyframes } from "styled-components";

export const FormGrp = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  input[type="text"] {
    ::placeholder {
      /* Recent browsers */
      text-transform: none;
    }
  }
  @media (max-width: 620px) {
    width: 100%;
  }
`;

const borderRotate = keyframes`
 50% {
    background-position: 100% 50%;
  }
`;
export const AnimatedBox = styled.div`
  --border-width: 3px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--font);
  color: white;
  border-radius: var(--border-width);

  &::after {
    position: absolute;
    content: "";
    top: calc(-1 * var(--border-width));
    left: calc(-1 * var(--border-width));
    z-index: -1;
    width: calc(100% + var(--border-width) * 2);
    height: calc(100% + var(--border-width) * 2);
    background: linear-gradient(60deg, #747d8c, #57606f, #a29bfe, #00b894);
    background-size: 300% 300%;
    background-position: 0 50%;
    border-radius: calc(2 * var(--border-width));
    animation: ${borderRotate} 4s alternate infinite;
  }
`;

export const InnerDiv = styled.div`
  background-color: white;
  width: 100%;
  /* height: 100%; */
  padding: 30px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const FormTitle = styled.h2`
  font-weight: 700;
  font-size: ${(props) => (props.isResponsive ? "15px" : "18px")};
  color: #0f1623;
  font-family: var(--font);
  margin-top: ${(props) => (props.marginTop ? props.marginTop + "px" : 0)};
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom + "px" : 0};
  text-transform: uppercase;
`;

export const FormSubTitle = styled.h2`
  font-size: ${(props) => (props.isResponsive ? "9px" : "14px")};
  color: #0f1623;
  font-family: var(--font);
  margin-top: ${(props) => (props.marginTop ? props.marginTop + "px" : 0)};
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom + "px" : 0};
  font-weight: 400;
  line-height: 20px;
  color: #6a768a;
`;

export const Title6 = styled.h6`
  font-weight: 500;
  font-size: 14px;
  color: #0f1623;
  margin: 0 0 8px 0;
`;
