interface Props {
  animationClasses: string;
  customStyles?: {
    backdrop?: string;
    modalContent?: string;
  };
}

const useModalStyle = ({ animationClasses, customStyles }: Props) => {
  const BackdropStyle =
    customStyles?.backdrop ??
    "bg-black/20 w-full h-full fixed top-0 left-0 flex items-center justify-center transition-opacity ";

  const ModalStyle =
    (customStyles?.modalContent
      ? customStyles.modalContent
      : " bg-white p-6 rounded-lg shadow-2xl max-w-sm w-full transition-all outline-none ") +
    " " +
    animationClasses;

  return { BackdropStyle, ModalStyle };
};

export default useModalStyle;
