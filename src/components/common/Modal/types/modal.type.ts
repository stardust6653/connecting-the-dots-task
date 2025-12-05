export interface ModalContextValue {
  isOpen: boolean;
  close: () => void;
  ariaLabel?: string;
  backdropStyle?: string;
  modalStyle?: string;
  modalContentRef: React.RefObject<HTMLDivElement | null>;
}
