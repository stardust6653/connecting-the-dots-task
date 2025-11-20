import type { LabelAriaDataType } from "./hooks/useGetAriaData";

interface Props {
  isFloating: boolean;
  label: string;
  open: boolean;
  getLabelProps: LabelAriaDataType;
  disabled?: boolean;
}

const SelectLabel = ({
  isFloating,
  label,
  open,
  getLabelProps,
  disabled = false,
}: Props) => {
  const bgColor = disabled ? "bg-gray-100" : "bg-white";

  // 1. 기본 베이스
  const baseStyle = `absolute left-4 px-1 ${bgColor} transition-all duration-200 pointer-events-none z-10 truncate block max-w-[calc(100%-32px)]`;

  // 2. 위치 결정
  const positionStyle = isFloating
    ? "-top-2 text-xs"
    : "top-1/2 -translate-y-1/2";

  // 3. 색상 결정
  const colorStyle = isFloating && open ? "text-blue-600" : "text-gray-500";

  return (
    <label
      id={getLabelProps.labelId}
      className={`${baseStyle} ${positionStyle} ${colorStyle}`}
    >
      {label}
    </label>
  );
};
export default SelectLabel;
