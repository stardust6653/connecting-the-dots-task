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

    requestAnimationFrame(() => modalElement.focus());

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const focusableElements = modalElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>;

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

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

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        event.stopPropagation();
      } else if (event.key === "Tab") handleTabKey(event);
    };

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      prevFocus?.focus();
    };
  }, [setIsOpen, modalRef, isOpen]);
};

export default useModalControl;
