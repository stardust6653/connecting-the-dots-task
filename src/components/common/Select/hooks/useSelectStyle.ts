import { useMemo } from "react";
import type { SelectCustomStyleType } from "../../../../types/select.type";

interface Props {
  open: boolean;
  disabled: boolean;
  isFloating: boolean;
  customStyles: SelectCustomStyleType;
}

export const useSelectStyles = ({
  open,
  disabled,
  isFloating,
  customStyles,
}: Props) => {
  const styles = useMemo(() => {
    // 색상 토큰
    const COLOR_PRIMARY_FOCUS = "blue-500"; // 포커스/활성 색상
    const COLOR_TEXT_DEFAULT = "text-black"; // 기본 텍스트 색상
    const COLOR_TEXT_WCAG = "text-gray-700"; // WCAG AA 대비 통과용 레이블 텍스트
    const COLOR_TEXT_DISABLED = "text-gray-500"; // 비활성화 텍스트 색상
    const COLOR_BG_DISABLED = "bg-gray-100"; // 비활성화 배경색
    const COLOR_HIGHLIGHT = "bg-blue-100"; // 하이라이트 배경색

    // 레이아웃/효과 토큰
    const BORDER_DEFAULT = "border-gray-800";
    const BORDER_DISABLED = "border-gray-400";
    const RING_ACTIVE = "ring-2";
    const SHADOW_ACTIVE = "shadow-md";
    const LABEL_OFFSET_PX = "32px"; // calc(100%-32px) 사용

    // 상태 의존 변수 계산
    const LABEL_BG_COLOR = disabled ? COLOR_BG_DISABLED : "bg-white";
    const INTERACTION_CURSOR = disabled
      ? "cursor-not-allowed"
      : "cursor-pointer";

    const {
      wrapperStyle: overrideWrapper,
      labelStyle: overrideLabel,
      buttonStyle: overrideButton,
      optionListStyle: overrideOptionList,
      optionItemStyle: overrideOptionItem,
    } = customStyles || {};

    const finalWrapperStyle = {
      BASE_STYLE: overrideWrapper?.BASE_STYLE
        ? overrideWrapper.BASE_STYLE
        : "relative w-full min-w-[200px] max-w-xs",
    };

    const calculatedLabelStyle = {
      BASE_STYLE: `absolute left-4 px-1 ${LABEL_BG_COLOR} transition-all duration-200 pointer-events-none z-10 truncate block max-w-[calc(100%-${LABEL_OFFSET_PX})]`,
      POSITION_STYLE: isFloating
        ? "-top-2 text-xs"
        : "top-1/2 -translate-y-1/2",
      COLOR_STYLE:
        isFloating && open ? `text-${COLOR_PRIMARY_FOCUS}` : COLOR_TEXT_WCAG,
    };
    const finalLabelStyle = { ...calculatedLabelStyle, ...overrideLabel };

    const calculatedButtonStyle = {
      BASE_STYLE: `w-full border rounded px-4 py-3 text-left bg-white focus:outline-none focus:${RING_ACTIVE} focus:ring-${COLOR_PRIMARY_FOCUS} ${BORDER_DEFAULT} ${INTERACTION_CURSOR}`,
      ACTIVE_STYLE: open
        ? `border-${COLOR_PRIMARY_FOCUS} ${RING_ACTIVE} ring-${COLOR_PRIMARY_FOCUS} ${SHADOW_ACTIVE}`
        : "",
      INTERACTION_STYLE: disabled
        ? `${COLOR_TEXT_DISABLED} ${BORDER_DISABLED} ${COLOR_BG_DISABLED}`
        : COLOR_TEXT_DEFAULT,
    };
    const finalButtonStyle = { ...calculatedButtonStyle, ...overrideButton };

    const finalOptionListStyle = overrideOptionList?.BASE_STYLE
      ? { BASE_STYLE: overrideOptionList?.BASE_STYLE }
      : {
          BASE_STYLE:
            "absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto",
        };

    const calculatedOptionItemStyle = {
      BASE_STYLE: "px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm truncate",
      HIGHLIGHTED_STYLE: `${COLOR_HIGHLIGHT} font-semibold`,
      DISABLED_STYLE: `${COLOR_TEXT_DISABLED} cursor-not-allowed hover:bg-white`,
    };
    const finalOptionItemStyle = {
      ...calculatedOptionItemStyle,
      ...overrideOptionItem,
    };

    return {
      wrapperStyle: finalWrapperStyle,
      labelStyle: finalLabelStyle,
      buttonStyle: finalButtonStyle,
      optionListStyle: finalOptionListStyle,
      optionItemStyle: finalOptionItemStyle,
    };
  }, [open, disabled, isFloating, customStyles]);

  return styles;
};
