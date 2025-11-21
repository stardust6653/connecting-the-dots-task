import { type Dispatch, type SetStateAction, Fragment } from "react";
import useKeyboardControl from "./hooks/useKeyboardControll";
import SelectOptionItem from "./SelectOptionItem";
import type { ListAriaDataType } from "./hooks/useGetAriaData";
import type {
  ListGroupStyleType,
  OptionGroupType,
  SelectOptionItemStyleType,
  SelectOptionListStyleType,
} from "../../../types/select.type";
import GroupHeader from "./GroupHeader";
import { mergeGroupedOptions } from "../../../utils/select";

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
      {mergedGroupOptions.map((group) => {
        const groupDisabled = group.disabled || false;
        return (
          <Fragment key={group.group}>
            <GroupHeader
              group={group}
              groupDisabled={groupDisabled}
              listGroupStyle={listGroupStyle}
            />
            {group.items.map((item) => {
              const linearIndex = flatIndexMap.get(item.value) ?? -1;
              const itemIsDisabled = item.disabled || groupDisabled;

              return (
                <SelectOptionItem
                  key={item.value}
                  index={linearIndex}
                  option={item}
                  highlightedIndex={highlightedIndex}
                  isDisabled={itemIsDisabled}
                  handleOptionClick={() => handleOptionClick(item)}
                  selectedOption={selectedOption}
                  optionItemStyle={optionItemStyle}
                />
              );
            })}
          </Fragment>
        );
      })}
    </ul>
  );
};

export default SelectOptionList;
