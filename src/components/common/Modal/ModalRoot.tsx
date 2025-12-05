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
import { ModalContext } from "./context/useModalContext";
import ModalBackdrop from "./ModalBackdrop";
import useModalContextState from "./hooks/useModalContextState";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  animation?: ModalAnimationType;
  ariaLabel?: string;
  customStyles?: ModalCustomStyleType;
}

const ModalRoot = ({
  isOpen,
  setIsOpen,
  children,
  animation = "none",
  ariaLabel = "모달",
  customStyles = {},
}: Props) => {
  const modalContentRef = useRef<HTMLDivElement | null>(null);

  const { animationClasses, shouldRender } = useModalAnimation({
    animation,
    isOpen,
  });

  const { backdropStyle, modalStyle } = useModalStyle({
    animationClasses,
    customStyles,
  });

  useModalControl({
    setIsOpen,
    modalRef: modalContentRef,
    isOpen: shouldRender,
  });

  const contextValue = useModalContextState({
    isOpen,
    setIsOpen,
    ariaLabel,
    backdropStyle,
    modalStyle,
    modalContentRef,
  });

  if (!shouldRender) return null;

  return createPortal(
    <ModalContext.Provider value={contextValue}>
      <ModalBackdrop>{children}</ModalBackdrop>
    </ModalContext.Provider>,
    getPortalRoot()
  );
};

export default ModalRoot;
