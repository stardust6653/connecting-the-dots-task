import type { Meta, StoryObj } from "@storybook/react";
import Select from "./Select";
import { useState } from "react";
import { SELECT_DUMMY_OPTIONS } from "./data/mock-data";

const meta = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [selectedOption, setSelectedOption] = useState("");
    return (
      <Select
        {...args}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
    );
  },
  args: {
    label: "기본 셀렉트",
    selectedOption: "",
    setSelectedOption: () => {},
    options: SELECT_DUMMY_OPTIONS,
  },
};

export const Disabled: Story = {
  args: {
    label: "비활성화",
    selectedOption: "",
    setSelectedOption: () => {},
    options: SELECT_DUMMY_OPTIONS,
    disabled: true,
  },
};
