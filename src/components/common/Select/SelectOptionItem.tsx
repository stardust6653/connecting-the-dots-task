import type {
  OptionType,
  SelectOptionItemStyleType,
} from "../../../types/select.type";
import { useScrollOnHighlight } from "./hooks/useScrollOnHighlight";

interface Props {
  index: number;
  highlightedIndex: number;
  option: OptionType;
  handleOptionClick: (value: OptionType) => void;
  selectedOption: string;
  isDisabled: boolean;
  optionItemStyle: SelectOptionItemStyleType;
}

const getOptionClass = (
  index: number,
  highlightedIndex: number,
  isDisabled: boolean,
  isSelected: boolean,
  optionItemStyle: SelectOptionItemStyleType
) => {
  const isHighlighted = index === highlightedIndex;
  return `${optionItemStyle.BASE_STYLE} ${
    isHighlighted ? optionItemStyle.HIGHLIGHTED_STYLE : ""
  } ${isDisabled ? optionItemStyle.DISABLED_STYLE : ""} ${
    isSelected && !isHighlighted ? "bg-gray-50" : ""
  }`;
};

const SelectOptionItem = ({
  index,
  highlightedIndex,
  option,
  handleOptionClick,
  selectedOption,
  isDisabled,
  optionItemStyle,
}: Props) => {
  const optionRef = useScrollOnHighlight(index, highlightedIndex);
  const isSelected = option.value === selectedOption;

  const handleItemClick = () => {
    if (!isDisabled) handleOptionClick(option);
  };

  return (
    <li
      key={option.value}
      className={getOptionClass(
        index,
        highlightedIndex,
        isDisabled,
        isSelected,
        optionItemStyle
      )}
      onClick={handleItemClick}
      ref={optionRef}
      role="option"
      id={`option-${index}`}
      aria-selected={isSelected}
      aria-disabled={isDisabled}
    >
      {option.value}
    </li>
  );
};

export default SelectOptionItem;
