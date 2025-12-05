import {
  useMemo,
  type Dispatch,
  type SetStateAction,
  type RefObject,
} from "react";

interface Params {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  ariaLabel: string;
  backdropStyle: string;
  modalStyle: string;
  modalContentRef: RefObject<HTMLDivElement | null>;
}
const useModalContextState = (params: Params) => {
  const {
    isOpen,
    setIsOpen,
    ariaLabel,
    backdropStyle,
    modalStyle,
    modalContentRef,
  } = params;

  return useMemo(
    () => ({
      isOpen,
      close: () => setIsOpen(false),
      ariaLabel,
      backdropStyle,
      modalStyle,
      modalContentRef,
    }),
    [isOpen, setIsOpen, ariaLabel, backdropStyle, modalStyle, modalContentRef]
  );
};

export default useModalContextState;
