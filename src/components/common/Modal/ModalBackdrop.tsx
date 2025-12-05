import type { ReactNode } from "react";
import useModalContext, { ModalContext } from "./context/useModalContext";

interface Props {
  children: ReactNode;
}

const ModalBackdrop = ({ children }: Props) => {
  const { close, ariaLabel, backdropStyle } = useModalContext(ModalContext);

  return (
    <div
      className={backdropStyle}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      onClick={close}
    >
      {children}
    </div>
  );
};

export default ModalBackdrop;
