interface Props {
  children: React.ReactNode;
}

const ModalFooter = ({ children }: Props) => {
  return <div className="w-full">{children}</div>;
};

export default ModalFooter;
