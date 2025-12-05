import useModalContext, { ModalContext } from "./context/useModalContext";

interface Props {
  title: string;
  showClosedButton?: boolean;
}

const ModalTitle = ({ title, showClosedButton }: Props) => {
  const { close } = useModalContext(ModalContext);

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold">{title}</h2>
      {showClosedButton && (
        <button className="cursor-pointer" onClick={close}>
          X
        </button>
      )}
    </div>
  );
};

export default ModalTitle;
