import {
  useEffect,
  type Dispatch,
  type SetStateAction,
  type RefObject,
} from "react";

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  modalRef: RefObject<HTMLDivElement | null>;
  isOpen: boolean;
}

const useModalControl = ({ setIsOpen, modalRef, isOpen }: Props) => {
  useEffect(() => {
    if (!isOpen) return;

    const modalElement = modalRef.current;
    if (!modalElement) return;

    const prevFocus = document.activeElement as HTMLElement;
    const animationFrameId = requestAnimationFrame(() => {
      modalElement.focus();
    });

    const focusableElements = modalElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        event.stopPropagation();
      } else if (event.key === "Tab")
        if (focusableElements.length === 0) {
          event.preventDefault();
          return;
        }

      if (event.shiftKey) {
        if (
          document.activeElement === firstElement ||
          document.activeElement === modalElement
        ) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeydown);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("keydown", handleKeydown);
      prevFocus?.focus();
    };
  }, [setIsOpen, modalRef, isOpen]);
};

export default useModalControl;
