import styled, { keyframes } from "styled-components";
import { zoomIn } from "react-animations";
const inMobileAnimation = keyframes`${zoomIn}`;

export const ModalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  top: 0px;
  left: 0;
  z-index: 9999;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const ModalTitle = styled.div`
  font-size: 20px;
  color: #3c3c3c;
  font-weight: 500;
`;

export const ModalImageWrapper = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  border: 0;
  cursor: pointer;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

export const ModalContent = styled.div`
  animation: 0.5s ${inMobileAnimation};
  overflow-y: scroll;
  background: ${(props) => (props.bgColor ? props.bgColor : `#fff`)};
  width: ${(props) => props.width || "392px"};
  min-width: 392px;
  min-height: ${(props) => props.minHeight || "220px"};
  max-height: 80%;
  /* height: auto; */
  top: 50%;
  left: 50%;
  padding: ${(props) => (props.isNonPadding ? "" : "32px")};
  border-radius: 0.5rem;
`;

export const CloseButton = styled.button``;

export const Title4 = styled.h4`
  font-weight: 700;
  font-size: ${(props) => (props.isResponsive ? "15px" : "20px")};
  color: #0f1623;
  margin-top: ${(props) => (props.marginTop ? props.marginTop + "px" : 0)};
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom + "px" : 0};
`;

export const Overlay = styled.div`
  height: 100vh;
  overflow-y: hidden;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  opacity: 0.5;
  background-color: #0f1623;
  z-index: 9998;
`;
