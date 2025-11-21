import type {
  ListGroupStyleType,
  OptionGroupType,
  OptionType,
  SelectOptionItemStyleType,
} from "../../../types/select.type";
import GroupHeader from "./GroupHeader";
import SelectOptionItem from "./SelectOptionItem";

interface Props {
  listGroupStyle: ListGroupStyleType;
  flatIndexMap: Map<string, number>;
  highlightedIndex: number;
  handleOptionClick: (option: OptionType) => void;
  selectedOption: string;
  optionItemStyle: SelectOptionItemStyleType;
  mergedGroupOptions: OptionGroupType[];
}

const SelectOptionGroup = ({
  listGroupStyle,
  flatIndexMap,
  highlightedIndex,
  handleOptionClick,
  selectedOption,
  optionItemStyle,
  mergedGroupOptions,
}: Props) => {
  return (
    <>
      {mergedGroupOptions.map((group) => {
        const groupDisabled = group.disabled || false;
        return (
          <>
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
          </>
        );
      })}
    </>
  );
};

export default SelectOptionGroup;
