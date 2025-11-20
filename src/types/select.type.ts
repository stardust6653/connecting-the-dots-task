export interface OptionType {
  value: string;
  disabled?: boolean;
}

export interface OptionGroupType {
  group: string | "none";
  disabled?: boolean;
  items: OptionType[];
}
