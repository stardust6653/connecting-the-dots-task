import { type Dispatch, type SetStateAction, Fragment } from "react";
import useKeyboardControl from "./hooks/useKeyboardControll";
import SelectOptionItem from "./SelectOptionItem";
import type { ListAriaDataType } from "./hooks/useGetAriaData";
import type { OptionGroupType } from "../../../types/select.type";
import GroupHeader from "./GroupHeader";
import { mergeGroupedOptions } from "../../../utils/select";

interface SelectOptionProps {
  options: OptionGroupType[];
  setSelectedOption: Dispatch<SetStateAction<string>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedOption: string;
  getListProps: ListAriaDataType;
}

const SelectOptionList = ({
  options,
  setSelectedOption,
  setOpen,
  getListProps,
  selectedOption,
}: SelectOptionProps) => {
  const {
    highlightedIndex,
    listRef,
    handleKeyDown,
    handleOptionClick,
    highlightedId,
    flatIndexMap,
  } = useKeyboardControl({ options, setSelectedOption, setOpen });

  // 스타일 정의
  const listContainerStyle =
    "absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto";

  const mergedGroupOptions = mergeGroupedOptions(options);

  return (
    <ul
      ref={listRef}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      className={listContainerStyle}
      role="listbox"
      id={getListProps.listboxId}
      aria-labelledby={getListProps.ariaLabelledby}
      aria-activedescendant={highlightedId || undefined}
    >
      {mergedGroupOptions.map((group) => {
        const groupDisabled = group.disabled || false;
        return (
          <Fragment key={group.group}>
            <GroupHeader group={group} groupDisabled={groupDisabled} />
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
