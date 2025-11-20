import type { Dispatch, SetStateAction } from "react";
import type { ButtonAriaDataType } from "./hooks/useGetAriaData";

interface Props {
  open: boolean;
  selectedOption: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  disabled?: boolean;
  getButtonProps: ButtonAriaDataType;
}

const SelectButton = ({
  open,
  selectedOption,
  setOpen,
  disabled = false,
  getButtonProps,
}: Props) => {
  const handleButtonClick = () => {
    if (!disabled) setOpen(!open);
  };

  // 1. 기본 베이스
  const baseStyle =
    "w-full border rounded px-4 py-3 text-left bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300";

  // 2. 활성 상태
  const activeStyle = open ? "border-blue-500 ring-1 ring-blue-500" : "";

  // 3. 상호작용/비활성화 상태
  const interactionStyle = disabled
    ? "text-gray-400 cursor-not-allowed"
    : "cursor-pointer";

  return (
    <button
      type="button"
      className={`${baseStyle} ${activeStyle} ${interactionStyle}`}
      onClick={handleButtonClick}
      disabled={disabled}
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-controls={open ? getButtonProps.ariaControls : undefined}
      aria-labelledby={getButtonProps.ariaLabelledby}
      aria-label={selectedOption}
    >
      <span className="block truncate">
        {selectedOption || <span className="invisible">&nbsp;</span>}
      </span>
    </button>
  );
};

export default SelectButton;
