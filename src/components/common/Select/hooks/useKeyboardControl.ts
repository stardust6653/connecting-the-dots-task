import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type {
  OptionGroupType,
  OptionType,
} from "../../../../types/select.type";

interface Props {
  options: OptionGroupType[];
  setSelectedOption: Dispatch<SetStateAction<string>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const useKeyboardControl = ({ options, setSelectedOption, setOpen }: Props) => {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);

  const highlightedId =
    highlightedIndex !== -1 ? `option-${highlightedIndex}` : undefined;

  useEffect(() => listRef.current?.focus(), []);

  const flatOptions: OptionType[] = options.flatMap((group) => {
    const groupDisabled = group.disabled || false;
    return group.items.map((item) => ({
      ...item,
      disabled: item.disabled || groupDisabled,
      label: item.value,
    }));
  });

  const flatIndexMap = useMemo(() => {
    return flatOptions.reduce((map, item, index) => {
      map.set(item.value, index);
      return map;
    }, new Map<string, number>());
  }, [flatOptions]);

  const listLength = flatOptions.length;

  const getNextActiveIndex = (prev: number, direction: 1 | -1): number => {
    let nextIndex = prev;
    let attempts = 0;
    do {
      if (direction === 1) nextIndex = (nextIndex + 1) % listLength;
      else nextIndex = (nextIndex - 1 + listLength) % listLength;
      attempts++;
      if (attempts > listLength) return prev;
    } while (flatOptions[nextIndex].disabled);

    return nextIndex;
  };

  const handleOptionClick = (option: OptionType) => {
    setSelectedOption(option.value);
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (listLength === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => getNextActiveIndex(prev, 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => getNextActiveIndex(prev, -1));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex !== -1) {
          const currentOption = flatOptions[highlightedIndex];
          if (!currentOption.disabled) handleOptionClick(currentOption);
        }
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
    }
  };

  return {
    highlightedIndex,
    listRef,
    handleKeyDown,
    handleOptionClick,
    highlightedId,
    flatOptions,
    flatIndexMap,
  };
};

export default useKeyboardControl;
