import type { OptionGroupType } from "../types/select.type";

export const mergeGroupedOptions = (
  options: OptionGroupType[]
): OptionGroupType[] => {
  const mergedMap = new Map();
  options.forEach((currentGroup) => {
    const key = currentGroup.group;
    if (mergedMap.has(key)) {
      const existingGroup = mergedMap.get(key);
      existingGroup.items.push(...currentGroup.items);
      if (currentGroup.disabled) existingGroup.disabled = true;
    } else {
      mergedMap.set(key, {
        ...currentGroup,
        items: [...currentGroup.items],
      });
    }
  });
  return Array.from(mergedMap.values());
};
