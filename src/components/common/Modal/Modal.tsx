import {
  useRef,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { createPortal } from "react-dom";
import { getPortalRoot } from "../../../utils/modal";
import useModalControl from "./hooks/useModalControl";
import useModalAnimation from "./hooks/useModalAnimation";
import useModalStyle from "./hooks/useModalStyle";
import type {
  ModalAnimationType,
  ModalCustomStyleType,
} from "../../../types/modal.type";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  animation?: ModalAnimationType;
  ariaLabel?: string;
  customStyles?: ModalCustomStyleType;
}

const Modal = ({
  isOpen,
  setIsOpen,
  children,
  animation = "none",
  ariaLabel = "모달",
  customStyles = {},
}: Props) => {
  const modalContentRef = useRef<HTMLDivElement>(null);

  const { animationClasses, shouldRender } = useModalAnimation({
    animation,
    isOpen,
  });

  const { BackdropStyle, ModalStyle } = useModalStyle({
    animationClasses,
    customStyles,
  });

  useModalControl({
    setIsOpen,
    modalRef: modalContentRef,
    isOpen: shouldRender,
  });

  if (!shouldRender) return null;

  return createPortal(
    <div
      className={BackdropStyle}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      onClick={() => setIsOpen(false)}
    >
      <div
        className={ModalStyle}
        onClick={(e) => e.stopPropagation()}
        ref={modalContentRef}
        tabIndex={-1}
      >
        {children}
      </div>
    </div>,
    getPortalRoot()
  );
};

export default Modal;
