import { Overlay } from "../Modal/style";
import React from "react";
import Sheet from "react-modal-sheet";
import SecondaryModal from "../Modal/SecondaryModal";

const RenderModalOrBottomSheet = ({
  children,
  isVisible,
  onClose,
  modalWidth,
  className = "",
}) => {
  if (isVisible) {
    if (typeof window != "undefined" && window?.WURFL?.is_mobile) {
      return (
        <Sheet
          isOpen={isVisible}
          onClose={() => onClose(false)}
          detent="content-height"
        >
          <Sheet.Container>
            <Sheet.Header />
            <Sheet.Content>{children}</Sheet.Content>
          </Sheet.Container>
          <Sheet.Backdrop onTap={() => onClose(false)} />
        </Sheet>
      );
    } else {
      return (
        <>
          <Overlay
            onClick={() => {
              onClose(false);
            }}
          ></Overlay>
          <SecondaryModal
            isVisible={isVisible}
            width={modalWidth ? modalWidth : "450px"}
            showCloseIcon
            imgHeight={15}
            imgWidth={15}
            handleClose={() => onClose(false)}
            className={className}
          >
            {children}
          </SecondaryModal>
        </>
      );
    }
  } else {
    return <></>;
  }
};

export default RenderModalOrBottomSheet;
