import type { OptionGroupType } from "../../../types/select.type";

interface Props {
  group: OptionGroupType;
  groupDisabled: boolean;
}

const GroupHeader = ({ group, groupDisabled }: Props) => {
  const groupHeaderStyle =
    "bg-gray-100 text-gray-800 py-1 px-4 cursor-default font-semibold text-xs border-b border-gray-200";

  return (
    <li
      role="presentation"
      className={groupHeaderStyle}
      aria-disabled={groupDisabled}
    >
      {group.group}
    </li>
  );
};

export default GroupHeader;
