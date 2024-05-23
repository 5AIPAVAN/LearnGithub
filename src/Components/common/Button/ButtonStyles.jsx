import styled, { keyframes } from "styled-components";

export const ButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => (props.disabled ? "#e4eaef" : "#0f1623")};
  border-radius: 12px;
  color: #f8faff;
  font-weight: 700;
  font-size: 14px;
  font-family: var(--font);
  border: none !important;
  width: 100%;
  min-width: 148px;
  height: 48px;
  padding: 14px 40px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.disabled ? "#e4eaef" : "#2a3241")};
  }
  .spinner-border {
    width: 24px;
    height: 24px;
  }
`;

export const SecondaryButtonWrapper = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--white);
  border-radius: 12px;
  color: ${(props) =>
    props.color ? props.color : "var(--eerie-black-primary)"};
  font-weight: 700;
  font-size: 14px;
  font-family: var(--font);
  border: 1px solid
    ${(props) =>
      props.borderColor ? props.borderColor : "var(--bright-gray-divider)"};
  width: ${(props) => (props.width ? props.width : "100%")};
  height: 48px;
  padding: 12px 32px;
  &:hover {
    background: #f1f4f6 !important;
  }
  .spinner-border {
    width: 24px;
    height: 24px;
  }
`;

export const ErrorButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--white);
  border-radius: 12px;
  color: var(--fire-opal-error);
  font-weight: 700;
  font-size: 14px;
  font-family: var(--font);
  border: 1px solid var(--fire-opal-error);
  width: 100%;
  height: 48px;
  padding: 12px 32px;
  &:hover {
    background: #f1f4f6 !important;
  }
  .spinner-border {
    width: 24px;
    height: 24px;
  }
`;

export const TernaryButtonWrapper = styled.p`
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 500)};
  font-size: ${(props) => (props.fontSize ? props.fontSize + "px" : "14px")};
  text-align: center;
  text-decoration-line: ${(props) =>
    props.textDecorationLine ? "underline" : "none"};
  color: #0f1623;
  cursor: pointer;
`;

const shine = keyframes`
    0% {left: -100px}
    20% {left: 100%}
    100% {left: 100%}
`;

export const AnimatedButtonWrapper = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => (props.disabled ? "#e4eaef" : "#0f1623")};
  border-radius: 12px;
  color: #f8faff;
  font-weight: 700;
  font-size: 14px;
  font-family: var(--font);
  border: none !important;
  width: 100%;
  min-width: 148px;
  height: 48px;
  padding: 14px 40px;
  cursor: pointer;
  overflow: hidden;
  &:hover {
    background-color: #2a3241;
  }
  .spinner-border {
    width: 24px;
    height: 24px;
  }
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0) 30%,
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0) 70%
    );
    /* top: 0; */
    left: -100px;
    animation: ${shine} 3s infinite linear;
  }
`;
