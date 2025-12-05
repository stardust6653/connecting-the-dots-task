import ModalContainer from "./ModalContainer";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";
import ModalTitle from "./ModalTitle";
import ModalRoot from "./ModalRoot";
import ModalSubTitle from "./ModalSubTitle";

export const Modal = Object.assign(ModalRoot, {
  Container: ModalContainer,
  Body: ModalBody,
  Footer: ModalFooter,
  Title: ModalTitle,
  SubTitle: ModalSubTitle,
});
