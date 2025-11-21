export interface OptionType {
  value: string;
  disabled?: boolean;
}

export interface OptionGroupType {
  group: string | "none";
  disabled?: boolean;
  items: OptionType[];
}

export interface SelectCustomStyleType {
  wrapperStyle?: SelectWrapperStyleType;
  labelStyle?: SelectLabelStyleType;
  buttonStyle?: SelectButtonStyleType;
  optionListStyle?: SelectOptionListStyleType;
  optionItemStyle?: SelectOptionItemStyleType;
  listGroupStyle?: ListGroupStyleType;
}

export interface SelectWrapperStyleType {
  BASE_STYLE: string;
}

export interface ListGroupStyleType {
  BASE_STYLE: string;
}

export interface SelectLabelStyleType {
  BASE_STYLE: string;
  POSITION_STYLE: string;
  COLOR_STYLE: string;
}

export interface SelectButtonStyleType {
  BASE_STYLE: string;
  ACTIVE_STYLE: string;
  INTERACTION_STYLE: string;
}

export interface SelectOptionListStyleType {
  BASE_STYLE: string;
}

export interface SelectOptionItemStyleType {
  BASE_STYLE: string;
  HIGHLIGHTED_STYLE: string;
  DISABLED_STYLE: string;
}
