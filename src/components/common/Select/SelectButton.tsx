import type { Dispatch, SetStateAction } from "react";
import type { ButtonAriaDataType } from "./hooks/useGetAriaData";
import type { SelectButtonStyleType } from "../../../types/select.type";

interface Props {
  open: boolean;
  selectedOption: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  disabled?: boolean;
  getButtonProps: ButtonAriaDataType;
  buttonStyle: SelectButtonStyleType;
}

const SelectButton = ({
  open,
  selectedOption,
  setOpen,
  disabled = false,
  getButtonProps,
  buttonStyle,
}: Props) => {
  const handleButtonClick = () => {
    if (!disabled) setOpen(!open);
  };

  const accessibleName = `${getButtonProps.ariaLabelledby}: ${
    selectedOption || "선택 안됨"
  }`;

  return (
    <button
      type="button"
      className={`${buttonStyle.BASE_STYLE} ${buttonStyle.ACTIVE_STYLE} ${buttonStyle.INTERACTION_STYLE}`}
      onClick={handleButtonClick}
      disabled={disabled}
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-controls={open ? getButtonProps.ariaControls : undefined}
      aria-label={accessibleName}
    >
      <span className="block truncate">
        {selectedOption || <span className="invisible">&nbsp;</span>}
      </span>
    </button>
  );
};

export default SelectButton;
