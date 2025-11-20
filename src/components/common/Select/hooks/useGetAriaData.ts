import { useId } from "react";

interface SelectProps {
  open: boolean;
  selectedOption: string;
  disabled?: boolean;
  highlightedId: string;
}

export interface ButtonAriaDataType {
  disabled?: boolean;
  open: boolean;
  selectedOption: string;
  ariaControls?: string;
  ariaLabelledby: string;
}

export interface LabelAriaDataType {
  label: string;
  labelId: string;
  isFloating: boolean;
  open: boolean;
}

export interface ListAriaDataType {
  listboxId: string;
  highlightedId: string;
  ariaLabelledby: string;
}

const useGetAriaData = ({
  open,
  selectedOption,
  disabled,
  highlightedId,
}: SelectProps) => {
  const listboxId = useId();
  const labelId = useId();

  const listboxIdString = listboxId;
  const labelIdString = labelId;

  const ariaControls = open ? listboxIdString : undefined;

  // SelectButton에 필요한 Props
  const getButtonProps = (): ButtonAriaDataType => ({
    disabled,
    open,
    selectedOption,
    ariaControls,
    ariaLabelledby: labelIdString,
  });

  // SelectLabel에 필요한 Props
  const getLabelProps = (label: string): LabelAriaDataType => ({
    label,
    labelId: labelIdString,
    isFloating: selectedOption !== "" || open,
    open,
  });

  // SelectOptionList에 필요한 Props
  const getListProps = (): ListAriaDataType => ({
    listboxId: listboxIdString,
    highlightedId: highlightedId,
    ariaLabelledby: labelIdString,
  });

  return {
    getButtonProps,
    getLabelProps,
    getListProps,
  };
};

export default useGetAriaData;
