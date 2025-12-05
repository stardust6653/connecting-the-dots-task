import type { ModalCustomStyleType } from "../../../../types/modal.type";

interface Props {
  animationClasses: string;
  customStyles?: ModalCustomStyleType;
}

const useModalStyle = ({ animationClasses, customStyles }: Props) => {
  const backdropStyle =
    customStyles?.backdrop ??
    "bg-black/20 w-full h-full fixed top-0 left-0 flex items-center justify-center transition-opacity ";

  const modalStyle =
    (customStyles?.modalContent
      ? customStyles.modalContent
      : " bg-white p-6 rounded-lg shadow-2xl max-w-sm w-full transition-all outline-none ") +
    " " +
    animationClasses;

  return { backdropStyle, modalStyle };
};

export default useModalStyle;
