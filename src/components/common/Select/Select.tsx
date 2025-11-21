import { useState, type Dispatch, type SetStateAction } from "react";
import SelectLabel from "./SelectLabel";
import SelectButton from "./SelectButton";
import SelectOptionList from "./SelectOptionList";
import useGetAriaData from "./hooks/useGetAriaData";
import type {
  OptionGroupType,
  SelectCustomStyleType,
} from "../../../types/select.type";
import { useSelectStyles } from "./hooks/useSelectStyle";

interface Props {
  label: string;
  options: OptionGroupType[];
  disabled?: boolean;
  customStyles?: SelectCustomStyleType;
  selectedOption: string;
  setSelectedOption: Dispatch<SetStateAction<string>>;
}

const Select = ({
  label,
  options,
  disabled = false,
  customStyles = {},
  selectedOption,
  setSelectedOption,
}: Props) => {
  const [open, setOpen] = useState(false);

  const isFloating = selectedOption !== "" || open;

  const { getButtonProps, getLabelProps, getListProps } = useGetAriaData({
    open,
    selectedOption,
    disabled,
    highlightedId: "",
  });

  const {
    wrapperStyle,
    labelStyle,
    buttonStyle,
    optionListStyle,
    optionItemStyle,
    listGroupStyle,
  } = useSelectStyles({ open, disabled, isFloating, customStyles });

  return (
    <div className={wrapperStyle.BASE_STYLE}>
      <SelectLabel
        label={label}
        getLabelProps={getLabelProps(label)}
        labelStyle={labelStyle}
      />

      <SelectButton
        open={open}
        selectedOption={selectedOption}
        disabled={disabled}
        setOpen={setOpen}
        getButtonProps={getButtonProps()}
        buttonStyle={buttonStyle}
      />

      {open && (
        <SelectOptionList
          options={options}
          selectedOption={selectedOption}
          setOpen={setOpen}
          setSelectedOption={setSelectedOption}
          getListProps={getListProps()}
          optionListStyle={optionListStyle}
          optionItemStyle={optionItemStyle}
          listGroupStyle={listGroupStyle}
        />
      )}
    </div>
  );
};

export default Select;
