interface Props {
  children: React.ReactNode;
}

const ModalContents = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default ModalContents;
