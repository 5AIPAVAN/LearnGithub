import closeIcon from "../../../assets/closeIcon.png";
import {
  ModalHeader,
  ModalWrapper,
  ModalContent,
  ModalImageWrapper,
  Title4,
  Overlay,
} from "./style";

const SecondaryModal = ({
  handleClose,
  isVisible,
  children,
  title = "",
  showCloseIcon,
  width,
  imgWidth,
  imgHeight,
  className = "",
}) => {
  return (
    <>
      <Overlay onClick={handleClose}></Overlay>
      <ModalWrapper
        isVisible={isVisible}
        onClick={!showCloseIcon ? handleClose : () => {}}
      >
        <ModalContent width={width} className={className}>
          <ModalHeader>
            <Title4>{title}</Title4>
            {showCloseIcon && (
              <ModalImageWrapper onClick={handleClose}>
                <img
                  width={imgWidth}
                  height={imgHeight}
                  src={closeIcon}
                  alt="modalCloseicon"
                />
              </ModalImageWrapper>
            )}
          </ModalHeader>
          {children}
        </ModalContent>
      </ModalWrapper>
    </>
  );
};
export default SecondaryModal;
