import { useState } from "react";
import SelectLabel from "./SelectLabel";
import SelectButton from "./SelectButton";
import SelectOptionList from "./SelectOptionList";
import useGetAriaData from "./hooks/useGetAriaData";
import type { OptionGroupType } from "../../../types/select.type";

interface Props {
  label: string;
  options: OptionGroupType[];
  disabled?: boolean;
}

const Select = ({ label, options, disabled = false }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const isFloating = selectedOption !== "" || open;

  const { getButtonProps, getLabelProps, getListProps } = useGetAriaData({
    open,
    selectedOption,
    disabled,
    highlightedId: "",
  });

  // 래퍼 스타일
  const wrapperStyle = "relative w-full min-w-[200px] max-w-xs";

  return (
    <div className={wrapperStyle}>
      <SelectLabel
        open={open}
        isFloating={isFloating}
        disabled={disabled}
        label={label}
        getLabelProps={getLabelProps(label)}
      />

      <SelectButton
        open={open}
        selectedOption={selectedOption}
        disabled={disabled}
        setOpen={setOpen}
        getButtonProps={getButtonProps()}
      />

      {open && (
        <SelectOptionList
          options={options}
          selectedOption={selectedOption}
          setOpen={setOpen}
          setSelectedOption={setSelectedOption}
          getListProps={getListProps()}
        />
      )}
    </div>
  );
};

export default Select;
