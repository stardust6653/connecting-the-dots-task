import type { OptionType } from "../../../types/select.type";
import { useScrollOnHighlight } from "./hooks/useScrollOnHighlight";

interface Props {
  index: number;
  highlightedIndex: number;
  option: OptionType;
  handleOptionClick: (value: OptionType) => void;
  selectedOption: string;
  isDisabled: boolean;
}

const SelectOptionItem = ({
  index,
  highlightedIndex,
  option,
  handleOptionClick,
  selectedOption,
  isDisabled,
}: Props) => {
  const optionRef = useScrollOnHighlight(index, highlightedIndex);
  const isSelected = option.value === selectedOption;

  // 1. 베이스
  const optionItemStyle =
    "px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm truncate";

  // 2. 강조 및 비활성화
  const highlightedStyle = "bg-blue-100 font-semibold";

  // 3. 비활성화
  const disabledStyle = isDisabled
    ? "text-gray-400 cursor-not-allowed hover:bg-white"
    : "";

  const getOptionClass = () => {
    const isHighlighted = index === highlightedIndex;
    return `${optionItemStyle} ${
      isHighlighted ? highlightedStyle : ""
    } ${disabledStyle} ${isSelected && !isHighlighted ? "bg-gray-50" : ""}`;
  };

  const handleItemClick = () => {
    if (!isDisabled) {
      handleOptionClick(option);
    }
  };

  return (
    <li
      key={option.value}
      className={getOptionClass()}
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
