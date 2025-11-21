import type {
  ListGroupStyleType,
  OptionGroupType,
} from "../../../types/select.type";

interface Props {
  group: OptionGroupType;
  groupDisabled: boolean;
  listGroupStyle: ListGroupStyleType;
}

const GroupHeader = ({ group, groupDisabled, listGroupStyle }: Props) => {
  return (
    <li
      role="presentation"
      className={listGroupStyle.BASE_STYLE}
      aria-disabled={groupDisabled}
    >
      {group.group}
    </li>
  );
};

export default GroupHeader;
