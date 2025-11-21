import type { SelectLabelStyleType } from "../../../types/select.type";
import type { LabelAriaDataType } from "./hooks/useGetAriaData";

interface Props {
  label: string;
  getLabelProps: LabelAriaDataType;
  labelStyle: SelectLabelStyleType;
}

const SelectLabel = ({ label, getLabelProps, labelStyle }: Props) => {
  return (
    <label
      id={getLabelProps.labelId}
      className={`${labelStyle.BASE_STYLE} ${labelStyle.POSITION_STYLE} ${labelStyle.COLOR_STYLE}`}
    >
      {label}
    </label>
  );
};
export default SelectLabel;
