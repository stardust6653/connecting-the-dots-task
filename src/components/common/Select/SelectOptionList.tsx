import { type Dispatch, type SetStateAction } from "react";
import type { ListAriaDataType } from "./hooks/useGetAriaData";
import type {
  ListGroupStyleType,
  OptionGroupType,
  SelectOptionItemStyleType,
  SelectOptionListStyleType,
} from "../../../types/select.type";
import { mergeGroupedOptions } from "../../../utils/select";
import SelectOptionGroup from "./SelectOptionGroup";
import useKeyboardControl from "./hooks/useKeyboardControl";

interface SelectOptionProps {
  options: OptionGroupType[];
  setSelectedOption: Dispatch<SetStateAction<string>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedOption: string;
  getListProps: ListAriaDataType;
  optionListStyle: SelectOptionListStyleType;
  optionItemStyle: SelectOptionItemStyleType;
  listGroupStyle: ListGroupStyleType;
}

const SelectOptionList = ({
  options,
  setSelectedOption,
  setOpen,
  getListProps,
  selectedOption,
  optionListStyle,
  optionItemStyle,
  listGroupStyle,
}: SelectOptionProps) => {
  const {
    highlightedIndex,
    listRef,
    handleKeyDown,
    handleOptionClick,
    highlightedId,
    flatIndexMap,
  } = useKeyboardControl({ options, setSelectedOption, setOpen });

  const mergedGroupOptions = mergeGroupedOptions(options);

  return (
    <ul
      ref={listRef}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      className={optionListStyle.BASE_STYLE}
      role="listbox"
      id={getListProps.listboxId}
      aria-labelledby={getListProps.ariaLabelledby}
      aria-activedescendant={highlightedId || undefined}
    >
      <SelectOptionGroup
        listGroupStyle={listGroupStyle}
        flatIndexMap={flatIndexMap}
        highlightedIndex={highlightedIndex}
        handleOptionClick={handleOptionClick}
        selectedOption={selectedOption}
        optionItemStyle={optionItemStyle}
        mergedGroupOptions={mergedGroupOptions}
      />
    </ul>
  );
};

export default SelectOptionList;
