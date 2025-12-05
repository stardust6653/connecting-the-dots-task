interface Props {
  children: React.ReactNode;
  scrollable?: boolean;
  height?: number | "auto";
}

const ModalBody = ({ children, scrollable, height = "auto" }: Props) => {
  const heightValue = height === "auto" ? "auto" : `${height}px`;
  const scrollableValue = scrollable ? "overflow-auto" : "";

  return (
    <div
      className={`mb-4 w-full ${scrollableValue} `}
      style={{ height: heightValue }}
    >
      {children}
    </div>
  );
};

export default ModalBody;
