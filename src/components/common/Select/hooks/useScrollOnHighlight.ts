import { type RefCallback } from "react";

export const useScrollOnHighlight = (
  index: number,
  highlightedIndex: number
): RefCallback<HTMLLIElement> => {
  return (el) => {
    if (index === highlightedIndex && el)
      el.scrollIntoView({ block: "nearest" });
  };
};
