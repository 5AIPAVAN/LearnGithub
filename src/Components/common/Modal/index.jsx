import Image from "next/image";
import closeIcon from "../../../assets/closeIcon.png";
import {
  ModalHeader,
  ModalTitle,
  ModalWrapper,
  ModalContent,
  ModalImageWrapper,
  Title4,
} from "./style";

const Modal = ({
  handleClose,
  isVisible,
  children,
  title,
  showCloseIcon,
  width,
  imgWidth,
  imgHeight,
  onlyIconClose,
  isNonPadding,
  bgColor = "",
  style,
}) => {
  return (
    <ModalWrapper
      isVisible={isVisible}
      onClick={!onlyIconClose ? handleClose : () => null}
    >
      <ModalContent
        width={width}
        isNonPadding={isNonPadding}
        bgColor={bgColor}
        style={style}
      >
        <ModalHeader>
          <Title4>{title}</Title4>
          {showCloseIcon && (
            <ModalImageWrapper onClick={handleClose}>
              <Image
                src={closeIcon}
                alt="modalCloseicon"
                width={imgWidth}
                height={imgHeight}
              />
            </ModalImageWrapper>
          )}
        </ModalHeader>
        {children}
      </ModalContent>
    </ModalWrapper>
  );
};
export default Modal;
