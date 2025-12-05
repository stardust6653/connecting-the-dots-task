import useModalContext, { ModalContext } from "./context/useModalContext";

interface Props {
  children: React.ReactNode;
}

const ModalContainer = ({ children }: Props) => {
  const { modalStyle, modalContentRef } = useModalContext(ModalContext);

  return (
    <div
      className={modalStyle}
      onClick={(e) => e.stopPropagation()}
      ref={modalContentRef}
      tabIndex={-1}
    >
      {children}
    </div>
  );
};

export default ModalContainer;
